from pydantic import BaseModel, Field, ConfigDict
from bson import ObjectId


class MongoObject(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    id: ObjectId = Field(alias="_id")

    def model_dump(self, *args, **kwargs):
        return super().model_dump(*args, by_alias=True, **kwargs)
