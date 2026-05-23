import sqlite3
from werkzeug.security import generate_password_hash

def create_admin():
    hashed_password = generate_password_hash("admin123")
    
    conn = sqlite3.connect("salon.db")
    cursor = conn.cursor()
    
    cursor.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        ("admin", hashed_password)
    )
    
    conn.commit()
    conn.close()
    print("Admin created successfully!")

create_admin()