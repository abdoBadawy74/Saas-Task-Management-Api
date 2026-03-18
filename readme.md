# 📋 SaaS Task Management API

A full-stack SaaS Task Management application built with **Node.js**, **Express**, **MongoDB**, and **React**. Features real-time notifications, team collaboration, OTP authentication, and a comprehensive admin dashboard.

---

## 🌐 Live Demo

- **Frontend:** [https://saas-task-management-api.vercel.app](https://saas-task-management-api.vercel.app)
- **Backend API:** [https://saas-task-management-api.onrender.com](https://saas-task-management-api.onrender.com)
- **API Docs (Swagger):** [https://saas-task-management-api.onrender.com/api-docs](https://saas-task-management-api.onrender.com/api-docs)

---

## ✨ Features

### 🔐 Authentication
- Register with OTP email verification (via Brevo)
- Login with JWT access token + refresh token rotation
- Forgot / Reset password via OTP
- Auto token refresh on expiry — seamless UX

### ✅ Task Management
- Create personal and team tasks
- Assign tasks to team members
- Set priority (low / medium / high) and due dates
- Update task status (pending → in progress → completed)
- Overdue task detection
- Filter tasks by status, priority, and type
- Task comments (create, edit, delete)
- Full task activity log

### 👥 Team Collaboration
- Create up to 3 teams per user
- Public teams (join directly) and private teams (approval required)
- Invite users via searchable dropdown
- Accept / reject join requests
- Remove members, leave teams
- Team activity feed

### 🔔 Real-time Notifications
- Socket.io powered push notifications
- 11 notification types (task assigned, team invite, comment added, etc.)
- Mark as read / mark all read / delete
- Unread count badge with live updates

### 📊 Admin Dashboard
- Full system stats (users, tasks, teams)
- Manage all users (view, edit, delete)
- Manage all tasks and teams
- User detail modal with task summary
- Team detail page with member list and task breakdown
- Activity feed for entire system

### 📈 Activity Feed
- Logs all key actions (task created/updated/deleted, member added, comment added, etc.)
- Filter by action type
- Search by user, task, or team
- Per-task and per-team activity views

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database |
| Socket.io | Real-time notifications |
| JWT | Access + refresh token auth |
| Brevo HTTP API | Transactional emails (OTP) |
| Swagger / OpenAPI 3.0 | API documentation |

### Frontend
| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework |
| Tailwind CSS v4 | Styling |
| TanStack Query | Server state management |
| Axios | HTTP client with auto token refresh |
| React Router v6 | Client-side routing |
| Socket.io Client | Real-time updates |
| Lucide React | Icons |
| React Hot Toast | Notifications |

---

## 📁 Project Structure

```
SaaS Task Management API/
├── api/
│   ├── index.js                  # App entry, Socket.io init
│   ├── models/                   # Mongoose schemas
│   │   ├── User.js
│   │   ├── Task.js
│   │   ├── Team.js
│   │   ├── Comment.js
│   │   ├── Activity.js
│   │   └── Notification.js
│   ├── controllers/              # Route handlers
│   ├── routes/                   # Express routers
│   ├── middlewares/              # Auth middleware
│   ├── services/                 # Email + notification services
│   ├── socket/                   # Socket.io manager
│   ├── utils/                    # OTP helper
│   └── swagger/                  # OpenAPI config
└── client/
    ├── src/
    │   ├── api/axios.js          # Axios + refresh token interceptor
    │   ├── context/AuthContext   # JWT auth context
    │   ├── routes/AppRouter      # React Router setup
    │   ├── components/           # Reusable UI components
    │   │   ├── ui/               # Button, Input, Card, Modal, Badge, Spinner
    │   │   └── layout/           # Sidebar, Navbar, Layout
    │   └── pages/
    │       ├── auth/             # Login, Register, OTP, Forgot/Reset
    │       ├── dashboard/        # Dashboard with stats + activity
    │       ├── tasks/            # Tasks list, detail, comments
    │       ├── teams/            # Teams list, detail, members
    │       ├── notifications/    # Notifications page
    │       ├── activity/         # Activity feed
    │       └── admin/            # Admin dashboard, users, tasks, teams
    └── .env
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Brevo account (for emails)

### Backend Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/saas-task-management-api.git
cd saas-task-management-api

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Fill in your `.env`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d
BREVO_API_KEY=your_brevo_api_key
BREVO_FROM=your_verified_email@domain.com
BREVO_FROM_NAME=Task Manager
CLIENT_URL=http://localhost:5173
```

```bash
# Run in development
npm run dev
```

### Frontend Setup

```bash
cd client
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:3000/api" > .env
echo "VITE_SOCKET_URL=http://localhost:3000" >> .env

# Run dev server
npm run dev
```

---

## 🔑 API Endpoints

| Group | Base Path | Description |
|---|---|---|
| Auth | `/api/auth` | Register, login, OTP, refresh token |
| Tasks | `/api/tasks` | CRUD, status update, overdue, filter |
| Teams | `/api/teams` | CRUD, join, invite, members |
| Comments | `/api/comments` | Task comments CRUD |
| Notifications | `/api/notifications` | Real-time notifications |
| Activities | `/api/activities` | Activity feed |
| Users | `/api/users` | User search |
| Admin | `/api/admin` | Full admin control |

Full documentation available at `/api-docs` (Swagger UI).

---

## 🔄 Auth Flow

```
Register → OTP Email → Verify OTP → JWT Token
Login    → JWT Token + Refresh Token
Token Expired → Auto Refresh → Continue
Refresh Expired → Redirect to Login
```

---

## 🧩 Key Design Decisions

- **Brevo HTTP API** instead of SMTP — Render free plan blocks SMTP ports
- **Refresh token rotation** — each refresh issues a new refresh token for security
- **Socket.io per-user rooms** — notifications delivered only to the intended recipient
- **Route ordering** — static routes always before param routes in Express to avoid conflicts
- **TanStack Query** — all server state cached and invalidated on mutations

---

## 📸 Screenshots

> Dashboard, Tasks, Teams, Notifications, Admin pages

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

MIT

---

## 👤 Author

**Your Name**
- LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- GitHub: [github.com/yourusername](https://github.com/yourusername)