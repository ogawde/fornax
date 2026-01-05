import { useState } from "react";
import { analyzeRepo } from "./api";
import { HeroSection, LoadingState, DashboardView } from "./components";
import { normalizeInterviewData } from "./lib/normalize-interview-data";
import type { InterviewKit } from "./types";

export default function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [interviewData, setInterviewData] = useState<InterviewKit | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!repoUrl.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeRepo(repoUrl.trim());
      setInterviewData(normalizeInterviewData(data));
      setActiveIndex(0);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to analyze repository"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingState />;

  if (!interviewData) {
    return (
      <div className="min-h-screen bg-[#0f172a]">
        {error && (
          <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-rose-500/50 bg-rose-950/80 px-4 py-2 text-sm text-rose-200">
            {error}
          </div>
        )}
        <HeroSection
          repoUrl={repoUrl}
          onRepoUrlChange={setRepoUrl}
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <DashboardView
        data={interviewData}
        activeIndex={activeIndex}
        onSelectQuestion={setActiveIndex}
      />
    </div>
  );
}
