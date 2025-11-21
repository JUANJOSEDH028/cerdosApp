# app/models/consumo_alimento.py

from pydantic import BaseModel, Field
from uuid import UUID
from datetime import date, datetime
from decimal import Decimal
from typing import Optional


class ConsumoAlimentoBase(BaseModel):
    """Campos base del consumo de alimento"""
    lote_id: UUID
    alimento_id: UUID
    fecha: date
    cantidad_bultos: Decimal = Field(..., gt=0)
    observaciones: Optional[str] = None


class ConsumoAlimentoCreate(ConsumoAlimentoBase):
    """Modelo para crear un registro de consumo"""
    pass


class ConsumoAlimentoUpdate(BaseModel):
    """Modelo para actualizar un registro de consumo"""
    cantidad_bultos: Optional[Decimal] = Field(None, gt=0)
    observaciones: Optional[str] = None


class ConsumoAlimentoResponse(ConsumoAlimentoBase):
    """Modelo de respuesta con todos los campos"""
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True