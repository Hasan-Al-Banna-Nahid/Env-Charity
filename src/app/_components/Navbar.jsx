"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="bg-green-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          EcoAction
        </Link>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-6">
            <Link href="/about" className="hover:text-green-200">
              About
            </Link>
            <Link href="/events" className="hover:text-green-200">
              Events
            </Link>
            <Link href="/donate" className="hover:text-green-200">
              Donate
            </Link>
            <Link href="/contact" className="hover:text-green-200">
              Contact
            </Link>
          </div>

          {user ? (
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="hover:text-green-200">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/login" className="hover:text-green-200">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-green-600 hover:bg-green-800 px-4 py-2 rounded"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={() => {
              // Handle mobile menu toggle (you can integrate a menu dropdown here)
            }}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
