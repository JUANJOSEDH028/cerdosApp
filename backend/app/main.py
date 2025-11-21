# app/main.py

"""
Punto de entrada principal de la aplicación FastAPI.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings

# Importar routers
from app.routes import (
    corrales,
    alimentos,
    lotes,
    consumo_alimento,
    mortalidad,
    cosechas,
    gastos_mensuales,
    gastos_directos,
    reportes 
)

# Crear la aplicación FastAPI
app = FastAPI(
    title="Sistema de Control de Costos - Ceba de Cerdos",
    description="API Backend para gestión de lotes, costos y análisis de producción",
    version="0.1.0",
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================
# ENDPOINTS DE PRUEBA
# ============================================

@app.get("/")
async def root():
    """Endpoint raíz - Verifica que el servidor está funcionando"""
    return {
        "message": "Sistema de Control de Costos - Ceba de Cerdos",
        "status": "online",
        "version": "0.1.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Endpoint de salud - Verifica el servidor y la BD"""
    from app.database import supabase_client
    
    try:
        supabase_client.table("corrales").select("id").limit(1).execute()
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"
    
    return {
        "status": "healthy",
        "database": db_status,
        "environment": settings.environment
    }


# ============================================
# INCLUIR ROUTERS
# ============================================

app.include_router(corrales.router, prefix="/api/corrales", tags=["Corrales"])
app.include_router(alimentos.router, prefix="/api/alimentos", tags=["Alimentos"])
app.include_router(lotes.router, prefix="/api/lotes", tags=["Lotes"])
app.include_router(consumo_alimento.router, prefix="/api/consumo-alimento", tags=["Consumo Alimento"])
app.include_router(mortalidad.router, prefix="/api/mortalidad", tags=["Mortalidad"])
app.include_router(cosechas.router, prefix="/api/cosechas", tags=["Cosechas"])
app.include_router(gastos_mensuales.router, prefix="/api/gastos-mensuales", tags=["Gastos Mensuales"])
app.include_router(gastos_directos.router, prefix="/api/gastos-directos", tags=["Gastos Directos"])
app.include_router(reportes.router, prefix="/api/reportes", tags=["Reportes"])