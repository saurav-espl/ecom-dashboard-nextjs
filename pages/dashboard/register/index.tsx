import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAt,
  faLock,
  faUser,
  faPhone,
  faEye,
  faEyeSlash,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [type, setType] = useState("password");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password) {
      setError("All Fields are mandatory");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        e.target.reset();
        setError("");
        alert("Registration successful!");
        router.push("/dashboard/login");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <main className="form_container">
      <div className="formDiv">
        <form onSubmit={handleSubmit} className="form">
          <h2 className="page-title">SignUp</h2>

          <div className="flex-column">
            <label>Full Name</label>
          </div>
          <div className="inputForm">
            {/* Safety Check for faUser */}
            {faUser && <FontAwesomeIcon width={15} icon={faUser} />}
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="input"
              placeholder="Enter your Full Name"
            />
          </div>

          <div className="flex-column">
            <label>Email </label>
          </div>
          <div className="inputForm">
            {/* Safety Check for faAt */}
            {faAt && <FontAwesomeIcon width={15} icon={faAt} />}
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="input"
              placeholder="Enter your Email"
            />
          </div>

          <div className="flex-column">
            <label>Phone Number</label>
          </div>
          <div className="inputForm">
            {/* Safety Check for faPhone */}
            {faPhone && <FontAwesomeIcon width={15} icon={faPhone} />}
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              className="input"
              placeholder="Enter your Phone Number"
            />
          </div>

          <div className="flex-column">
            <label>Adress</label>
          </div>
          <div className="inputForm">
            {/* Safety Check for faPhone */}
            {faPhone && <FontAwesomeIcon width={15} icon={faLocationDot} />}
            <input
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="input"
              placeholder="Enter your Adress"
            />
          </div>

          <div className="flex-column">
            <label>Password </label>
          </div>
          <div className="inputForm">
            {/* Safety Check for faLock */}
            {faLock && <FontAwesomeIcon width={15} icon={faLock} />}
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={type}
              className="input"
              placeholder="Enter your Password"
            />
            {/* Safety Check for faEye */}
            {faEye && type == "password" ? <FontAwesomeIcon onClick={() => { if (type == "password") setType("text"); else setType("password"); }} width={15} icon={faEye} /> : <FontAwesomeIcon onClick={() => { if (type == "password") setType("text"); else setType("password"); }} width={15} icon={faEyeSlash} />}
          </div>

          {error && (
            <div className="Error" style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
              {error}
            </div>
          )}

          <button type="submit" className="button-submit">Register</button>

          <p className="p">
            Already have an account?{" "}
            <Link href="/dashboard/login" className="span">
              Login In
            </Link>
          </p>
          <p className="p line">Or With</p>

          <div className="flex-row">
            <button type="button" className="btn google">
              {faGoogle && <FontAwesomeIcon width={15} icon={faGoogle} />}
              Google
            </button>
            <button type="button" className="btn apple">
              {/* BRAND ICON SAFETY CHECK */}
              {faApple && <FontAwesomeIcon width={15} icon={faApple} />}
              Apple
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;