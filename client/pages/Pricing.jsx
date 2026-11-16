import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Zap, Crown, Rocket, ArrowLeft } from "lucide-react";
import axios from "axios";
import { serverUrl } from "../src/App";

const plans = [
  {
    name: "Starter",
    price: 50,
    description: "Perfect for getting started.",
    icon: Zap,
    features: [
      "30 credits",
      "3 AI generations",
      "Text summaries",
      "Basic support",
    ],
    button: "Get Started",
  },
  {
    name: "Pro",
    price: 200,
    description: "For regular learners and students.",
    icon: Rocket,
    popular: true,
    features: [
      "50 AI generations",
      "Advanced note generation",
      "PDF downloads",
      "Quiz generation",
      "Priority support",
    ],
    button: "Choose Pro",
  },
  {
    name: "Premium",
    price: 500,
    description: "The complete learning experience.",
    icon: Crown,
    features: [
      "Unlimited AI generations",
      "Advanced note generation",
      "PDF downloads",
      "Quiz generation",
      "Diagram generation",
      "Priority support",
    ],
    button: "Go Premium",
  },
];

function Pricing() {
  const navigate = useNavigate();
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payingAmount, setPayingAmount] = useState(null);

  const handlePaying = async (amount) => {
    try {
      setSelectedPrice(amount);
      setPayingAmount(amount);
      setPaying(true);
      const result = await axios.post(serverUrl+"/api/credits/order", { amount }, { withCredentials: true });

      if (result.data.url) {
        window.location.href = result.data.url; // Redirect to Stripe checkout
      }
      setPaying(false);

      // Add payment integration here
    } catch (error) {
      console.log(error);
      setPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-8 md:px-10">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-10 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-[#493b85] hover:bg-purple-50 hover:text-[#493b85]"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Heading */}
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-[#493b85]">
          AI NOTES PRICING
        </span>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Choose Your Perfect Plan
        </h1>

        <p className="mt-4 text-gray-500">
          Unlock smarter learning with the right plan for you.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon;

          return (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl ${
                plan.popular
                  ? "border-[#493b85] ring-2 ring-[#493b85]/20"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#493b85] px-5 py-1.5 text-xs font-semibold text-white">
                  MOST POPULAR
                </span>
              )}

              {/* Icon and Name */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-[#493b85]">
                <Icon size={25} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>

              <p className="mt-2 text-sm text-gray-500">{plan.description}</p>

              {/* Price */}
              <div className="my-7 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{plan.price}
                </span>
                <span className="text-sm text-gray-500">/ month</span>
              </div>

              {/* Button */}
              <button
                onClick={() => handlePaying(plan.price)}
                disabled={paying}
                className={`w-full rounded-xl py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  plan.popular
                    ? "bg-[#493b85] text-white hover:bg-[#382d6b]"
                    : "border border-gray-200 bg-white text-gray-800 hover:border-[#493b85] hover:bg-purple-50 hover:text-[#493b85]"
                }`}
              >
                {paying && payingAmount === plan.price
                  ? "Processing..."
                  : plan.button}
              </button>

              <div className="my-7 border-t border-gray-100" />

              <h3 className="mb-5 font-semibold text-gray-800">
                What's included
              </h3>

              <ul className="flex-1 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-sm text-gray-600"
                  >
                    <Check size={18} className="shrink-0 text-[#493b85]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="mt-12 text-center text-sm text-gray-400">
        Simple pricing. Smarter learning. Better productivity.
      </p>
    </div>
  );
}

export default Pricing;
