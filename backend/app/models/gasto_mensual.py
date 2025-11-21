# app/models/gasto_mensual.py

from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime
from decimal import Decimal
from typing import Optional, Literal


class GastoMensualBase(BaseModel):
    """Campos base de gasto mensual"""
    mes: int = Field(..., ge=1, le=12)
    anio: int = Field(..., ge=2020)
    concepto: str = Field(..., max_length=100)
    monto: Decimal = Field(..., gt=0)
    tipo: Literal['arriendo', 'servicios', 'nomina', 'medicamentos', 'insumos', 'otros']
    observaciones: Optional[str] = None


class GastoMensualCreate(GastoMensualBase):
    """Modelo para crear un gasto mensual"""
    pass


class GastoMensualUpdate(BaseModel):
    """Modelo para actualizar un gasto mensual"""
    monto: Optional[Decimal] = Field(None, gt=0)
    observaciones: Optional[str] = None


class GastoMensualResponse(GastoMensualBase):
    """Modelo de respuesta con todos los campos"""
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True