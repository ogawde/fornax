export type QuestionPhase = "Architectural" | "Strategy" | "Implementation";

export type InterviewQuestion = {
  type: QuestionPhase;
  question: string;
  code_snapshot: string;
  context_file: string;
  ideal_answer: string | string[];
  red_flags: string[];
  counter_questions?: string[];
};

export type InterviewKit = {
  tech_stack: string[];
  interview_path: InterviewQuestion[];
};