# app/routes/gastos_directos.py

from fastapi import APIRouter, HTTPException, status
from uuid import UUID
from app.models.gasto_directo import GastoDirectoCreate, GastoDirectoUpdate, GastoDirectoResponse
from app.database import supabase_client

router = APIRouter()


@router.get("/lote/{lote_id}", response_model=list[GastoDirectoResponse])
async def get_gastos_by_lote(lote_id: UUID):
    """Obtener todos los gastos directos de un lote"""
    response = supabase_client.table("gastos_directos")\
        .select("*")\
        .eq("lote_id", str(lote_id))\
        .order("fecha", desc=True)\
        .execute()
    
    return response.data


@router.post("/", response_model=GastoDirectoResponse, status_code=status.HTTP_201_CREATED)
async def create_gasto_directo(gasto: GastoDirectoCreate):
    """Registrar un gasto directo"""
    response = supabase_client.table("gastos_directos").insert(gasto.model_dump(mode="json")).execute()
    return response.data[0]


@router.patch("/{gasto_id}", response_model=GastoDirectoResponse)
async def update_gasto_directo(gasto_id: UUID, gasto: GastoDirectoUpdate):
    """Actualizar un gasto directo"""
    data = gasto.model_dump(exclude_unset=True, mode="json")
    
    if not data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    
    response = supabase_client.table("gastos_directos").update(data).eq("id", str(gasto_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Gasto no encontrado")
    
    return response.data[0]


@router.delete("/{gasto_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_gasto_directo(gasto_id: UUID):
    """Eliminar un gasto directo"""
    response = supabase_client.table("gastos_directos").delete().eq("id", str(gasto_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Gasto no encontrado")