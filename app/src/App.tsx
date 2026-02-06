import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/landing-page";
import { KitPage } from "./pages/kit-page";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/kit" element={<KitPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
