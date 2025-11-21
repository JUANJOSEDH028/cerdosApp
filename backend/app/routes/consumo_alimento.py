# app/routes/consumo_alimento.py

from fastapi import APIRouter, HTTPException, status
from uuid import UUID
from app.models.consumo_alimento import ConsumoAlimentoCreate, ConsumoAlimentoUpdate, ConsumoAlimentoResponse
from app.database import supabase_client

router = APIRouter()


@router.get("/lote/{lote_id}", response_model=list[ConsumoAlimentoResponse])
async def get_consumo_by_lote(lote_id: UUID):
    """Obtener todo el consumo de alimento de un lote"""
    response = supabase_client.table("consumo_alimento")\
        .select("*")\
        .eq("lote_id", str(lote_id))\
        .order("fecha", desc=True)\
        .execute()
    
    return response.data


@router.post("/", response_model=ConsumoAlimentoResponse, status_code=status.HTTP_201_CREATED)
async def create_consumo(consumo: ConsumoAlimentoCreate):
    """Registrar consumo de alimento"""
    response = supabase_client.table("consumo_alimento").insert(consumo.model_dump(mode="json")).execute()
    return response.data[0]


@router.patch("/{consumo_id}", response_model=ConsumoAlimentoResponse)
async def update_consumo(consumo_id: UUID, consumo: ConsumoAlimentoUpdate):
    """Actualizar un registro de consumo"""
    data = consumo.model_dump(exclude_unset=True, mode="json")
    
    if not data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    
    response = supabase_client.table("consumo_alimento").update(data).eq("id", str(consumo_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Registro no encontrado")
    
    return response.data[0]


@router.delete("/{consumo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_consumo(consumo_id: UUID):
    """Eliminar un registro de consumo"""
    response = supabase_client.table("consumo_alimento").delete().eq("id", str(consumo_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Registro no encontrado")