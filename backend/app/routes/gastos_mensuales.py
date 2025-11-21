# app/routes/gastos_mensuales.py

from fastapi import APIRouter, HTTPException, status
from uuid import UUID
from app.models.gasto_mensual import GastoMensualCreate, GastoMensualUpdate, GastoMensualResponse
from app.database import supabase_client

router = APIRouter()


@router.get("/", response_model=list[GastoMensualResponse])
async def get_gastos_mensuales(anio: int | None = None, mes: int | None = None):
    """Obtener gastos mensuales, opcionalmente filtrados por año y/o mes"""
    query = supabase_client.table("gastos_mensuales").select("*").order("anio", desc=True).order("mes", desc=True)
    
    if anio:
        query = query.eq("anio", anio)
    if mes:
        query = query.eq("mes", mes)
    
    response = query.execute()
    return response.data


@router.get("/periodo/{anio}/{mes}", response_model=list[GastoMensualResponse])
async def get_gastos_by_periodo(anio: int, mes: int):
    """Obtener todos los gastos de un período específico"""
    response = supabase_client.table("gastos_mensuales")\
        .select("*")\
        .eq("anio", anio)\
        .eq("mes", mes)\
        .execute()
    
    return response.data


@router.post("/", response_model=GastoMensualResponse, status_code=status.HTTP_201_CREATED)
async def create_gasto_mensual(gasto: GastoMensualCreate):
    """Registrar un gasto mensual"""
    response = supabase_client.table("gastos_mensuales").insert(gasto.model_dump(mode="json")).execute()
    return response.data[0]


@router.patch("/{gasto_id}", response_model=GastoMensualResponse)
async def update_gasto_mensual(gasto_id: UUID, gasto: GastoMensualUpdate):
    """Actualizar un gasto mensual"""
    data = gasto.model_dump(exclude_unset=True, mode="json")
    
    if not data:
        raise HTTPException(status_code=400, detail="No hay datos para actualizar")
    
    response = supabase_client.table("gastos_mensuales").update(data).eq("id", str(gasto_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Gasto no encontrado")
    
    return response.data[0]


@router.delete("/{gasto_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_gasto_mensual(gasto_id: UUID):
    """Eliminar un gasto mensual"""
    response = supabase_client.table("gastos_mensuales").delete().eq("id", str(gasto_id)).execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Gasto no encontrado")