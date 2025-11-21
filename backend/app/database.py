# app/database.py

"""
Módulo de conexión a Supabase.
Proporciona una función para obtener el cliente de Supabase
configurado con las credenciales del archivo .env
"""

from supabase import create_client, Client
from app.config import settings


def get_supabase_client() -> Client:
    """
    Crea y retorna un cliente de Supabase configurado.
    
    El cliente de Supabase permite interactuar con la base de datos:
    - Hacer consultas (SELECT)
    - Insertar datos (INSERT)
    - Actualizar registros (UPDATE)
    - Eliminar registros (DELETE)
    
    Returns:
        Client: Instancia del cliente de Supabase
        
    Ejemplo de uso:
        supabase = get_supabase_client()
        response = supabase.table("lotes").select("*").execute()
    """
    
    # Crear cliente usando las credenciales de config.py
    supabase: Client = create_client(
        supabase_url=settings.supabase_url,
        supabase_key=settings.supabase_key
    )
    
    return supabase


# Variable global para reutilizar la conexión (opcional pero recomendado)
# En lugar de crear un nuevo cliente cada vez, reutilizamos el mismo
supabase_client = get_supabase_client()