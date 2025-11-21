# app/config.py

"""
Configuración de la aplicación.
Lee las variables de entorno del archivo .env y las hace disponibles
en toda la aplicación de forma tipo-segura.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Clase que define todas las configuraciones de la aplicación.
    
    Pydantic Settings automáticamente:
    - Lee el archivo .env
    - Valida que las variables existan
    - Convierte los tipos correctamente
    """
    
    # Configuración de Supabase
    supabase_url: str  # URL del proyecto de Supabase
    supabase_key: str  # API Key pública (anon key)
    
    # Configuración del servidor backend
    backend_host: str = "0.0.0.0"  # IP donde corre el servidor
    backend_port: int = 8000        # Puerto del servidor
    backend_reload: bool = True     # Auto-reload en desarrollo
    
    # Configuración CORS (orígenes permitidos)
    cors_origins: str = "http://localhost:5173,http://localhost:3000"
    
    # Entorno de ejecución
    environment: str = "development"
    
    # Configuración para que lea el archivo .env
    model_config = SettingsConfigDict(
        env_file=".env",           # Nombre del archivo
        env_file_encoding="utf-8", # Codificación
        case_sensitive=False,      # No distingue mayúsculas/minúsculas
    )
    
    def get_cors_origins(self) -> list[str]:
        """
        Convierte la cadena de orígenes CORS en una lista.
        
        Ejemplo:
        "http://localhost:5173,http://localhost:3000"
        -> ["http://localhost:5173", "http://localhost:3000"]
        """
        return [origin.strip() for origin in self.cors_origins.split(",")]


# Instancia única de configuración (Singleton)
# Esta instancia se importa en otros archivos cuando necesitan acceder a la config
settings = Settings()