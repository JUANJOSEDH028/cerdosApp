# app/services/calculo_service.py

"""
Servicio de cálculo de costos y prorrateo.
Implementa toda la lógica de negocio para calcular costos por lote.
"""

from uuid import UUID
from datetime import date, datetime
from decimal import Decimal
from typing import Optional
from app.database import supabase_client


class CalculoCostosService:
    """Servicio para cálculos de costos y prorrateo"""
    
    @staticmethod
    def obtener_area_lote(lote_id: UUID) -> Decimal:
        """
        Obtiene el área total ocupada por un lote.
        
        Args:
            lote_id: ID del lote
            
        Returns:
            Área total en m²
        """
        response = supabase_client.table("lotes_corrales")\
            .select("*, corrales(area_m2)")\
            .eq("lote_id", str(lote_id))\
            .is_("fecha_liberacion", "null")\
            .execute()
        
        area_total = sum(
            Decimal(str(item["corrales"]["area_m2"])) 
            for item in response.data 
            if item.get("corrales")
        )
        
        return area_total
    
    @staticmethod
    def obtener_dias_activos_en_mes(lote_id: UUID, anio: int, mes: int) -> int:
        """
        Calcula cuántos días estuvo activo un lote en un mes específico.
        
        Args:
            lote_id: ID del lote
            anio: Año
            mes: Mes (1-12)
            
        Returns:
            Número de días activos en ese mes
        """
        # Obtener información del lote
        lote_response = supabase_client.table("lotes")\
            .select("fecha_inicio, fecha_cierre")\
            .eq("id", str(lote_id))\
            .execute()
        
        if not lote_response.data:
            return 0
        
        lote = lote_response.data[0]
        fecha_inicio = datetime.strptime(lote["fecha_inicio"], "%Y-%m-%d").date()
        fecha_cierre = (
            datetime.strptime(lote["fecha_cierre"], "%Y-%m-%d").date()
            if lote["fecha_cierre"]
            else date.today()
        )
        
        # Calcular primer y último día del mes
        from calendar import monthrange
        primer_dia_mes = date(anio, mes, 1)
        ultimo_dia_mes = date(anio, mes, monthrange(anio, mes)[1])
        
        # Intersección de períodos
        inicio_periodo = max(fecha_inicio, primer_dia_mes)
        fin_periodo = min(fecha_cierre, ultimo_dia_mes)
        
        if inicio_periodo > fin_periodo:
            return 0
        
        dias_activos = (fin_periodo - inicio_periodo).days + 1
        return dias_activos
    
    @staticmethod
    def calcular_costo_lechones(lote_id: UUID) -> Decimal:
        """Obtiene el costo de compra de lechones"""
        response = supabase_client.table("lotes")\
            .select("costo_lechones")\
            .eq("id", str(lote_id))\
            .execute()
        
        if not response.data:
            return Decimal(0)
        
        return Decimal(str(response.data[0]["costo_lechones"]))
    
    @staticmethod
    def calcular_costo_alimento(lote_id: UUID) -> dict:
        """
        Calcula el costo total de alimento consumido por un lote.
        
        Returns:
            Dict con costo_total, kg_total, detalle por tipo
        """
        # Obtener consumo con información del alimento
        response = supabase_client.table("consumo_alimento")\
            .select("*, alimentos(nombre, tipo, costo_por_bulto, peso_bulto_kg)")\
            .eq("lote_id", str(lote_id))\
            .execute()
        
        costo_total = Decimal(0)
        kg_total = Decimal(0)
        detalle = {}
        
        for consumo in response.data:
            alimento = consumo["alimentos"]
            cantidad_bultos = Decimal(str(consumo["cantidad_bultos"]))
            costo_bulto = Decimal(str(alimento["costo_por_bulto"]))
            peso_bulto = Decimal(str(alimento["peso_bulto_kg"]))
            
            costo = cantidad_bultos * costo_bulto
            kg = cantidad_bultos * peso_bulto
            
            costo_total += costo
            kg_total += kg
            
            tipo = alimento["tipo"]
            if tipo not in detalle:
                detalle[tipo] = {"costo": Decimal(0), "kg": Decimal(0), "bultos": Decimal(0)}
            
            detalle[tipo]["costo"] += costo
            detalle[tipo]["kg"] += kg
            detalle[tipo]["bultos"] += cantidad_bultos
        
        return {
            "costo_total": costo_total,
            "kg_total": kg_total,
            "detalle": detalle
        }
    
    @staticmethod
    def calcular_gastos_directos(lote_id: UUID) -> dict:
        """
        Calcula todos los gastos directos de un lote.
        
        Returns:
            Dict con total y detalle por tipo
        """
        response = supabase_client.table("gastos_directos")\
            .select("*")\
            .eq("lote_id", str(lote_id))\
            .execute()
        
        total = Decimal(0)
        detalle = {}
        
        for gasto in response.data:
            tipo = gasto["tipo"]
            monto = Decimal(str(gasto["monto"]))
            
            total += monto
            
            if tipo not in detalle:
                detalle[tipo] = Decimal(0)
            detalle[tipo] += monto
        
        return {
            "total": total,
            "detalle": detalle
        }
    
    @staticmethod
    def prorratear_gastos_mensuales(lote_id: UUID, anio: int, mes: int) -> dict:
        """
        Calcula el prorrateo de gastos mensuales para un lote específico.
        
        Aplica las fórmulas:
        - Arriendo: (Área Lote / Área Total) × (Días Lote / Días Mes) × Monto
        - Otros: (Área Lote / Suma Áreas Activas) × Monto
        
        Args:
            lote_id: ID del lote
            anio: Año
            mes: Mes (1-12)
            
        Returns:
            Dict con total prorrateado y detalle por concepto
        """
        # Obtener área del lote
        area_lote = CalculoCostosService.obtener_area_lote(lote_id)
        
        if area_lote == 0:
            return {"total": Decimal(0), "detalle": {}}
        
        # Obtener días activos del lote en el mes
        dias_lote = CalculoCostosService.obtener_dias_activos_en_mes(lote_id, anio, mes)
        
        if dias_lote == 0:
            return {"total": Decimal(0), "detalle": {}}
        
        # Obtener días del mes
        from calendar import monthrange
        dias_mes = monthrange(anio, mes)[1]
        
        # Obtener todos los lotes activos en ese mes
        lotes_activos = supabase_client.table("lotes")\
            .select("id, fecha_inicio, fecha_cierre")\
            .or_(f"fecha_cierre.is.null,fecha_cierre.gte.{anio}-{mes:02d}-01")\
            .lte("fecha_inicio", f"{anio}-{mes:02d}-{dias_mes}")\
            .execute()
        
        # Calcular suma de áreas de lotes activos
        suma_areas_activas = Decimal(0)
        for lote in lotes_activos.data:
            area = CalculoCostosService.obtener_area_lote(UUID(lote["id"]))
            suma_areas_activas += area
        
        # Obtener gastos del mes
        gastos_response = supabase_client.table("gastos_mensuales")\
            .select("*")\
            .eq("anio", anio)\
            .eq("mes", mes)\
            .execute()
        
        total_prorrateado = Decimal(0)
        detalle = {}
        
        for gasto in gastos_response.data:
            tipo = gasto["tipo"]
            monto = Decimal(str(gasto["monto"]))
            
            if tipo == "arriendo":
                # Fórmula: (Área Lote / Área Total) × (Días Lote / Días Mes) × Monto
                # Área total = suma de áreas activas (granja completa en uso)
                proporcion_area = area_lote / suma_areas_activas if suma_areas_activas > 0 else 0
                proporcion_tiempo = Decimal(dias_lote) / Decimal(dias_mes)
                monto_prorrateado = monto * proporcion_area * proporcion_tiempo
            else:
                # Otros gastos: (Área Lote / Suma Áreas Activas) × Monto
                proporcion = area_lote / suma_areas_activas if suma_areas_activas > 0 else 0
                monto_prorrateado = monto * proporcion
            
            total_prorrateado += monto_prorrateado
            detalle[gasto["concepto"]] = {
                "tipo": tipo,
                "monto_total": monto,
                "monto_prorrateado": monto_prorrateado
            }
        
        return {
            "total": total_prorrateado,
            "detalle": detalle,
            "metadata": {
                "area_lote_m2": area_lote,
                "dias_activos": dias_lote,
                "dias_mes": dias_mes,
                "suma_areas_activas_m2": suma_areas_activas
            }
        }
    
    @staticmethod
    def calcular_costo_total_lote(lote_id: UUID) -> dict:
        """
        Calcula el costo total de un lote sumando todos los conceptos.
        
        Returns:
            Dict completo con todos los costos y subtotales
        """
        # Obtener información del lote
        lote_response = supabase_client.table("lotes")\
            .select("*, fecha_inicio, fecha_cierre")\
            .eq("id", str(lote_id))\
            .execute()
        
        if not lote_response.data:
            raise ValueError(f"Lote {lote_id} no encontrado")
        
        lote = lote_response.data[0]
        fecha_inicio = datetime.strptime(lote["fecha_inicio"], "%Y-%m-%d").date()
        fecha_cierre = (
            datetime.strptime(lote["fecha_cierre"], "%Y-%m-%d").date()
            if lote["fecha_cierre"]
            else date.today()
        )
        
        # Costo de lechones
        costo_lechones = CalculoCostosService.calcular_costo_lechones(lote_id)
        
        # Costo de alimento
        alimento_info = CalculoCostosService.calcular_costo_alimento(lote_id)
        costo_alimento = alimento_info["costo_total"]
        
        # Gastos directos
        gastos_directos_info = CalculoCostosService.calcular_gastos_directos(lote_id)
        costo_gastos_directos = gastos_directos_info["total"]
        
        # Prorrateo de gastos mensuales
        # Iterar por cada mes entre fecha_inicio y fecha_cierre
        gastos_prorrateados_total = Decimal(0)
        gastos_prorrateados_detalle = {}
        
        fecha_actual = date(fecha_inicio.year, fecha_inicio.month, 1)
        fecha_fin = date(fecha_cierre.year, fecha_cierre.month, 1)
        
        while fecha_actual <= fecha_fin:
            prorrateo = CalculoCostosService.prorratear_gastos_mensuales(
                lote_id, 
                fecha_actual.year, 
                fecha_actual.month
            )
            gastos_prorrateados_total += prorrateo["total"]
            
            mes_key = f"{fecha_actual.year}-{fecha_actual.month:02d}"
            gastos_prorrateados_detalle[mes_key] = prorrateo
            
            # Avanzar al siguiente mes
            if fecha_actual.month == 12:
                fecha_actual = date(fecha_actual.year + 1, 1, 1)
            else:
                fecha_actual = date(fecha_actual.year, fecha_actual.month + 1, 1)
        
        # Costo total
        costo_total = (
            costo_lechones +
            costo_alimento +
            costo_gastos_directos +
            gastos_prorrateados_total
        )
        
        return {
            "lote_id": str(lote_id),
            "numero_lote": lote["numero_lote"],
            "fecha_inicio": lote["fecha_inicio"],
            "fecha_cierre": lote["fecha_cierre"],
            "costo_total": costo_total,
            "detalle_costos": {
                "lechones": costo_lechones,
                "alimento": costo_alimento,
                "gastos_directos": costo_gastos_directos,
                "gastos_prorrateados": gastos_prorrateados_total
            },
            "detalle_alimento": alimento_info,
            "detalle_gastos_directos": gastos_directos_info,
            "detalle_gastos_prorrateados": gastos_prorrateados_detalle
        }
    
    @staticmethod
    def calcular_indicadores_eficiencia(lote_id: UUID) -> dict:
        """
        Calcula indicadores de eficiencia del lote.
        
        Returns:
            Dict con todos los indicadores
        """
        # Obtener información del lote
        lote_response = supabase_client.table("lotes")\
            .select("*")\
            .eq("id", str(lote_id))\
            .execute()
        
        if not lote_response.data:
            raise ValueError(f"Lote {lote_id} no encontrado")
        
        lote = lote_response.data[0]
        animales_iniciales = lote["animales_iniciales"]
        peso_inicial_promedio = Decimal(str(lote["peso_promedio_inicial"]))
        
        # Mortalidad
        mortalidad_response = supabase_client.table("mortalidad")\
            .select("cantidad")\
            .eq("lote_id", str(lote_id))\
            .execute()
        
        total_mortalidad = sum(m["cantidad"] for m in mortalidad_response.data)
        porcentaje_mortalidad = (total_mortalidad / animales_iniciales * 100) if animales_iniciales > 0 else 0
        
        # Cosechas
        cosechas_response = supabase_client.table("cosechas")\
            .select("cantidad_animales, peso_total_kg")\
            .eq("lote_id", str(lote_id))\
            .execute()
        
        total_vendidos = sum(c["cantidad_animales"] for c in cosechas_response.data)
        peso_total_vendido = sum(Decimal(str(c["peso_total_kg"])) for c in cosechas_response.data)
        
        peso_promedio_venta = (peso_total_vendido / total_vendidos) if total_vendidos > 0 else 0
        ganancia_peso_promedio = peso_promedio_venta - peso_inicial_promedio
        
        # Alimento
        alimento_info = CalculoCostosService.calcular_costo_alimento(lote_id)
        kg_alimento_total = alimento_info["kg_total"]
        
        # Conversión alimenticia = kg alimento / kg ganancia de peso
        kg_ganancia_total = total_vendidos * ganancia_peso_promedio
        conversion_alimenticia = (kg_alimento_total / kg_ganancia_total) if kg_ganancia_total > 0 else 0
        
        # Costos
        costo_info = CalculoCostosService.calcular_costo_total_lote(lote_id)
        costo_total = costo_info["costo_total"]
        
        costo_por_animal = (costo_total / total_vendidos) if total_vendidos > 0 else 0
        costo_por_kg = (costo_total / peso_total_vendido) if peso_total_vendido > 0 else 0
        
        return {
            "lote_id": str(lote_id),
            "numero_lote": lote["numero_lote"],
            "animales": {
                "iniciales": animales_iniciales,
                "mortalidad": total_mortalidad,
                "vendidos": total_vendidos,
                "porcentaje_mortalidad": round(float(porcentaje_mortalidad), 2)
            },
            "pesos": {
                "inicial_promedio_kg": float(peso_inicial_promedio),
                "final_promedio_kg": float(peso_promedio_venta),
                "ganancia_promedio_kg": float(ganancia_peso_promedio),
                "total_vendido_kg": float(peso_total_vendido)
            },
            "alimento": {
                "total_consumido_kg": float(kg_alimento_total),
                "conversion_alimenticia": round(float(conversion_alimenticia), 2)
            },
            "costos": {
                "costo_total": float(costo_total),
                "costo_por_animal": float(costo_por_animal),
                "costo_por_kg_producido": float(costo_por_kg)
            }
        }