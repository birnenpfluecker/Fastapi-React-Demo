
from fastapi import FastAPI





app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/employees"):
async def get_employees():
