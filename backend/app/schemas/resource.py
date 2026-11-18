from pydantic import BaseModel
from typing import Optional, List
from datetime import date


class ReportingResourceResponse(BaseModel):
    id: str
    issue_category: str
    agency_name: str
    official_url: Optional[str] = None
    reporting_instructions: Optional[str] = None
    source_url: Optional[str] = None
    verified_at: Optional[str] = None


class ReportingResourceList(BaseModel):
    resources: List[ReportingResourceResponse]
