import React, { useEffect } from "react";
import { useState } from "react";
import { motion, AnimatePresence, number } from "motion/react";
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  FileText,
  Shapes,
  BarChart3,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";
import { generateNotes } from "../services/api";
import { useDispatch } from "react-redux";
import { updateCredits } from "../src/redux/userSlice";

// Toggle Component
function ToggleOption({ icon: Icon, title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-[#faf9ff] p-4 transition-all duration-300 hover:border-violet-200 hover:bg-white">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
          <Icon size={19} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-gray-500">{description}</p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 ${
          checked ? "bg-violet-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export function TopicForm({ setResult, setLoading, loading, setError }) {
  const [formData, setFormData] = useState({
    topic: "",
    level: "",
    examType: "",
    revisionMode: false,
    diagrams: false,
    charts: false,
  });

  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.topic.trim()) {
      setError("Please enter a topic or subject.");
      return;
    }
    try {
      setError("");
      setLoading(true);
      setResult(null);

      // const result = await generateNotes(formData);
      // setResult(result);

      //Changed
      const result = await generateNotes(formData);
      setResult({
        ...result,
        options: {
          diagrams: formData.diagrams,
          charts: formData.charts,
        },
      });
      // till here
      if (typeof result.creditsLeft == "number") {
        dispatch(updateCredits(result.creditsLeft));
      }
    } catch (error) {
      e.preventDefault();
      setError("Failed to fetch notes from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      setProgress(0);
      setProgressText("");
      return;
    }

    let value = 0;
    const interval = setInterval(() => {
      value += Math.random() * 8;

      if (value >= 95) {
        value = 95;
        setProgressText("Almost done...");
        clearInterval(interval);
      } else if (value >= 70) {
        setProgressText("Finalizing notes...");
      } else if (value >= 40) {
        setProgressText("Processing notes...");
      } else {
        setProgressText("Generating notes...");
      }
      setProgress(Math.floor(value));
    }, 700);
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="rounded-3xl border border-violet-100 bg-white p-6 shadow-xl shadow-violet-100/40 sm:p-9"
    >
      {/* Topic */}
      <div className="mb-7">
        <label
          htmlFor="topic"
          className="mb-2.5 block text-sm font-semibold text-gray-700"
        >
          Topic / Subject
        </label>

        <div className="relative">
          <BookOpen
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500"
          />

          <input
            id="topic"
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="e.g. Data Structures, Operating Systems..."
            required
            className="w-full rounded-xl border border-gray-200 bg-[#faf9ff] py-3.5 pl-12 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />
        </div>
      </div>

      {/* Level and Exam Type */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Level */}
        <div>
          <label
            htmlFor="level"
            className="mb-2.5 block text-sm font-semibold text-gray-700"
          >
            Level / Class
          </label>

          <div className="relative">
            <GraduationCap
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500"
            />

            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
              className="w-full appearance-none rounded-xl border border-gray-200 bg-[#faf9ff] py-3.5 pl-12 pr-10 text-sm text-gray-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            >
              <option value="">Select your level</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 12">Class 12</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Exam Type */}
        <div>
          <label
            htmlFor="examType"
            className="mb-2.5 block text-sm font-semibold text-gray-700"
          >
            Exam Type
          </label>

          <div className="relative">
            <FileText
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-500"
            />

            <select
              id="examType"
              name="examType"
              value={formData.examType}
              onChange={handleChange}
              required
              className="w-full appearance-none rounded-xl border border-gray-200 bg-[#faf9ff] py-3.5 pl-12 pr-10 text-sm text-gray-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            >
              <option value="">Select exam type</option>
              <option value="School Examination">School Exam</option>
              <option value="University Examination">University Exam</option>
              <option value="Competitive Examination">Competitive Exam</option>
              <option value="Entrance Examination">Entrance Exam</option>
              <option value="General Learning">General Learning</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customization Section */}
      <div className="mb-8">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
            <Shapes size={20} />
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-800">
              Customize Your Notes
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Personalize your notes based on your preferences.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Revision Mode */}
          <ToggleOption
            icon={Sparkles}
            title="Exam Revision Mode"
            description="Focus on important concepts and exam-oriented points."
            checked={formData.revisionMode}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                revisionMode: value,
              }))
            }
          />

          {/* Diagrams */}
          <ToggleOption
            icon={Shapes}
            title="Include Diagrams"
            description="Add visual explanations and diagrams for better understanding."
            checked={formData.diagrams}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                diagrams: value,
              }))
            }
          />

          {/* Charts */}
          <ToggleOption
            icon={BarChart3}
            title="Include Charts"
            description="Add charts and tables to simplify complex concepts."
            checked={formData.charts}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                charts: value,
              }))
            }
          />
        </div>
      </div>

      {/* Generate Button */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={!loading ? { y: -2 } : {}}
        whileTap={!loading ? { scale: 0.98 } : {}}
        className={`group flex w-full items-center justify-center gap-3 rounded-xl py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 ${
          loading
            ? "cursor-not-allowed bg-violet-500 opacity-80"
            : "bg-violet-600 shadow-violet-200 hover:bg-violet-700 hover:shadow-violet-300"
        }`}
      >
        {loading ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            Generating Notes...
          </>
        ) : (
          <>
            <Sparkles size={18} />
            Generate Notes
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </>
        )}
      </motion.button>

      {/* Progress Bar */}
      {loading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-2xl border border-violet-100 bg-violet-50/70 p-5"
        >
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <Sparkles size={19} className="animate-pulse" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-800">
                  Generating Your Notes
                </h3>
                <p className="text-xs text-gray-500">
                  Please wait while AI works its magic.
                </p>
              </div>
            </div>

            <span className="text-lg font-bold text-violet-600">
              {progress}%
            </span>
          </div>

          {/* Progress Track */}
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-violet-100">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500"
              animate={{ width: `${progress}%` }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Status */}
          <div className="mt-3 flex items-center gap-2">
            <LoaderCircle size={14} className="animate-spin text-violet-600" />

            <AnimatePresence mode="wait">
              <motion.p
                key={progressText}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-xs font-medium text-violet-700"
              >
                {progressText}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Footer Text */}
      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
        <Sparkles size={13} className="text-violet-500" />
        Your personalized notes will be generated using AI.
      </div>
    </motion.form>
  );
}

export default TopicForm;
