import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import API_URL from "../../config"

function ManageAppointments() {
  const [appointments, setAppointments] = useState([])
  const navigate = useNavigate()

  const fetchAppointments = () => {
    axios.get(`${API_URL}/api/appointments`)
      .then(response => setAppointments(response.data))
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const updateStatus = (id, status) => {
    axios.put(`${API_URL}/api/appointments/${id}`, { status })
      .then(() => fetchAppointments())
  }

  const deleteAppointment = (id) => {
    if (window.confirm("Delete this appointment?")) {
      axios.delete(`${API_URL}/api/appointments/${id}`)
        .then(() => fetchAppointments())
    }
  }

  return (
    <div>
      
      <div className="bg-gray-800 text-white px-6 py-3 flex gap-6">
        <a href="/admin/dashboard" className="hover:text-pink-300">Dashboard</a>
        <a href="/admin/services" className="hover:text-pink-300">Services</a>
        <a href="/admin/appointments" className="hover:text-pink-300">Appointments</a>
              <a 
                href="#"
                onClick={() => {
                localStorage.removeItem("isAdmin")
                window.location.href = "/admin"
                }}
                className="hover:text-pink-300 ml-auto cursor-pointer"
            >
                Logout
            </a>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-8">
          Manage Appointments
        </h1>

        {appointments.length === 0 && (
          <p className="text-center text-gray-500 py-8">No appointments yet.</p>
        )}

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map(a => (
            <div key={a.id} className="bg-white rounded-xl shadow-md p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-gray-700">{a.customer_name}</h3>
                  <p className="text-gray-500 text-sm">{a.customer_phone}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium
                  ${a.status === 'confirmed' ? 'bg-green-100 text-green-600' : ''}
                  ${a.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : ''}
                  ${a.status === 'completed' ? 'bg-blue-100 text-blue-600' : ''}
                  ${a.status === 'cancelled' ? 'bg-red-100 text-red-600' : ''}
                `}>
                  {a.status}
                </span>
              </div>

              <p className="text-pink-500 font-medium mb-1">💇 {a.service_name}</p>
              <p className="text-gray-500 text-sm mb-1">📅 {a.appointment_date}</p>
              <p className="text-gray-500 text-sm mb-4">🕐 {a.appointment_time}</p>

              <div className="flex flex-col gap-2">
                <select
                  value={a.status}
                  onChange={e => updateStatus(a.id, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-400"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button
                  onClick={() => deleteAppointment(a.id)}
                  className="w-full bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ManageAppointments