"use client";

// components/LoginForm.js

import React, { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const { name, email, token } = await res.json();

        // Store user information and token in sessionStorage
        sessionStorage.setItem("user", JSON.stringify({ name, email }));
        sessionStorage.setItem("token", token);

        setError("");
        // Navigate to UserInfo page upon successful login
        window.location.href = "/userinfo";
      } else {
        const { message } = await res.json();
        setError(message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred while logging in");
    }
  };

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover z-0 blur-sm"
        >
          <source src="assets/DonyatiEPM.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black opacity-50 z-10">
          <img
            className="loginLogo absolute top-0 left-0 mt-4 ml-4 w-20"
            src="/assets/Donyati-Logo.svg"
            alt="Donyati Logo"
          />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-end">
        <div className="bg-white p-8 rounded-md shadow-lg z-20 mr-20">
          <h1 className="text-xl font-bold mb-4">Log In</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
              LogIn
            </button>
            {error && (
              <div className="bg-red-500 text-white px-4 py-2 rounded-md">
                {error}
              </div>
            )}
            <Link href="/register" className="text-sm text-right">
              Don't Have an Account? <span className="underline">Register</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
