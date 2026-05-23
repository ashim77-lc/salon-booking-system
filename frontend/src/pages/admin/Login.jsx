import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import API_URL from "../../config"

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {
    axios.post(`${API_URL}/api/login`, {
      username: username,
      password: password
    }, { withCredentials: true })
    .then(() => {
      navigate("/admin/dashboard")
    })
    .catch(() => {
      setError("Invalid credentials")
    })
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
        Admin Login
      </h1>

      <div className="bg-white rounded-xl shadow-md p-8">
        
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-600 mb-2 font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
            placeholder="Enter your password"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-pink-500 text-white py-3 rounded-full font-bold hover:bg-pink-600"
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Login