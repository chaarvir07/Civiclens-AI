import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.routes import health, analyze, reports, resources

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

settings = get_settings()

app = FastAPI(
    title="CivicLens AI API",
    description="Backend API for CivicLens AI — civic complaint generation for Bengaluru",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(health.router, tags=["health"])
app.include_router(analyze.router, prefix="/api", tags=["AI Analysis"])
app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])
app.include_router(resources.router, prefix="/api/reporting-resources", tags=["Resources"])


@app.on_event("startup")
async def startup_event():
    logger.info("CivicLens AI backend starting up — environment: %s", settings.environment)
