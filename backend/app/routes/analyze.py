import io
import logging
from typing import Optional

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from app.schemas.analysis import AIAnalysisResponse
from app.services import gemini_service

logger = logging.getLogger(__name__)

router = APIRouter()

ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


@router.post("/analyze", response_model=AIAnalysisResponse)
async def analyze_image(
    image: UploadFile = File(..., description="Civic issue image (JPEG, PNG, WEBP, max 10MB)"),
    description: Optional[str] = Form(None, max_length=500),
    category: Optional[str] = Form(None),
    locality: Optional[str] = Form(None, max_length=100),
    language: Optional[str] = Form("en"),
):
    # Validate MIME type
    if image.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"File type '{image.content_type}' is not allowed. Upload JPEG, PNG, or WEBP.",
        )

    # Validate language
    if language not in ("en", "kn"):
        language = "en"

    # Read and validate size
    image_bytes = await image.read()
    if len(image_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File size exceeds the 10 MB limit. Please compress the image and try again.",
        )

    if len(image_bytes) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    logger.info(
        "Analyzing image: type=%s size=%d lang=%s",
        image.content_type,
        len(image_bytes),
        language,
    )

    result = await gemini_service.analyze_image(
        image_bytes=image_bytes,
        mime_type=image.content_type,
        description=description,
        category=category,
        locality=locality,
        language=language,
    )

    return result
