# app/models/gasto_directo.py

from pydantic import BaseModel, Field
from uuid import UUID
from datetime import date, datetime
from decimal import Decimal
from typing import Optional, Literal


class GastoDirectoBase(BaseModel):
    """Campos base de gasto directo"""
    lote_id: UUID
    fecha: date
    concepto: str = Field(..., max_length=100)
    tipo: Literal['flete', 'inmunocastracion', 'otro']
    monto: Decimal = Field(..., gt=0)
    observaciones: Optional[str] = None


class GastoDirectoCreate(GastoDirectoBase):
    """Modelo para crear un gasto directo"""
    pass


class GastoDirectoUpdate(BaseModel):
    """Modelo para actualizar un gasto directo"""
    monto: Optional[Decimal] = Field(None, gt=0)
    observaciones: Optional[str] = None


class GastoDirectoResponse(GastoDirectoBase):
    """Modelo de respuesta con todos los campos"""
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True