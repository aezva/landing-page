from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.settings import Settings

settings = Settings()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Importar routers
from ai.assistant import router as assistant_router

# Incluir routers
app.include_router(assistant_router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    return {"message": "Hello from NNIA backend!"} 