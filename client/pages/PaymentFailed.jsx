import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle, RefreshCcw, ArrowLeft } from "lucide-react";

function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {/* Failed Icon */}
        <div className="flex justify-center mb-5">
          <div className="bg-red-100 p-4 rounded-full">
            <XCircle size={55} className="text-red-600" />
          </div>
        </div>

        {/* Failed Message */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Failed!
        </h1>

        <p className="text-gray-500 mb-6">
          Unfortunately, your payment could not be completed. Please try again
          or choose another payment method.
        </p>

        {/* Try Again */}
        <button
          onClick={() => navigate("/pricing")}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition mb-3"
        >
          <RefreshCcw size={18} />
          Try Again
        </button>

        {/* Go Back */}
        <button
          onClick={() => navigate("/")}
          className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
        >
          <ArrowLeft size={18} />
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default PaymentFailed;
