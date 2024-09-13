from typing import Union

from bson import ObjectId
from fastapi import Depends
from motor.motor_asyncio import AsyncIOMotorCollection

from schemas.user import UserSchema, UserWithoutIDSchema
from dependencies import get_mongo_base


class UserRepository:
    def __init__(self, mongobase=Depends(get_mongo_base)):
        self.coll: AsyncIOMotorCollection = mongobase.user

    async def create_user(self, user: UserWithoutIDSchema) -> ObjectId:
        result = await self.coll.insert_one(user.model_dump())
        return result.inserted_id

    async def get_user_by_username(self, username: str) -> UserSchema | None:
        result = await self.coll.find_one({"username": username})
        if not result:
            return None
        return UserSchema(**result)

    async def get_user_by_id(self, id_: Union[str, ObjectId, bytes]) -> UserSchema | None:
        result = await self.coll.find_one({"_id": ObjectId(id_)})
        if not result:
            return None
        return UserSchema(**result)
