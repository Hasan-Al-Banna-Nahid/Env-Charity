"use client";
import Navbar from "@/app/_components/Navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-green-500 text-white text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold">Contact Us</h1>
        <p className="mt-4 text-lg sm:text-xl">
          We’d love to hear from you! Whether you have questions or want to get
          involved, reach out to us.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <h2 className="text-3xl font-semibold text-gray-900">Get in Touch</h2>
          <p className="mt-4 text-lg text-gray-600">
            Fill out the form below, and we’ll get back to you as soon as
            possible.
          </p>

          <form className="mt-8 space-y-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="4"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <h2 className="text-3xl font-semibold text-gray-900">
            Our Contact Information
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            You can also reach us through the following channels:
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <p className="text-lg font-medium text-gray-800">Email</p>
              <p className="text-lg text-gray-600">contact@charity.org</p>
            </div>

            <div>
              <p className="text-lg font-medium text-gray-800">Phone</p>
              <p className="text-lg text-gray-600">(123) 456-7890</p>
            </div>

            <div>
              <p className="text-lg font-medium text-gray-800">Follow Us</p>
              <div className="flex justify-center space-x-6">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </div>
            </div>
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
