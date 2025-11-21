# app/routes/cosechas.py

from fastapi import APIRouter, HTTPException, status
from uuid import UUID
from app.models.cosecha import CosechaCreate, CosechaUpdate, CosechaResponse
from app.database import supabase_client

router = APIRouter()


@router.get("/lote/{lote_id}", response_model=list[CosechaResponse])
async def get_cosechas_by_lote(lote_id: UUID):
    """Obtener todas las cosechas de un lote"""
    response = supabase_client.table("cosechas")\
        .select("*")\
        .eq("lote_id", str(lote_id))\
        .order("fecha", desc=True)\
        .execute()
    
    return response.data


@router.post("/", response_model=CosechaResponse, status_code=status.HTTP_201_CREATED)
async def create_cosecha(cosecha: CosechaCreate):
    """Registrar una cosecha"""
    response = supabase_client.table("cosechas").insert(cosecha.model_dump(mode="json")).execute()
    cosecha_creada = response.data[0]
    
    # Si es la última cosecha, cerrar el lote automáticamente
    if cosecha.es_ultima_cosecha:
        from datetime import date
        supabase_client.table("lotes").update({
            "estado": "cerrado",
            "fecha_cierre": str(date.today())
        }).eq("id", str(cosecha.lote_id)).execute()
        
        # Liberar corrales
        supabase_client.table("lotes_corrales").update({
            "fecha_liberacion": str(date.today())
        }).eq("lote_id", str(cosecha.lote_id)).is_("fecha_liberacion", "null").execute()
    
    return cosecha_creada


@router.patch("/{cosecha_id}", response_model=CosechaResponse)
async def update_cosecha(cosecha_id: UUID, cosecha: CosechaUpdate):
    """Actualizar una cosecha"""
    data = cosecha.model_dump(exclude_unset=True, mode="json")
    
    if not data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    
    response = supabase_client.table("cosechas").update(data).eq("id", str(cosecha_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Cosecha no encontrada")
    
    return response.data[0]


@router.delete("/{cosecha_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_cosecha(cosecha_id: UUID):
    """Eliminar una cosecha"""
    response = supabase_client.table("cosechas").delete().eq("id", str(cosecha_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Cosecha no encontrada")