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

const Sidebar = () => {
  const { user } = useAuth();
  const pathname = usePathname();

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
    // {
    //   name: "Manage Users",
    //   href: "/admin/users",
    //   icon: UsersIcon,
    //   roles: ["admin"],
    // },
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
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-green-700">EcoAction</h1>
            </div>
            <div className="mt-5 flex-1 px-2 bg-white space-y-1">
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
    </div>
  );
};

export { Sidebar };
