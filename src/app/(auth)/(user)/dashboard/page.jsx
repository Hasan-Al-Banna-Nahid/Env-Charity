"use client";

import ProtectedRoute from "@/app/_components/ProtectedRoute";
import { useAuth } from "@/app/_components/AuthProvider";
import { useEffect, useState } from "react";
import api from "@/app/_lib/api";
import { toast } from "react-hot-toast";
import Link from "next/link";

const DashboardPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, donationsRes] = await Promise.all([
          api.get("/events"),
          user.role === "admin" ? api.get("/donations") : Promise.resolve(null),
        ]);

        setEvents(eventsRes.data);
        if (donationsRes) setDonations(donationsRes.data.data || []);
      } catch (error) {
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Events Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
            {events.length > 0 ? (
              <ul className="space-y-2">
                {events.slice(0, 3).map((event) => (
                  <li key={event._id} className="border-b pb-2">
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()} -{" "}
                      {event.location}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No upcoming events</p>
            )}
            <Link
              href="/events"
              className="mt-4 inline-block text-green-600 hover:text-green-800 text-sm"
            >
              View all events
            </Link>
          </div>

          {/* Donations Card */}
          {user.role === "admin" && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Recent Donations</h2>
              {donations.length > 0 ? (
                <ul className="space-y-2">
                  {donations.slice(0, 3).map((donation) => (
                    <li key={donation._id} className="border-b pb-2">
                      <p className="font-medium">${donation.amount}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No recent donations</p>
              )}
              <Link
                href="/admin/donations"
                className="mt-4 inline-block text-green-600 hover:text-green-800 text-sm"
              >
                View all donations
              </Link>
            </div>
          )}

          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {user.role === "admin" && (
                <Link
                  href="/admin/events/create"
                  className="block w-full text-left px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
                >
                  Create New Event
                </Link>
              )}
              <Link
                href="/donate"
                className="block w-full text-left px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
              >
                Make a Donation
              </Link>
              <Link
                href="/events"
                className="block w-full text-left px-4 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
              >
                Browse Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
