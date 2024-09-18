from typing import Tuple, Union, Optional

from bson import ObjectId
from pydantic import BaseModel, field_validator

from schemas.default import MongoObject


class NoteWithoutMetaSchema(BaseModel):
    title: str
    description: str
    content: str
    color: str
    coordinates: Tuple[float, float]


class PartialNoteWithoutMetaSchema(NoteWithoutMetaSchema):
    title: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    color: Optional[str] = None
    coordinates: Optional[Tuple[float, float]] = None

    def model_dump(self, *args, **kwargs):
        return super().model_dump(*args, exclude_unset=True, **kwargs)


class NoteAuthorIdSchema(BaseModel):
    author_id: str

    @field_validator("author_id", mode="before")
    @classmethod
    def author_id_typecast(cls, value: Union[str, ObjectId, bytes]):
        if type(value) not in [str, ObjectId, bytes]:
            raise ValueError("Author_id has wrong type.")
        return ObjectId(value).__str__()


class NoteWithoutIdSchema(NoteWithoutMetaSchema, NoteAuthorIdSchema):
    pass


class NoteSchema(NoteWithoutMetaSchema, NoteAuthorIdSchema, MongoObject):
    pass
