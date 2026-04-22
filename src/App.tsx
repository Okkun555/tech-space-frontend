import { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"

function HealthCheck() {
  const [status, setStatus] = useState("")

  useEffect(() => {
    fetch("http://localhost:3000/health/check")
        .then(res => res.json())
        .then(data => setStatus(data.status))
  }, [])

  return <div>{status}</div>
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HealthCheck />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
