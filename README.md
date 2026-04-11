# Task Manager - Full Stack Application

A clean, scalable, and production-ready Task Manager application built with modern web technologies. This project demonstrates best practices in full-stack development with a focus on code structure, separation of concerns, and user experience.

##  Overview

**Task Manager** is a full-stack web application that allows users to create, manage, organize, and track their tasks efficiently. The application features a responsive UI with real-time API integration, comprehensive error handling, and a clean, minimal design that prioritizes functionality over aesthetics.

###  Key Features

- ✅ **Create Tasks** - Add new tasks with titles and timestamps
- ✅ **Mark Complete** - Toggle task completion status with visual feedback
- ✅ **Edit Tasks** - Update task titles inline with validation
- ✅ **Delete Tasks** - Remove tasks permanently with confirmation
- ✅ **Filter Tasks** - View All, Completed, or Incomplete tasks
- ✅ **Progress Tracking** - Real-time statistics showing completion percentage
- ✅ **Error Handling** - Comprehensive error messages and server status checks
- ✅ **Loading States** - User-friendly loading indicators during API calls
- ✅ **Responsive Design** - Works seamlessly on desktop and mobile devices

---

## Tech Stack

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js 4.18
- **Validation:** Custom middleware
- **Error Handling:** Centralized error handler
- **ID Generation:** UUID v4
- **Storage:** In-memory (no database)

### **Frontend**
- **Library:** React 19
- **Build Tool:** Vite 8
- **State Management:** React Hooks (useState, useEffect)
- **HTTP Client:** Fetch API
- **Styling:** Minimal vanilla CSS
- **Package Manager:** npm

### **Development Tools**
- CORS middleware for cross-origin requests
- Environment variables support
- Hot Module Replacement (HMR) with Vite
- ESLint for code quality

---

##  Project Structure

```
Full_stack_todo/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── taskController.js      # Business logic for tasks
│   │   ├── middlewares/
│   │   │   ├── errorHandler.js        # Centralized error handling
│   │   │   └── validation.js          # Input validation middleware
│   │   ├── models/
│   │   │   └── Task.js                # In-memory task store
│   │   └── routes/
│   │       └── taskRoutes.js          # API route definitions
│   ├── tests/
│   │   └── task.test.js               # Unit tests for Task model
│   ├── server.js                      # Express server setup
│   └── package.json                   # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskList.jsx           # Task list container
│   │   │   ├── TaskItem.jsx           # Individual task component
│   │   │   └── AddTaskForm.jsx        # Form to add new tasks
│   │   ├── services/
│   │   │   └── api.js                 # API integration layer
│   │   ├── App.jsx                    # Main app component
│   │   ├── App.css                    # App styling
│   │   ├── index.css                  # Global styles
│   │   ├── main.jsx                   # React entry point
│   │   └── public/                    # Static assets
│   ├── vite.config.js                 # Vite configuration
│   ├── eslint.config.js               # ESLint configuration
│   ├── index.html                     # HTML template
│   └── package.json                   # Frontend dependencies
│
└── README.md                          # Project documentation
```

---

##  Setup Instructions

### **Prerequisites**
- Node.js 16+ installed
- npm or yarn package manager
- Two terminal windows (one for backend, one for frontend)
Open first this link in one tab :-  https://full-stack-todo-frej.onrender.com


### **Backend Setup**


1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   Or for production:
   ```bash
   npm start
   ```

   **Expected output:**
   ```
   ✓ Server running on http://localhost:5000
   ✓ API base: http://localhost:5000/api
   ```

### **Frontend Setup**

1. **Navigate to frontend directory (in a new terminal):**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   **Expected output:**
   ```
   ✓ Local: http://localhost:5173/
   ```

4. **Open your browser** and navigate to `http://localhost:5173/`

---

## 📡 API Endpoints

All endpoints are prefixed with `/api`

### **GET /tasks**
Retrieve all tasks

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Complete project",
      "completed": false,
      "createdAt": "2024-04-10T12:34:56.789Z"
    }
  ],
  "message": "Retrieved 1 task(s)"
}
```

### **POST /tasks**
Create a new task

**Request Body:**
```json
{
  "title": "New task title"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "New task title",
    "completed": false,
    "createdAt": "2024-04-10T12:34:56.789Z"
  },
  "message": "Task created successfully"
}
```

### **PATCH /tasks/:id**
Update a task (mark complete or edit title)

**Request Body:**
```json
{
  "completed": true
}
```
or
```json
{
  "title": "Updated title"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Updated title",
    "completed": true,
    "createdAt": "2024-04-10T12:34:56.789Z"
  },
  "message": "Task updated successfully"
}
```

### **DELETE /tasks/:id**
Delete a task

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

### **Error Response (400/404)**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Input Validation

All inputs are validated before processing:

### **Task Title Validation**
-  Required field (cannot be undefined)
-  Must be a string
-  Cannot be empty or whitespace only
-  Maximum length: 500 characters

### **Task ID Validation**
-  Required parameter
-  Must be valid UUID format
-  Returns 400 error for invalid IDs

### **HTTP Status Codes**
- `200` - Successful GET, PATCH, DELETE
- `201` - Successful POST (resource created)
- `400` - Bad request (validation error)
- `404` - Resource not found
- `500` - Server error

---

## 📝 Component Architecture

### **Backend Components**

**TaskStore (src/models/Task.js)**
- In-memory storage for tasks
- CRUD operations
- UUID-based task identification

**taskController (src/controllers/taskController.js)**
- Business logic for all task operations
- Request/response handling
- Error management

**taskRoutes (src/routes/taskRoutes.js)**
- Route definitions
- Middleware integration
- Request validation

**Middlewares**
- `validation.js` - Input validation rules
- `errorHandler.js` - Centralized error handling

### **Frontend Components**

**App.jsx**
- Main application component
- State management (tasks, loading, errors, filters)
- API integration
- Statistics calculation

**TaskList.jsx**
- Displays filtered list of tasks
- Handles empty states
- Passes handlers to TaskItem

**TaskItem.jsx**
- Individual task display
- Edit functionality with validation
- Toggle complete status
- Delete with confirmation

**AddTaskForm.jsx**
- Form input for new tasks
- Client-side validation
- Error messages
- Loading state management

**api.js (Service)**
- Centralized API communication
- Error handling
- Promise-based fetch wrapper
- Server health check

---

##  Styling Approach

The application uses **minimal vanilla CSS** with the following principles:

- **Mobile-First Design** - Responsive breakpoints at 768px
- **CSS Variables** - Centralized color and style management
- **Utility Classes** - Reusable button and element styles
- **BEM-like Methodology** - Clear naming conventions
- **Dark Mode Support** - System preference detection
- **Accessibility** - Proper focus states and semantic HTML

### **Color Palette**
- Primary: `#3b82f6` (Blue)
- Success: `#10b981` (Green)
- Danger: `#ef4444` (Red)
- Warning: `#f59e0b` (Orange)
- Grays: 50-900 scale for backgrounds and text

---

## 💾 Data Model

### **Task Object**
```javascript
{
  id: string,           // UUID v4 format
  title: string,        // 1-500 characters
  completed: boolean,   // false by default
  createdAt: string     // ISO 8601 timestamp
}
```

### **In-Memory Storage**
- Tasks stored in memory array
- Data persists during server session
- **Note:** Data is lost on server restart (see Bonus Features for localStorage)

---
##  Key Features Deep Dive

### **1. Error Handling**
- Validation errors with clear messages
- Resource not found (404) handling
- Server error (500) with debug info in development
- Frontend error banner with dismiss button
- API health check on app load

### **2. Loading States**
- Initial data loading indicator
- Button disabled state during API calls
- Loading message in form during submission
- Prevention of duplicate submissions

### **3. User Experience**
- Auto-clear input after task creation
- Confirmation dialog before deletion
- Real-time progress statistics
- Task count badges on filter buttons
- Visual feedback for completed tasks

### **4. Code Quality**
-  Meaningful variable names
-  JSDoc comments for functions
-  Separation of concerns (models, controllers, routes)
-  DRY principle (Don't Repeat Yourself)
-  Clean code formatting

---

##  Testing

### **Backend Unit Tests**
Run tests with:
```bash
npm test
```

Test file location: `backend/tests/task.test.js`

Tests cover:
- Task creation with all required fields
- Retrieving all tasks
- Finding tasks by ID
- Updating task properties
- Deleting tasks
- Empty state handling

---

## 🚀 Bonus Features (Not Included by Default)

These features could be added for enhanced functionality:

### **1. localStorage Persistence**
Save tasks to browser storage to persist data between sessions

### **2. Edit Task Title**
Already implemented! Click "Edit" button on any task

### **3. Filter Tasks**
Already implemented! Use filter buttons: All, Incomplete, Completed

### **4. Docker Setup**
Create Dockerfile and docker-compose.yml for containerization

### **5. Advanced Features**
- Task categories/tags
- Due dates and reminders
- Search functionality
- Export/import tasks
- Task priority levels
- Recurring tasks

---

##  Assumptions & Constraints

### **Data Storage**
-  In-memory storage only (no database)
-  Data lost on server restart
-  No authentication/authorization required
-  No user accounts or permissions

### **Scalability**
-  Single-instance backend (no clustering)
-  No caching layer (no Redis)
-  No API rate limiting
-  No logging system
-  No monitoring/analytics

### **Performance**
-  Suitable for small numbers of tasks (< 1000)
-  No pagination or infinite scroll
-  No database indexing
-  Synchronous API responses

### **Security**
-  No HTTPS enforcement (development only)
-  No CSRF tokens
-  No input sanitization (focus on validation)
-  No SQL injection protection (no database)
-  CORS enabled for localhost only

### **Browser Support**
-  Modern browsers with ES6+ support
-  Fetch API support required
- ✅ No IE11 support

---

##  Development Commands

### **Backend**
```bash
npm start        # Production mode
npm run dev      # Development with auto-reload
npm test         # Run unit tests
```

### **Frontend**
```bash
npm run dev      # Start dev server with HMR
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

##  Learning Resources

This project demonstrates:
- **RESTful API Design** - Proper HTTP methods and status codes
- **React Hooks** - useState, useEffect for state management
- **Component Composition** - Reusable, modular components
- **Error Handling** - Graceful error management
- **Form Handling** - Input validation and submission
- **API Integration** - Async/await with fetch
- **CSS Layouts** - Flexbox and Grid
- **Testing** - Basic unit tests

---

##  Contributing

This is a learning project. Feel free to fork and extend!

### **Suggested Improvements**
1. Add end-to-end tests with Cypress/Playwright
2. Implement a real database (MongoDB, PostgreSQL)
3. Add user authentication (JWT)
4. Deploy to cloud (Vercel, Heroku, Azure)
5. Add task categories and tags
6. Implement task sorting and search
7. Add PWA capabilities
8. Create mobile app with React Native

---

##  License

This project is open source and available under the MIT License.

---

##  Project Statistics

| Metric | Value |
|--------|-------|
| **Backend Files** | 7 |
| **Frontend Components** | 4 |
| **API Endpoints** | 4 |
| **CSS Variables** | 15+ |
| **Lines of Code** | ~800 |
| **Test Cases** | 8 |
| **Documentation** | Comprehensive |

---

##  FAQ

### **Why no database?**
For simplicity and learning purposes. The in-memory store demonstrates the complete CRUD cycle without database complexity.

### **Why React Hooks instead of Redux?**
Hooks are simpler for this small application. Redux would add unnecessary complexity for the current scope.

### **How do I persist data?**
In production, replace the in-memory TaskStore with a database connection (e.g., MongoDB Mongoose model).

### **Can I deploy this?**
Yes! The backend can run on any Node.js hosting (Heroku, AWS, Azure). The frontend on any static host (Vercel, Netlify).

### **What about mobile?**
The app is fully responsive. For native mobile, consider React Native with the same backend API.

---

## 🚢 Deployment Notes

- The app uses in-memory storage, so task data resets if the backend restarts.
- Browser refresh does not delete tasks as long as the backend keeps running.
- For this demo, start both servers locally before testing the app.
- If you want persistence later, replace the in-memory store with a JSON file or database.
- Frontend can be deployed on GitHub Pages from the `frontend` folder build output (`dist`).
- Set `VITE_API_BASE_URL` to your live backend URL before building the frontend.

---

## 🌐 GitHub Pages Frontend Deploy

1. Open the `frontend` folder in terminal.
2. Set the production API URL in an env file, for example:
  ```bash
  VITE_API_BASE_URL=https://your-render-backend.onrender.com/api
  ```
3. Build and deploy:
  ```bash
  npm run deploy
  ```
4. In GitHub repository settings, keep GitHub Pages source on the branch published by `gh-pages`.

---

## 🐛 Troubleshooting

### **Backend won't start**
```bash
# Check if port 5000 is in use
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows
```

### **Frontend can't connect to backend**
- Verify backend is running on `http://localhost:5000`
- Check CORS configuration in `server.js`
- Look for errors in browser console (F12)

### **Tasks disappear on refresh**
This is expected behavior. Data is stored in memory. To persist, implement localStorage or use a database.

### **Port already in use**
```bash
# Use different port
PORT=3000 npm start  # Backend
npm run dev -- --port 3000  # Frontend
```

---

**Built with  as a production-ready learning project**

For questions or improvements, feel free to open an issue or pull request!
