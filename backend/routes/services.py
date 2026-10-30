from flask import Blueprint, jsonify, request, session
import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "..", "salon.db")

services = Blueprint('services', __name__)

REQUIRED_FIELDS = ("name", "type", "price", "duration")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
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

    data = request.get_json(silent=True)
    if not data or not all(k in data for k in REQUIRED_FIELDS):
        return jsonify({"message": "Missing fields", "success": False}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO services (name, type, price, duration) VALUES (?, ?, ?, ?)",
        (data["name"], data["type"], data["price"], data["duration"])
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Service added", "success": True}), 201


@services.route("/services/<int:id>", methods=["PUT"])
def update_service(id):
    if "user" not in session:
        return jsonify({"message": "Unauthorized"}), 401

    data = request.get_json(silent=True)
    if not data or not all(k in data for k in REQUIRED_FIELDS):
        return jsonify({"message": "Missing fields", "success": False}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE services SET name=?, type=?, price=?, duration=? WHERE id=?",
        (data["name"], data["type"], data["price"], data["duration"], id)
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
    try:
        cursor.execute("DELETE FROM services WHERE id=?", (id,))
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        return jsonify({"message": "Service has bookings", "success": False}), 409
    conn.close()
    return jsonify({"message": "Service deleted", "success": True}), 200