from flask import Blueprint, jsonify, request, session
import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "..", "salon.db")

appointments = Blueprint('appointments', __name__)

REQUIRED_FIELDS = (
    "customer_name",
    "customer_phone",
    "appointment_date",
    "appointment_time",
    "service_id",
)
VALID_STATUSES = ("pending", "confirmed", "cancelled", "completed")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


@appointments.route("/appointments", methods=["GET"])
def get_appointments():
    if "user" not in session:
        return jsonify({"message": "Unauthorized"}), 401

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT appointments.*, services.name AS service_name
        FROM appointments
        JOIN services ON appointments.service_id = services.id
    """)
    data = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in data])


@appointments.route("/appointments", methods=["POST"])
def add_appointment():
    data = request.get_json(silent=True)
    if not data or not all(k in data for k in REQUIRED_FIELDS):
        return jsonify({"message": "Missing fields", "success": False}), 400

    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute(
            """INSERT INTO appointments
            (customer_name, customer_phone, appointment_date, appointment_time, service_id)
            VALUES (?, ?, ?, ?, ?)""",
            (
                data["customer_name"],
                data["customer_phone"],
                data["appointment_date"],
                data["appointment_time"],
                data["service_id"],
            )
        )
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        return jsonify({"message": "Invalid service", "success": False}), 400
    conn.close()
    return jsonify({"message": "Appointment booked", "success": True}), 201


@appointments.route("/appointments/<int:id>", methods=["PUT"])
def update_appointment(id):
    if "user" not in session:
        return jsonify({"message": "Unauthorized"}), 401

    data = request.get_json(silent=True)
    if not data or data.get("status") not in VALID_STATUSES:
        return jsonify({"message": "Invalid status", "success": False}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE appointments SET status=? WHERE id=?",
        (data["status"], id)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Appointment updated", "success": True}), 200


@appointments.route("/appointments/<int:id>", methods=["DELETE"])
def delete_appointment(id):
    if "user" not in session:
        return jsonify({"message": "Unauthorized"}), 401

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM appointments WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Appointment deleted", "success": True}), 200


@appointments.route("/appointments/search", methods=["GET"])
def search_appointments():
    phone = request.args.get("phone")
    if not phone:
        return jsonify({"message": "Phone required"}), 400

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT appointments.*, services.name AS service_name
        FROM appointments
        JOIN services ON appointments.service_id = services.id
        WHERE appointments.customer_phone = ?
    """, (phone,))
    data = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in data])