import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, BookOpen, FileText, GraduationCap } from "lucide-react";

import TopicForm from "../components/TopicForm";
import Sidebar from "../components/Sidebar";
import FinalResult from "../components/FinalResult";

import HomeNavbar from "../components/HomeNavbar";
import axios from "axios";
import { serverUrl } from "../src/App";
import { useDispatch } from "react-redux";
import { setUserData } from "../src/redux/userSlice";
import { useNavigate } from "react-router-dom";

// If your parent component handles logout:
export default function Notes({ onLogout }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      navigate("/auth");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <HomeNavbar onLogout={handleLogout} />
      <div className="min-h-screen bg-[#faf9ff] px-5 py-10 text-gray-900 sm:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-9 text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-100/70 px-4 py-2 text-xs font-semibold text-violet-700">
              <Sparkles size={15} />
              AI Powered Learning
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Generate Your <span className="text-violet-600">Notes.</span>
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500 sm:text-base">
              Create personalized study notes tailored to your learning needs.
              Learn smarter and prepare better with AI.
            </p>
          </motion.div>

          {/* FORM SECTION - Always visible */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl"
          >
            <TopicForm
              loading={loading}
              setResult={setResult}
              setLoading={setLoading}
              setError={setError}
            />
          </motion.div>

          {/* Error Message */}
          {error && (
            <div className="mx-auto mt-5 max-w-3xl rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* RESULT SECTION - Below Form */}
          <div className="mt-12">
            {!result && !loading ? (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mx-auto flex min-h-[300px] max-w-5xl flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-200 bg-white/70 px-6 py-12 text-center"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
                  <FileText size={30} className="text-violet-600" />
                </div>

                <h2 className="text-xl font-bold text-gray-800">
                  Your Notes Will Be Generated Here
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                  Fill in the form above and click Generate Notes. Your
                  personalized study material, important questions, and quick
                  revision points will appear here.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-5 text-xs text-gray-400">
                  <span className="flex items-center gap-2">
                    <BookOpen size={15} />
                    Detailed Notes
                  </span>

                  <span className="flex items-center gap-2">
                    <GraduationCap size={15} />
                    Exam Preparation
                  </span>

                  <span className="flex items-center gap-2">
                    <Sparkles size={15} />
                    AI Powered
                  </span>
                </div>
              </motion.div>
            ) : loading ? (
              /* Loading State */
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600" />

                <h2 className="mt-5 text-lg font-semibold text-gray-800">
                  Generating Your Notes...
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  AI is preparing your personalized study material.
                </p>
              </div>
            ) : (
              /* Generated Result */
              <motion.div
                key={result?.noteId || "generated-result"}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    Your Generated Study Material
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Your personalized exam preparation notes are ready.
                  </p>
                </div>

                <div className="flex flex-col items-start gap-6 lg:flex-row">
                  {/* Sidebar */}
                  <Sidebar result={result} />

                  {/* Main Content */}
                  <FinalResult result={result} />
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Info */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-violet-500" />
              AI Powered
            </span>

            <span className="flex items-center gap-2">
              <BookOpen size={14} className="text-violet-500" />
              Personalized Learning
            </span>

            <span className="flex items-center gap-2">
              <FileText size={14} className="text-violet-500" />
              Organized Notes
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
