import { ChevronDown, ChevronUp } from "lucide-react";

type CheatSheetPanelProps = {
  idealAnswer: string | string[];
  redFlags: string[];
  isOpen: boolean;
  onToggle: () => void;
};

export function CheatSheetPanel({
  idealAnswer,
  redFlags,
  isOpen,
  onToggle,
}: CheatSheetPanelProps) {
  const idealPoints = Array.isArray(idealAnswer)
    ? idealAnswer.filter(Boolean)
    : idealAnswer
        .split(/\n|•|[-*]/)
        .map((s) => s.trim())
        .filter(Boolean);

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-800/50">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-white transition hover:bg-zinc-700/50"
      >
        View Cheat Sheet
        {isOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>
      {isOpen && (
        <div className="space-y-4 border-t border-zinc-700 px-4 py-4">
          <div>
            <h4 className="mb-2 text-sm font-medium text-emerald-400">
              Ideal Answer
            </h4>
            <ul className="space-y-1.5">
              {idealPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-emerald-100/90"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          {Array.isArray(redFlags) && redFlags.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-medium text-rose-400">
                Red Flags
              </h4>
              <div className="rounded-md border border-rose-500/30 bg-rose-950/30 p-3">
                <ul className="space-y-1.5 text-sm text-rose-200/90">
                  {redFlags.map((flag, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
