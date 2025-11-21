# app/models/corral.py

from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime
from decimal import Decimal
from typing import Optional


class CorralBase(BaseModel):
    """Campos base del corral"""
    nombre: str = Field(..., max_length=50)
    area_m2: Decimal = Field(..., gt=0, description="Área en metros cuadrados")
    activo: bool = True


class CorralCreate(CorralBase):
    """Modelo para crear un corral"""
    pass


class CorralUpdate(BaseModel):
    """Modelo para actualizar un corral (todos los campos opcionales)"""
    nombre: Optional[str] = Field(None, max_length=50)
    area_m2: Optional[Decimal] = Field(None, gt=0)
    activo: Optional[bool] = None


class CorralResponse(CorralBase):
    """Modelo de respuesta con todos los campos"""
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True