import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.dependencies import get_current_user
from app.schemas.report import (
    PaginatedReports,
    ReportCreate,
    ReportResponse,
    ReportUpdate,
)
from app.services.supabase_service import get_supabase_client

logger = logging.getLogger(__name__)

router = APIRouter()


def _fmt(report: dict) -> dict:
    """Normalize Supabase row dates to ISO strings."""
    for field in ("created_at", "updated_at"):
        if report.get(field) and not isinstance(report[field], str):
            report[field] = str(report[field])
    return report


@router.get("", response_model=PaginatedReports)
async def list_reports(
    status_filter: Optional[str] = Query(None, alias="status"),
    category: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=50),
    sort: str = Query("created_at:desc"),
    user_id: str = Depends(get_current_user),
):
    db = get_supabase_client()

    query = db.table("reports").select("*", count="exact").eq("user_id", user_id)

    if status_filter:
        query = query.eq("status", status_filter)
    if category:
        query = query.eq("category", category)

    # Sorting
    sort_parts = sort.split(":")
    sort_col = sort_parts[0] if sort_parts[0] in ("created_at", "updated_at", "title") else "created_at"
    sort_desc = len(sort_parts) < 2 or sort_parts[1] == "desc"
    query = query.order(sort_col, desc=sort_desc)

    # Pagination
    offset = (page - 1) * limit
    query = query.range(offset, offset + limit - 1)

    response = query.execute()

    total = response.count or 0
    reports = [ReportResponse(**_fmt(r)) for r in (response.data or [])]

    return PaginatedReports(reports=reports, total=total, page=page, limit=limit)


@router.post("", response_model=ReportResponse, status_code=status.HTTP_201_CREATED)
async def create_report(
    payload: ReportCreate,
    user_id: str = Depends(get_current_user),
):
    db = get_supabase_client()

    data = payload.model_dump()
    data["user_id"] = user_id
    data["city"] = "Bengaluru"
    # Convert enum values to strings
    data["category"] = data["category"].value if hasattr(data["category"], "value") else data["category"]
    data["status"] = data["status"].value if hasattr(data["status"], "value") else data["status"]

    response = db.table("reports").insert(data).execute()

    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to create report.")

    return ReportResponse(**_fmt(response.data[0]))


@router.get("/{report_id}", response_model=ReportResponse)
async def get_report(
    report_id: str,
    user_id: str = Depends(get_current_user),
):
    db = get_supabase_client()

    response = db.table("reports").select("*").eq("id", report_id).execute()

    if not response.data:
        raise HTTPException(status_code=404, detail="Report not found.")

    report = response.data[0]

    if report["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="You do not have access to this report.")

    return ReportResponse(**_fmt(report))


@router.patch("/{report_id}", response_model=ReportResponse)
async def update_report(
    report_id: str,
    payload: ReportUpdate,
    user_id: str = Depends(get_current_user),
):
    db = get_supabase_client()

    # Verify ownership
    existing = db.table("reports").select("user_id").eq("id", report_id).execute()
    if not existing.data:
        raise HTTPException(status_code=404, detail="Report not found.")
    if existing.data[0]["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="You do not have access to this report.")

    # Build update dict, skip None values
    updates = {}
    for field, value in payload.model_dump(exclude_none=True).items():
        updates[field] = value.value if hasattr(value, "value") else value

    if not updates:
        raise HTTPException(status_code=422, detail="No fields to update.")

    response = db.table("reports").update(updates).eq("id", report_id).execute()

    if not response.data:
        raise HTTPException(status_code=500, detail="Failed to update report.")

    return ReportResponse(**_fmt(response.data[0]))


@router.delete("/{report_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_report(
    report_id: str,
    user_id: str = Depends(get_current_user),
):
    db = get_supabase_client()

    existing = db.table("reports").select("user_id").eq("id", report_id).execute()
    if not existing.data:
        raise HTTPException(status_code=404, detail="Report not found.")
    if existing.data[0]["user_id"] != user_id:
        raise HTTPException(status_code=403, detail="You do not have access to this report.")

    db.table("reports").delete().eq("id", report_id).execute()
