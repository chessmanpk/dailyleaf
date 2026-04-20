import "../styles/form.css";

function Login () {
    return (
        <div className="form-container">
           <h2>Welcome back</h2>
           <p>Log in with your username or email and password.</p>
           <input type="text" placeholder="Email or Username" />
           <input type="password" placeholder="Password" />
           <button>Login</button>
        </div>
    );
}

export default Login;