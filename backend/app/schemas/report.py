from pydantic import BaseModel, Field
from typing import Optional, Any, Dict, List
from datetime import datetime
from enum import Enum


class ReportStatus(str, Enum):
    draft = "draft"
    ready_to_submit = "ready_to_submit"
    marked_submitted = "marked_submitted"
    archived = "archived"


class ReportCategory(str, Enum):
    potholes = "potholes"
    garbage_and_waste = "garbage_and_waste"
    damaged_streetlights = "damaged_streetlights"
    drainage_problems = "drainage_problems"
    water_leakage = "water_leakage"
    other = "other"


class ReportCreate(BaseModel):
    title: str = Field(min_length=3, max_length=200)
    category: ReportCategory
    description: Optional[str] = Field(None, max_length=1000)
    locality: Optional[str] = Field(None, max_length=200)
    preferred_language: str = Field(default="en", pattern="^(en|kn)$")
    ai_analysis: Optional[Dict[str, Any]] = None
    complaint_subject: Optional[str] = None
    complaint_body: Optional[str] = None
    status: ReportStatus = ReportStatus.draft
    image_url: Optional[str] = None


class ReportUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=200)
    category: Optional[ReportCategory] = None
    description: Optional[str] = Field(None, max_length=1000)
    locality: Optional[str] = Field(None, max_length=200)
    preferred_language: Optional[str] = Field(None, pattern="^(en|kn)$")
    complaint_subject: Optional[str] = None
    complaint_body: Optional[str] = None
    status: Optional[ReportStatus] = None


class ReportResponse(BaseModel):
    id: str
    user_id: str
    title: str
    category: str
    description: Optional[str] = None
    locality: Optional[str] = None
    city: str
    status: str
    preferred_language: str
    ai_analysis: Optional[Dict[str, Any]] = None
    complaint_subject: Optional[str] = None
    complaint_body: Optional[str] = None
    image_url: Optional[str] = None
    created_at: str
    updated_at: str


class PaginatedReports(BaseModel):
    reports: List[ReportResponse]
    total: int
    page: int
    limit: int
