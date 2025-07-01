import React from "react";
import { createNewUser, signInUser } from "../action";
import { useNavigate } from "react-router-dom";
import useAuth from "../authContext";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signUpEmail, setSignUpEmail] = React.useState("");
  const [signUpPassword, setSignUpPassword] = React.useState("");
  const [confirmSignUpPassword, setConfirmSignUpPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [showSignUpForm, setShowSignUpForm] = React.useState(false);

  function SignIn() {
    const handleSignIn = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      try {
        const user = await signInUser({
          email,
          password,
        });
        if (user) {
          updateUser(user);
          navigate("/");
        }
      } catch (e) {}
    };
    return (
      <>
        <h1 style={{ textAlign: "center" }}>Log In</h1>
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required
          />
          <button type="submit">Log in</button>
          <span className="no-account">
            Don't have an account?{" "}
            <span onClick={() => setShowSignUpForm(true)}>Sign Up</span>
          </span>{" "}
        </form>
      </>
    );
  }

  function SignUp() {
    const handleSignUp = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      if (confirmSignUpPassword !== signUpPassword) {
        setError("Passwords must match");
        return;
      }
      if (!name || !signUpEmail || !signUpPassword) {
        setError("Ensure all fields are populated");
        return;
      }
      const user = await createNewUser({
        name,
        email: signUpEmail,
        password: signUpPassword,
      });
      if (user) {
        updateUser(user);
        navigate("/");
      }
    };
    return (
      <>
        <h2 style={{ textAlign: "center" }}>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="name"
            name="name"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
            aria-required
          />
          <input
            type="email"
            name="email"
            value={signUpEmail}
            placeholder="Email Address"
            onChange={(e) => setSignUpEmail(e.target.value)}
            required
            aria-required
          />
          <input
            type="password"
            name="password"
            value={signUpPassword}
            placeholder="Password"
            onChange={(e) => setSignUpPassword(e.target.value)}
            required
          />
          <input
            type="password"
            name="confirm_password"
            value={confirmSignUpPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmSignUpPassword(e.target.value)}
            required
            aria-required
          />
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error} </p>
          )}
          <button type="submit">Sign Up</button>
          <span className="no-account">
            Already have an account?{" "}
            <span onClick={() => setShowSignUpForm(false)}>Log In</span>
          </span>
        </form>
      </>
    );
  }
  return (
    <div className="auth-form"> {showSignUpForm ? SignUp() : SignIn()}</div>
  );
};

export default Login;
