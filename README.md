# 🎬 Creator Studio Co-Pilot

> **Your personal AI-powered content creation assistant.**  
> Streamline your creative workflow — from idea generation to script writing, thumbnail suggestions, and publishing — all in one platform.

---

## 🚀 Overview

**Creator Studio Co-Pilot** is a Gen-AI platform that helps creators turn their ideas into ready-to-publish content within seconds.  
No more switching between multiple tools for scripts, visuals, thumbnails, and audio — Co-Pilot merges everything in one place.

This project was developed as part of a **hackathon** to demonstrate how **AI, LLMs, and automation** can revolutionize content creation.

---

## 🧠 Key Features

- ✍️ **Idea to Script Generator** – Convert your topic or thought into engaging YouTube/video scripts using GPT-4 / Gemini API.  
- 🎨 **Thumbnail Assistant** – Suggest or generate thumbnail ideas and designs.  
- 🎧 **Audio & Music Recommender** – Find the perfect soundtrack or background music.  
- 🧩 **Content Planner** – Organize content workflow with titles, descriptions, and publishing calendar.  
- 🌐 **Multi-Platform Ready** – Supports export for YouTube, Instagram, and Reels content.  
- 🤖 **AI Co-Pilot Chat** – Chat-based assistant for brainstorming ideas.  

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React (Vite + TypeScript) + Tailwind CSS |
| **Backend** | Python (FastAPI / Flask) |
| **AI / LLM Integration** | GPT-4 API, Gemini API, LangChain |
| **Database (optional)** | MongoDB / Firebase / PostgreSQL |
| **Containerization** | Docker |
| **Version Control** | Git + GitHub |

---

## 🗂️ Folder Structure

Creator-Studio-Co-Pilot/
│
├── backend/ # Python backend (API endpoints, AI integrations)
│ ├── main.py
│ ├── requirements.txt
│ └── utils/
│
├── src/ # React frontend (Vite + TS)
│ ├── components/
│ ├── pages/
│ ├── assets/
│ └── App.tsx
│
├── public/ # Static assets
│
├── dockerfile
├── .gitignore
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/RocksAnuska/Creator-Studio-Co-Pilot.git
cd Creator-Studio-Co-Pilot

2️⃣ Frontend Setup
cd src
npm install
npm run dev

The app should now run on http://localhost:5173/.
3️⃣ Backend Setup
cd backend
pip install -r requirements.txt
python main.py

The backend runs on http://localhost:8000/.
4️⃣ Environment Variables
Create a .env file in both frontend and backend directories:
.env (Backend)
OPENAI_API_KEY=your_openai_key
GEMINI_API_KEY=your_gemini_key

.env (Frontend)
VITE_BACKEND_URL=http://localhost:8000


🐳 Docker Setup (Optional)
You can containerize the full stack app with Docker:
docker build -t creator-copilot .
docker run -p 5173:5173 -p 8000:8000 creator-copilot


💡 Usage


Open the app and enter your content idea.


Choose your platform (YouTube, Instagram, etc).


The Co-Pilot generates scripts, thumbnails, and music ideas automatically.


Edit, download, and publish — all from one dashboard.



🧩 Future Enhancements


🎥 Video auto-generation with stock visuals.


🗣️ Voice cloning for personalized narration.


💾 Cloud sync for creator projects.


🧭 Analytics dashboard for engagement prediction.



🏆 Hackathon Project
This project was built during a Hackathon 2025 with the theme “AI for Creators”.
Our goal was to simplify the content creation pipeline using Gen-AI and LLMs.

👩‍💻 Contributors


Anuska Dutta – Frontend Developer, UI/UX
Mayukh Ghosh – Backend
Rupanjan Saha - AI Integration
Debarghya Sarkar - Design



📜 License
This project is licensed under the MIT License – feel free to use and modify it for your own learning or research.

🌟 Show Your Support
If you like this project:


⭐ Star the repository


🐛 Report bugs or suggest features via Issues


🧠 Contribute with your own improvements!




“Empowering creators to create — faster, smarter, better.” 🎥


---

Would you like me to tailor this README for your **hackathon submission** (with a short “Problem Statement”, “Solution”, “Impact”, and “Demo” section)?  
That version looks great in judging presentations and DevPost entries.

