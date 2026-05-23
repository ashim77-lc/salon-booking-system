from flask import Blueprint, jsonify, request, session
import sqlite3
import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "..", "salon.db")


services = Blueprint('services', __name__)

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@services.route("/services", methods=["GET"])
def get_services():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM services")
    data = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in data])

@services.route("/services", methods=["POST"])
def add_service():
    if "user" not in session:
        return jsonify({"message": "Unauthorized"}), 401

    data = request.get_json()
    name = data["name"]
    type = data["type"]
    price = data["price"]
    duration = data["duration"]

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO services (name, type, price, duration) VALUES (?, ?, ?, ?)",
        (name, type, price, duration)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Service added", "success": True}), 201

@services.route("/services/<int:id>", methods=["PUT"])
def update_service(id):
    if "user" not in session:
        return jsonify({"message": "Unauthorized"}), 401

    data = request.get_json()
    name = data["name"]
    type = data["type"]
    price = data["price"]
    duration = data["duration"]

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE services SET name=?, type=?, price=?, duration=? WHERE id=?",
        (name, type, price, duration, id)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Service updated", "success": True}), 200

@services.route("/services/<int:id>", methods=["DELETE"])
def delete_service(id):
    if "user" not in session:
        return jsonify({"message": "Unauthorized"}), 401

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM services WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Service deleted", "success": True}), 200