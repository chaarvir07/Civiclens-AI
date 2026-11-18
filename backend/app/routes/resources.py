from typing import Optional

from fastapi import APIRouter, Query

from app.schemas.resource import ReportingResourceList, ReportingResourceResponse
from app.services.supabase_service import get_supabase_client

router = APIRouter()


@router.get("", response_model=ReportingResourceList)
async def list_reporting_resources(
    category: Optional[str] = Query(None),
):
    db = get_supabase_client()

    query = db.table("reporting_resources").select("*").not_.is_("verified_at", "null")

    if category:
        query = query.eq("issue_category", category)

    response = query.order("issue_category").execute()

    resources = [ReportingResourceResponse(**r) for r in (response.data or [])]
    return ReportingResourceList(resources=resources)
