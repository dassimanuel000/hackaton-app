
from pydantic import BaseModel
from typing import Optional, List

class User(BaseModel):
    id: Optional[int] = None
    name: str
    email: str
    iat: Optional[str] = None
    exp: Optional[str] = None
    role: Optional[str] = None
    token: Optional[str] = None
    
    
# Models
class SimpleInfo(BaseModel):
    user_name: str
    token: Optional[str] = None
    
class Token(BaseModel):
    email: Optional[str] = None