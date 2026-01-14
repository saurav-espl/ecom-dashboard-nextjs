import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [type, setType] = useState("password");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setError("");
        alert("Login successful");
        router.push("/dashboard"); // redirect
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <main className="form_container">
      <div className="formDiv">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="page-title">Login</h2>

          <div className="flex-column">
            <label>Email</label>
          </div>
          <div className="inputForm">
            {faAt && <FontAwesomeIcon width={15} icon={faAt} />}
            <input
              type="email"
              className="input"
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex-column">
            <label>Password</label>
          </div>
          <div className="inputForm">
            {faLock && <FontAwesomeIcon width={15} icon={faLock} />}
            <input
              type={type}
              className="input"
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {faEye && type == "password" ? <FontAwesomeIcon onClick={() => { if (type == "password") setType("text"); else setType("password"); }} width={15} icon={faEye} /> : <FontAwesomeIcon onClick={() => { if (type == "password") setType("text"); else setType("password"); }} width={15} icon={faEyeSlash} />}
          </div>

          {error && (
            <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
          )}

          <button type="submit" className="button-submit">
            Sign In
          </button>

          <p className="p">
            Do not have an account?{" "}
            <Link href="/dashboard/register">
              <span className="span">Sign Up</span>
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
