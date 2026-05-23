import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import API_URL from "../config"

const getServiceImage = (name) => {
  const images = {
    "Haircut": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400",
    "Hair Coloring": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
    "Facial": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400",
    "Massage": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400",
    "Manicure": "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400",
    "Pedicure": "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400",
    "Hair Spa": "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?w=400",
    "Eyebrow Threading": "https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?w=400",
    "Bridal Makeup": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400",
  }
  return images[name] || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400"
}

function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get(`${API_URL}/api/services`)
    .then(response => {
      setServices(response.data)
      document.title = "Glamour Salon | Services"
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching services:", error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-pink-500 text-xl animate-pulse">Loading services...</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-700 mb-4">
        Our Services
      </h1>
      <p className="text-center text-gray-400 mb-12">
        Professional treatments tailored just for you
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
            <img
              src={getServiceImage(service.name)}
              alt={service.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-700">{service.name}</h3>
                <span className="bg-pink-100 text-pink-500 text-xs px-2 py-1 rounded-full">
                  {service.type}
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4">⏱ {service.duration} mins</p>
              <div className="flex justify-between items-center">
                <p className="text-pink-600 font-bold text-xl">${service.price}</p>
                <Link
                  to="/book"
                  className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-600"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services