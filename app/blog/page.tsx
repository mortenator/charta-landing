import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog — Charta",
  description: "Guides for making better charts faster.",
};

const PURPLE = "#9281F7";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00Z");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Placeholder gradient thumbnail when no coverImage is set.
// Each slug gets a deterministic color pair so it looks intentional.
const GRADIENTS = [
  ["#1a0533", "#3d1a6e"],
  ["#001a33", "#0d3d6e"],
  ["#001a10", "#0d4a2a"],
  ["#1a1a00", "#4a3d00"],
  ["#1a0000", "#4a1a00"],
];

function gradientForSlug(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  const pair = GRADIENTS[hash % GRADIENTS.length];
  return `linear-gradient(135deg, ${pair[0]} 0%, ${pair[1]} 100%)`;
}

export default function BlogIndex() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-black text-[#ededed]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-28 pb-24">

        {/* Header row */}
        <div className="flex items-end justify-between mb-10">
          <h1
            className="text-5xl md:text-6xl text-gradient-heading leading-none"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Blog
          </h1>
          <p className="text-white/40 text-sm hidden md:block">
            Guides for charts, data viz, and AI tooling
          </p>
        </div>

        {/* Shimmer divider */}
        <div
          className="w-full h-px mb-12"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(146,129,247,0.4) 30%, rgba(255,255,255,0.2) 50%, rgba(146,129,247,0.4) 70%, transparent 100%)",
          }}
        />

        {posts.length === 0 && (
          <p className="text-white/40">No posts yet.</p>
        )}

        {/* Featured posts — 2-col large cards */}
        {posts.length >= 2 && (
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.slice(0, 2).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-4"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full overflow-hidden rounded-xl border border-white/[0.07] aspect-[16/9]">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-end p-8"
                        style={{ background: gradientForSlug(post.slug) }}
                      >
                        {/* Category badge */}
                        {post.category && (
                          <span
                            className="text-[11px] font-medium px-2.5 py-1 rounded-full border"
                            style={{
                              color: PURPLE,
                              borderColor: "rgba(146,129,247,0.3)",
                              background: "rgba(146,129,247,0.1)",
                            }}
                          >
                            {post.category}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-xs text-white/40 font-mono mb-2">
                      {formatDate(post.date)}
                    </p>
                    <h2
                      className="text-2xl leading-snug text-white/90 group-hover:text-white transition-colors mb-2"
                      style={{ fontFamily: "var(--font-instrument-serif)" }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All posts — 3-col grid */}
        {rest.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-white/40 uppercase tracking-widest mb-8">
              All posts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {(posts.length < 2 ? posts : rest).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-3"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full overflow-hidden rounded-lg border border-white/[0.07] aspect-[16/9]">
                    {post.coverImage ? (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{ background: gradientForSlug(post.slug) }}
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-xs text-white/40 font-mono mb-1.5">
                      {formatDate(post.date)}
                    </p>
                    <h2 className="text-base font-normal text-white/90 group-hover:text-white transition-colors leading-snug line-clamp-3">
                      {post.title}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
