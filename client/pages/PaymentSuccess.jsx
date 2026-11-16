import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-5">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle size={55} className="text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-500 mb-6">
          Your payment has been completed successfully. Your credits will be
          added to your account shortly.
        </p>

        {/* Session ID */}
        {sessionId && (
          <p className="text-xs text-gray-400 mb-6 break-all">
            Transaction ID: {sessionId}
          </p>
        )}

        {/* Go to Home */}
        <button
          onClick={() => navigate("/")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
        >
          Go to Home
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
