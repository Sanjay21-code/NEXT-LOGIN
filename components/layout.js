// components/Layout.js
import React from "react";
import Link from "next/link";

const Layout = ({ children }) => {
  const handleLogout = () => {
    // Clear sessionStorage
    sessionStorage.removeItem("user");
    // Redirect to login page
    window.location.href = "/login";
  };

  return (
    <div className="flex h-screen">
      {/* Left Side Navigation */}
      <div className="bg-gray-800 text-white w-64 flex flex-col justify-between">
        {/* Logo */}
        <div className="py-4 px-6">
          <img src="/logo.png" alt="Logo" className="h-10" />
        </div>
        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">
          <Link href="/">
            <a className="flex items-center px-6 py-3 hover:bg-gray-700">
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
              Home
            </a>
          </Link>
          <Link href="/aboutus">
            <a className="flex items-center px-6 py-3 hover:bg-gray-700">
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
              About Us
            </a>
          </Link>
        </nav>
        {/* Logout Button */}
        <button
          className="bg-red-500 font-bold text-white px-6 py-3"
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>
      {/* Right Side Content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
};

export default Layout;
