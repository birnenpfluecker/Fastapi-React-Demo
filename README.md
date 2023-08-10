# PxC-Fastapi-React-Demo

This repository contains a demo project for the job interview at Phoenix Contact GmbH. It is a simple web application that allows the user to create, read, update and delete employees, departments and projects. The backend is implemented using FastAPI and the frontend is implemented using React. Frontend and Backend are contained in the identically named folders.

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
To start the backend navigate to the backend folder and run the following command.
```bash
uvicorn main:app --reload
```

## Frontend
TODO