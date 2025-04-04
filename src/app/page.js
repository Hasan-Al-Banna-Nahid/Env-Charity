"use client";
import { useState, useEffect } from "react";
import Navbar from "@/app/_components/Navbar";
import api from "@/app/_lib/api";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, donationsRes] = await Promise.all([
          api.get("/events"),
          api.get("/donations"),
        ]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Navbar />

      {/* Charity Section with Gradient Glow */}
      <section className="py-12 bg-gray-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 glow-effect">
            Charity for a Better Tomorrow
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Join us in making a lasting impact through donations, events, and
            more.
          </p>
        </div>
      </section>
    </div>
  );
}
