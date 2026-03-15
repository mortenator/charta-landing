import fs from "fs";
import path from "path";

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
};

const postsDir = path.join(process.cwd(), "content/blog");

function parseFrontmatter(raw: string): {
  data: Record<string, string>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim();
    if (key) data[key] = value;
  }

  return { data, content: match[2] };
}

export function markdownToHtml(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let i = 0;

  const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const inlineFormat = (s: string): string => {
    // Escape HTML first to prevent XSS — formatting patterns run on sanitized text only
    s = escapeHtml(s);
    // Bold — safe: we generate <strong> ourselves, content is already escaped
    s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    // Inline code
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    // Links — href restricted to https?:// by regex; text already escaped above
    s = s.replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#9281F7] hover:underline">$1</a>'
    );
    return s;
  };

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.trimStart().startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        codeLines.push(escapeHtml(lines[i]));
        i++;
      }
      out.push(
        `<pre><code>${codeLines.join("\n")}</code></pre>`
      );
      i++;
      continue;
    }

    // HR
    if (/^---+$/.test(line.trim())) {
      out.push("<hr />");
      i++;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      out.push(`<h2>${inlineFormat(line.slice(3))}</h2>`);
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      out.push(`<h3>${inlineFormat(line.slice(4))}</h3>`);
      i++;
      continue;
    }

    // Ordered list item (e.g. "1. " "2. " "3. ")
    if (/^\d+\.\s/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listItems.push(
          `<li>${inlineFormat(lines[i].replace(/^\d+\.\s/, ""))}</li>`
        );
        i++;
      }
      out.push(`<ol>${listItems.join("")}</ol>`);
      continue;
    }

    // Blank line — separator, skip
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("#") && !/^---+$/.test(lines[i].trim()) && !lines[i].trimStart().startsWith("```") && !/^\d+\.\s/.test(lines[i])) {
      paraLines.push(inlineFormat(lines[i]));
      i++;
    }
    if (paraLines.length > 0) {
      out.push(`<p>${paraLines.join(" ")}</p>`);
    }
  }

  return out.join("\n");
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
      const { data, content } = parseFrontmatter(raw);
      return {
        slug,
        title: data.title ?? "",
        date: data.date ?? "",
        description: data.description ?? "",
        content,
      };
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getPostBySlug(slug: string): Post | null {
  for (const ext of [".mdx", ".md"]) {
    const filePath = path.join(postsDir, `${slug}${ext}`);
    if (!fs.existsSync(filePath)) continue;
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = parseFrontmatter(raw);
    return {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      description: data.description ?? "",
      content,
    };
  }
  return null;
}
