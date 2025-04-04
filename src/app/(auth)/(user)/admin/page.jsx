"use client";

import ProtectedRoute from "@/app/_components/ProtectedRoute";
import { useAuth } from "@/app/_components/AuthProvider";
import { useEffect, useState } from "react";
import api from "@/app/_lib/api";
import { toast } from "react-hot-toast";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalEvents: 0,
    totalVolunteers: 0,
    recentDonations: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [donationsRes, eventsRes, usersRes] = await Promise.all([
          api.get("/donations"), // Fetch all donations
          api.get("/events"), // Fetch all events
          api.get("/auth/users?role=user"),
        ]);

        // Check if any of the API responses are empty
        const donations = donationsRes.data?.data || [];
        const events = eventsRes.data || [];
        const users = usersRes.data || [];

        // Calculate total donations
        const totalDonations = donations.reduce(
          (sum, donation) => sum + (donation.amount || 0),
          0
        );

        // Calculate total events and volunteers
        const totalEvents = events.length;
        const totalVolunteers = users.length;

        // Set stats with fetched data
        setStats({
          totalDonations,
          totalEvents,
          totalVolunteers,
          recentDonations: donations.slice(0, 5), // Get the first 5 donations
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading admin dashboard...</div>;
  }

  return (
    <ProtectedRoute roles={["admin"]}>
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Donations Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-500">
              Total Donations
            </h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              ${stats.totalDonations.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-2">All-time contributions</p>
          </div>

          {/* Total Events Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-500">Total Events</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {stats.totalEvents}
            </p>
            <p className="text-sm text-gray-500 mt-2">Organized events</p>
          </div>

          {/* Total Volunteers Card */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-500">
              Total Volunteers
            </h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {stats.totalVolunteers}
            </p>
            <p className="text-sm text-gray-500 mt-2">Active volunteers</p>
          </div>
        </div>

        {/* Recent Donations Table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Donations</h2>
          {stats.recentDonations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Donor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.recentDonations.map((donation) => (
                    <tr key={donation._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {donation.donor?.name || "Anonymous"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {donation.donor?.email || "No email"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${donation.amount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(donation.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            donation.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {donation.status || "Completed"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No recent donations</p>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
