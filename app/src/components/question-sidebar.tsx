import { motion } from "motion/react";
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
          <motion.div key={i} layout className="relative">
            <motion.button
              onClick={() => onSelectQuestion(i)}
              whileHover={i === activeIndex ? undefined : { x: 3, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className={`flex w-full items-start gap-2 rounded-lg px-3 py-2.5 text-left will-change-transform ${
                i === activeIndex
                  ? "bg-emerald-500/10 text-emerald-100 ring-1 ring-emerald-500/30"
                  : "text-zinc-300 hover:bg-zinc-800/90 hover:text-white"
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
            </motion.button>
          </motion.div>
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
                className="rounded border border-zinc-700/70 bg-zinc-700/50 px-2 py-0.5 text-xs text-zinc-300 transition hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-200"
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
