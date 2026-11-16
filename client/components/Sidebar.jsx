import React from "react";
import { Pin, Star, Flame, HelpCircle, BookOpen } from "lucide-react";

function Sidebar({ result }) {
  // Extract API response data safely
  const data = result?.data || result;

  if (!data) {
    return null;
  }

  const subTopics = data.subTopics || {};
  const questions = data.questions || {};

  const priorityLevels = [
    { key: "⭐", label: "Priority" },
    { key: "⭐⭐", label: "Priority" },
    { key: "⭐⭐⭐", label: "Priority" },
  ];

  return (
    <aside className="w-full lg:w-[310px] shrink-0">
      <div className="sticky top-5 space-y-5">
        {/* Quick Exam View */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <h2 className="mb-5 flex items-center gap-2 text-sm font-bold text-violet-700">
            <Pin size={17} className="fill-pink-500 text-pink-500" />
            Quick Exam View
          </h2>

          {/* Sub Topics */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-xs font-bold text-gray-600">
              <Star size={14} className="fill-yellow-400 text-yellow-500" />
              Sub Topics (Priority Wise)
            </h3>

            <div className="space-y-3">
              {priorityLevels.map((level, index) => {
                const topics = subTopics[level.key] || [];

                if (topics.length === 0) return null;

                return (
                  <div
                    key={level.key}
                    className="rounded-lg border border-gray-100 bg-gray-50 p-3"
                  >
                    <h4 className="mb-2 flex items-center gap-1 text-xs font-semibold text-amber-600">
                      <span>{level.key}</span>
                      {level.label}
                    </h4>

                    <ul className="space-y-1.5">
                      {topics.map((topic, i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-xs leading-5 text-gray-600"
                        >
                          <span className="text-gray-400">•</span>
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Exam Importance */}
          <div className="mt-5 rounded-lg border border-yellow-100 bg-yellow-50 p-3">
            <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-700">
              <Flame size={15} className="text-orange-500" />
              Exam Importance
            </h3>

            <div className="text-sm tracking-wider">
              {data.importance || "Not available"}
            </div>
          </div>

          {/* Important Questions */}
          <div className="mt-5">
            <h3 className="mb-3 flex items-center gap-2 text-xs font-bold text-gray-700">
              <HelpCircle size={15} className="text-red-500" />
              Important Questions
            </h3>

            {/* Short Questions */}
            {questions.short?.length > 0 && (
              <div className="mb-3 rounded-lg border border-indigo-100 bg-indigo-50 p-3">
                <h4 className="mb-2 text-xs font-semibold text-indigo-700">
                  Short Questions
                </h4>

                <ol className="list-inside list-decimal space-y-2">
                  {questions.short.map((question, index) => (
                    <li key={index} className="text-xs leading-5 text-gray-700">
                      {question}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Long Questions */}
            {questions.long?.length > 0 && (
              <div className="rounded-lg border border-purple-100 bg-purple-50 p-3">
                <h4 className="mb-2 text-xs font-semibold text-purple-700">
                  Long Questions
                </h4>

                <ol className="list-inside list-decimal space-y-2">
                  {questions.long.map((question, index) => (
                    <li key={index} className="text-xs leading-5 text-gray-700">
                      {question}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>

        {/* Quick Revision Points */}
        {data.revisionPoints?.length > 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-violet-700">
              <BookOpen size={16} />
              Quick Revision
            </h3>

            <ul className="space-y-2">
              {data.revisionPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex gap-2 text-xs leading-5 text-gray-600"
                >
                  <span className="font-bold text-violet-500">
                    {index + 1}.
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
