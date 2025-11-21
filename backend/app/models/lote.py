# app/models/lote.py

from pydantic import BaseModel, Field
from uuid import UUID
from datetime import date, datetime
from decimal import Decimal
from typing import Optional, Literal


class LoteBase(BaseModel):
    """Campos base del lote"""
    numero_lote: str = Field(..., max_length=50)
    fecha_inicio: date
    animales_iniciales: int = Field(..., gt=0)
    peso_promedio_inicial: Decimal = Field(..., gt=0)
    cantidad_machos: int = Field(..., ge=0)
    cantidad_hembras: int = Field(..., ge=0)
    costo_lechones: Decimal = Field(..., gt=0)
    observaciones: Optional[str] = None


class LoteCreate(LoteBase):
    """Modelo para crear un lote"""
    corrales_ids: list[UUID] = Field(..., min_length=1, description="IDs de corrales asignados")


class LoteUpdate(BaseModel):
    """Modelo para actualizar un lote"""
    numero_lote: Optional[str] = Field(None, max_length=50)
    fecha_cierre: Optional[date] = None
    observaciones: Optional[str] = None
    estado: Optional[Literal['activo', 'cerrado']] = None


class LoteResponse(LoteBase):
    """Modelo de respuesta con todos los campos"""
    id: UUID
    fecha_cierre: Optional[date] = None
    estado: Literal['activo', 'cerrado']
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class LoteDetailResponse(LoteResponse):
    """Modelo de respuesta extendido con información adicional"""
    area_total_m2: Optional[Decimal] = None
    corrales_asignados: Optional[list[dict]] = None
    animales_actuales: Optional[int] = None
    total_consumo_alimento_kg: Optional[Decimal] = None
    total_mortalidad: Optional[int] = None
    total_vendidos: Optional[int] = None