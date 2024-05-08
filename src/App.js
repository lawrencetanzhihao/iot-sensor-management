import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import SensorConfig from "./components/SensorConfig/SensorConfig";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/config" element={<SensorConfig />} />
      </Routes>
    </Router>
  );
}

export default App;
