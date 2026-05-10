import { Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ProfileCreate from "@/pages/ProfileCreatePage";
import TimeLinePage from "@/pages/TimeLinePage";
import { HeaderLayout } from "@/components/layout/Header";
import { RequireAuth } from "@/components/auth/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<RequireAuth />}>
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<TimeLinePage />} />
          <Route path="/profile/new" element={<ProfileCreate />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
