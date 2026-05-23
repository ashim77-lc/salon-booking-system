import { useState, useEffect } from "react"
import axios from "axios"
import API_URL from "../config"

function BookAppointment() {
  const [services, setServices] = useState([])
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [serviceId, setServiceId] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    axios.get(`${API_URL}/api/services`)
      .then(response => {
        setServices(response.data)
        document.title = "Glamour Salon | My Bookings"
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (customerPhone.length !== 10) {
      alert("Phone number must be exactly 10 digits")
      return
    }

    setLoading(true)

    axios.post(`${API_URL}/api/appointments`, {
      customer_name: customerName,
      customer_phone: customerPhone,
      service_id: parseInt(serviceId),
      appointment_date: date,
      appointment_time: time
    })
    .then(() => {
      setSuccess(true)
      setLoading(false)
      setCustomerName("")
      setCustomerPhone("")
      setServiceId("")
      setDate("")
      setTime("")
    })
    .catch(error => {
      console.error("Booking failed:", error)
      setLoading(false)
    })
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">Book Appointment</h1>

      {success && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 text-center">✅ Appointment booked successfully!</div>
      )}

      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-medium">Your Name</label>
          <input
            type="text"
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-medium">Phone Number</label>
          <input
            type="text"
            value={customerPhone}
            onChange={e => {
              const val = e.target.value
              if (/^\d{0,10}$/.test(val)) {
                setCustomerPhone(val)
              }
            }}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-medium">Select Service</label>
          <select
            value={serviceId}
            onChange={e => setServiceId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
          >
            <option value="">-- Select a service --</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>
                {service.name} — ${service.price} ({service.duration} mins)
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2 font-medium">Time</label>
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-pink-500 text-white py-3 rounded-full font-bold hover:bg-pink-600 disabled:opacity-50"
        >
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </div>
    </div>
  )
}

export default BookAppointment