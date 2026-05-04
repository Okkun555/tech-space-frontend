import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfileCreate from "./pages/ProfileCreatePage";
import { HeaderLayout } from "./components/layout/Header";

function HealthCheck() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/health/check")
      .then((res) => res.json())
      .then((data) => setStatus(data.status));
  }, []);

  return <div>{status}</div>;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<HeaderLayout />}>
        <Route path="/" element={<HealthCheck />} />
        <Route path="/profile/new" element={<ProfileCreate />} />
      </Route>
    </Routes>
  );
}

export default App;
