import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6">
        <Loader2 className="h-16 w-16 animate-spin text-emerald-500" />
        <p className="text-lg text-zinc-300">
          Cloning repo & analyzing architecture...
        </p>
        <div className="h-1 w-48 overflow-hidden rounded-full bg-zinc-700">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-emerald-500" />
        </div>
      </div>
    </div>
  );
}
