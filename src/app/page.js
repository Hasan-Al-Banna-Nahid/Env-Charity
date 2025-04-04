"use client";
import { useState, useEffect } from "react";
import {
  LoadingSkeleton,
  StatsSkeleton,
} from "@/app/_components/LoadingSkeleton";
import Navbar from "@/app/_components/Navbar";
import api from "@/app/_lib/api";
import { EventsCard } from "./_components/EventCard";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, donationsRes] = await Promise.all([
          api.get("/events"),
          api.get("/donations"),
        ]);
        setEvents(eventsRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Events Section - Full Width */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <LoadingSkeleton count={3} />
            ) : (
              events.map((event) => (
                <EventsCard key={event._id} event={event} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
