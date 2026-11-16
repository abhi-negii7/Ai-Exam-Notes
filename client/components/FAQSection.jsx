import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "What is AI Notes?",
    answer:
      "AI Notes is an AI-powered platform that transforms lengthy content into short, structured and easy-to-understand notes, making learning and revision easier.",
  },
  {
    question: "How does AI note generation work?",
    answer:
      "Simply provide your content, and our AI processes it to generate organized notes with important points and simplified explanations.",
  },
  {
    question: "How does the credit system work?",
    answer:
      "Each AI generation consumes credits. You can purchase a credit plan to get additional credits whenever you need them.",
  },
  {
    question: "Can I access my previously generated notes?",
    answer:
      "Yes! Your generated notes are saved in your history, allowing you to revisit and access them whenever you need.",
  },
  {
    question: "Can I download my notes?",
    answer:
      "Yes! You can download your AI-generated notes as PDF files for offline access, easy sharing and revision.",
  },
  {
    question: "What happens when I run out of credits?",
    answer:
      "You can visit the pricing page and purchase another credit plan to continue generating AI-powered notes.",
  },
  {
    question: "Are my payments secure?",
    answer:
      "Yes! Payments are processed through Stripe's secure payment infrastructure to help keep your transactions safe.",
  },
];

function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="px-5 sm:px-8 py-20 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-semibold mb-5">
            <MessageCircle size={16} />
            FAQs
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-500 mt-4 max-w-xl mx-auto leading-7">
            Everything you need to know about AI Notes, note generation, credits
            and payments.
          </p>
        </motion.div>

        {/* FAQ Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-28"
          >
            <div className="bg-gradient-to-br from-violet-700 to-indigo-600 rounded-3xl p-8 sm:p-10 text-white overflow-hidden relative">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-7">
                  <MessageCircle size={28} />
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                  Have Questions?
                  <br />
                  We've Got Answers.
                </h3>

                <p className="text-violet-100 mt-5 leading-7">
                  Whether you're curious about AI note generation, credits or
                  payments, find the answers you need to get started with AI
                  Notes.
                </p>

                <div className="mt-9 pt-7 border-t border-white/20">
                  <p className="text-sm text-violet-200">
                    Your learning journey starts here.
                  </p>
                  <p className="text-lg font-semibold mt-1">
                    Learn Smarter. Save Time.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  activeIndex === index
                    ? "border-violet-300 shadow-md shadow-violet-100/50"
                    : "border-gray-200 hover:border-violet-200"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <span
                    className={`font-semibold text-sm sm:text-base transition-colors ${
                      activeIndex === index
                        ? "text-violet-700"
                        : "text-gray-800"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      activeIndex === index
                        ? "bg-violet-600 text-white"
                        : "bg-violet-50 text-violet-600"
                    }`}
                  >
                    {activeIndex === index ? (
                      <Minus size={17} />
                    ) : (
                      <Plus size={17} />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.3 },
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6">
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-gray-500 text-sm leading-7">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
