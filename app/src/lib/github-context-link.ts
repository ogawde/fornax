export const REPO_URL_STORAGE_KEY = "fornax.repoUrl";

function normalizeRepoPath(pathname: string): { owner: string; repo: string } | null {
  const pathSegments = pathname
    .split("/")
    .map((segment) => segment.trim())
    .filter(Boolean);

  if (pathSegments.length < 2) {
    return null;
  }

  const owner = pathSegments[0];
  const repo = pathSegments[1].replace(/\.git$/i, "");

  if (!owner || !repo) {
    return null;
  }

  return { owner, repo };
}

export function normalizeGithubRepoUrl(input: string): string | null {
  const trimmedInput = input.trim();
  if (!trimmedInput) return null;

  const sshMatch = trimmedInput.match(/^git@github\.com:(.+)$/i);
  if (sshMatch) {
    const normalizedPath = normalizeRepoPath(sshMatch[1]);
    if (!normalizedPath) return null;
    return `https://github.com/${normalizedPath.owner}/${normalizedPath.repo}`;
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(trimmedInput);
  } catch {
    return null;
  }

  const normalizedHost = parsedUrl.hostname.replace(/^www\./i, "").toLowerCase();
  if (normalizedHost !== "github.com") {
    return null;
  }

  const normalizedPath = normalizeRepoPath(parsedUrl.pathname);
  if (!normalizedPath) {
    return null;
  }

  return `https://github.com/${normalizedPath.owner}/${normalizedPath.repo}`;
}

export function buildGithubContextFileUrl(
  repositoryUrl: string,
  contextFilePath: string
): string | null {
  const normalizedRepoUrl = normalizeGithubRepoUrl(repositoryUrl);
  const normalizedContextPath = contextFilePath
    .trim()
    .replace(/^(\.\/)+/, "")
    .replace(/^\/+/, "");

  if (!normalizedRepoUrl || !normalizedContextPath) {
    return null;
  }

  const [filePath, hashFragment] = normalizedContextPath.split("#");
  const encodedPath = filePath
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  if (!encodedPath) {
    return null;
  }

  const hash = hashFragment ? `#${encodeURIComponent(hashFragment)}` : "";
  return `${normalizedRepoUrl}/blob/main/${encodedPath}${hash}`;
}
