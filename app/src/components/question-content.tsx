import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { PhaseBadge } from "./phase-badge";
import { CheatSheetPanel } from "./cheat-sheet-panel";
import type { InterviewQuestion } from "../types";

type QuestionContentProps = {
  question: InterviewQuestion;
};

export function QuestionContent({ question }: QuestionContentProps) {
  const [cheatSheetOpen, setCheatSheetOpen] = useState(false);
  const [codeSnippetOpen, setCodeSnippetOpen] = useState(false);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <PhaseBadge phase={question.type} />
        <h1 className="mt-3 text-2xl font-semibold text-white">
          {question.question}
        </h1>
        {question.context_file && (
          <p className="mt-2 text-sm text-zinc-400">
            <span className="font-medium text-zinc-500">Context:</span>{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-zinc-300">
              {question.context_file}
            </code>
          </p>
        )}
      </div>

      {question.code_snapshot && (
        <div className="rounded-lg border border-zinc-700 bg-zinc-800/50">
          <button
            onClick={() => setCodeSnippetOpen((open) => !open)}
            className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-white transition hover:bg-zinc-700/50"
          >
            View Code Snippet
            {codeSnippetOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          {codeSnippetOpen && (
            <div className="overflow-hidden border-t border-zinc-700">
              <SyntaxHighlighter
                language="typescript"
                style={oneDark}
                customStyle={{
                  margin: 0,
                  borderRadius: 0,
                  background: "#18181b",
                  fontSize: "0.875rem",
                }}
                codeTagProps={{ style: { background: "transparent" } }}
                showLineNumbers
              >
                {question.code_snapshot}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      )}

      <CheatSheetPanel
        idealAnswer={question.ideal_answer ?? []}
        redFlags={Array.isArray(question.red_flags) ? question.red_flags : []}
        isOpen={cheatSheetOpen}
        onToggle={() => setCheatSheetOpen((o) => !o)}
      />

      {question.counter_questions && question.counter_questions.length > 0 && (
        <div className="rounded-lg border border-zinc-700 bg-zinc-800/30 p-4">
          <h3 className="mb-3 text-sm font-medium text-zinc-400">
            Follow-up Questions
          </h3>
          <ol className="space-y-2">
            {question.counter_questions.map((cq, i) => (
              <li key={i} className="flex gap-2 text-sm text-zinc-300">
                <span className="text-zinc-500">{i + 1}.</span>
                {cq}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
