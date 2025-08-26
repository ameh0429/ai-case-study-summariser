import { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  const cleanAndSplitSummary = (text) => {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) =>
        line.replace(/^[-•\s]+/, "") // remove leading hyphens, bullets, spaces
      )
      .flatMap((line) => {
        // If line is too long, split into shorter sentences
        if (line.length > 140) {
          return line.split(/\. |; |, and |, but /).map((part) => part.trim());
        }
        return [line];
      })
      .filter((line) => line.length > 0);
  };

  const handleSummarize = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setSummary([]); // clear previous summary

    try {
      const response = await fetch("http://localhost:5000/summarise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();

      if (data.summary) {
        const points = Array.isArray(data.summary)
          ? data.summary
          : cleanAndSplitSummary(data.summary);

        setSummary(points);
      } else {
        setSummary(["No summary returned."]);
      }
    } catch (error) {
      console.error("Error:", error);
      setSummary(["Error fetching summary."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          AI Case Study Summariser
        </h1>

        {/* Input Textarea */}
        <textarea
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
          rows="8"
          placeholder="Paste your case study text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        {/* Summarize Button */}
        <button
          onClick={handleSummarize}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-lg font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Summarising..." : "Summarise"}
        </button>

        {/* Summary Output */}
        <div className="bg-gray-50 border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Summary:</h2>
          {summary.length > 0 ? (
            <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg">
              {summary.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          ) : (
            !loading && <p className="text-gray-500">No summary yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;