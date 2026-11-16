import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../src/App";
import { FileText, Zap, BarChart3, Image, LoaderCircle } from "lucide-react";

function HisorySidebar({ onSelectNote }) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const myNotes = async () => {
      try {
        const res = await axios.get(serverUrl + "/api/notes/getnotes", {
          withCredentials: true,
        });

        setTopics(res.data?.notes || []);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    myNotes();
  }, []);

  // Fetch complete note when clicked
  const handleSelect = async (note) => {
    try {
      setSelectedId(note._id);

      const res = await axios.get(`${serverUrl}/api/notes/${note._id}`, {
        withCredentials: true,
      });

      onSelectNote(res.data.notes);
    } catch (error) {
      console.error("Error fetching selected note:", error);
    }
  };

  return (
    <aside className="w-full h-full bg-white text-gray-800 flex flex-col border-r border-violet-100">
      {/* SIDEBAR HEADER */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-violet-100">
        <FileText size={19} className="text-violet-600" />
        <h2 className="font-semibold text-sm text-gray-800">Your Notes</h2>
      </div>

      {/* NOTES LIST */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {loading ? (
          <div className="flex justify-center py-6">
            <LoaderCircle className="animate-spin text-violet-600" />
          </div>
        ) : topics.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-6">
            No notes found
          </p>
        ) : (
          topics.map((note) => (
            <button
              key={note._id}
              onClick={() => handleSelect(note)}
              className={`w-full text-left p-3 rounded-xl border transition duration-200 ${
                selectedId === note._id
                  ? "bg-violet-50 border-violet-300 shadow-sm"
                  : "bg-white border-gray-100 hover:bg-violet-50 hover:border-violet-200"
              }`}
            >
              <h3 className="text-sm font-semibold capitalize mb-2 text-gray-800">
                {note.topic}
              </h3>

              <span className="text-[10px] px-2 py-1 rounded-full bg-violet-100 text-violet-700 font-medium">
                {note.examType}
              </span>

              <div className="flex flex-wrap gap-3 mt-3 text-[11px] text-gray-500">
                {note.revisionMode && (
                  <span className="flex items-center gap-1">
                    <Zap size={12} className="text-violet-500" />
                    Revision
                  </span>
                )}

                {note.includeDiagram && (
                  <span className="flex items-center gap-1">
                    <Image size={12} className="text-violet-500" />
                    Diagram
                  </span>
                )}

                {note.includeChart && (
                  <span className="flex items-center gap-1">
                    <BarChart3 size={12} className="text-violet-500" />
                    Chart
                  </span>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </aside>
  );
}

export default HisorySidebar;
