# app/routes/mortalidad.py

from fastapi import APIRouter, HTTPException, status
from uuid import UUID
from app.models.mortalidad import MortalidadCreate, MortalidadUpdate, MortalidadResponse
from app.database import supabase_client

router = APIRouter()


@router.get("/lote/{lote_id}", response_model=list[MortalidadResponse])
async def get_mortalidad_by_lote(lote_id: UUID):
    """Obtener todos los registros de mortalidad de un lote"""
    response = supabase_client.table("mortalidad")\
        .select("*")\
        .eq("lote_id", str(lote_id))\
        .order("fecha", desc=True)\
        .execute()
    
    return response.data


@router.post("/", response_model=MortalidadResponse, status_code=status.HTTP_201_CREATED)
async def create_mortalidad(mortalidad: MortalidadCreate):
    """Registrar mortalidad"""
    response = supabase_client.table("mortalidad").insert(mortalidad.model_dump(mode="json")).execute()
    return response.data[0]


@router.patch("/{mortalidad_id}", response_model=MortalidadResponse)
async def update_mortalidad(mortalidad_id: UUID, mortalidad: MortalidadUpdate):
    """Actualizar un registro de mortalidad"""
    data = mortalidad.model_dump(exclude_unset=True, mode="json")
    
    if not data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    
    response = supabase_client.table("mortalidad").update(data).eq("id", str(mortalidad_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Registro no encontrado")
    
    return response.data[0]


@router.delete("/{mortalidad_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_mortalidad(mortalidad_id: UUID):
    """Eliminar un registro de mortalidad"""
    response = supabase_client.table("mortalidad").delete().eq("id", str(mortalidad_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Registro no encontrado")