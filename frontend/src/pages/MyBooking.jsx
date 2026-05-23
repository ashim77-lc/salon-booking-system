import { useState, useEffect } from "react"
import API_URL from "../config"
import axios from "axios"

function MyBooking() {
  const [phone, setPhone] = useState("")
  const [appointments, setAppointments] = useState([])
  const [searched, setSearched] = useState(false)

  useEffect(() => { document.title = "Glamour Salon | My Bookings" }, [])


  const handleSearch = () => {
    axios.get(`${API_URL}/api/appointments/search?phone=${phone}`)
      .then(response => {
        const filtered = response.data.filter(
          appointment => appointment.customer_phone === phone
        )
        setAppointments(filtered)
        setSearched(true)
      })
      .catch(error => {
        console.error("Error:", error)
      })
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
        My Bookings
      </h1>

      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <label className="block text-gray-600 mb-2 font-medium">
          Enter your phone number
        </label>
        <input
          type="text"
          value={phone}
          onChange={e => {
            const val = e.target.value
            if (/^\d{0,10}$/.test(val)) {
              setPhone(val)
            }
          }}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-pink-400"
          placeholder="e.g. 9800000000"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-pink-500 text-white py-3 rounded-full font-bold hover:bg-pink-600"
        >
          Search Bookings
        </button>
      </div>

     
      {searched && appointments.length === 0 && (
        <div className="text-center text-gray-500 text-lg">
          No appointments found for this number.
        </div>
      )}

      {appointments.map(appointment => (
        <div key={appointment.id} className="bg-white rounded-xl shadow-md p-6 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold text-gray-700">
              {appointment.service_name}
            </h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium
              ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-600' : ''}
              ${appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : ''}
              ${appointment.status === 'completed' ? 'bg-blue-100 text-blue-600' : ''}
              ${appointment.status === 'cancelled' ? 'bg-red-100 text-red-600' : ''}
            `}>
              {appointment.status}
            </span>
          </div>
          <p className="text-gray-500">📅 {appointment.appointment_date}</p>
          <p className="text-gray-500">🕐 {appointment.appointment_time}</p>
          <p className="text-gray-500">👤 {appointment.customer_name}</p>
        </div>
      ))}
    </div>
  )
}

export default MyBooking