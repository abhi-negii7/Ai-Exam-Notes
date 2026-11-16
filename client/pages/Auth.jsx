import { motion } from "motion/react";
import FeatureCard from "../components/FeatureCard.jsx"
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../utils/firebase.js";
import axios from "axios";
import { serverUrl } from "../src/App.jsx";
import { useDispatch } from "react-redux";
import { setUserData } from "../src/redux/userSlice";
import FAQSection from "../components/FAQSection.jsx";

function Auth() {
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const User = response.user;
      const name = User.displayName;
      const email = User.email;

      const result = await axios.post(
        serverUrl + "/api/auth/google",
        { name, email },
        {
          withCredentials: true,
        }
      );

      dispatch(setUserData(result.data.user));

      // console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const features = [
    {
      icon: "🎁",
      title: "Free AI Credits",
      description:
        "Get started with free credits and generate your first AI notes.",
    },
    {
      icon: "📘",
      title: "Exam Notes",
      description: "Create short, structured and exam-oriented study notes.",
    },
    {
      icon: "📂",
      title: "Project Notes",
      description:
        "Organize assignments, projects and technical documentation.",
    },
    {
      icon: "📊",
      title: "Charts & Graphs",
      description: "Generate visual diagrams, charts and useful flowcharts.",
    },
    {
      icon: "📥",
      title: "PDF Export",
      description: "Download your notes as clean and printable PDF files.",
    },
    {
      icon: "🤖",
      title: "AI Assistant",
      description: "Simplify complex topics with intelligent AI assistance.",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#faf9ff] text-gray-900 ">
      {/* NAVBAR */}
      <motion.nav
        className="mx-auto mt-5 flex max-w-7xl items-center justify-between rounded-2xl border border-gray-100 bg-slate-900 px-5 py-4 shadow-sm sm:px-8"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
            <span className="text-2xl text-white">✦</span>
          </div>

          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Note<span className="text-violet-600">AI</span>
          </h2>
        </div>

        <div className="flex items-center gap-4 sm:gap-8">
          <a
            href="#features"
            className="hidden text-sm font-medium text-white transition hover:text-violet-600 sm:block"
          >
            Features
          </a>

          <a
            href="#faq"
            className="hidden text-sm font-medium text-white transition hover:text-violet-600 sm:block"
          >
            FAQ
          </a>

          <button
            onClick={handleGoogleAuth}
            className="rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-violet-700 sm:px-6"
          >
            {/* shadow-violet-200 transition hover:-translate-y-1 hover:bg-violet-700 sm:px-6*/}
            Get Started ↗
          </button>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <main className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-2 scroll-smooth">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-100/70 px-4 py-2 text-xs font-semibold tracking-wider text-violet-700">
            <span>✦</span>
            YOUR SMARTER WAY TO STUDY
          </span>

          <h1 className="mb-7 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Turn Knowledge
            <br />
            Into <span className="text-violet-600">Smart Notes.</span>
          </h1>

          <p className="max-w-lg text-base leading-8 text-gray-500 sm:text-lg">
            Create exam-ready notes, simplify complex topics and organize your
            learning with the power of AI. Save time and focus on what really
            matters.
          </p>

          {/* BUTTONS */}
          <div className="mt-9 flex flex-wrap gap-4">
            <button
              className="flex cursor-pointer items-center justify-center gap-3 rounded-xl bg-violet-600 px-6 py-4 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-1 hover:bg-violet-700"
              onClick={handleGoogleAuth}
            >
              <FcGoogle size={21} />
              Sign in with Google
            </button>

            <a
              href="#features"
              className="rounded-xl border border-gray-200 bg-white px-6 py-4 font-semibold text-gray-700 transition hover:border-violet-400 hover:text-violet-600"
            >
              Explore Features
            </a>
          </div>

          {/* TRUST SECTION */}
          <div className="mt-14 flex flex-wrap items-center gap-4">
            <div className="flex -space-x-2">
              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-violet-100">
                👨🏻
              </span>

              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-blue-100">
                👩🏻
              </span>

              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-pink-100">
                👨🏽
              </span>
            </div>

            <p className="text-sm text-gray-500">
              Made for students who love learning smarter.
            </p>
          </div>
        </motion.div>

        {/* RIGHT FEATURE CARDS */}
        <motion.div
          id="features"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8">
            <span className="text-xs font-bold tracking-[3px] text-violet-600">
              WHAT YOU GET
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything you need.
            </h2>

            <p className="mt-3 text-gray-500 leading-7">
              Powerful features designed to make your learning experience simple
              and productive.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={0.2 + index * 0.12}
              />
            ))}
          </div>
        </motion.div>
      </main>

      {/* Frequently asked question section */}
      <FAQSection id="faq" />

      {/* FOOTER */}
      <motion.footer
        className="border-t border-gray-200 bg-slate-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-white sm:flex-row sm:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-violet-600">
              <span className="text-sm text-white">✦</span>
            </div>

            <p className="font-bold text-white">
              Note<span className="text-violet-600">AI</span>
            </p>
          </div>

          <p>© 2026 NoteAI. Learn smarter, not harder.</p>

          <span>Powered by AI ✦</span>
        </div>
      </motion.footer>
    </div>
  );
}

export default Auth;
