import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { mkdir, readdir, readFile, rm } from "fs/promises";
import { join } from "path";
import { generateInterviewKit } from "./services/aiService";

const app = express();
app.use(cors());
app.use(express.json());

const VALID_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx"];
const IGNORE_DIRS = ["node_modules", ".git", "dist", "build", ".next"];


async function getFiles(dirPath: string, basePath: string = dirPath): Promise<string[]> {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    const relativePath = fullPath.replace(basePath + "/", "").replace(basePath + "\\", "");

    if (entry.isDirectory()) {
      if (IGNORE_DIRS.includes(entry.name)) continue;
      const nested = await getFiles(fullPath, basePath);
      files.push(...nested);
    } else if (entry.isFile()) {
      const ext = entry.name.slice(entry.name.lastIndexOf("."));
      if (VALID_EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

app.post("/analyze", async (req, res) => {
  const repoUrl = req.body?.repoUrl;

  if (!repoUrl || typeof repoUrl !== "string") {
    res.status(400).json({ error: "repoUrl is required and must be a string" });
    return;
  }

  const timestamp = Date.now();
  const clonePath = `/tmp/repos/${timestamp}`;

  try {
    await mkdir("/tmp/repos", { recursive: true });
    const git = simpleGit();
    await git.clone(repoUrl, clonePath);

    const filePaths = await getFiles(clonePath);
    const parts: string[] = [];

    for (const filePath of filePaths) {
      const content = await readFile(filePath, "utf-8");
      const relativePath = filePath.replace(clonePath + "/", "").replace(clonePath + "\\", "");
      parts.push(`FILE: ${relativePath}\n${content}\n---`);
    }

    const fullCodeString = parts.join("\n");

    const interviewKit = await generateInterviewKit(fullCodeString);

    await rm(clonePath, { recursive: true, force: true });

    res.json(interviewKit);
  } catch (err) {
    await rm(clonePath, { recursive: true, force: true }).catch(() => { });
    res.status(500).json({
      error: err instanceof Error ? err.message : "Failed to analyze repository",
    });
  }
});

app.listen(3001, () => {
  console.log("GitProbe AI server running on http://localhost:3001");
});
