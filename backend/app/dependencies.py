from fastapi import Header, HTTPException, status
from jose import jwt, JWTError
from app.config import get_settings
import logging

logger = logging.getLogger(__name__)


async def get_current_user(authorization: str = Header(None)) -> str:
    """
    Verify the Supabase JWT and return the user_id (sub claim).
    Raises HTTP 401 if the token is missing or invalid.
    """
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header is required.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer" or not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization format. Expected: Bearer <token>",
        )

    settings = get_settings()
    if not settings.supabase_jwt_secret:
        logger.error("SUPABASE_JWT_SECRET is not configured")
        raise HTTPException(status_code=503, detail="Authentication service not configured.")

    try:
        payload = jwt.decode(
            token,
            settings.supabase_jwt_secret,
            algorithms=["HS256"],
            options={"verify_aud": False},
        )
        user_id: str = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token: missing user ID.")
        return user_id
    except JWTError as e:
        logger.warning("JWT verification failed: %s", str(e))
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token.",
            headers={"WWW-Authenticate": "Bearer"},
        )
