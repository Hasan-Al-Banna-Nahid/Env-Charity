"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UserIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const Sidebar = () => {
  const { user } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const commonLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
      roles: ["user", "admin", "volunteer"],
    },
    {
      name: "My Profile",
      href: "/profile",
      icon: UserIcon,
      roles: ["user", "admin", "volunteer"],
    },
    {
      name: "Donate",
      href: "/donate",
      icon: CurrencyDollarIcon,
      roles: ["user", "admin"],
    },
  ];

  const adminLinks = [
    {
      name: "Admin Panel",
      href: "/admin",
      icon: CogIcon,
      roles: ["admin"],
    },
    {
      name: "Manage Events",
      href: "/admin/events",
      icon: CalendarIcon,
      roles: ["admin"],
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: ChartBarIcon,
      roles: ["admin"],
    },
  ];

  const volunteerLinks = [
    {
      name: "Volunteer Portal",
      href: "/volunteer",
      icon: UsersIcon,
      roles: ["volunteer"],
    },
    {
      name: "My Events",
      href: "/volunteer/events",
      icon: CalendarIcon,
      roles: ["volunteer"],
    },
  ];

  const allLinks = [...commonLinks, ...adminLinks, ...volunteerLinks];
  const filteredLinks = allLinks.filter((link) =>
    link.roles.includes(user.role)
  );

  return (
    <div className="flex md:flex-shrink-0">
      {/* Sidebar for large screens */}
      <div
        className={`hidden md:flex md:flex-col w-64 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-green-700">EcoAction</h1>
            </div>
            <div className="mt-5 flex-1 px-2 space-y-1">
              {filteredLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-6 w-6 ${
                      pathname === item.href
                        ? "text-green-500"
                        : "text-gray-400 group-hover:text-gray-500"
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                <p className="text-xs font-medium text-gray-500">
                  {user.role === "admin" ? "Admin" : "Member"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar for mobile */}
      <div
        className="md:hidden fixed inset-0 z-10 bg-black bg-opacity-50"
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={`md:hidden fixed left-0 top-0 z-20 bg-white shadow-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 h-full`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-green-700">EcoAction</h1>
          <button
            className="text-gray-700 hover:text-gray-900"
            onClick={() => setIsOpen(false)}
          >
            <span className="sr-only">Close Sidebar</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-5 px-2 space-y-1">
          {filteredLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                pathname === item.href
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon
                className={`mr-3 flex-shrink-0 h-6 w-6 ${
                  pathname === item.href
                    ? "text-green-500"
                    : "text-gray-400 group-hover:text-gray-500"
                }`}
              />
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden absolute top-4 left-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 hover:text-gray-900"
        >
          <span className="sr-only">Open Sidebar</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export { Sidebar };
