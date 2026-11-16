import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Coins,
  History,
  LogOut,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

const HomeNavbar = ({
  onShowHistory,
  onLogout,
  onBuyCredits,
  showProfile = true,
}) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);

  // Get user data from Redux
  const user = useSelector((state) => state.user.userData);

  const username = user?.name || "User";
  const firstLetter = username.charAt(0).toUpperCase();
  const credits = user?.credits ?? 0;

  const toggleMenu = (menu) => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    // <nav className="w-full h-20 px-6 md:px-12 flex items-center justify-between bg-white border-b border-gray-100">
    <nav className="w-full min-h-20 px-3 sm:px-6 md:px-12 flex items-center justify-between bg-slate-900 border-b border-gray-100 gap-2">
      <div
        className="flex items-center gap-3 hover:cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
          <span className="text-2xl text-white">✦</span>
        </div>

        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Note<span className="text-violet-600">AI</span>
        </h2>
      </div>

      {/* RIGHT SIDE */}
      {/* <div className="flex items-center gap-4"> */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* PROFILE MENU */}
        {showProfile && (
          <div className="relative">
            <button
              onClick={() => toggleMenu("profile")}
              className="w-10 h-10 rounded-full bg-violet-100 text-violet-700 font-bold text-lg flex items-center justify-center hover:bg-violet-200 transition"
            >
              {firstLetter}
            </button>

            <AnimatePresence>
              {activeMenu === "profile" && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  // className="absolute right-0 top-14 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50"
                  className="absolute right-0 top-12 w-51 max-w-[calc(100vw-24px)] bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50"
                >
                  {/* USER DETAILS */}
                  <div className="px-3 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-800">{username}</p>

                    <p className="text-xs text-gray-400 mt-1">{user?.email}</p>
                  </div>

                  {/* HISTORY */}
                  <button
                    onClick={() => {
                      setActiveMenu(null);
                      navigate("/history");
                      // onShowHistory?.();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-3 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  >
                    <History size={18} />
                    Show History
                  </button>

                  {/* LOGOUT */}
                  <button
                    onClick={() => {
                      setActiveMenu(null);
                      onLogout?.();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-3 text-sm text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* CREDIT SECTION */}
        <div className="relative">
          <div className="flex items-center gap-3 bg-gray-100 rounded-full pl-4 pr-2 py-2">
            <div className="flex items-center gap-2">
              <Coins size={18} className="text-yellow-600" />

              <span className="font-semibold text-gray-800 text-sm">
                {credits} Credits
              </span>
            </div>

            {/* PLUS BUTTON */}
            <button
              onClick={() => toggleMenu("credits")}
              className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center hover:bg-violet-700 transition"
            >
              <Plus size={19} />
            </button>
          </div>

          {/* BUY CREDITS POPUP */}
          <AnimatePresence>
            {activeMenu === "credits" && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                // className="absolute right-0 top-14 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50"
                className="absolute right-0 top-14 w-64 max-w-[calc(100vw-24px)] bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center mb-3">
                  <ShoppingBag className="text-violet-600" size={20} />
                </div>

                <h2 className="font-bold text-gray-900">Need more credits?</h2>

                <p className="text-sm text-gray-500 mt-1 mb-4">
                  Purchase credits and continue creating amazing things.
                </p>

                <button
                  onClick={() => {
                    setActiveMenu(null);
                    navigate("/pricing");
                    // onBuyCredits?.();
                  }}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2.5 rounded-lg font-semibold text-sm transition"
                >
                  Buy Credits
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
