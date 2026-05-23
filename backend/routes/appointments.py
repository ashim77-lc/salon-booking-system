from flask import Blueprint, jsonify, request, session
import sqlite3
import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "..", "salon.db")


appointments = Blueprint('appointments', __name__)

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@appointments.route("/appointments", methods=["GET"])
def get_appointments():
    # if "user" not in session:
    #     return jsonify({"message": "Unauthorized"}), 401
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT appointments.*, services.name as service_name 
        FROM appointments 
        JOIN services ON appointments.service_id = services.id
    """)
    data = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in data])

@appointments.route("/appointments", methods=["POST"])
def add_appointment():
    data = request.get_json()
    customer_name = data["customer_name"]
    customer_phone = data["customer_phone"]
    appointment_date = data["appointment_date"]
    appointment_time = data["appointment_time"]
    service_id = data["service_id"]

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        """INSERT INTO appointments 
        (customer_name, customer_phone, appointment_date, appointment_time, service_id) 
        VALUES (?, ?, ?, ?, ?)""",
        (customer_name, customer_phone, appointment_date, appointment_time, service_id)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Appointment booked", "success": True}), 201

@appointments.route("/appointments/<int:id>", methods=["PUT"])
def update_appointment(id):
    # if "user" not in session:
    #     return jsonify({"message": "Unauthorized"}), 401

    data = request.get_json()
    status = data["status"]

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE appointments SET status=? WHERE id=?",
        (status, id)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Appointment updated", "success": True}), 200

@appointments.route("/appointments/<int:id>", methods=["DELETE"])
def delete_appointment(id):
    # if "user" not in session:
    #     return jsonify({"message": "Unauthorized"}), 401

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM appointments WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Appointment deleted", "success": True}), 200
@appointments.route("/appointments/search", methods=["GET"])
def search_appointments():
    phone = request.args.get("phone")
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT appointments.*, services.name as service_name 
        FROM appointments 
        JOIN services ON appointments.service_id = services.id
        WHERE appointments.customer_phone = ?
    """, (phone,))
    data = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in data])