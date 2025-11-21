# app/routes/alimentos.py

from fastapi import APIRouter, HTTPException, status
from uuid import UUID
from app.models.alimento import AlimentoCreate, AlimentoUpdate, AlimentoResponse
from app.database import supabase_client

router = APIRouter()


@router.get("/", response_model=list[AlimentoResponse])
async def get_alimentos(activo: bool | None = None):
    """Obtener todos los alimentos"""
    query = supabase_client.table("alimentos").select("*")
    
    if activo is not None:
        query = query.eq("activo", activo)
    
    response = query.execute()
    return response.data


@router.get("/{alimento_id}", response_model=AlimentoResponse)
async def get_alimento(alimento_id: UUID):
    """Obtener un alimento por ID"""
    response = supabase_client.table("alimentos").select("*").eq("id", str(alimento_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Alimento no encontrado")
    
    return response.data[0]


@router.post("/", response_model=AlimentoResponse, status_code=status.HTTP_201_CREATED)
async def create_alimento(alimento: AlimentoCreate):
    """Crear un nuevo alimento"""
    response = supabase_client.table("alimentos").insert(alimento.model_dump(mode="json")).execute()
    return response.data[0]


@router.patch("/{alimento_id}", response_model=AlimentoResponse)
async def update_alimento(alimento_id: UUID, alimento: AlimentoUpdate):
    """Actualizar un alimento"""
    data = alimento.model_dump(exclude_unset=True, mode="json")
    
    if not data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    
    response = supabase_client.table("alimentos").update(data).eq("id", str(alimento_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Alimento no encontrado")
    
    return response.data[0]


@router.delete("/{alimento_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_alimento(alimento_id: UUID):
    """Eliminar un alimento"""
    response = supabase_client.table("alimentos").delete().eq("id", str(alimento_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Alimento no encontrado")