# app/routes/corrales.py

from fastapi import APIRouter, HTTPException, status
from uuid import UUID
from app.models.corral import CorralCreate, CorralUpdate, CorralResponse
from app.database import supabase_client

router = APIRouter()


@router.get("/", response_model=list[CorralResponse])
async def get_corrales(activo: bool | None = None):
    """Obtener todos los corrales"""
    query = supabase_client.table("corrales").select("*")
    
    if activo is not None:
        query = query.eq("activo", activo)
    
    response = query.execute()
    return response.data


@router.get("/{corral_id}", response_model=CorralResponse)
async def get_corral(corral_id: UUID):
    """Obtener un corral por ID"""
    response = supabase_client.table("corrales").select("*").eq("id", str(corral_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Corral no encontrado")
    
    return response.data[0]


@router.post("/", response_model=CorralResponse, status_code=status.HTTP_201_CREATED)
async def create_corral(corral: CorralCreate):
    """Crear un nuevo corral"""
    response = supabase_client.table("corrales").insert(corral.model_dump(mode="json")).execute()
    return response.data[0]


@router.patch("/{corral_id}", response_model=CorralResponse)
async def update_corral(corral_id: UUID, corral: CorralUpdate):
    """Actualizar un corral"""
    data = corral.model_dump(exclude_unset=True, mode="json")
    
    if not data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    
    response = supabase_client.table("corrales").update(data).eq("id", str(corral_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Corral no encontrado")
    
    return response.data[0]


@router.delete("/{corral_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_corral(corral_id: UUID):
    """Eliminar un corral"""
    response = supabase_client.table("corrales").delete().eq("id", str(corral_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Corral no encontrado")