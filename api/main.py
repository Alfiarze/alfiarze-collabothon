from fastapi import FastAPI, Depends
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# Tworzymy instancję aplikacji FastAPI
app = FastAPI()

# Konfiguracja bazy danych
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Model danych
class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)

# Tworzymy tabele w bazie danych
Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Prosta trasa HTTP GET
@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

# Trasa z parametrem i dostępem do bazy danych
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if item:
        return {"item_id": item.id, "name": item.name, "q": q}
    return {"error": "Item not found"}

# Nowa trasa do dodawania elementów
@app.post("/items/")
def create_item(name: str, db: Session = Depends(get_db)):
    new_item = Item(name=name)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return {"item_id": new_item.id, "name": new_item.name}
