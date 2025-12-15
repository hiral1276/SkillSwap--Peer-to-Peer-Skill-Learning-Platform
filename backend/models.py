from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    password: str
    avatar: Optional[str] = None
    bio: Optional[str] = ""
    location: Optional[str] = ""
    skillsToTeach: List[str] = []
    skillsToLearn: List[str] = []
    rating: float = 0.0
    completedExchanges: int = 0
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    skillsToTeach: Optional[List[str]] = None
    skillsToLearn: Optional[List[str]] = None
    avatar: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    avatar: Optional[str]
    bio: str
    location: str
    skillsToTeach: List[str]
    skillsToLearn: List[str]
    rating: float
    completedExchanges: int

class Message(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    conversationId: str
    senderId: str
    receiverId: str
    message: str
    read: bool = False
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class MessageCreate(BaseModel):
    receiverId: str
    message: str

class Conversation(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    participants: List[str]
    lastMessage: str = ""
    lastMessageTime: datetime = Field(default_factory=datetime.utcnow)
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class Contact(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str

class AIMatchRequest(BaseModel):
    userId: str

class AIEnhanceRequest(BaseModel):
    bio: str
    skillsToTeach: List[str]
    skillsToLearn: List[str]

class AIChatRequest(BaseModel):
    message: str
