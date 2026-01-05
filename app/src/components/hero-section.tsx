import { FileCode2, Loader2 } from "lucide-react";

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
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Fornax
          </h1>
          <p className="mt-2 text-zinc-400">
            Generate interview kits from any repository
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <input
            type="url"
            value={repoUrl}
            onChange={(e) => onRepoUrlChange(e.target.value)}
            placeholder="https://github.com/owner/repo"
            className="flex-1 rounded-lg border border-zinc-600 bg-zinc-800/50 px-4 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
            disabled={isLoading}
          />
          <button
            onClick={onSubmit}
            disabled={isLoading || !repoUrl.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileCode2 className="h-5 w-5" />
                Generate Interview Kit
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
