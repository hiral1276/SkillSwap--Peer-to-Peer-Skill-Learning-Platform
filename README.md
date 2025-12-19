# SkillSwap - Peer-to-Peer Skill Exchange Platform

![React](https://img.shields.io/badge/React-19.0.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38bdf8)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-latest-009688?logo=fastapi)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](LICENSE)

A modern, responsive peer-to-peer skill learning platform where users can teach skills they know and learn skills they want.

## ✨ Features

- **User Profiles**: List skills to teach/learn, bio, location, ratings, and testimonials
- **Smart Matching**: Search users by skills; AI recommendations for perfect swaps
- **AI Enhancements**: Profile bio/skill suggestions and chat assistant powered by LLM
- **Real-Time Chat**: WebSocket-based messaging with typing indicators and online status
- **Authentication**: Secure register/login with JWT
- **Responsive Design**: Optimized for mobile, tablet, and desktop with dark purple theme
- **Contact Form**: Easy feedback/submission

## 🛠️ Tech Stack

**Frontend**
- React.js (with Context for auth/state)
- Tailwind CSS (dark mode, responsive purple theme)
- Axios for API calls
- socket.io-client for real-time chat

**Backend**
- Python (FastAPI planned)
- MongoDB for users, messages, conversations
- python-socketio for WebSockets
- JWT authentication, bcrypt hashing
- Integrations for AI (OpenAI/Claude/Gemini)

**Other**
- LocalStorage for token persistence
- Modern ES6+ JavaScript

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python 3.12+
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/hiral1276/SkillSwap.git
cd SkillSwap
```

2. **Frontend Setup (in /frontend or root if monorepo)**
```bash
cd frontend
npm install  # or yarn install
npm start    # Runs on http://localhost:3000
```

3. **Backend Setup (in /backend)**
```bash
cd ../backend
pip install -r requirements.txt  # (add FastAPI, socketio, etc.)
uvicorn main:app --reload        # Runs on http://localhost:8000
```

4. **Environment Setup**
   
This project uses environment variables for configuration.
Both the frontend and backend require a .env file.

1. Copy the provided .env.example file to .env:
```
cp .env.example .env     # Linux/Mac
copy .env.example .env   # Windows PowerShell
```

2. Fill in your own values:

- Backend/.env
```
MONGODB_URI=mongodb://localhost:27017/skillswap
JWT_SECRET=your-secret-key
```

- Frontend/.env
```
REACT_APP_API_URL=http://localhost:8000
```

- Restart backend and frontend after editing .env.

👉 Note: .env.example is included in the repo for reference, but the real .env file must be created locally. Without this, the project will not run.


## 📁 Project Structure

```
SkillSwap (root)
├── backend    
|   ├── .env.example           
│   ├── ai
│   │   └── service.py               ← AI-related services (likely)
│   ├── auth.py                      ← Authentication logic
│   ├── models.py                    ← Database models or schemas
│   ├── requirements.txt             ← Python dependencies
│   ├── seed_data.py                 ← Sample data seeding
│   ├── server.py                    ← Main server entry point
│   └── server_old.py               ← Other server logic
├── frontend
|   ├── plugins
│   ├── public
│   |   └── index.html               ← Main HTML template
│   ├── src
│   │   ├── components                   ← Reusable UI components
│   │   │   └── ui
│   │   │       ├── Navbar.jsx
│   │   │       └── Footer.jsx
│   │   ├── context                      ← React Context providers
│   │   │   ├── AuthContext.js       ← Authentication state management
│   │   │   └── ThemeContext.js      ← (or other contexts)
│   │   ├── hooks                        ← Custom hooks
│   │   │   └── use-toast.js         ← Toast notification hook
│   │   ├── lib                          ← Utility functions
│   │   │   └── utils.js
│   │   ├── pages                        ← Page components (main views)
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Messages.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Register.jsx
|   |   ├── App.css
|   |   ├── App.js                       ← Main app router/component
│   │   ├── Index.css                  
│   │   ├── index.js                     ← Entry point (ReactDOM render)
│   │   └── mock.js                      ← Mock data for development
|   ├── .env.example   
|   ├── component.json
|   ├── craco.config.js       
│   ├── tailwind.config.js           ← Tailwind CSS custom theme
│   ├── postcss.config.js            ← PostCSS config for Tailwind
│   ├── package.json                 ← Frontend dependencies & scripts
│   ├── yarn.lock 
│   ├── jsconfig.json 
│   └── gitignore.txt
├── .gitignore                       ← Git ignore rules
├── contracts.md                     ← API endpoints,models,etc,.
├── LICENSE
└── README.md                       
```

## 🎨 Design Highlights

### Color Scheme
- **Primary**: Dark Navy (#0F172A) with Purple gradients (#4B0082 to #8A2BE2)
- **Background**: Deep navy/dark for immersive feel
- **Text**: High-contrast white/light gray
- **Accents**: Vibrant blue-to-purple gradients on buttons

### Typography
- Clean, modern sans-serif font
- Proper hierarchy and spacing for readability in dark mode

### UI Components
- **Cards**: Subtle shadows, rounded corners (12px)
- **Buttons**: Gradient fills with hover glow
- **Inputs**: Transparent with glowing focus states
- **Spacing**: Generous whitespace for premium feel

## 📱 Responsive Design

| Device  |      Width     |                     Layout                   |
|---------|----------------|----------------------------------------------|
| Mobile  | < 768px        | Single column, hamburger menu, stacked chat  |
| Tablet  | 768px - 1024px | 2-column grid, side navigation               |             
| Desktop | > 1024px       | Multi-column dashboard, split chat view      |

## 🔧 Key Features Breakdown

### 1. Landing & Authentication
- Hero section with "Learn. Teach. Grow."
- Clean signup/login forms with gradient buttons

### 2. Dashboard
- Personalized AI recommendations
- Skill-based search and filtering
- User cards with teach/learn tags

### 3. Real-Time Messaging
- Conversation sidebar with unread badges
- Live chat with timestamps and online indicators
- AI assistant integration

### 4. AI Features
- Match recommendations
- Profile bio/skill enhancement
- In-chat assistant for guidance


## 📊 Measurable Outcomes

✅ Built Full-stack peer-to-peer platform with AI integration

✅ Implemented Real-time chat using WebSockets

✅ Created Responsive dark-themed UI with Tailwind css

✅ Secure auth and API design

✅ Portfolio-ready project showcasing React + Python skills

## 🎯 Use Cases

Perfect for:
- Portfolio projects demonstrating full-stack development
- Learning real-time applications with WebSockets
- Understanding AI integration in web apps
- Practicing modern UI/UX with Tailwind
- Resume/CV technical project showcase

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Hiralben Mokariya**
- GitHub: hiral1276 (https://github.com/hiral1276)
- LinkedIn: Hiralben Mokariya (www.linkedin.com/in/hiralben-mokariya)
- Email: hiralmokariya12@gmail.com

## Troubleshooting

### Dependency Conflicts
If you encounter errors during `npm install` (e.g. peer dependency conflicts with React or date-fns):

1. Delete old dependencies:

- **Windows PowerShell**
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force .\package-lock.json
Remove-Item -Force yarn.lock
```
- **Linux/Mac**
```bash
rm -rf node_modules package-lock.json yarn.lock
```

2. Reinstall fresh dependencies:
```bash
npm install
```

3. Start the app:
```
npm start
```

### 🧠 Why this helps 
- Keeps the main installation steps clean and professional.  
- Provides a clear fallback if someone gets stuck.

**Built with ❤️ to empower peer learning**


# S k i l l S w a p - P e e r - t o - P e e r  S k i l l   E x c h a n g e   P l a t f o r m



