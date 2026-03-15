import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog — Charta",
  description: "Guides and tips for building better charts in Google Slides.",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-black text-[#ededed]">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        {/* Section shimmer line */}
        <div
          className="w-full h-px mb-12"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(146,129,247,0.5) 30%, rgba(255,255,255,0.25) 50%, rgba(146,129,247,0.5) 70%, transparent 100%)",
          }}
        />

        <h1
          className="text-4xl md:text-5xl mb-4 text-gradient-heading"
          style={{ fontFamily: "var(--font-instrument-serif)" }}
        >
          Blog
        </h1>
        <p className="text-white/50 text-base mb-16">
          Guides for making better charts faster.
        </p>

        {posts.length === 0 ? (
          <p className="text-white/40">No posts yet.</p>
        ) : (
          <div className="flex flex-col gap-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="shimmer-border rounded-2xl p-6 block hover:bg-white/[0.02] transition-colors group"
              >
                <p className="text-xs text-white/40 mb-2 font-mono">
                  {formatDate(post.date)}
                </p>
                <h2 className="text-lg font-normal text-white/90 group-hover:text-white transition-colors mb-2 leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-white/50 leading-relaxed">
                  {post.description}
                </p>
                <span className="inline-block mt-4 text-xs text-[#9281F7] group-hover:text-[#b8acff] transition-colors">
                  Read →
                </span>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
