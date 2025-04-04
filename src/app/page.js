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
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, donationsRes] = await Promise.all([
          api.get("/events"),
          api.get("/donations"),
        ]);
        setEvents(eventsRes.data);
        setStats(donationsRes.data.data);
        console.log(eventsRes, donationsRes);
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

      {/* Stats Section */}
      <section className="py-12 bg-white">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <StatsSkeleton />
          ) : (
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <StatItem value={stats?.volunteers?.length} label="Volunteers" />
              <StatItem value={stats?.events?.length} label="Events" />
              <StatItem value={stats?.totalDonations} label="Total Donations" />
            </div>
          )}
        </div> */}
      </section>

      {/* Events Section - Full Width */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6">
            <EventsCard />
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper component for stats
// const StatItem = ({ value, label }) => (
//   <div className="text-center">
//     <p className="text-3xl font-bold text-green-600">
//       {value?.toLocaleString() || "0"}
//     </p>
//     <p className="mt-2 text-sm font-medium text-gray-500">{label}</p>
//   </div>
// );
