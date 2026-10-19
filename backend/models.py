from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.engine import URL
from datetime import datetime
from pathlib import Path

# Database URL
DATABASE_URL = URL.create(
    "sqlite",
    database=str(Path(__file__).resolve().with_name("engineer360.db")),
)

# Create Engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# Create Session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base Model
Base = declarative_base()


class StudentRecord(Base):
    __tablename__ = "student_records"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    branch = Column(String)
    role = Column(String)
    match_percentage = Column(Float)
    burnout_score = Column(Float)
    burnout_risk = Column(String)
    recommendation = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)