import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import BarIcon from "./ui/BarIcon";
import useWindowDimensions from "./ui/useWindowSize";
import Recommendations from "./ui/Recommendations";
import "./index.css";

function App() {
  const [showBar, setShowBar] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <BrowserRouter>
      <div className="relative h-100">
        {width < 1080 && <BarIcon showBar={showBar} setShowBar={setShowBar} />}
        <Routes>
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/" element={<AppLayout showBar={showBar} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;