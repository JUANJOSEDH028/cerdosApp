# app/models/__init__.py

from .corral import CorralCreate, CorralUpdate, CorralResponse
from .alimento import AlimentoCreate, AlimentoUpdate, AlimentoResponse
from .lote import LoteCreate, LoteUpdate, LoteResponse, LoteDetailResponse
from .consumo_alimento import ConsumoAlimentoCreate, ConsumoAlimentoUpdate, ConsumoAlimentoResponse
from .mortalidad import MortalidadCreate, MortalidadUpdate, MortalidadResponse
from .cosecha import CosechaCreate, CosechaUpdate, CosechaResponse
from .gasto_mensual import GastoMensualCreate, GastoMensualUpdate, GastoMensualResponse
from .gasto_directo import GastoDirectoCreate, GastoDirectoUpdate, GastoDirectoResponse

__all__ = [
    "CorralCreate", "CorralUpdate", "CorralResponse",
    "AlimentoCreate", "AlimentoUpdate", "AlimentoResponse",
    "LoteCreate", "LoteUpdate", "LoteResponse", "LoteDetailResponse",
    "ConsumoAlimentoCreate", "ConsumoAlimentoUpdate", "ConsumoAlimentoResponse",
    "MortalidadCreate", "MortalidadUpdate", "MortalidadResponse",
    "CosechaCreate", "CosechaUpdate", "CosechaResponse",
    "GastoMensualCreate", "GastoMensualUpdate", "GastoMensualResponse",
    "GastoDirectoCreate", "GastoDirectoUpdate", "GastoDirectoResponse",
]