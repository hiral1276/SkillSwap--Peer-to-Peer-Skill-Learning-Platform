from fastapi import FastAPI, APIRouter, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import socketio
import os
import logging
from pathlib import Path
from datetime import datetime
from typing import List, Optional

# Import models and services
from models import (
    User, UserCreate, UserLogin, UserUpdate, UserResponse,
    Message, MessageCreate, Conversation,
    Contact, ContactCreate,
    AIMatchRequest, AIEnhanceRequest, AIChatRequest
)
from auth import (
    get_password_hash, verify_password, create_access_token, get_current_user
)
from ai_service import ai_service

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI()

# Create Socket.IO server
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*',
    logger=True,
    engineio_logger=True
)

# Wrap with ASGI app
socket_app = socketio.ASGIApp(sio, app)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============= Helper Functions =============

def user_to_response(user: dict) -> dict:
    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "avatar": user.get("avatar"),
        "bio": user.get("bio", ""),
        "location": user.get("location", ""),
        "skillsToTeach": user.get("skillsToTeach", []),
        "skillsToLearn": user.get("skillsToLearn", []),
        "rating": user.get("rating", 0.0),
        "completedExchanges": user.get("completedExchanges", 0)
    }

async def get_or_create_conversation(user1_id: str, user2_id: str) -> str:
    # Check if conversation exists
    conversation = await db.conversations.find_one({
        "participants": {"$all": [user1_id, user2_id]}
    })
    
    if conversation:
        return conversation["id"]
    
    # Create new conversation
    new_conversation = Conversation(
        participants=[user1_id, user2_id]
    )
    await db.conversations.insert_one(new_conversation.dict())
    return new_conversation.id

# ============= Authentication Endpoints =============

@api_router.post("/auth/register")
async def register(user_data: UserCreate):
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    user = User(
        name=user_data.name,
        email=user_data.email,
        password=get_password_hash(user_data.password),
        avatar=f"https://api.dicebear.com/7.x/avataaars/svg?seed={user_data.email}"
    )
    
    await db.users.insert_one(user.dict())
    
    # Create access token
    access_token = create_access_token(data={"sub": user.id})
    
    return {
        "token": access_token,
        "user": user_to_response(user.dict())
    }

@api_router.post("/auth/login")
async def login(credentials: UserLogin):
    # Find user
    user = await db.users.find_one({"email": credentials.email})
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Create access token
    access_token = create_access_token(data={"sub": user["id"]})
    
    return {
        "token": access_token,
        "user": user_to_response(user)
    }

@api_router.get("/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    user = await db.users.find_one({"id": current_user["id"]})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"user": user_to_response(user)}

# ============= User Endpoints =============

@api_router.get("/users")
async def get_users(
    search: Optional[str] = None,
    skill: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    query = {"id": {"$ne": current_user["id"]}}  # Exclude current user
    
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"skillsToTeach": {"$regex": search, "$options": "i"}}
        ]
    
    if skill:
        query["skillsToTeach"] = skill
    
    users = await db.users.find(query).to_list(100)
    return {"users": [user_to_response(user) for user in users]}

@api_router.get("/users/{user_id}")
async def get_user(user_id: str, current_user: dict = Depends(get_current_user)):
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"user": user_to_response(user)}

@api_router.put("/users/profile")
async def update_profile(
    updates: UserUpdate,
    current_user: dict = Depends(get_current_user)
):
    update_data = {k: v for k, v in updates.dict().items() if v is not None}
    update_data["updatedAt"] = datetime.utcnow()
    
    await db.users.update_one(
        {"id": current_user["id"]},
        {"$set": update_data}
    )
    
    user = await db.users.find_one({"id": current_user["id"]})
    return {"user": user_to_response(user)}

# ============= AI Endpoints =============

@api_router.post("/ai/match-recommendations")
async def get_ai_recommendations(current_user: dict = Depends(get_current_user)):
    # Get current user data
    user = await db.users.find_one({"id": current_user["id"]})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Get all other users
    all_users = await db.users.find({"id": {"$ne": current_user["id"]}}).to_list(100)
    
    # Get AI recommendations
    recommendations = await ai_service.get_skill_matches(
        user.get("skillsToTeach", []),
        user.get("skillsToLearn", []),
        all_users
    )
    
    return {"recommendations": [user_to_response(rec) for rec in recommendations]}

@api_router.post("/ai/enhance-profile")
async def enhance_profile(
    request: AIEnhanceRequest,
    current_user: dict = Depends(get_current_user)
):
    result = await ai_service.enhance_profile(
        request.bio,
        request.skillsToTeach,
        request.skillsToLearn
    )
    return result

@api_router.post("/ai/chat-assistant")
async def chat_with_assistant(
    request: AIChatRequest,
    current_user: dict = Depends(get_current_user)
):
    response = await ai_service.chat_assistant(request.message)
    return {"response": response}

# ============= Message Endpoints =============

@api_router.get("/messages/conversations")
async def get_conversations(current_user: dict = Depends(get_current_user)):
    conversations = await db.conversations.find({
        "participants": current_user["id"]
    }).to_list(100)
    
    result = []
    for conv in conversations:
        other_user_id = [p for p in conv["participants"] if p != current_user["id"]][0]
        other_user = await db.users.find_one({"id": other_user_id})
        
        if other_user:
            # Get unread count
            unread_count = await db.messages.count_documents({
                "conversationId": conv["id"],
                "receiverId": current_user["id"],
                "read": False
            })
            
            result.append({
                "id": conv["id"],
                "participantId": other_user["id"],
                "participantName": other_user["name"],
                "participantAvatar": other_user.get("avatar"),
                "lastMessage": conv.get("lastMessage", ""),
                "lastMessageTime": conv.get("lastMessageTime", conv["createdAt"]),
                "unreadCount": unread_count
            })
    
    return {"conversations": result}

@api_router.get("/messages/{conversation_id}")
async def get_messages(
    conversation_id: str,
    current_user: dict = Depends(get_current_user)
):
    # Verify user is part of conversation
    conversation = await db.conversations.find_one({"id": conversation_id})
    if not conversation or current_user["id"] not in conversation["participants"]:
        raise HTTPException(status_code=403, detail="Access denied")
    
    messages = await db.messages.find({"conversationId": conversation_id}).sort("createdAt", 1).to_list(1000)
    
    # Mark messages as read
    await db.messages.update_many(
        {
            "conversationId": conversation_id,
            "receiverId": current_user["id"],
            "read": False
        },
        {"$set": {"read": True}}
    )
    
    return {"messages": messages}

@api_router.post("/messages/send")
async def send_message(
    message_data: MessageCreate,
    current_user: dict = Depends(get_current_user)
):
    # Get or create conversation
    conversation_id = await get_or_create_conversation(
        current_user["id"],
        message_data.receiverId
    )
    
    # Create message
    message = Message(
        conversationId=conversation_id,
        senderId=current_user["id"],
        receiverId=message_data.receiverId,
        message=message_data.message
    )
    
    await db.messages.insert_one(message.dict())
    
    # Update conversation
    await db.conversations.update_one(
        {"id": conversation_id},
        {
            "$set": {
                "lastMessage": message_data.message,
                "lastMessageTime": datetime.utcnow()
            }
        }
    )
    
    # Emit to WebSocket
    await sio.emit('new_message', message.dict(), room=message_data.receiverId)
    
    return {"message": message.dict()}

# ============= Contact Endpoint =============

@api_router.post("/contact")
async def submit_contact(contact_data: ContactCreate):
    contact = Contact(**contact_data.dict())
    await db.contacts.insert_one(contact.dict())
    return {"success": True, "message": "Message sent successfully"}

# ============= Root Endpoint =============

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

# Include the router in the main app
app.include_router(api_router)

# ============= WebSocket Events =============

@sio.event
async def connect(sid, environ):
    logger.info(f"Client connected: {sid}")

@sio.event
async def disconnect(sid):
    logger.info(f"Client disconnected: {sid}")

@sio.event
async def join(sid, data):
    user_id = data.get('userId')
    if user_id:
        await sio.enter_room(sid, user_id)
        logger.info(f"User {user_id} joined room")

@sio.event
async def leave(sid, data):
    user_id = data.get('userId')
    if user_id:
        await sio.leave_room(sid, user_id)
        logger.info(f"User {user_id} left room")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
