from flask import Flask, jsonify, request
from flask_cors import CORS
from config import SECRET_KEY
from routes.auth import auth
from routes.services import services
from routes.appointments import appointments
from database import init_db

app = Flask(__name__)
app.secret_key = SECRET_KEY
CORS(app, supports_credentials=True, origins=[
    "http://localhost:5173",
    "https://glamoursalon-np.netlify.app"
])

init_db()

@app.route('/')
def test_route():
    return jsonify({"message": "Salon API running"})

app.register_blueprint(auth, url_prefix="/api")
app.register_blueprint(services, url_prefix="/api")
app.register_blueprint(appointments, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)