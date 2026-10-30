# Glamour Salon - Salon Booking System

A full-stack salon booking web app built with a Flask REST API and a React frontend. Customers can browse services and book appointments. Admins log in to manage the business.

## Live Demo

- Frontend: https://glamoursalon-np.netlify.app/
- Backend API: https://salon-booking-system-vow6.onrender.com/api/services

> The backend runs on Render's free tier. It sleeps when idle, so the first request can take 30-60 seconds. Demo data resets on every restart.

## Features

- Browse salon services with price and duration.
- Book an appointment by choosing a service, date and time.
- Phone number validation on the booking form.
- View your bookings on the My Booking page.
- Admin login with hashed passwords and session-based authentication.
- Protected admin dashboard that checks the session on the server.

## Tech Stack

- Frontend: React, React Router, Vite
- Backend: Flask, Flask-CORS
- Database: SQLite
- Hosting: Netlify (frontend), Render (backend)

## Project Structure

```
salon-booking-system/
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── database.py
│   ├── requirements.txt
│   └── routes/
│       ├── auth.py
│       ├── services.py
│       └── appointments.py
└── frontend/
    ├── package.json
    └── src/
```

## Run Locally

### Backend

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
python -m pip install -r requirements.txt
python app.py
```

The API runs at http://localhost:5000. Tables, default services and the admin user are created automatically on first start.

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

The app runs at http://localhost:5173.

## Environment Variables (backend)

| Name | Purpose |
|------|---------|
| `SECRET_KEY` | Signs the session cookie. Use a long random value. |
| `ADMIN_USERNAME` | Username of the admin created on first start. |
| `ADMIN_PASSWORD` | Password of the admin created on first start. |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | List all services |
| POST | `/api/appointments` | Create a booking |
| POST | `/api/login` | Admin login |
| POST | `/api/logout` | Admin logout |
| GET | `/api/check-auth` | Check the current session |

Admin-only endpoints return 401 without a valid session.

## Known Limitations

- SQLite on Render's free tier is not persistent, so bookings are lost when the service restarts. Use a hosted database such as PostgreSQL for production.
- The ManageServices and ManageAppointments admin pages are still in progress.

## Author

Ashim Lamichhane - [GitHub](https://github.com/ashim77-lc)
