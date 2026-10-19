# Engineer360 🚀

**An AI-powered skill assessment and career guidance platform for engineering students.**

Engineer360 helps students assess their current skills, identify areas for improvement, and explore learning recommendations aligned with their career goals.

## ✨ Features

- Skill assessment and analysis
- Skill-gap identification
- Personalized learning recommendations
- Career-oriented guidance
- Study habits and well-being analysis

*Features depend on the current implementation.*

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python, FastAPI
- **Database:** SQLite
- **ORM:** SQLAlchemy, if configured in the current backend

## 📁 Project Structure

```text
Engineers 360/
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── burnout_engine.py
│   ├── recommendation_engine.py
│   ├── skill_data.py
│   ├── skill_engine.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── index_script.js
│   ├── index_style.css
│   ├── skills.html
│   ├── skills_script.js
│   ├── skills_style.css
│   ├── dashboard.html
│   ├── dashboard_script.js
│   └── dashboard_style.css
├── .gitignore
└── README.md
```

## 📋 Prerequisites

Before running Engineer360, install:

- Python 3.10 or a compatible version for the project's dependencies
- Git
- A modern web browser
- Visual Studio Code (recommended)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ChadaSriSai0407/Engineers360.git
cd Engineers360
```

### 2. Create a virtual environment

From the project root, run:

**Windows (PowerShell):**

```powershell
python -m venv backend/venv
.\backend\venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, you can run the environment's Python executable directly instead.

### 3. Install backend dependencies

```powershell
python -m pip install -r backend/requirements.txt
```

### 4. Start the backend

```powershell
cd backend
python -m uvicorn main:app --reload
```

The API should be available at:

- API root: http://127.0.0.1:8000/
- Interactive API documentation: http://127.0.0.1:8000/docs

Keep the terminal running while using the application.

### 5. Run the frontend

Open the `frontend` folder in Visual Studio Code and use the Live Server extension to serve `index.html`, or use another local static web server.

Ensure the frontend's API URL points to the running backend. If the application uses a different endpoint or port, configure it accordingly.

### 🗄️ SQLite Database Setup

Engineer360 uses **SQLite** for local database storage.

### 1. Check whether SQLite is available

Python usually includes the SQLite module. After activating your virtual environment, run:

```powershell
python -c "import sqlite3; print(sqlite3.sqlite_version)"
```

If a version number appears, SQLite is available. No separate SQLite server is required.

### 2. Install SQLAlchemy

If the project uses SQLAlchemy, it should be listed in `backend/requirements.txt`. Install the project dependencies:

```powershell
python -m pip install -r backend/requirements.txt
```

### 3. Initialize the database

Engineer360 uses a local SQLite database file named `engineer360.db`.

The database and its tables must be initialized using the database configuration in `backend/models.py` and `backend/main.py`. If the application creates the tables automatically at startup, run the backend as described in the Getting Started section.

If automatic initialization is not configured, initialize the tables using the project's database initialization code before using the application.

### SIMPLE WAY TO ADD SQLite

## 🗄️ SQLite Database

Engineer360 uses SQLite to store application data in a local database file named `engineer360.db`.

### Database Setup

1. Install Python and create the project's virtual environment.
2. Install the backend dependencies using `backend/requirements.txt`.
3. Start the FastAPI backend.
4. The database must be initialized according to the database setup implemented in the backend.

### Viewing the Database in VS Code

To inspect the database visually:

1. Open Visual Studio Code.
2. Install a compatible SQLite database viewer or SQLite extension.
3. Open or connect to `backend/engineer360.db`.
4. Browse the available tables and inspect their records.

**Note:** The VS Code extensions are optional tools for developers. They are not required to run Engineer360.

The database file is excluded from GitHub, so each developer uses their own local database.

## 🚫 Files Not Included

The following files and folders are excluded through `.gitignore`:

- `backend/venv/` and other virtual environments — dependencies are installed locally.
- `__pycache__/` and compiled Python files — generated automatically by Python.
- `*.db`, `*.sqlite`, and `*.sqlite3` — local database files.
- `.env` and `.env.*` — local configuration and secrets.
- `.vscode/` and `.idea/` — editor-specific settings.

These files are not required to be committed to GitHub. The project source code and `requirements.txt` are included so developers can set up their own environment.

**Important:** Never commit API keys, passwords, access tokens, or private user data.

## 🧑‍💻 Development

Contributions, bug reports, and suggestions are welcome. Please test your changes locally before submitting them.

## 📌 Project Status

Developed as my first hackathon project.

## 👨‍💻 Author

**Chada karthik**

GitHub: [@ChadaSriSai0407](https://github.com/ChadaSriSai0407)