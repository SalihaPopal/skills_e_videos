"use client";
import { useState } from "react";
import styles from "./signin.module.css";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function SignIn() {
  const [loginUser, setLoginUser] = useState({ username: "", password: "" });
  const [signupUser, setSignupUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState({
    login: false,
    signup: false,
  });

  async function handleSignin(e) {
    e.preventDefault();
    try {
      await fetch("/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      })
        .then((response) => response.json())
        .then((response) => {
          alert("Login successful");
          setLoginUser({ username: "", password: "" });
        });
    } catch (error) {
      console.log("Login failed", error);
      alert("An error occurred while logging in. Please try again.", error);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    try {
      await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupUser),
      })
        .then((response) => response.json())
        .then((response) => {
          alert("Signup successful");
          setSignupUser({ username: "", email: "", password: "" });
        });
    } catch (error) {
      console.log("Signup failed", error);
      alert("An error occurred while signing up. Please try again.", error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Sign in</h1>
        <h2 className={styles.subtitle}>To continue and upload videos</h2>
        <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder="Username..."
              type="text"
              value={loginUser.username}
              onChange={(e) =>
                setLoginUser({ ...loginUser, username: e.target.value })
              }
              required
            />
            <div className={styles.passwordContainer}>
              <input
                className={styles.input}
                placeholder="Password..."
                type={showPassword.login ? "text" : "password"}
                value={loginUser.password}
                onChange={(e) =>
                  setLoginUser({ ...loginUser, password: e.target.value })
                }
                required
              />
              <IconButton
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    login: !showPassword.login,
                  })
                }
                sx={{
                  position: "absolute",
                  right: 0,
                  top: "40%",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword.login ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
            <button onClick={handleSignin} className={styles.btn}>
              Sign in
            </button>

          <h1>or</h1>

          <h2 className={styles.subtitle}>
            Don't have an account? Sign up please!
          </h2>
            <input
              className={styles.input}
              placeholder="Username..."
              type="text"
              value={signupUser.username}
              onChange={(e) =>
                setSignupUser({ ...signupUser, username: e.target.value })
              }
              required
            />
            <input
              className={styles.input}
              placeholder="Email..."
              type="email"
              value={signupUser.email}
              onChange={(e) =>
                setSignupUser({ ...signupUser, email: e.target.value })
              }
              required
            />
            <div className={styles.passwordContainer}>
              <input
                className={styles.input}
                placeholder="Password..."
                type={showPassword.signup ? "text" : "password"}
                value={signupUser.password}
                onChange={(e) =>
                  setSignupUser({ ...signupUser, password: e.target.value })
                }
                required
              />
              <IconButton
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    signup: !showPassword.signup,
                  })
                }
                sx={{
                  position: "absolute",
                  right: 0,
                  top: "40%",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword.signup ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
            <button onClick={handleSignup} className={styles.btn}>
              Sign up
            </button>
        </div>
      </div>
    </div>
  );
}
