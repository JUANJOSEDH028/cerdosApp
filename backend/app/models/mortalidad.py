# app/models/mortalidad.py

from pydantic import BaseModel, Field
from uuid import UUID
from datetime import date, datetime
from decimal import Decimal
from typing import Optional


class MortalidadBase(BaseModel):
    """Campos base de mortalidad"""
    lote_id: UUID
    fecha: date
    cantidad: int = Field(..., gt=0)
    peso_promedio_kg: Optional[Decimal] = Field(None, gt=0)
    causa: Optional[str] = None
    observaciones: Optional[str] = None


class MortalidadCreate(MortalidadBase):
    """Modelo para crear un registro de mortalidad"""
    pass


class MortalidadUpdate(BaseModel):
    """Modelo para actualizar un registro de mortalidad"""
    cantidad: Optional[int] = Field(None, gt=0)
    peso_promedio_kg: Optional[Decimal] = Field(None, gt=0)
    causa: Optional[str] = None
    observaciones: Optional[str] = None


class MortalidadResponse(MortalidadBase):
    """Modelo de respuesta con todos los campos"""
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True