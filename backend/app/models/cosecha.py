# app/models/cosecha.py

from pydantic import BaseModel, Field
from uuid import UUID
from datetime import date, datetime
from decimal import Decimal
from typing import Optional, Literal


class CosechaBase(BaseModel):
    """Campos base de cosecha"""
    lote_id: UUID
    fecha: date
    tipo: Literal['cabezas', 'colas', 'media']
    cantidad_animales: int = Field(..., gt=0)
    peso_total_kg: Decimal = Field(..., gt=0)
    es_ultima_cosecha: bool = False
    observaciones: Optional[str] = None


class CosechaCreate(CosechaBase):
    """Modelo para crear una cosecha"""
    pass


class CosechaUpdate(BaseModel):
    """Modelo para actualizar una cosecha"""
    cantidad_animales: Optional[int] = Field(None, gt=0)
    peso_total_kg: Optional[Decimal] = Field(None, gt=0)
    es_ultima_cosecha: Optional[bool] = None
    observaciones: Optional[str] = None


class CosechaResponse(CosechaBase):
    """Modelo de respuesta con todos los campos"""
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True