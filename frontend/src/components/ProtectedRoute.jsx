import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import API_URL from "../config"

function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading")

  useEffect(() => {
    fetch(`${API_URL}/api/check-auth`, { credentials: "include" })
      .then((res) => setStatus(res.ok ? "ok" : "denied"))
      .catch(() => setStatus("denied"))
  }, [])

  if (status === "loading") return <p>Checking login...</p>
  if (status === "denied") return <Navigate to="/admin" replace />

  return children
}

export default ProtectedRoute