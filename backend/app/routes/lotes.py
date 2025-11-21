# app/routes/lotes.py

from fastapi import APIRouter, HTTPException, status
from uuid import UUID
from app.models.lote import LoteCreate, LoteUpdate, LoteResponse, LoteDetailResponse
from app.database import supabase_client

router = APIRouter()


@router.get("/", response_model=list[LoteResponse])
async def get_lotes(estado: str | None = None):
    """Obtener todos los lotes"""
    query = supabase_client.table("lotes").select("*").order("fecha_inicio", desc=True)
    
    if estado:
        query = query.eq("estado", estado)
    
    response = query.execute()
    return response.data


@router.get("/{lote_id}", response_model=LoteDetailResponse)
async def get_lote(lote_id: UUID):
    """Obtener un lote por ID con información detallada"""
    # Obtener lote
    lote_response = supabase_client.table("lotes").select("*").eq("id", str(lote_id)).execute()
    
    if not lote_response.data:
        raise HTTPException(status_code=404, detail="Lote no encontrado")
    
    lote = lote_response.data[0]
    
    # Obtener corrales asignados
    corrales_response = supabase_client.table("lotes_corrales")\
        .select("*, corrales(*)")\
        .eq("lote_id", str(lote_id))\
        .is_("fecha_liberacion", "null")\
        .execute()
    
    # Calcular área total
    area_total = sum(c["corrales"]["area_m2"] for c in corrales_response.data if c.get("corrales"))
    
    # Obtener estadísticas
    mortalidad_response = supabase_client.table("mortalidad")\
        .select("cantidad")\
        .eq("lote_id", str(lote_id))\
        .execute()
    
    cosechas_response = supabase_client.table("cosechas")\
        .select("cantidad_animales")\
        .eq("lote_id", str(lote_id))\
        .execute()
    
    total_mortalidad = sum(m["cantidad"] for m in mortalidad_response.data)
    total_vendidos = sum(c["cantidad_animales"] for c in cosechas_response.data)
    animales_actuales = lote["animales_iniciales"] - total_mortalidad - total_vendidos
    
    # Construir respuesta
    lote["area_total_m2"] = area_total
    lote["corrales_asignados"] = corrales_response.data
    lote["animales_actuales"] = animales_actuales
    lote["total_mortalidad"] = total_mortalidad
    lote["total_vendidos"] = total_vendidos
    
    return lote


@router.post("/", response_model=LoteResponse, status_code=status.HTTP_201_CREATED)
async def create_lote(lote: LoteCreate):
    """Crear un nuevo lote y asignar corrales"""
    # Validar que suma de machos y hembras = animales iniciales
    if lote.cantidad_machos + lote.cantidad_hembras != lote.animales_iniciales:
        raise HTTPException(
            status_code=400,
            detail="La suma de machos y hembras debe ser igual a animales iniciales"
        )
    
    # Extraer corrales_ids antes de insertar
    corrales_ids = lote.corrales_ids
    # mode="json" convierte automáticamente objetos date a strings ISO
    lote_data = lote.model_dump(exclude={"corrales_ids"}, mode="json")
    
    # Crear lote
    lote_response = supabase_client.table("lotes").insert(lote_data).execute()
    lote_creado = lote_response.data[0]
    
    # Asignar corrales
    asignaciones = [
        {"lote_id": lote_creado["id"], "corral_id": str(corral_id)}
        for corral_id in corrales_ids
    ]
    
    supabase_client.table("lotes_corrales").insert(asignaciones).execute()
    
    return lote_creado


@router.patch("/{lote_id}", response_model=LoteResponse)
async def update_lote(lote_id: UUID, lote: LoteUpdate):
    """Actualizar un lote"""
    # mode="json" convierte automáticamente objetos date a strings ISO
    data = lote.model_dump(exclude_unset=True, mode="json")
    
    if not data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    
    response = supabase_client.table("lotes").update(data).eq("id", str(lote_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Lote no encontrado")
    
    return response.data[0]


@router.post("/{lote_id}/cerrar", response_model=LoteResponse)
async def cerrar_lote(lote_id: UUID):
    """Cerrar un lote (después de la última cosecha)"""
    from datetime import date
    
    response = supabase_client.table("lotes").update({
        "estado": "cerrado",
        "fecha_cierre": str(date.today())
    }).eq("id", str(lote_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Lote no encontrado")
    
    # Liberar corrales
    supabase_client.table("lotes_corrales").update({
        "fecha_liberacion": str(date.today())
    }).eq("lote_id", str(lote_id)).is_("fecha_liberacion", "null").execute()
    
    return response.data[0]