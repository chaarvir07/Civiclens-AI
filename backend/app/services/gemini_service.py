import json
import base64
import asyncio
import logging
from typing import Optional

import google.generativeai as genai
from fastapi import HTTPException

from app.config import get_settings
from app.schemas.analysis import AIAnalysisResponse, IssueCategoryEnum, UrgencyEnum

logger = logging.getLogger(__name__)

SYSTEM_INSTRUCTION = """You are a civic issue analysis assistant for Bengaluru, India.
Your task is to analyze images of civic infrastructure problems and generate formal complaint text.

RULES:
1. Only describe what is visibly present in the image. Do not invent details.
2. Do not claim to know the exact location unless the user provides it.
3. Do not claim any government verification or official assessment.
4. If the image is unclear, blurry, or does not show a civic issue, say so in the limitations field.
5. Never fabricate measurements, severity statistics, or government response expectations.
6. The urgency_estimate must only be one of: "low", "moderate", "high", or "unclear".
7. Always include a limitations field noting what you could not determine.
8. For Kannada output (language: "kn"), generate complaint_subject and complaint_body in Kannada script.
   All other fields remain in English.
9. Respond ONLY with valid JSON. No markdown code blocks, no extra text, no explanation."""

PROMPT_TEMPLATE = """Analyze this civic infrastructure image for a complaint report.

User-provided context:
- Description: {description}
- Category hint: {category}
- Locality: {locality}, Bengaluru, Karnataka, India
- Preferred language for complaint: {language}

Return a JSON object with EXACTLY these fields (no extra fields):
{{
  "detected_category": "<one of: potholes, garbage_and_waste, damaged_streetlights, drainage_problems, water_leakage, other>",
  "issue_title": "<string, max 100 chars>",
  "visual_observations": ["<string>", "<string>"],
  "suggested_description": "<1-2 sentence string>",
  "urgency_estimate": "<one of: low, moderate, high, unclear>",
  "limitations": "<string describing what could not be determined>",
  "complaint_subject": "<formal subject line string>",
  "complaint_body": "<formal complaint letter body, 150-300 words>",
  "language": "{language}"
}}

The complaint_body must follow this structure:
- Salutation (To, The [Authority], Bengaluru)
- Subject line reference
- Description of the issue with observable facts
- Location (use the provided locality)
- Request for prompt action
- Closing (Yours faithfully, [Your Name], [Date])

For language "kn": write complaint_subject and complaint_body entirely in Kannada script."""


def _build_prompt(description: str, category: str, locality: str, language: str) -> str:
    return PROMPT_TEMPLATE.format(
        description=description or "Not provided",
        category=category or "Not specified",
        locality=locality or "Not specified",
        language=language,
    )


def _parse_and_validate(raw_text: str, language: str) -> AIAnalysisResponse:
    """Parse Gemini's text response into a validated AIAnalysisResponse."""
    # Strip markdown code fences if Gemini added them
    text = raw_text.strip()
    if text.startswith("```"):
        lines = text.split("\n")
        text = "\n".join(lines[1:-1] if lines[-1].strip() == "```" else lines[1:])

    try:
        data = json.loads(text)
    except json.JSONDecodeError as e:
        logger.error("Gemini returned non-JSON: %s", raw_text[:500])
        raise ValueError(f"Could not parse AI response as JSON: {e}")

    # Coerce category to valid enum value
    cat = data.get("detected_category", "other")
    if cat not in [e.value for e in IssueCategoryEnum]:
        data["detected_category"] = "other"

    # Coerce urgency
    urg = data.get("urgency_estimate", "unclear")
    if urg not in [e.value for e in UrgencyEnum]:
        data["urgency_estimate"] = "unclear"

    # Ensure visual_observations is a list
    if not isinstance(data.get("visual_observations"), list):
        data["visual_observations"] = [str(data.get("visual_observations", "No observations available"))]

    data["language"] = language

    return AIAnalysisResponse(**data)


async def analyze_image(
    image_bytes: bytes,
    mime_type: str,
    description: Optional[str] = None,
    category: Optional[str] = None,
    locality: Optional[str] = None,
    language: str = "en",
) -> AIAnalysisResponse:
    settings = get_settings()

    if not settings.gemini_api_key:
        raise HTTPException(status_code=503, detail="AI service is not configured.")

    genai.configure(api_key=settings.gemini_api_key)
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        system_instruction=SYSTEM_INSTRUCTION,
    )

    image_part = {
        "mime_type": mime_type,
        "data": base64.b64encode(image_bytes).decode("utf-8"),
    }
    prompt = _build_prompt(description, category, locality, language)

    def _call_gemini():
        """Synchronous Gemini call — run in a thread to avoid blocking the event loop."""
        response = model.generate_content(
            [image_part, prompt],
            generation_config=genai.GenerationConfig(
                temperature=0.2,
                max_output_tokens=1500,
            ),
        )
        return response.text

    # Try once, retry once on failure
    for attempt in range(2):
        try:
            raw_text = await asyncio.to_thread(_call_gemini)
            return _parse_and_validate(raw_text, language)
        except (ValueError, Exception) as e:
            logger.warning("Gemini attempt %d failed: %s", attempt + 1, str(e))
            if attempt == 1:
                raise HTTPException(
                    status_code=503,
                    detail="AI service temporarily unavailable. Please try again in a few minutes.",
                )
            await asyncio.sleep(2)
