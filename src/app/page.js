"use client";
import { useState, useEffect } from "react";
import Navbar from "@/app/_components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [donated, setDonated] = useState(12542);

  // Animation effect for donation counter
  useEffect(() => {
    const target = 15000;
    const increment = (target - donated) / 100;

    if (donated < target) {
      const timer = setTimeout(() => {
        setDonated((prev) => Math.min(prev + increment, target));
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [donated]);

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <Image
            src="/images/nature-pattern.avif"
            alt="Nature pattern background"
            fill
            className="object-cover"
          />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-6">
            Protect Our Planet Together
          </h1>
          <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
            Join our global movement to restore ecosystems, combat climate
            change, and create a sustainable future for generations to come.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/donate">
              <button className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105">
                Donate Now
              </button>
            </Link>

            <Link href={"/about"}>
              <button className="px-8 py-3 border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold rounded-lg transition-all">
                Learn About Our Work
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-green-50 rounded-xl shadow-sm">
              <h3 className="text-4xl font-bold text-green-600 mb-2">
                ${Math.floor(donated).toLocaleString()}+
              </h3>
              <p className="text-gray-600">Raised for environmental causes</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-xl shadow-sm">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">42+</h3>
              <p className="text-gray-600">Conservation projects funded</p>
            </div>
            <div className="p-6 bg-teal-50 rounded-xl shadow-sm">
              <h3 className="text-4xl font-bold text-teal-600 mb-2">10K+</h3>
              <p className="text-gray-600">Trees planted worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <Image
                src="/images/forest-conservation.avif"
                alt="Team planting trees in forest"
                width={600}
                height={400}
                className="rounded-xl shadow-xl"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission to Heal the Earth
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                At GreenFuture, we believe that every action counts in the fight
                against environmental degradation. Our team works tirelessly to:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Restore damaged ecosystems through reforestation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Protect endangered species and their habitats</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>
                    Promote sustainable practices in communities worldwide
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>
                    Advocate for policies that prioritize environmental
                    protection
                  </span>
                </li>
              </ul>
              <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                Read Our Full Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Current Projects */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Current Initiatives
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're actively working on these critical projects to make a
              difference today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Amazon Rainforest Protection",
                description:
                  "Preserving 50,000 acres of critical rainforest habitat from deforestation.",
                image: "/images/amazon-rainforest.avif",
                progress: 75,
              },
              {
                title: "Ocean Cleanup Initiative",
                description:
                  "Removing plastic waste from our oceans and coastlines.",
                image: "/images/ocean-cleanup.avif",
                progress: 42,
              },
              {
                title: "Urban Greening Program",
                description:
                  "Creating green spaces in 20 major cities worldwide.",
                image: "/images/urban-garden.jpg",
                progress: 35,
              },
            ].map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="mb-3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-sm text-gray-500 mt-1">
                      {project.progress}% funded
                    </p>
                  </div>
                  <button className="w-full py-2 border border-green-600 text-green-600 hover:bg-green-50 font-medium rounded-lg transition-colors">
                    Support This Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Your support helps us continue vital conservation work around the
            globe. Every contribution, no matter the size, brings us closer to a
            sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/donate">
              <button className="px-8 py-3 bg-white text-green-600 font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105">
                Donate Now
              </button>
            </Link>
            <Link href="/register">
              <button className="px-8 py-3 border-2 border-white text-white hover:bg-slate-500 font-semibold rounded-lg transition-all">
                Volunteer with Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
