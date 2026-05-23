import { Link } from "react-router-dom"
import { useState } from "react"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-pink-600">
          ✂️ Glamour
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          <Link to="/" className="text-gray-600 hover:text-pink-500 font-medium">Home</Link>
          <Link to="/services" className="text-gray-600 hover:text-pink-500 font-medium">Services</Link>
          <Link to="/book" className="text-gray-600 hover:text-pink-500 font-medium">Book Appointment</Link>
          <Link to="/my-booking" className="text-gray-600 hover:text-pink-500 font-medium">My Booking</Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-gray-600 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 flex flex-col gap-3">
          <Link to="/" className="text-gray-600 hover:text-pink-500 font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/services" className="text-gray-600 hover:text-pink-500 font-medium" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/book" className="text-gray-600 hover:text-pink-500 font-medium" onClick={() => setMenuOpen(false)}>Book Appointment</Link>
          <Link to="/my-booking" className="text-gray-600 hover:text-pink-500 font-medium" onClick={() => setMenuOpen(false)}>My Booking</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar