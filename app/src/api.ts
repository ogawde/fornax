import axios from "axios";
import type { InterviewKit } from "./types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const analyzeRepo = async (repoUrl: string): Promise<InterviewKit> => {
  const response = await api.post<InterviewKit>("/analyze", { repoUrl });
  return response.data;
};