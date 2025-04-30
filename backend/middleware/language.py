from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
from ..services.translation import translation_service

class LanguageMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Obtener el idioma del header Accept-Language
        accept_language = request.headers.get("Accept-Language", "en")
        
        # Parsear el header Accept-Language
        # Ejemplo: "es-ES,es;q=0.9,en;q=0.8" -> ["es-ES", "es", "en"]
        languages = []
        for lang in accept_language.split(","):
            lang = lang.split(";")[0].strip()
            if "-" in lang:
                languages.append(lang.split("-")[0])
            languages.append(lang)
        
        # Obtener el primer idioma soportado
        language = "en"  # Idioma por defecto
        for lang in languages:
            if lang in translation_service.translations:
                language = lang
                break
        
        # Si el usuario está autenticado, usar su preferencia de idioma
        if hasattr(request.state, "user"):
            language = request.state.user.language or language
        
        # Almacenar el idioma en el estado de la solicitud
        request.state.language = language
        
        response = await call_next(request)
        return response 