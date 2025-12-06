const OLLAMA_URL = process.env.OLLAMA_URL;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = process.env.GITHUB_REPOSITORY;
const PR_NUMBER = process.env.PR_NUMBER;
const DIFF = process.env.PR_DIFF;

console.log("🔍 Starting AI Reviewer...");
console.log("PR_NUMBER:", PR_NUMBER);
console.log("OLLAMA_URL:", OLLAMA_URL);
console.log("Diff length:", DIFF?.length || 0);

const SYSTEM_PROMPT = `
You are a senior frontend engineer reviewing PRs for a Mini-FSD React+TS project.
Enforce rules:
- Correct folder placement (entities/features/widgets/shared/pages/app)
- One component per file
- Clear separation of concerns per Mini-FSD
- Zustand store correctness
- Tailwind utility readability
- TypeScript correctness
Provide actionable comments. Do not invent issues.
`;

async function askLLM(diff) {
  console.log("🔗 Sending request to LLM...");

  try {
    const res = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.1:8b", // IMPORTANT FIX
        prompt: `${SYSTEM_PROMPT}\n\nReview this PR diff:\n${diff}`,
        stream: false
      })
    });

    const data = await res.json();

    if (!data || !data.response) {
      console.error("❌ LLM returned no response:", data);
      return "";
    }

    console.log("📩 LLM response received");
    return data.response;

  } catch (err) {
    console.error("❌ Error contacting LLM:", err);
    return "";
  }
}

async function postComment(body) {
  if (!body || !body.trim()) {
    console.log("⚠️ Empty review — skipping PR comment");
    return;
  }

  console.log("💬 Posting comment to PR...");

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/issues/${PR_NUMBER}/comments`,
    {
      method: "POST",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body })
    }
  );

  if (!res.ok) {
    console.error("❌ GitHub API error:", await res.text());
  } else {
    console.log("✅ Comment posted to PR");
  }
}

async function main() {
  const review = await askLLM(DIFF);
  console.log("📝 Review length:", review.length || 0);
  await postComment(review);
}

main();
  
