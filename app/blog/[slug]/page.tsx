import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts, getPostBySlug, markdownToHtml } from "@/lib/posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Charta`,
    description: post.description,
  };
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const html = markdownToHtml(post.content);

  return (
    <div className="min-h-screen bg-black text-[#ededed]">
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        {/* Section shimmer line */}
        <div
          className="w-full h-px mb-12"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(146,129,247,0.5) 30%, rgba(255,255,255,0.25) 50%, rgba(146,129,247,0.5) 70%, transparent 100%)",
          }}
        />

        {/* Back link */}
        <Link
          href="/blog"
          className="text-sm text-white/40 hover:text-white/70 transition-colors mb-10 inline-block"
        >
          ← Blog
        </Link>

        {/* Header */}
        <p className="text-xs text-white/40 font-mono mb-4">
          {formatDate(post.date)}
        </p>
        <h1
          className="text-3xl md:text-4xl text-gradient-heading mb-6 leading-tight"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          {post.title}
        </h1>
        <p className="text-white/50 text-base mb-12 leading-relaxed">
          {post.description}
        </p>

        {/* Divider */}
        <div
          className="w-full h-px mb-12"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 100%)",
          }}
        />

        {/* Post body */}
        <div
          className="blog-prose"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>

      <Footer />

      <style>{`
        .blog-prose p {
          color: rgba(237,237,237,0.75);
          font-size: 1rem;
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }
        .blog-prose h2 {
          font-family: var(--font-geist-sans), Arial, sans-serif;
          font-size: 1.25rem;
          font-weight: 500;
          color: rgba(255,255,255,0.9);
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }
        .blog-prose h3 {
          font-family: var(--font-geist-sans), Arial, sans-serif;
          font-size: 1.05rem;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .blog-prose hr {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%);
          margin: 2.5rem 0;
        }
        .blog-prose pre {
          background: #111111;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 1.25rem 1.5rem;
          overflow-x: auto;
          margin-bottom: 1.5rem;
        }
        .blog-prose pre code {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.875rem;
          color: rgba(237,237,237,0.8);
          background: none;
          padding: 0;
          border-radius: 0;
        }
        .blog-prose code {
          font-family: var(--font-geist-mono), monospace;
          font-size: 0.875em;
          color: rgba(146,129,247,0.9);
          background: rgba(146,129,247,0.08);
          padding: 0.15em 0.4em;
          border-radius: 4px;
        }
        .blog-prose ol {
          list-style: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
          color: rgba(237,237,237,0.75);
        }
        .blog-prose ol li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }
        .blog-prose strong {
          color: rgba(255,255,255,0.9);
          font-weight: 500;
        }
        .blog-prose a {
          color: #9281F7;
          text-decoration: none;
        }
        .blog-prose a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
