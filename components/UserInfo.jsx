// components/UserInfo.js
"use client";
import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const UserInfo = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleLogout = () => {
    // Clear sessionStorage
    sessionStorage.removeItem("user");
    // Redirect to login page
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen">
      {/* Left Side Navigation */}
      <div className="bg-gray-800 text-white w-40 flex flex-col justify-between">
        {/* Logo */}
        <div className="py-4 px-6">
          <img src="/assets/Donyati-Logo.svg" alt="Logo" className="h-8" />
        </div>
        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 ">
          <Link
            href="/"
            className="flex items-center px-6 py-3 hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            <span>Home</span>
          </Link>
          <Link
            href="/aboutus"
            className="flex items-center px-6 py-3 hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>About Us</span>
          </Link>
        </nav>
        {/* Logout Button */}
        <button
          className=" font-bold text-black-500  bg-red-500 px-6 py-3"
          // onClick={handleLogout}
          onClick={() => signOut()}
        >
          LOGOUT
        </button>
      </div>
      {/* Right Side User Info */}
      <div className="flex-1 p-8">
        <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
          <div>
            Name: <span className="font-bold">{user.name}</span>
          </div>
          <div>
            Email: <span className="font-bold">{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
