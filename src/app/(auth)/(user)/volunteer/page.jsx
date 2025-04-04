"use client";

import ProtectedRoute from "@/app/_components/ProtectedRoute";
import { useState, useEffect } from "react";
import api from "@/app/_lib/api";
import { toast } from "react-hot-toast";

const VolunteerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, registeredRes] = await Promise.all([
          api.get("/events"),
          api.get(`/volunteers/${user._id}/events`),
        ]);

        setEvents(eventsRes.data);
        setRegisteredEvents(registeredRes.data);
      } catch (error) {
        toast.error("Failed to fetch volunteer data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleRegister = async (eventId) => {
    try {
      await api.post(`/volunteers/register`, { eventId, userId: user._id });
      toast.success("Successfully registered for the event");
      // Refresh the events list
      const response = await api.get("/events");
      setEvents(response.data);
    } catch (error) {
      toast.error("Failed to register for event");
    }
  };

  if (loading) {
    return <div>Loading volunteer dashboard...</div>;
  }

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Volunteer Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Available Events */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Available Events</h2>
            {events.length > 0 ? (
              <ul className="space-y-4">
                {events.map((event) => (
                  <li key={event._id} className="border-b pb-4">
                    <h3 className="font-medium text-lg">{event.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(event.date).toLocaleDateString()} -{" "}
                      {event.location}
                    </p>
                    <p className="text-gray-700 mt-2">{event.description}</p>
                    <button
                      onClick={() => handleRegister(event._id)}
                      disabled={registeredEvents.some(
                        (e) => e._id === event._id
                      )}
                      className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {registeredEvents.some((e) => e._id === event._id)
                        ? "Registered"
                        : "Register"}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No available events at the moment</p>
            )}
          </div>

          {/* My Events */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">My Registered Events</h2>
            {registeredEvents.length > 0 ? (
              <ul className="space-y-4">
                {registeredEvents.map((event) => (
                  <li key={event._id} className="border-b pb-4">
                    <h3 className="font-medium text-lg">{event.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(event.date).toLocaleDateString()} -{" "}
                      {event.location}
                    </p>
                    <div className="mt-2">
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Registered
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                You haven't registered for any events yet
              </p>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default VolunteerDashboard;
