import "../styles/form.css";

function Login () {
    return (
        <div className="form-container">
           <h2>Login</h2>
           <input type="text" placeholder="Email" />
           <input type="password" placeholder="Password" />
           <button>Login</button>
        </div>
    );
}

export default Login;