import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroSection, LoadingState } from "../components";
import { analyzeRepo } from "../api";
import { normalizeInterviewData } from "../lib/normalize-interview-data";
import type { InterviewKit } from "../types";

export function LandingPage() {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!repoUrl.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeRepo(repoUrl.trim());
      const interviewData = normalizeInterviewData(data) as InterviewKit;
      navigate("/kit", { state: { interviewData } });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to analyze repository"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-[#020617]">
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

