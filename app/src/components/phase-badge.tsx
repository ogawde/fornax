export function PhaseBadge({ phase }: { phase: string }) {
  const styles: Record<string, string> = {
    Architectural: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    Strategy: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    Implementation: "bg-violet-500/20 text-violet-300 border-violet-500/40",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${styles[phase] ?? "bg-zinc-500/20 text-zinc-300"}`}
    >
      {phase}
    </span>
  );
}
