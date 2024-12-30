from typing import Union, Tuple
from uuid import uuid4

from fastapi import Depends
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

from config import settings
from schemas.user import UserCredentialsSchema, UserWithoutIDSchema, UserSchema
from exceptions.auth import WrongUsernameOrPasswordError, RegisterNewUsernameConflictError, NotLoggedInError
from dependencies import get_redis
from database.redis import Redis
from repos.user import UserRepository


def verify_password(hash_: Union[str, bytes], password: Union[str, bytes]) -> bool:
    try:
        PasswordHasher().verify(hash_, password)
    except VerifyMismatchError:
        return False
    return True


def hash_password(password: Union[str, bytes]) -> str:
    return PasswordHasher().hash(password)


def generate_session() -> str:
    return str(uuid4())


class AuthService:
    def __init__(self, repository: UserRepository = Depends(UserRepository),
                 redis: Redis = Depends(get_redis)):
        self.repo = repository
        self.redis = redis

    async def login(self, credentials: UserCredentialsSchema) -> Tuple[str, str]:
        user = await self.repo.get_user_by_username(credentials.username)
        # Check does user exist:
        if user is None:
            raise WrongUsernameOrPasswordError()
        # Verify user's credentials:
        if not verify_password(user.password, credentials.password):
            raise WrongUsernameOrPasswordError()
        # Create new session:
        session_id = generate_session()
        await self.redis.set(session_id, str(user.id), ex=settings.SESSION_COOKIE_EXPR)
        return user.id, session_id

    async def logout(self, session_id: str) -> None:
        await self.redis.delete(session_id)

    async def register(self, credentials: UserCredentialsSchema) -> str:
        # Check does user with this username already exist:
        if (await self.repo.get_user_by_username(credentials.username)) is not None:
            raise RegisterNewUsernameConflictError()
        # Create user:
        hashed_pass = hash_password(credentials.password)
        user_id = await self.repo.create_user(
            UserWithoutIDSchema.model_construct(username=credentials.username, password=hashed_pass))
        return str(user_id)

    async def get_user(self, session_id: str) -> UserSchema | None:
        user_id = (await self.redis.get(session_id)).decode("utf-8")
        if user_id is None:
            raise NotLoggedInError
        user = await self.repo.get_user_by_id(str(user_id))
        if user is None:
            raise NotLoggedInError
        return user
