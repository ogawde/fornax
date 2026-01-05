import { QuestionSidebar } from "./question-sidebar";
import { QuestionContent } from "./question-content";
import type { InterviewKit } from "../types";

type DashboardViewProps = {
  data: InterviewKit;
  activeIndex: number;
  onSelectQuestion: (i: number) => void;
};

export function DashboardView({
  data,
  activeIndex,
  onSelectQuestion,
}: DashboardViewProps) {
  const active = data.interview_path?.[activeIndex];

  return (
    <div className="flex min-h-screen">
      <QuestionSidebar
        data={data}
        activeIndex={activeIndex}
        onSelectQuestion={onSelectQuestion}
      />
      <main className="flex-1 overflow-auto p-6">
        {active && <QuestionContent question={active} />}
      </main>
    </div>
  );
}
