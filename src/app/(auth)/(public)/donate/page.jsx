"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import api from "@/app/_lib/api";
import { useAuth } from "@/app/_components/AuthProvider";
import { toast } from "react-hot-toast";
import Image from "next/image";

const DonationForm = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Payment system is not ready yet");
      return;
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid donation amount");
      return;
    }

    if (!cardComplete) {
      toast.error("Please complete your card details");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create payment intent
      const { data } = await api.post("/donations/stripe-payment", {
        amount: parseFloat(amount) * 100, // Convert to cents
      });

      if (!data?.clientSecret) {
        throw new Error("Failed to create payment intent");
      }

      // Step 2: Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: name || "Anonymous Donor",
              email: email || "no-email@example.com",
            },
          },
        }
      );

      if (error) {
        throw error;
      }

      if (paymentIntent?.status === "succeeded") {
        // Step 3: Record donation
        await api.post("/donations/donate", {
          amount: parseFloat(amount),
          transactionId: paymentIntent.id,
          message,
        });

        toast.success(
          <div className="text-center">
            <p className="font-bold">Thank you for your donation!</p>
            <p>Your support makes a real difference.</p>
          </div>,
          { duration: 5000 }
        );
        setAmount("");
        setMessage("");
        setSelectedAmount(null);
      }
    } catch (err) {
      console.error("Donation error:", err);
      toast.error(
        err.message || "Payment failed. Please try again or contact support."
      );
    } finally {
      setLoading(false);
    }
  };

  const presetAmounts = [10, 25, 50, 100, 250, 500];

  const handleAmountSelection = (amount) => {
    setAmount(amount);
    setSelectedAmount(amount);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:flex">
      {/* Left Side - Visual Appeal */}
      <div className="md:w-1/2 bg-gradient-to-br from-green-600 to-teal-600 p-8 flex flex-col justify-center text-white">
        <div className="relative h-48 mb-6">
          <Image
            src="/images/donation-heart.avif"
            alt="Making a difference"
            fill
            className="object-cover w-full rounded-md"
          />
        </div>
        <h2 className="text-3xl font-bold mb-4">Your Donation Matters</h2>
        <p className="mb-6 text-lg opacity-90">
          Every contribution helps us protect the environment and create a
          sustainable future for generations to come.
        </p>
        <div className="bg-white bg-opacity-20 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">What your donation can do:</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="inline-block w-4 h-4 bg-white rounded-full mr-2"></span>
              $10 plants 5 trees
            </li>
            <li className="flex items-center">
              <span className="inline-block w-4 h-4 bg-white rounded-full mr-2"></span>
              $50 cleans 1 mile of coastline
            </li>
            <li className="flex items-center">
              <span className="inline-block w-4 h-4 bg-white rounded-full mr-2"></span>
              $100 protects endangered species
            </li>
          </ul>
        </div>
      </div>

      {/* Right Side - Donation Form */}
      <div className="md:w-1/2 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          Make a Donation
        </h2>
        <p className="text-gray-600 mb-6">Support our environmental mission</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Donation Amount
            </label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {presetAmounts.map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => handleAmountSelection(preset)}
                  className={`px-3 py-2 rounded-lg transition-all ${
                    selectedAmount === preset
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setSelectedAmount(null);
              }}
              placeholder="Or enter custom amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              min="1"
              step="1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Details
            </label>
            <div className="px-4 py-3 border border-gray-300 rounded-lg">
              <CardElement
                onChange={(e) => setCardComplete(e.complete)}
                options={cardElementOptions}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              rows="3"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !stripe || !elements || !cardComplete}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
              loading || !cardComplete
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Donate Now"
            )}
          </button>

          <div className="flex items-center justify-center mt-4">
            <Image
              src="/images/payment-methods.png"
              alt="Accepted payment methods"
              width={200}
              height={40}
              className="opacity-70"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const DonatePage = () => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support Our Cause
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your generous donation helps us continue our vital environmental
            conservation work.
          </p>
        </div>

        <Elements stripe={stripePromise}>
          <DonationForm />
        </Elements>

        <div className="mt-12 bg-white rounded-xl shadow-md p-8 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Why Donate?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Transparent Spending",
                description:
                  "We publish annual reports showing exactly how funds are used.",
                icon: "📊",
              },
              {
                title: "Tax Deductible",
                description:
                  "All donations are tax deductible to the fullest extent allowed by law.",
                icon: "💲",
              },
              {
                title: "Real Impact",
                description:
                  "See exactly what your donation achieves through our project updates.",
                icon: "🌱",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center p-4">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h4 className="font-medium text-lg mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
