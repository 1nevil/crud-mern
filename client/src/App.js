import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Display from "./pages/Display";
import Insert from "./pages/Insert";
import Update from "./pages/Update";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Display />} />
          <Route path="/display" element={<Display />} />
          <Route path="/insert" element={<Insert />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
