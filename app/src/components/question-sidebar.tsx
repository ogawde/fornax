import { PhaseBadge } from "./phase-badge";
import type { InterviewKit } from "../types";

type QuestionSidebarProps = {
  data: InterviewKit;
  activeIndex: number;
  onSelectQuestion: (i: number) => void;
};

export function QuestionSidebar({
  data,
  activeIndex,
  onSelectQuestion,
}: QuestionSidebarProps) {
  return (
    <aside className="w-72 shrink-0 border-r border-zinc-800 bg-zinc-900/50 p-4">
      <nav className="space-y-1">
        {data.interview_path?.map((q, i) => (
          <button
            key={i}
            onClick={() => onSelectQuestion(i)}
            className={`flex w-full items-start gap-2 rounded-lg px-3 py-2.5 text-left transition ${
              i === activeIndex
                ? "bg-emerald-500/10 text-emerald-100 ring-1 ring-emerald-500/30"
                : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <span className="mt-0.5 text-xs font-medium text-zinc-500">
              {i + 1}.
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm">{q.question}</div>
              <div className="mt-1">
                <PhaseBadge phase={q.type} />
              </div>
            </div>
          </button>
        ))}
      </nav>
      {(data?.tech_stack?.length ?? 0) > 0 && (
        <div className="mt-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {data.tech_stack.map((tech, i) => (
              <span
                key={i}
                className="rounded bg-zinc-700/50 px-2 py-0.5 text-xs text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
