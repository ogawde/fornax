import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "../components";
import { analyzeRepo } from "../api";
import { normalizeInterviewData } from "../lib/normalize-interview-data";
import { MultiStepLoader } from "../components/ui/multi-step-loader";
import type { InterviewKit } from "../types";

const LOADING_STATES = [
  { text: "cloning the repo" },
  { text: "reading the project" },
  { text: "forming questions based on the project" },
  { text: "generating the interview kit" },
];

const LOADING_STEP_DURATION_MS = 3000;

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
      const analyzePromise = analyzeRepo(repoUrl.trim());
      const minimumLoadingPromise = new Promise((resolve) => {
        setTimeout(
          resolve,
          LOADING_STATES.length * LOADING_STEP_DURATION_MS
        );
      });
      const preloadKitPromise = import("../components");

      const [data] = await Promise.all([
        analyzePromise,
        minimumLoadingPromise,
        preloadKitPromise,
      ]);

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

  return (
    <div className="min-h-screen bg-[#020617]">
      <MultiStepLoader
        loadingStates={LOADING_STATES}
        loading={loading}
        duration={LOADING_STEP_DURATION_MS}
        loop={false}
      />
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

