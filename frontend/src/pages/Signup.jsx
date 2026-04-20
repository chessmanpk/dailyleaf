function Signup() {
  return (
    <div className="form-container">
      <h2>Ready to SignUp?</h2>
      <p>Enter an email or username and a password to get started.</p>
      <input type="text" placeholder="Email or Username" />
      <input type="password" placeholder="Password" />
      <button>Create Account</button>
    </div>
  );
}

export default Signup;