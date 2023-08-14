# Fastapi-React-Demo

This repository contains a demo project. It is a simple web application that allows the user to create, read, update and delete employees, departments and projects. The backend is implemented using FastAPI and the frontend is implemented using React. Frontend and Backend are contained in the identically named folders.

## Backend

The backend is written in python using the FastAPI framework. It uses a SQLite database to store the data. The database is created automatically when the backend is started for the first time. The backend can be installed and started by running the following commands.

### Installation

All commands are for a Mac/Linux system. For Windows these commands are similar but may differ slightly.
First we create a virtual environment (you probably want to use a different environment than the one you normally use so you can delete it after the demo).
Create a new virtual environment and activate it. Navigate to the folder where you want to create the environment and run the following commands.

```bash
cd envs # or any other folder where you want to create the environment
virtualenv -p python3.10.4 demo_env # create the environment, python version is given to prevent errors due to different python versions
source demo_env/bin/activate # activate the environment, for windows use demo_env\Scripts\activate.bat
```

Now we can install the backend. Navigate to the backend folder and run the following commands.

```bash
cd backend
pip install -r requirements.txt
```

### Start the backend

To start the backend run the following command.

```bash
uvicorn backend.main:app --reload
```

The backend is now running on http://127.0.0.1:8000. You can access the documentation of the API on http://127.0.0.1:8000/docs. If you have other applications running on port 8000 you can change the port by adding the parameter `--port <port>` to the command. For example `uvicorn backend.main:app --reload --port 8001` starts the backend on port 8001.

#### Data Import

The backend automatically imports the data from the given \*.csv files on the first start. If you want to import the data again you can delete the database file `PxC_demo_backend.db` and restart the backend, note that this will delete all changes to the data you made previously.

## Frontend

Check that the backend is running and then run the following commands to start the frontend.

```bash

cd frontend
npm install
npm run dev
```

## Possible Problems

<span style="color:red"> Important:</span> The frontend is configured to use the backend on http://127.0.0.1:8000. If you have the backend running on a different port you have to change the port in the file `frontend/src/config.tsx` to the port you are using.</br>
<span style="color:red"> Important:</span> The backend is configured to allow CORS requests from http://127.0.0.1:3000 and http://127.0.0.1:5173. If you have the frontend running on a different port you have to change the port in the file `backend/main.py` to the port you are using.
