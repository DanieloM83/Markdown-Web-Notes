from pydantic import BaseModel
from schemas.default import MongoObject


# TODO: username validator
class UsernameSchema(BaseModel):
    username: str


# TODO: password validator
class PasswordSchema(BaseModel):
    password: str


# TODO: password hash validator
class HashedPasswordSchema(BaseModel):
    password: str


class UserCredentialsSchema(UsernameSchema, PasswordSchema):
    pass


class UserWithoutIDSchema(UsernameSchema, HashedPasswordSchema):
    pass


class UserSchema(UserWithoutIDSchema, MongoObject):
    pass
