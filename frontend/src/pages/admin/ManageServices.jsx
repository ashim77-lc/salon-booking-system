import { useState, useEffect } from "react"
import axios from "axios"
import API_URL from "../../config"

function ManageServices() {
  const [services, setServices] = useState([])
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [price, setPrice] = useState("")
  const [duration, setDuration] = useState("")
  const [editId, setEditId] = useState(null)
  const [success, setSuccess] = useState("")

  const fetchServices = () => {
    axios.get(`${API_URL}/api/services`)
      .then(response => setServices(response.data))
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleSubmit = () => {
    const data = { name, type, price: parseFloat(price), duration: parseInt(duration) }

    if (editId) {
      axios.put(`${API_URL}/api/services/${editId}`, data)
        .then(() => {
          fetchServices()
          resetForm()
          setSuccess("Service updated!")
        })
    } else {
      axios.post("http://127.0.0.1:5000/api/services", data)
        .then(() => {
          fetchServices()
          resetForm()
          setSuccess("Service added!")
        })
    }
  }

  const handleEdit = (service) => {
    setEditId(service.id)
    setName(service.name)
    setType(service.type)
    setPrice(service.price)
    setDuration(service.duration)
  }

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/api/services/${id}`)
      .then(() => fetchServices())
  }

  const resetForm = () => {
    setEditId(null)
    setName("")
    setType("")
    setPrice("")
    setDuration("")
    setTimeout(() => setSuccess(""), 3000)
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
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-700 mb-8">Manage Services</h1>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-600 mb-4">
            {editId ? "Edit Service" : "Add New Service"}
          </h2>

          {success && (
            <div className="bg-green-100 text-green-600 p-3 rounded-lg mb-4 text-center">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-600 mb-1">Service Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
                placeholder="e.g. Haircut"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Type</label>
              <input
                type="text"
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
                placeholder="e.g. Hair"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
                placeholder="e.g. 25"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Duration (mins)</label>
              <input
                type="number"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
                placeholder="e.g. 30"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 font-bold"
            >
              {editId ? "Update Service" : "Add Service"}
            </button>
            {editId && (
              <button
                onClick={resetForm}
                className="bg-gray-200 text-gray-600 px-6 py-2 rounded-full hover:bg-gray-300"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-pink-50">
              <tr>
                <th className="px-4 py-3 text-gray-600">Name</th>
                <th className="px-4 py-3 text-gray-600">Type</th>
                <th className="px-4 py-3 text-gray-600">Price</th>
                <th className="px-4 py-3 text-gray-600">Duration</th>
                <th className="px-4 py-3 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.id} className="border-t">
                  <td className="px-4 py-3">{service.name}</td>
                  <td className="px-4 py-3">{service.type}</td>
                  <td className="px-4 py-3">${service.price}</td>
                  <td className="px-4 py-3">{service.duration} mins</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {services.length === 0 && (
            <p className="text-center text-gray-500 py-8">No services yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ManageServices