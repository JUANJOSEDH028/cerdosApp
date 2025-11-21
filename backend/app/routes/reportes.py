# app/routes/reportes.py

from fastapi import APIRouter, HTTPException
from uuid import UUID
from app.services.calculo_service import CalculoCostosService

router = APIRouter()


@router.get("/lote/{lote_id}/costos")
async def get_costos_lote(lote_id: UUID):
    """Obtener el cálculo completo de costos de un lote"""
    try:
        resultado = CalculoCostosService.calcular_costo_total_lote(lote_id)
        return resultado
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en cálculo: {str(e)}")


@router.get("/lote/{lote_id}/indicadores")
async def get_indicadores_lote(lote_id: UUID):
    """Obtener indicadores de eficiencia de un lote"""
    try:
        resultado = CalculoCostosService.calcular_indicadores_eficiencia(lote_id)
        return resultado
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en cálculo: {str(e)}")


@router.get("/lote/{lote_id}/prorrateo/{anio}/{mes}")
async def get_prorrateo_mes(lote_id: UUID, anio: int, mes: int):
    """Obtener el prorrateo de gastos de un lote en un mes específico"""
    try:
        resultado = CalculoCostosService.prorratear_gastos_mensuales(lote_id, anio, mes)
        return resultado
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en cálculo: {str(e)}")