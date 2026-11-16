import React, { useState } from "react";
import HisorySidebar from "../components/HistorySidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import FinalResult from "../components/FinalResult";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";
import { ArrowLeft, Menu, X, History as HistoryIcon } from "lucide-react";

function History() {
  const [selectedNote, setSelectedNote] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setShowHistory(false); // Close sidebar on mobile
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      {/* NAVBAR: Logo + Credits only */}
      <HomeNavbar showProfile={false} />

      {/* BACK BUTTON */}
      <div className="bg-white border-b border-violet-100 px-4 sm:px-8 py-3">
        <button
          onClick={() => navigate("/notes")}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-violet-600 transition"
        >
          <ArrowLeft size={18} />
          Back to Notes
        </button>
      </div>

      {/* HISTORY SECTION */}
      <div className="flex h-[calc(100vh-128px)] bg-gray-100 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-80 shrink-0 h-full">
          <HisorySidebar onSelectNote={handleSelectNote} />
        </div>

        {/* Mobile Sidebar Overlay */}
        <div
          className={`fixed inset-0 top-0 z-50 md:hidden transition-opacity duration-500 ${
            showHistory
              ? "visible opacity-100 pointer-events-auto"
              : "invisible opacity-0 pointer-events-none"
          }`}
        >
          <div
            onClick={() => setShowHistory(false)}
            className="absolute inset-0 bg-black/50"
          />

          <div
            className={`absolute left-0 top-0 h-full w-[85%] max-w-80 shadow-xl bg-white transform transition-transform duration-500 ease-in-out ${
              showHistory ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between bg-slate-900 px-4 py-3">
              <span className="font-semibold text-white">Note History</span>

              <button
                onClick={() => setShowHistory(false)}
                className="flex items-center gap-2 rounded-lg bg-violet-100 px-3 py-2 text-sm font-medium text-violet-700 hover:bg-violet-200 transition md:hidden"
              >
                <X size={20} />
              </button>
            </div>

            <div className="h-[calc(100%-56px)]">
              <HisorySidebar onSelectNote={handleSelectNote} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          {/* History Header */}
          <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-violet-100 bg-white px-4 py-3 shadow-sm">
            <button
              onClick={() => setShowHistory(true)}
              className="flex items-center gap-2 rounded-lg bg-violet-100 px-3 py-2 text-sm font-medium text-violet-700 hover:bg-violet-200 md:hidden"
            >
              <Menu size={18} />
              History
            </button>

            <h2 className="font-semibold text-gray-800 truncate">
              {selectedNote ? selectedNote.topic : "My Notes"}
            </h2>
          </header>

          {/* Selected Note */}
          <div className="p-4 sm:p-6 md:p-8">
            {selectedNote ? (
              <div className="max-w-5xl mx-auto">
                <div className="mb-6">
                  <h1 className="text-2xl sm:text-3xl font-bold capitalize">
                    {selectedNote.topic}
                  </h1>

                  <p className="text-gray-500 mt-2">{selectedNote.examType}</p>
                </div>

                <FinalResult
                  result={selectedNote.content}
                  options={{
                    diagrams: selectedNote.includeDiagram,
                    charts: selectedNote.includeChart,
                  }}
                />
              </div>
            ) : (
              <div className="min-h-[70vh] flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <HistoryIcon size={45} className="mx-auto mb-3 opacity-40" />

                  <h2 className="text-lg font-semibold">No Note Selected</h2>

                  <p className="text-sm mt-2">
                    Select a note from your history to view it.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
  // );
}

export default History;
