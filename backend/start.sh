#!/bin/bash
# Script de inicio para Render

echo "🚀 Iniciando servidor FastAPI..."
echo "📦 Entorno: $ENVIRONMENT"

# Iniciar servidor con uvicorn
uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}

