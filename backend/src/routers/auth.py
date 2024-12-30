from fastapi import APIRouter, Response, Cookie, Depends

from services.auth import AuthService
from schemas.user import UserCredentialsSchema, UserSchema
from exceptions.auth import NotLoggedInError
from config import settings

router = APIRouter(prefix="/auth", tags=["authorization"])


async def get_user(
        session_id: str | None = Cookie(default=None, alias=settings.SESSION_COOKIE_NAME),
        service: AuthService = Depends(AuthService)
) -> UserSchema | None:
    if session_id is None:
        raise NotLoggedInError()
    return await service.get_user(session_id)


@router.post("/login")
async def login(
        response: Response,
        data: UserCredentialsSchema,
        service: AuthService = Depends(AuthService)
):
    user_id, session_id = await service.login(data)
    response.set_cookie(settings.SESSION_COOKIE_NAME,
                        session_id,
                        **settings.COOKIE_PARAMS,
                        expires=settings.SESSION_COOKIE_EXPR)
    response.status_code = 200
    return {"id": str(user_id)}


@router.post("/logout")
async def logout(
        response: Response,
        session_id: str | None = Cookie(default=None, alias=settings.SESSION_COOKIE_NAME),
        service: AuthService = Depends(AuthService)
):
    if session_id is None:
        raise NotLoggedInError()
    await service.logout(session_id)
    response.delete_cookie(key=settings.SESSION_COOKIE_NAME,
                           **settings.COOKIE_PARAMS)
    response.status_code = 200
    return {"success": True}


@router.post("/register")
async def register(
        data: UserCredentialsSchema,
        service: AuthService = Depends(AuthService)
):
    user_id = await service.register(data)
    return {"id": str(user_id)}


@router.get("/current_user")
async def get_current_user(user: UserSchema = Depends(get_user)):
    return {"username": user.username, "id": str(user.id)}
