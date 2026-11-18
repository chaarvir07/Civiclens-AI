from pydantic import BaseModel, Field
from typing import List, Literal
from enum import Enum


class IssueCategoryEnum(str, Enum):
    potholes = "potholes"
    garbage_and_waste = "garbage_and_waste"
    damaged_streetlights = "damaged_streetlights"
    drainage_problems = "drainage_problems"
    water_leakage = "water_leakage"
    other = "other"


class UrgencyEnum(str, Enum):
    low = "low"
    moderate = "moderate"
    high = "high"
    unclear = "unclear"


class AIAnalysisResponse(BaseModel):
    detected_category: IssueCategoryEnum
    issue_title: str = Field(max_length=120)
    visual_observations: List[str] = Field(min_length=1, max_length=5)
    suggested_description: str
    urgency_estimate: UrgencyEnum
    limitations: str
    complaint_subject: str
    complaint_body: str
    language: Literal["en", "kn"] = "en"
