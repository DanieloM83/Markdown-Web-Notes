from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    MONGO_USER: str
    MONGO_PASS: str
    MONGO_HOST: str
    MONGO_BASE: str

    REDIS_USER: str
    REDIS_PASS: str
    REDIS_HOST: str
    REDIS_PORT: str

    FRONTEND_URL: str

    SESSION_COOKIE_NAME: str
    SESSION_COOKIE_EXPR: int
    COOKIE_PARAMS: dict = {"secure": True, "samesite": "None", "httponly": True}

    @property
    def mongo_dsn(self) -> str:
        return f"mongodb+srv://{self.MONGO_USER}:{self.MONGO_PASS}@{self.MONGO_HOST}"

    @property
    def redis_dsn(self) -> str:
        return f"redis://{self.REDIS_USER}:{self.REDIS_PASS}@{self.REDIS_HOST}:{self.REDIS_PORT}"

    model_config = SettingsConfigDict(env_file='.env')


settings = Settings()
