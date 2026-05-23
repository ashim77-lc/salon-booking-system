import { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Services from "./pages/Services"
import BookAppointment from "./pages/BookAppointment"
import MyBooking from "./pages/MyBooking"
import Login from "./pages/admin/Login"
import Dashboard from "./pages/admin/Dashboard"
import ManageServices from "./pages/admin/ManageServices"
import ManageAppointments from "./pages/admin/ManageAppointments"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        window.location.href = '/admin'
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/my-booking" element={<MyBooking />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute><ManageServices /></ProtectedRoute>} />
        <Route path="/admin/appointments" element={<ProtectedRoute><ManageAppointments /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App