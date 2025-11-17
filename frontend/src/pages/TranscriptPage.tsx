import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Transcript: React.FC = () => {
  const navigate = useNavigate();
  const [transcripts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fakeApiCall = async () => {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 800));
      setIsLoading(false);
    };

    fakeApiCall();
  }, []);

  // inject Sora & Poppins from Google Fonts (same as AnalysisPage)
  useEffect(() => {
    const id = "sora-poppins-fonts";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Poppins:wght@400&family=Sora:wght@600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#f9fafb]">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md flex flex-col h-[75vh]">
        {/* header stuck to top of card */}
        <div className="w-full flex-none">
          <h1
            className="text-center text-3xl font-bold"
            style={{
              fontFamily:
                "Sora, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
              fontWeight: 700,
            }}
          >
            Transcript
          </h1>
        </div>

        {/* scrollable main content */}
        <div className="flex-1 overflow-auto mt-4 pb-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500">Loading transcript...</p>
            </div>
          ) : (
            <div className="space-y-6 px-0">
              <div className="w-full">
                <div
                  className="w-full border border-gray-200 rounded-lg p-4 bg-gray-50 text-gray-700 text-sm min-h-[80px] h-64 overflow-y-auto"
                  style={{
                    fontFamily:
                      "Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                    fontWeight: 400,
                  }}
                >
                  {transcripts.length > 0 ? (
                    transcripts.map((line, i) => (
                      <p key={i} className="text-gray-700 text-sm mb-2">
                        {line}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm text-center mt-8">
                      No transcript data available.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* footer stuck to bottom of card: divider + 17px gap to button */}
        <div className="w-full">
          <div className="w-full h-px bg-gray-100"></div>
          <div className="flex justify-center mt-[17px]">
            <button
              type="button"
              className="Button cursor-pointer px-8 py-3 bg-[#1287FF] rounded-2xl shadow-xl text-white text-[18px] font-['Sora'] font-semibold transition-colors transition-shadow duration-300 ease-in-out hover:shadow-none hover:bg-[#0f6fd6] focus:outline-none focus:ring-2 focus:ring-[#1287FF]/30"
              style={{
                transition:
                  "background-color 300ms ease, box-shadow 300ms ease",
              }}
              onClick={() => navigate("/analysis")}
            >
              View Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transcript;
