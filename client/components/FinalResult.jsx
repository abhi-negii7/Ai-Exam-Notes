import React, { useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Mermaid from "./MermaidSetup";
import ChartSetup from "./ChartSetup";
import html2pdf from "html2pdf.js";
import {
  FileText,
  Download,
  Clock,
  Star,
  Flame,
  BookOpen,
  HelpCircle,
  BarChart3,
  Image,
  Shapes,
} from "lucide-react";

function FinalResult({ result }) {
  const pdfRef = useRef();
  const data = result?.data || result;
  if (!data) return null;
  const showDiagrams = result?.options?.diagrams ?? false;
  const showCharts = result?.options?.charts ?? false;

  const subTopics = data.subTopics || {};
  const questions = data.questions || {};

  const priorityLevels = [
    { key: "⭐", label: "Star Topics" },
    { key: "⭐⭐", label: "Star Topics" },
    { key: "⭐⭐⭐", label: "Star Topics" },
  ];

  
const handleDownload = async () => {
  const element = pdfRef.current;

  if (!element) return;

  try {
    await html2pdf()
      .set({
        margin: 12,
        filename: "My-Notes.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
        },
        pagebreak: {
          mode: ["css", "legacy"],
          avoid: ["p", "li", "h1", "h2", "h3"],
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(element)
      .save();
  } catch (error) {
    console.error("PDF Download Error:", error);
  }
};


  const handleRevision = () => {
    console.log("Quick Revision Started");
  };

  return (
    <div className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
      {/* Header */}
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <h1 className="flex items-center gap-3 text-xl font-bold text-violet-700 sm:text-2xl">
          <FileText size={25} className="fill-violet-600 text-violet-600" />
          Generated Notes
        </h1>

        <div className="flex flex-wrap gap-2">
          {/* <button
            onClick={handleRevision}
            className="flex items-center gap-2 rounded-lg bg-green-100 px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-200"
          >
            <Clock size={14} />
            Quick Revision (5 min)
          </button> */}

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-violet-700"
          >
            <Download size={14} />
            Download PDF
          </button>
        </div>
      </div>

      {/* PDF CONTENT START */}
      <div ref={pdfRef} className="pdf-content">
        {/* Exam Importance */}
        <div className="mb-7 flex items-center gap-2 rounded-lg border border-yellow-100 bg-yellow-50 px-4 py-4">
          <Flame size={17} className="text-orange-500" />

          <span className="text-sm font-semibold text-gray-700">
            Importance:
          </span>

          <span className="text-sm tracking-wider">
            {data.importance || "Not available"}
          </span>
        </div>

        {/* Sub Topics */}
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-2 rounded-md bg-indigo-50 px-4 py-2">
            <Star size={16} className="fill-yellow-400 text-yellow-500" />
            <h2 className="text-sm font-bold text-indigo-700">Sub Topics</h2>
          </div>

          <div className="space-y-5">
            {priorityLevels.map((level) => {
              const topics = subTopics[level.key] || [];

              if (!topics.length) return null;

              return (
                <div key={level.key}>
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-indigo-700">
                    <span>{level.key}</span>
                    {level.label}
                  </h3>

                  <ul className="space-y-1.5 pl-1">
                    {topics.map((topic, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm leading-6 text-gray-600"
                      >
                        <span className="mt-1 text-gray-400">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Detailed Notes */}
        <section className="mb-8">
          <div className="mb-4 flex items-center gap-2 rounded-md bg-purple-50 px-4 py-2">
            <FileText size={16} className="text-purple-600" />
            <h2 className="text-sm font-bold text-purple-700">
              Detailed Notes
            </h2>
          </div>

          <div className="prose prose-sm max-w-none break-words text-gray-700 prose-headings:font-bold prose-headings:text-gray-800 prose-h1:text-2xl prose-h2:mt-6 prose-h2:text-lg prose-h3:text-base prose-p:leading-7 prose-li:leading-7 prose-strong:text-gray-900 prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:text-violet-700">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h1 className="mb-5 mt-6 text-3xl font-bold text-gray-900">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mb-4 mt-6 border-b pb-2 text-2xl font-bold text-gray-800">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-3 mt-5 text-xl font-semibold text-gray-800">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mb-3 text-base leading-7 text-gray-700">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-gray-900">
                    {children}
                  </strong>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 list-disc space-y-2 pl-6">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-4 list-decimal space-y-2 pl-6">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="mb-2 text-gray-700 leading-7">{children}</li>
                ),
                code: ({ children }) => (
                  <code className="rounded bg-gray-100 px-1.5 py-1 text-sm text-indigo-600">
                    {children}
                  </code>
                ),
              }}
            >
              {data.notes || "No detailed notes available."}
            </ReactMarkdown>
          </div>
        </section>

        {/* Diagrams */}
        {data.diagram?.data && (
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold">Diagram</h2>

            <Mermaid chart={data.diagram.data} />
          </section>
        )}

        {/* Charts */}
        {data.charts?.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold">Charts</h2>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {data.charts.map((chart, index) => (
                <ChartSetup key={index} chart={chart} />
              ))}
            </div>
          </section>
        )}

        {/* Revision Points */}
        {data.revisionPoints?.length > 0 && (
          <section className="mb-8">
            <div className="mb-4 flex items-center gap-2 rounded-md bg-green-50 px-4 py-2">
              <Clock size={16} className="text-green-600" />
              <h2 className="text-sm font-bold text-green-700">
                Revision Points
              </h2>
            </div>

            <ul className="space-y-2 pl-5 list-disc">
              {data.revisionPoints.map((point, index) => (
                <li key={index} className="text-sm leading-7 text-gray-700">
                  {point}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Important Questions */}
        <section>
          <div className="mb-4 flex items-center gap-2 rounded-md bg-rose-50 px-4 py-2">
            <HelpCircle size={16} className="text-rose-600" />
            <h2 className="text-sm font-bold text-rose-700">
              Important Questions
            </h2>
          </div>

          {/* Short Questions */}
          {questions.short?.length > 0 && (
            <div className="mb-5">
              <h3 className="mb-3 text-sm font-semibold text-indigo-700">
                Short Questions
              </h3>

              <ol className="list-inside list-decimal space-y-3">
                {questions.short.map((question, index) => (
                  <li key={index} className="text-sm leading-6 text-gray-700">
                    {question}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Long Questions */}
          {questions.long?.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold text-purple-700">
                Long Questions
              </h3>

              <ol className="list-inside list-decimal space-y-3">
                {questions.long.map((question, index) => (
                  <li key={index} className="text-sm leading-6 text-gray-700">
                    {question}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>

        {/* PDF CONTENT END */}
      </div>
    </div>
  );
}

export default FinalResult;
