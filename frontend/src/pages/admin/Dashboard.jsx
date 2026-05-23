import { useState, useEffect } from "react"
import axios from "axios"
import API_URL from "../../config"

function Dashboard() {
    const [totalAppointments, setTotalAppointments] = useState(0)
    const [pendingAppointments, setPendingAppointments] = useState(0)
    const [totalServices, setTotalServices] = useState(0)
    const [todayAppointments, setTodayAppointments] = useState(0)
    useEffect(() => {
    axios.get(`${API_URL}/api/appointments`)
        .then(response => {
        const data = response.data
        const today = new Date().toISOString().split("T")[0]
        
        setTotalAppointments(data.length)
        setPendingAppointments(data.filter(a => a.status === "pending").length)
        setTodayAppointments(data.filter(a => a.appointment_date === today).length)
        })

    
    axios.get(`${API_URL}/api/appointments`)
        .then(response => {
        setTotalServices(response.data.length)
        })
    }, [])
    return (
        <div>
            {/* Admin Navbar */}
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
            <h1 className="text-3xl font-bold text-gray-700 mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <a href="/admin/appointments" className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer">
                <p className="text-4xl font-bold text-pink-500">{totalAppointments}</p>
                <p className="text-gray-500 mt-2">Total Appointments</p>
                </a>

                <a href="/admin/appointments" className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer">
                <p className="text-4xl font-bold text-yellow-500">{pendingAppointments}</p>
                <p className="text-gray-500 mt-2">Pending</p>
                </a>

                <a href="/admin/appointments" className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer">
                <p className="text-4xl font-bold text-blue-500">{todayAppointments}</p>
                <p className="text-gray-500 mt-2">Today</p>
                </a>

                <a href="/admin/services" className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer">
                <p className="text-4xl font-bold text-green-500">{totalServices}</p>
                <p className="text-gray-500 mt-2">Total Services</p>
                </a>

            </div>
            </div>
        </div>
    )   
}
export default Dashboard         