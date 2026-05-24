import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";


function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      console.log(res);

      const data = await res.json();

      console.log(data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.email);

        navigate("/");
      } else {
        alert("Login failed");
      }
      
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="auth-box">
      <h2>Welcome back!</h2>
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;