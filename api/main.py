from fastapi import FastAPI

# Tworzymy instancję aplikacji FastAPI
app = FastAPI()

# Prosta trasa HTTP GET
@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

# Trasa z parametrem
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
