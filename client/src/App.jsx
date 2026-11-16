import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import { getCurrentUser } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import Notes from "../pages/Notes";
import History from "../pages/History";
import Pricing from "../pages/Pricing";
import PaymentSuccess from "../pages/paymentSuccess";
import PaymentFailed from "../pages/paymentFailed";
import PaymentCancel from "../pages/PaymentCancel";

export const serverUrl = "http://localhost:3000";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser(dispatch);
  }, [dispatch]);

  const { userData } = useSelector((state) => state.user);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/auth"
          element={userData ? <Navigate to="/" replace /> : <Auth />}
        />
        <Route
          path="/notes"
          element={userData ? <Notes /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/history"
          element={userData ? <History /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/pricing"
          element={userData ? <Pricing /> : <Navigate to="/auth" replace />}
        />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/credits/cancel" element={<PaymentCancel />} />
      </Routes>
    </>
  );
}

export default App;
