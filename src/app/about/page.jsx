"use client";
import Navbar from "@/app/_components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Navbar />

      {/* About Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-green-500">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-extrabold">About Us</h1>
          <p className="mt-4 text-lg sm:text-xl">
            We are a non-profit organization dedicated to improving the lives of
            individuals and communities in need. Our mission is to create
            sustainable change through charity events, donations, and volunteer
            opportunities.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <h2 className="text-3xl font-semibold text-gray-900">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-600">
            Our mission is to bring together a community of passionate
            individuals and organizations to make a tangible difference. Through
            our efforts, we aim to foster positive social impact by addressing
            urgent issues such as poverty, education, and health.
          </p>
        </div>
      </section>

      {/* How to Help Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <h2 className="text-3xl font-semibold text-gray-900">
            How You Can Help
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Your support helps us change lives. Whether it's through donations,
            volunteering, or spreading the word, every little bit counts. Join
            us in creating a brighter future for everyone!
          </p>
          <div className="mt-8">
            <a
              href="/donate"
              className="inline-block bg-green-600 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-green-700"
            >
              Donate Now
            </a>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 bg-gray-900 text-white text-center">
        <p>&copy; 2025 Charity Foundation. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
