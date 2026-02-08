import { Suspense, useState, lazy } from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { InterviewKit } from "../types";
import { LoadingState } from "../components";

const DashboardView = lazy(() =>
  import("../components").then((m) => ({ default: m.DashboardView }))
);

type LocationState = {
  interviewData?: InterviewKit;
};

export function KitPage() {
  const location = useLocation();
  const state = (location.state ?? {}) as LocationState;
  const interviewData = state.interviewData;
  const [activeIndex, setActiveIndex] = useState(0);

  if (!interviewData) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Suspense fallback={<LoadingState />}>
        <DashboardView
          data={interviewData}
          activeIndex={activeIndex}
          onSelectQuestion={setActiveIndex}
        />
      </Suspense>
    </div>
  );
}

