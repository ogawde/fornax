import axios from "axios";
import type { InterviewKit } from "./types";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const analyzeRepo = async (repoUrl: string): Promise<InterviewKit> => {
  const response = await api.post<InterviewKit>("/analyze", { repoUrl });
  return response.data;
};