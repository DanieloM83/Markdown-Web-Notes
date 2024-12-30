import re
from typing import Tuple, Optional, Any

from bson import ObjectId
from pydantic import BaseModel, field_validator

from schemas.default import MongoObject, ObjectIdSupported


class NoteWithoutMetaSchema(BaseModel):
    title: str
    description: str
    content: str
    color: str
    coordinates: Tuple[float, float]

    @field_validator("title")
    @classmethod
    def title_validator(cls, value: str) -> str:
        if len(value) > 25:
            raise ValueError("Wrong title format: Title must be shorter than or equal to 25 characters!")

        return value

    @field_validator("description")
    @classmethod
    def description_validator(cls, value: str) -> str:
        if len(value) > 75:
            raise ValueError("Wrong description format: Description must be shorter than or equal to 75 characters!")

        return value

    @field_validator("content")
    @classmethod
    def content_validator(cls, value: str) -> str:
        if len(value) > 10000:
            raise ValueError("Wrong content format: Content must be shorter than or equal to 10.000 characters!")

        return value

    @field_validator("color")
    @classmethod
    def color_validator(cls, value: str) -> str:
        if not re.fullmatch("#(?:[0-9a-fA-F]{3,4}){1,2}", value):
            raise ValueError("Wrong color format: Color must be a hex!")

        return value


class PartialNoteWithoutMetaSchema(NoteWithoutMetaSchema):
    title: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    color: Optional[str] = None
    coordinates: Optional[Tuple[float, float]] = None

    def model_dump(self, *args, **kwargs) -> dict[str, Any]:
        return super().model_dump(*args, exclude_unset=True, **kwargs)


class PartialNoteWithIdSchema(PartialNoteWithoutMetaSchema, MongoObject):
    pass


class NoteAuthorIdSchema(BaseModel):
    author_id: str

    @field_validator("author_id", mode="before")
    @classmethod
    def author_id_typecast(cls, value: ObjectIdSupported) -> str:
        if type(value) not in [str, ObjectId, bytes]:
            raise ValueError("Wrong author_id data type!")

        return str(ObjectId(value))


class NoteWithoutIdSchema(NoteWithoutMetaSchema, NoteAuthorIdSchema):
    pass


class NoteSchema(NoteWithoutMetaSchema, NoteAuthorIdSchema, MongoObject):
    pass
