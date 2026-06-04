import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.clear();

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1>Dailyleaf 🌿</h1>

      <div className="links">
        <Link to="/">Home</Link>
        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
        {darkMode ? "☀️" : "🌙"}
        </button>
        
        {token ? (
          <>
            <span style={{ color: "white", marginRight: "10px" , marginLeft: "10px"}}>
              {user}
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;