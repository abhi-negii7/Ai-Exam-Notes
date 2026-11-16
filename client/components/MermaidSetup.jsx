import React, { useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "strict",
  flowchart: {
    curve: "linear",
    useMaxWidth: true,
    htmlLabels: false,
  },
});

function Mermaid({ chart }) {
  const containerRef = useRef(null);
  const id = useId();

  const [error, setError] = useState(false);
  const [rendering, setRendering] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const renderChart = async () => {
      if (!chart?.trim() || !containerRef.current) return;

      setRendering(true);
      setError(false);

      try {
        const diagramId = `mermaid-${id.replace(/:/g, "")}`;

        const { svg } = await mermaid.render(diagramId, chart.trim());

        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.error("Mermaid Error:", err);

        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setRendering(false);
        }
      }
    };

    renderChart();

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (!chart?.trim()) {
    return <p>No diagram available.</p>;
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      {rendering && (
        <p className="py-4 text-center text-gray-500">Rendering diagram...</p>
      )}

      {error && (
        <p className="py-4 text-center text-red-500">
          Unable to render diagram.
        </p>
      )}

      <div
        ref={containerRef}
        className="flex justify-center overflow-x-auto [&_svg]:h-auto [&_svg]:max-w-full"
        style={{ display: error ? "none" : "flex" }}
      />
    </div>
  );
}

export default Mermaid;
