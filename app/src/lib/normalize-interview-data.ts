import type { InterviewKit } from "../types";

export function normalizeInterviewData(data: unknown): InterviewKit {
  if (data && typeof data === "object" && "interview_path" in data) {
    return data as InterviewKit;
  }
  if (Array.isArray(data)) {
    return { tech_stack: [], interview_path: data };
  }
  return {
    tech_stack: [],
    interview_path: [data as InterviewKit["interview_path"][0]],
  };
}
