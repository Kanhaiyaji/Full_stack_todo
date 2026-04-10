# 🚀 Quick Start Guide

## Start in 3 Steps

### **Step 1: Install Backend Dependencies**
```bash
cd backend
npm install
```

### **Step 2: Install Frontend Dependencies**
```bash
cd frontend
npm install
```

### **Step 3: Start Both Services**

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```
✓ Server will be running on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```
✓ App will be running on `http://localhost:5173`

---

## ✅ Verify Everything Works

1. **Open your browser** → `http://localhost:5173`
2. **Add a task** → Type something and click "Add Task"
3. **Mark complete** → Click checkbox to toggle
4. **Edit task** → Click "Edit" button
5. **Delete task** → Click "Delete" button

---

## 📚 Project Features

- ✅ Create, read, update, delete tasks
- ✅ Filter tasks (All, Completed, Incomplete)
- ✅ Real-time statistics
- ✅ Error handling
- ✅ Loading states
- ✅ Mobile responsive
- ✅ Clean, production-ready code

---

## 🐳 Docker Option (Bonus)

Run everything in containers:

```bash
docker-compose up
```

- Backend: `http://localhost:5000`
- Frontend: `http://localhost`

---

## 📖 Documentation

See [README.md](./README.md) for:
- Complete architecture overview
- API endpoint documentation
- Component breakdown
- Setup instructions
- Troubleshooting guide

---

## 🎯 Next Steps

1. **Explore the code** - Check out component structure in `src/`
2. **Run tests** - `npm test` in backend directory
3. **Customize** - Modify colors, add features, deploy!
4. **Learn** - This is a great starting point for full-stack development

---

## 💡 Useful npm Commands

**Backend:**
```bash
npm start        # Production mode
npm run dev      # Development with auto-reload
npm test         # Run unit tests
```

**Frontend:**
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
```

---

## ❓ Something Not Working?

1. Make sure **both** backend and frontend are running
2. Check that ports 5000 (backend) and 5173 (frontend) are free
3. Check browser console for errors (F12)
4. Restart both servers

For more help, see [README.md](./README.md#-troubleshooting)

---

**Happy coding! 🎉**
