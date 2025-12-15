# SkillSwap - Frontend-Backend Integration Contract

## Current Mock Data Implementation
Located in `/app/frontend/src/mock.js`:
- mockUsers: User profiles with skills and ratings
- mockSkills: Available skills list
- mockMessages: Chat messages between users
- mockConversations: Active conversations
- mockCurrentUser: Logged-in user data
- mockTestimonials: User testimonials
- mockStats: Platform statistics

## API Endpoints to Implement

### Authentication
- **POST /api/auth/register**
  - Request: `{ name, email, password }`
  - Response: `{ token, user }`
  
- **POST /api/auth/login**
  - Request: `{ email, password }`
  - Response: `{ token, user }`
  
- **GET /api/auth/me** (Protected)
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ user }`

### Users & Profiles
- **GET /api/users** (Protected)
  - Query: `?search=<query>&skill=<skill>`
  - Response: `{ users: [] }`
  
- **GET /api/users/:id** (Protected)
  - Response: `{ user }`
  
- **PUT /api/users/profile** (Protected)
  - Request: `{ name, bio, location, skillsToTeach, skillsToLearn }`
  - Response: `{ user }`

### AI Features
- **POST /api/ai/match-recommendations** (Protected)
  - Request: `{ userId }`
  - Response: `{ recommendations: [] }`
  
- **POST /api/ai/enhance-profile** (Protected)
  - Request: `{ bio, skillsToTeach, skillsToLearn }`
  - Response: `{ enhancedBio, suggestedSkills }`
  
- **POST /api/ai/chat-assistant** (Protected)
  - Request: `{ message }`
  - Response: `{ response }`

### Messages & Chat (WebSocket + REST)
- **GET /api/messages/conversations** (Protected)
  - Response: `{ conversations: [] }`
  
- **GET /api/messages/:conversationId** (Protected)
  - Response: `{ messages: [] }`
  
- **POST /api/messages/send** (Protected)
  - Request: `{ receiverId, message }`
  - Response: `{ message }`
  
- **WebSocket /ws/chat** (Protected)
  - Real-time message delivery
  - Events: `message_received`, `user_typing`, `user_online`

### Contact
- **POST /api/contact**
  - Request: `{ name, email, message }`
  - Response: `{ success: true }`

## Database Models

### User
```python
{
  _id: ObjectId,
  name: str,
  email: str (unique),
  password: str (hashed),
  avatar: str (optional),
  bio: str,
  location: str,
  skillsToTeach: [str],
  skillsToLearn: [str],
  rating: float (default: 0),
  completedExchanges: int (default: 0),
  createdAt: datetime,
  updatedAt: datetime
}
```

### Message
```python
{
  _id: ObjectId,
  conversationId: str,
  senderId: ObjectId,
  receiverId: ObjectId,
  message: str,
  read: bool (default: False),
  createdAt: datetime
}
```

### Conversation
```python
{
  _id: ObjectId,
  participants: [ObjectId, ObjectId],
  lastMessage: str,
  lastMessageTime: datetime,
  createdAt: datetime
}
```

### Contact
```python
{
  _id: ObjectId,
  name: str,
  email: str,
  message: str,
  createdAt: datetime
}
```

## Frontend Integration Changes

### 1. Auth Context (`/app/frontend/src/context/AuthContext.js`)
Replace mock login/register with API calls:
- Use axios to call `/api/auth/login` and `/api/auth/register`
- Store JWT token in localStorage
- Add token to axios headers for authenticated requests

### 2. Dashboard (`/app/frontend/src/pages/Dashboard.jsx`)
- Replace mockUsers with API call to `/api/users`
- Implement search with query parameters
- Call `/api/ai/match-recommendations` for AI recommendations

### 3. Profile (`/app/frontend/src/pages/Profile.jsx`)
- Call `/api/users/profile` (PUT) to update profile
- Call `/api/ai/enhance-profile` for AI enhancement

### 4. Messages (`/app/frontend/src/pages/Messages.jsx`)
- Replace mockConversations with `/api/messages/conversations`
- Replace mockMessages with `/api/messages/:conversationId`
- Implement WebSocket connection for real-time chat
- Call `/api/ai/chat-assistant` for AI assistant

### 5. Contact (`/app/frontend/src/pages/Contact.jsx`)
- Call `/api/contact` on form submission

## WebSocket Implementation
- Backend: Use `python-socketio` with FastAPI
- Frontend: Use `socket.io-client` library
- Handle connection, disconnection, and reconnection
- Emit and listen for message events

## AI Integration with Emergent LLM Key
- Use Emergent integrations for OpenAI/Claude/Gemini
- Implement skill matching algorithm
- Generate profile enhancements
- Power AI chat assistant

## Security
- JWT authentication for all protected routes
- Password hashing with bcrypt/passlib
- Input validation and sanitization
- CORS configuration

## Next Steps
1. Install backend dependencies (python-socketio, passlib[bcrypt], python-jose, emergentintegrations)
2. Create database models
3. Implement authentication endpoints
4. Implement CRUD endpoints for users
5. Integrate AI features with Emergent LLM key
6. Implement WebSocket for real-time chat
7. Update frontend to use actual APIs
8. Test all features
