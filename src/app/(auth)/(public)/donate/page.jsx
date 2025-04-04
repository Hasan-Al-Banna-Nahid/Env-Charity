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

const DonationForm = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
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
        amount: parseFloat(amount),
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

        toast.success("Thank you for your donation!");
        setAmount("");
        setMessage("");
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

  const presetAmounts = [10, 25, 50, 100, 250];

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <h2 className="text-xl font-semibold text-center mb-4">
        Make a Donation
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="w-full p-2 border rounded"
          required
        />
        <div>
          <label htmlFor="amount" className="block text-sm font-medium">
            Donation Amount
          </label>
          <div className="flex space-x-2 mt-1 flex-wrap">
            {presetAmounts.map((preset) => (
              <button
                type="button"
                key={preset}
                onClick={() => setAmount(preset)}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mt-2"
              >
                ${preset}
              </button>
            ))}
          </div>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter custom amount"
            className="w-full p-2 border rounded mt-2"
            required
          />
        </div>
        <CardElement
          onChange={(e) => setCardComplete(e.complete)}
          className="p-2 border rounded"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message (Optional)"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading || !stripe || !elements || !cardComplete}
          className={`w-full p-2 text-white rounded ${
            loading || !cardComplete
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : "Donate Now"}
        </button>
      </form>
    </div>
  );
};

const DonatePage = () => {
  const stripePromise = loadStripe(
    "pk_test_51R8mP6QU4k2Lx83rT8r0Fa3PjZb26aBrytrYbwaO1Q3XRBnYmkyUSHxm3kmrFbU15VIcWiaUy6DG5JFtG46oqt3800aWGmoWIl"
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Elements stripe={stripePromise}>
        <DonationForm />
      </Elements>
    </div>
  );
};

export default DonatePage;
