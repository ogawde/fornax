import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "./ui/arrow-up-right";
import { BackgroundPathsBackground } from "./ui/background-paths";

type HeroSectionProps = {
  repoUrl: string;
  onRepoUrlChange: (v: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
};

export function HeroSection({
  repoUrl,
  onRepoUrlChange,
  onSubmit,
  isLoading,
}: HeroSectionProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#020617] px-4">
      <BackgroundPathsBackground />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-400/30 blur-3xl" />
        <div className="absolute -bottom-40 left-4 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />
      </motion.div>

      <motion.div
        className="w-full max-w-3xl space-y-10"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-center">
          <motion.h1
            className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Built for candidates.{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
              Loved by interviewers.
            </span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-4 max-w-xl text-balance text-sm text-zinc-400 sm:text-base"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Paste any GitHub repo to generate real, role-ready interview
            questions.
          </motion.p>
        </div>

        <motion.div
          className="mx-auto w-full max-w-2xl"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 shadow-[0_18px_50px_rgba(0,0,0,0.45),0_0_0_1px_rgba(148,163,184,0.12)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-300/10 via-sky-300/10 to-violet-300/10" />
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => onRepoUrlChange(e.target.value)}
              placeholder="your github url goes here"
              className="relative min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-zinc-300/75 outline-none"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={onSubmit}
              disabled={isLoading || !repoUrl.trim()}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-400 text-zinc-950 shadow-[0_10px_25px_rgba(16,185,129,0.45)] transition hover:bg-emerald-300 hover:shadow-[0_12px_28px_rgba(16,185,129,0.6)] disabled:opacity-40 disabled:hover:bg-emerald-400"
              aria-label={isLoading ? "Generating interview kit..." : "Generate interview kit"}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ArrowUpRightIcon className="h-5 w-5" size={18} />
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
