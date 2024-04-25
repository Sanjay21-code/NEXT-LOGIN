"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        setError("User registered successfully");
        router.push("/login");
      } else {
        const { message } = await res.json();
        setError(message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("An error occurred while registering");
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
        <div
          className="bg-white p-8 rounded-md shadow-lg z-50 mr-20"
          style={{ marginLeft: "auto" }}
        >
          <h1 className="text-xl font-bold my-4">Register</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
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
              Register
            </button>
            {error && (
              <div className="bg-red-500 text-white px-4 py-2 rounded-md">
                {error}
              </div>
            )}
            <Link href="/login" className="text-sm mt-3 text-right">
              Already Have an Account? <span className="underline">Login</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
