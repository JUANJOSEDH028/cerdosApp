# app/models/alimento.py

from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime
from decimal import Decimal
from typing import Optional, Literal


class AlimentoBase(BaseModel):
    """Campos base del alimento"""
    nombre: str = Field(..., max_length=100)
    tipo: Literal['preiniciador', 'levante', 'engorde']
    costo_por_bulto: Decimal = Field(..., gt=0)
    peso_bulto_kg: Decimal = Field(default=40.0, gt=0)
    activo: bool = True


class AlimentoCreate(AlimentoBase):
    """Modelo para crear un alimento"""
    pass


class AlimentoUpdate(BaseModel):
    """Modelo para actualizar un alimento"""
    nombre: Optional[str] = Field(None, max_length=100)
    tipo: Optional[Literal['preiniciador', 'levante', 'engorde']] = None
    costo_por_bulto: Optional[Decimal] = Field(None, gt=0)
    peso_bulto_kg: Optional[Decimal] = Field(None, gt=0)
    activo: Optional[bool] = None


class AlimentoResponse(AlimentoBase):
    """Modelo de respuesta con todos los campos"""
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True