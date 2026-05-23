import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="text-2xl font-bold text-pink-400 mb-4">✂️ Glamour</h3>
          <p className="text-gray-400">Look good. Feel great. Every day. Professional salon services tailored just for you.</p>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-gray-400 hover:text-pink-400">Home</Link>
            <Link to="/services" className="text-gray-400 hover:text-pink-400">Services</Link>
            <Link to="/book" className="text-gray-400 hover:text-pink-400">Book Appointment</Link>
            <Link to="/my-booking" className="text-gray-400 hover:text-pink-400">My Booking</Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">Contact Us</h4>
          <div className="flex flex-col gap-2 text-gray-400">
            <p>📍 Lakeside, Pokhara, Nepal</p>
            <p>📞 +977 987654321</p>
            <p>✉️ glamour@salon.com</p>
            <p>🕐 Mon-Sat: 9AM - 7PM</p>
          </div>
        </div>

      </div>
      <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
        © 2026 Glamour Salon. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer