import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "salon.db")

conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

services = [
    ("Haircut", "Hair", 25.00, 30),
    ("Hair Coloring", "Hair", 60.00, 90),
    ("Facial", "Skin", 40.00, 60),
    ("Massage", "Body", 50.00, 60),
    ("Manicure", "Nails", 20.00, 45),
    ("Pedicure", "Nails", 25.00, 50),
    ("Eyebrow Threading", "Face", 10.00, 15),
    ("Bridal Makeup", "Makeup", 120.00, 180),
    ("Hair Spa", "Hair", 45.00, 60),
]

cursor.executemany(
    "INSERT INTO services (name, type, price, duration) VALUES (?, ?, ?, ?)",
    services
)

conn.commit()
conn.close()
print("Services added!")