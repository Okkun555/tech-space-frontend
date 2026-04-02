// App.jsx
import { useEffect, useState } from "react"

function App() {
  const [status, setStatus] = useState("")

  useEffect(() => {
    fetch("http://localhost:3000/health/check")
        .then(res => res.json())
        .then(data => setStatus(data.status))
  }, [])

  return <div>{status}</div>
}

export default App