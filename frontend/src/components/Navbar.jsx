// import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {

  const isLoggedIn = localStorage.getItem("isLoggedIn"); 

  return (
    <nav className="navbar">
      <h1>Dailyleaf 🌿</h1>
      <div className="links">
        <a href="/">Home</a>

        {isLoggedIn ? (
          <button className="logout-btn" onClick={() => {
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
          }}>
            Logout
          </button>
        ) : (
          <>
          <a href="/login">Login</a>
          <a href="/signup">Signup</a>
          </>
        )}
      </div>
    </nav>
    // <nav className="navbar">
    //   <h1>Dailyleaf 🌿</h1>
    //   <div className="links">
    //     <Link to="/">Home</Link>
    //     <Link to="/login">Login</Link>
    //     <Link to="/signup">Signup</Link>
    //   </div>
    // </nav>
  );
}

export default Navbar;