from typing import List

from bson import ObjectId
from fastapi import Depends
from motor.motor_asyncio import AsyncIOMotorCollection

from dependencies import get_mongo_base
from schemas.default import ObjectIdSupported
from schemas.note import NoteWithoutIdSchema, NoteSchema, PartialNoteWithoutMetaSchema


class NoteRepository:
    def __init__(self, mongobase=Depends(get_mongo_base)):
        self.coll: AsyncIOMotorCollection = mongobase.note

    async def create_note(self, note: NoteWithoutIdSchema) -> NoteSchema:
        result = await self.coll.insert_one(note.model_dump())
        return NoteSchema(**note.model_dump(), _id=result.inserted_id)

    async def get_notes_by_author_id(self, author_id: str) -> List[NoteSchema]:
        result = await self.coll.find({"author_id": author_id}).to_list(None)
        return result

    async def get_note_by_id(self, id_: ObjectIdSupported) -> NoteSchema | None:
        result = await self.coll.find_one({"_id": ObjectId(id_)})
        if not result:
            return None
        return NoteSchema(**result)

    async def update_note(self, id_: ObjectIdSupported, note: PartialNoteWithoutMetaSchema) -> bool:
        result = await self.coll.update_one({"_id": ObjectId(id_)}, {"$set": note.model_dump()})
        return result.modified_count == 1

    async def delete_note(self, id_: ObjectIdSupported) -> bool:
        result = await self.coll.delete_one({"_id": ObjectId(id_)})
        return result.deleted_count == 1
