const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "qwen/qwen3-next-80b-a3b-instruct";

const MASTER_PROMPT = `You are a Senior Principal Engineer conducting a technical interview. Analyze the provided codebase and generate a 6-question 'Interview Path' that follows a logical progression.

The Interview Structure:

Phase 1: Architecture (2 Questions - Easy/Med): Focus on the big picture. Ask about the folder structure, choice of frameworks (e.g., Why TurboRepo? Why Prisma?), and how data flows between the frontend and backend.

Phase 2: Design & Strategy (2 Questions - Med): Ask 'Why' questions about implementation patterns. For example, 'Why use an asynchronous sweeper for transactions instead of synchronous processing?' or 'Why use JWT instead of sessions?'

Phase 3: The Deep Dive (2 Questions - Hard): This is the 'Coding Bit.' Find specific snippets where logic is dense. Ask about edge cases, race conditions, or what happens if a specific service fails. Focus on areas where the code might break in production.

For EACH Question, you must provide:

type: ('Architectural', 'Strategy', or 'Implementation')

question: The specific question to ask the candidate.

code_snapshot: 10-15 lines of their actual code that illustrates the point (leave empty for Phase 1 if the question is general).

ideal_answer: 3 bullet points of a high-quality senior-level response.

counter_questions: 2 follow-up questions to ask if the candidate gives a basic answer (focused on edge cases).

red_flags: Signs the candidate doesn't understand the trade-offs of their own code.

Technical Focus:

Identify obvious errors that could break the app (e.g., missing database transactions).

Look for 'Happy Path' coding where errors aren't handled.

Ignore minor TypeScript linting errors; focus on architectural and logical integrity.

Formatting Requirement: Ensure the JSON response is clean. Do not include unnecessary spaces, mid-word line breaks, or special characters. Ensure the code_snapshot preserves original indentation (using \n and \t).`;

export type InterviewQuestion = {
  type: "Easy" | "Medium" | "Hard";
  question: string;
  code_snapshot: string;
  context_file: string;
  ideal_answer: string;
  red_flags: string[];
};

export type InterviewKit = {
  tech_stack: string[];
  questions: InterviewQuestion[];
};

export async function generateInterviewKit(codeString: string): Promise<InterviewKit> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: MASTER_PROMPT },
        { role: "user", content: codeString },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${text}`);
  }

  const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("No content in OpenRouter response");
  }

  return JSON.parse(content) as InterviewKit;
}
