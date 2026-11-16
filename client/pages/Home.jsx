import HomeNavbar from "../components/HomeNavbar";
import axios from "axios";
import { serverUrl } from "../src/App";
import { useDispatch } from "react-redux";
import { setUserData } from "../src/redux/userSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Sparkles,
  FileText,
  Brain,
  History,
  Clock,
  Pencil,
  WandSparkles,
  Download,
  ArrowRight,
  CheckCircle2,
  Zap,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import FAQSection from "../components/FAQSection";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleHistory = () => {
    console.log("Show History");
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      navigate("/auth");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleBuyCredits = () => {
    console.log("Buy Credits");
  };

  const features = [
    {
      icon: <Brain size={25} />,
      title: "AI-Powered Generation",
      description:
        "Transform lengthy content into clear, structured and easy-to-understand notes using AI.",
      color: "bg-violet-100 text-violet-600",
    },
    {
      icon: <Zap size={25} />,
      title: "Smart Credit System",
      description:
        "Generate notes using credits and choose flexible plans that match your learning needs.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <History size={25} />,
      title: "Notes History",
      description:
        "Save your generated notes, revisit previous results and manage your study materials in one place.",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: <Download size={25} />,
      title: "PDF Export",
      description:
        "Download your AI-generated notes as PDFs and keep them ready for offline learning and revision.",
      color: "bg-amber-100 text-amber-600",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: <Pencil size={24} />,
      title: "Enter Your Details",
      description:
        "Enter your study topic, class or grade, and exam type to personalize your learning experience.",
    },
    {
      number: "02",
      icon: <WandSparkles size={24} />,
      title: "Generate AI Notes",
      description:
        "AI creates structured study notes with explanations, key concepts, and important information based on your inputs.",
    },
    {
      number: "03",
      icon: <BookOpen size={24} />,
      title: "Learn & Practice",
      description:
        "Explore your notes, diagrams, summaries, and practice questions to prepare effectively for your exams.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9ff] text-gray-900 overflow-hidden">
      {/* NAVBAR */}
      <HomeNavbar
        onShowHistory={handleHistory}
        onLogout={handleLogout}
        onBuyCredits={handleBuyCredits}
      />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-6 pb-16 md:pt-10 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* LEFT: ANIMATED ILLUSTRATION */}
          <div className="relative flex items-center justify-center min-h-[350px] sm:min-h-[440px]">
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-violet-200/50 rounded-full blur-3xl" />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full max-w-[430px] bg-white rounded-3xl border border-violet-100 shadow-2xl shadow-violet-200/40 p-6 sm:p-8"
            >
              {/* DOCUMENT HEADER */}
              <div className="flex justify-between items-center mb-7">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center">
                    <FileText className="text-violet-600" size={23} />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-800">Generated Notes</h3>
                    <p className="text-xs text-gray-400">Your study material</p>
                  </div>
                </div>

                <Sparkles className="text-violet-500" size={22} />
              </div>

              {/* DOCUMENT LINES */}
              <div className="space-y-5">
                <div>
                  <div className="h-3 w-2/3 rounded-full bg-violet-200 mb-3" />
                  <div className="h-2 w-full rounded-full bg-gray-100 mb-2" />
                  <div className="h-2 w-5/6 rounded-full bg-gray-100" />
                </div>

                <div className="bg-violet-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={16} className="text-violet-600" />
                    <span className="text-sm font-semibold text-violet-700">
                      Key Points
                    </span>
                  </div>

                  {[1, 2, 3].map((item) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 2,
                        delay: item * 0.3,
                        repeat: Infinity,
                      }}
                      className="flex gap-2 items-center mb-3"
                    >
                      <CheckCircle2
                        size={15}
                        className="text-violet-500 shrink-0"
                      />
                      <div className="h-2 bg-violet-200 rounded-full w-full" />
                    </motion.div>
                  ))}
                </div>

                <div>
                  <div className="h-3 w-1/2 rounded-full bg-gray-200 mb-3" />
                  <div className="h-2 w-full rounded-full bg-gray-100 mb-2" />
                  <div className="h-2 w-4/5 rounded-full bg-gray-100" />
                </div>
              </div>

              {/* GENERATING BADGE */}
              <div className="mt-7 flex items-center justify-between bg-gray-50 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles size={17} className="text-violet-600" />
                  </motion.div>

                  <span className="text-xs font-medium text-gray-600">
                    AI is making learning easier
                  </span>
                </div>

                <span className="text-xs text-green-600 font-semibold">
                  Ready
                </span>
              </div>
            </motion.div>

            {/* FLOATING BADGE */}
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, 3, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute top-5 right-0 sm:right-2 bg-white shadow-lg border border-gray-100 rounded-2xl p-3 flex items-center gap-2"
            >
              <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center">
                <Zap className="text-green-600" size={19} />
              </div>
              <div>
                <p className="text-xs font-bold">Smart Learning</p>
                <p className="text-[10px] text-gray-400">Powered by AI</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: HERO CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles size={16} />
              Your AI-powered learning assistant
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Turn Long Content Into{" "}
              <span className="text-violet-600">Smart Notes.</span>
            </h1>

            <p className="mt-6 text-gray-500 text-base sm:text-lg leading-8 max-w-xl">
              Make learning easier with AI-generated notes. Convert lengthy
              content into concise, organized and meaningful notes. Save time,
              focus on what matters, and learn smarter.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => navigate("/notes")}
                className="flex items-center justify-center gap-3 bg-violet-600 hover:bg-violet-700 text-white px-7 py-4 rounded-xl font-semibold shadow-lg shadow-violet-200 transition-all hover:-translate-y-1"
              >
                Get Started
                <ArrowRight size={19} />
              </button>

              <button
                onClick={() =>
                  document.getElementById("features")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 px-7 py-4 rounded-xl font-semibold text-gray-700 transition"
              >
                Explore Features
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-5 mt-8 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-green-500" />
                Easy to use
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-green-500" />
                AI powered
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-widest">
              Features
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold mt-4">
              Everything You Need to{" "}
              <span className="text-violet-600">Learn Smarter</span>
            </h2>

            <p className="text-gray-500 mt-4 leading-7">
              A simple and powerful way to transform your study materials into
              useful learning resources.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="p-7 rounded-2xl border border-gray-100 bg-[#faf9ff] hover:bg-white hover:shadow-xl hover:shadow-violet-100/60 transition-all"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${feature.color}`}
                >
                  {feature.icon}
                </div>

                <h3 className="font-bold text-lg mt-6">{feature.title}</h3>

                <p className="text-gray-500 text-sm leading-7 mt-3">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-[#faf9ff]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-widest">
              Simple Process
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold mt-4">
              How It Works
            </h2>

            <p className="text-gray-500 mt-4">
              Generate your notes in just three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">
                    {step.icon}
                  </div>

                  <span className="text-4xl font-black text-violet-100">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold mt-7">{step.title}</h3>

                <p className="text-gray-500 text-sm leading-7 mt-3">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently asked question */}
      <FAQSection />

      {/* FOOTER */}
      <footer className="bg-slate-900 pt-14 pb-7 text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* BRAND */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
                  <span className="text-2xl text-white">✦</span>
                </div>

                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  Note<span className="text-violet-400">AI</span>
                </h2>
              </div>

              <p className="mt-5 max-w-xs text-sm leading-7 text-slate-300">
                Making learning easier with AI-powered notes. Transform your
                content into meaningful knowledge.
              </p>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="mb-5 text-lg font-bold text-white">Quick Links</h3>

              <div className="flex flex-col gap-3 text-sm text-slate-300">
                <button
                  onClick={() => navigate("/")}
                  className="text-left transition hover:translate-x-1 hover:text-violet-400"
                >
                  Home
                </button>

                <button
                  onClick={() =>
                    document.getElementById("features")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="text-left transition hover:translate-x-1 hover:text-violet-400"
                >
                  Features
                </button>

                <button
                  onClick={() => navigate("/notes")}
                  className="text-left transition hover:translate-x-1 hover:text-violet-400"
                >
                  Create Notes
                </button>
              </div>
            </div>

            {/* ABOUT */}
            <div>
              <h3 className="mb-5 text-lg font-bold text-white">
                About Project
              </h3>

              <p className="text-sm leading-7 text-slate-300">
                An AI-powered note generation platform designed to help students
                and learners organize information and save time.
              </p>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-700 pt-7 text-sm text-slate-400 sm:flex-row">
            <p>© {new Date().getFullYear()} NoteAI. All rights reserved.</p>

            <p>
              Made with <span className="text-violet-400">♥</span> for smarter
              learning.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
