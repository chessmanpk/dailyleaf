import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import "./styles/global.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Navbar from "./components/Navbar";


function App() {
  useEffect (() => {
    fetch("http://localhost:5000")
      .then(res => res.text())
      .then(data => console.log(data));
  }, []);

  return (
    <div>
      <h1>Dailyleaf 🌿</h1>
    </div>
    // <Router>
    //   <Navbar />
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/signup" element={<Signup />} />
    //   </Routes>
    // </Router>

    // <div>
    //   <h1>DailyLeaf 🌿</h1>
    //   <p>Building Consistency, one day at a time.</p>
    //   <p>Something GOOD is coming soon. Insha Allah ❤️</p>
    // </div>
  );
}

export default App;