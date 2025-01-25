import { Route, Routes } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import HomePage from "../Pages/HomePage";
import AuthPage from "../Pages/AuthPage";
import ForgotPassword from "../Pages/ForgotPassword";

function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      {/* <Route path="/profile" element={<Profile />} />
      <Route path="/suggestions" element={<Suggestions />} /> */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default MainRoute;
