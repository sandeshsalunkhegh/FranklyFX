import { Route, Routes } from "react-router-dom";

import { HomePage } from "./routes/HomePage";
import { AboutPage } from "./routes/AboutPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}

