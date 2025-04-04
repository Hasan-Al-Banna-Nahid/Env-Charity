"use client";

import ProtectedRoute from "@/app/_components/ProtectedRoute";
import { useState, useEffect } from "react";
import api from "@/app/_lib/api";
import { toast } from "react-hot-toast";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });
  const [editEvent, setEditEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/events");
        setEvents(response.data);
      } catch (error) {
        toast.error("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/events", newEvent);
      setEvents([...events, response.data]);
      toast.success("Event created successfully");
      setShowModal(false);
      setNewEvent({
        title: "",
        description: "",
        date: "",
        location: "",
      });
    } catch (error) {
      toast.error("Failed to create event");
    }
  };

  const openEditModal = (event) => {
    setEditEvent({ ...event });
    setEditModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/events/${editEvent._id}`, editEvent);
      setEvents(
        events.map((ev) => (ev._id === response.data._id ? response.data : ev))
      );
      toast.success("Event updated successfully");
      setEditModal(false);
      setEditEvent(null);
    } catch (error) {
      toast.error("Failed to update event");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await api.delete(`/events/${id}`);
        setEvents(events.filter((event) => event._id !== id));
        toast.success("Event deleted successfully");
      } catch (error) {
        toast.error("Failed to delete event");
      }
    }
  };

  if (loading) return <div>Loading events...</div>;

  return (
    <ProtectedRoute roles={["admin"]}>
      <div className="max-w-full sm:max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Event Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded sm:text-sm md:text-base"
          >
            Create New Event
          </button>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No events found</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event._id} className="text-sm">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {event.title}
                      </div>
                      <div className="text-xs text-gray-500 truncate max-w-xs">
                        {event.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs">
                      {new Date(event.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs">
                      {event.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openEditModal(event)}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Create Event Modal */}
        {showModal && (
          <Modal
            title="Create New Event"
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
            eventData={newEvent}
            onChange={handleInputChange}
          />
        )}

        {/* Edit Event Modal */}
        {editModal && editEvent && (
          <Modal
            title="Edit Event"
            onClose={() => setEditModal(false)}
            onSubmit={handleEditSubmit}
            eventData={editEvent}
            onChange={handleEditChange}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

const Modal = ({ title, onClose, onSubmit, eventData, onChange }) => (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full z-20 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              name="title"
              value={eventData.title}
              onChange={onChange}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              value={eventData.description}
              onChange={onChange}
              className="w-full border px-3 py-2 rounded-md"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="datetime-local"
              name="date"
              value={eventData.date?.slice(0, 16)}
              onChange={onChange}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              name="location"
              value={eventData.location}
              onChange={onChange}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default EventManagement;
