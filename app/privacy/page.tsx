import Link from "next/link";
import { BarChart3 } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — Charta",
  description: "Privacy Policy for Charta, the chart generation tool for Google Slides.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <nav className="border-b border-white/[0.06] sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-xl z-50">
        <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#7C5CFC] flex items-center justify-center">
              <BarChart3 className="w-3 h-3 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-white/80 font-medium text-sm">Charta</span>
          </Link>
          <Link href="/" className="text-white/35 hover:text-white/60 text-sm transition-colors">← Home</Link>
        </div>
      </nav>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-5 py-16">
        <header className="mb-12">
          <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-white mb-3">Privacy Policy</h1>
          <p className="text-white/35 text-sm">
            <span className="font-medium text-white/50">Charta</span> · getcharta.ai · Last updated: March 3, 2026
          </p>
        </header>

        <div className="prose prose-sm max-w-none" style={{ "--tw-prose-body": "rgba(255,255,255,0.6)", "--tw-prose-headings": "rgba(255,255,255,0.9)", "--tw-prose-links": "#a78bfa", "--tw-prose-bold": "rgba(255,255,255,0.85)", "--tw-prose-hr": "rgba(255,255,255,0.08)" } as React.CSSProperties}>
          <Section title="1. What is Charta?">
            Charta is a Google Workspace Add-on that lets you create and edit charts directly inside Google Slides using AI. It runs as a sidebar add-on and processes your requests using Google&apos;s Gemini AI and optional web search.
          </Section>

          <Section title="2. What Data We Access">
            <p>When you use Charta, the add-on requests access to:</p>
            <ul>
              <li><strong>Your Google Slides presentation</strong> — to read slide content, insert charts, and update chart data you&apos;ve created with Charta</li>
              <li><strong>Your Google account email address</strong> — to identify your account and manage your usage credits</li>
            </ul>
            <p>We do <strong>not</strong> access your Gmail, Google Drive, Google Calendar, or any other Google services.</p>
          </Section>

          <Section title="3. What Data We Collect and Store">
            <p><strong>Usage credits (stored locally in Google Apps Script):</strong><br />
            We store your remaining AI credit count using Google Apps Script&apos;s UserProperties — this data is tied to your Google account and stored within Google&apos;s infrastructure. We never store this on our own servers unless you have a paid plan.</p>
            <p><strong>Analytics (optional, aggregated):</strong><br />
            If you have a paid plan, we may use Supabase to store anonymized usage statistics (number of charts created, chart types used). This data contains no personally identifiable information and is used only to improve the product.</p>
            <p><strong>AI prompts:</strong><br />
            When you use the AI chart generation feature, your text prompt is sent to Google&apos;s Gemini API. We do not store your prompts on our servers. Refer to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s AI Studio Privacy Policy</a> for how Gemini handles data.</p>
            <p><strong>Web search queries:</strong><br />
            If Charta performs a web search to fetch chart data, your search query is sent to the Exa search API. We do not store these queries. Refer to <a href="https://exa.ai/privacy" target="_blank" rel="noopener noreferrer">Exa&apos;s Privacy Policy</a> for details.</p>
          </Section>

          <Section title="4. What We Do NOT Do">
            <ul>
              <li>We do not sell your data</li>
              <li>We do not share your data with third parties for advertising</li>
              <li>We do not store the contents of your presentations on our servers</li>
              <li>We do not access any Google services beyond Google Slides</li>
              <li>We do not use your data to train AI models</li>
            </ul>
          </Section>

          <Section title="5. Data Retention">
            <p>Local usage credit data (stored in Google Apps Script UserProperties) is deleted automatically when you uninstall Charta or revoke its access from your Google account.</p>
            <p>If you have a paid plan with Supabase-backed analytics, you can request deletion of your account data at any time by emailing us at the address below.</p>
          </Section>

          <Section title="6. Children's Privacy">
            Charta is not directed at children under 13. We do not knowingly collect personal information from children under 13.
          </Section>

          <Section title="7. Changes to This Policy">
            We may update this Privacy Policy from time to time. We&apos;ll update the &ldquo;Last updated&rdquo; date at the top when we do. Continued use of Charta after changes constitutes acceptance of the updated policy.
          </Section>

          <Section title="8. Contact">
            Questions about this Privacy Policy? Email us at: <a href="mailto:privacy@getcharta.ai">privacy@getcharta.ai</a>
          </Section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex items-center justify-between">
          <Link href="/terms" className="text-[#7C5CFC] hover:text-[#a78bfa] text-sm transition-colors">Terms of Service →</Link>
          <Link href="/" className="text-white/30 hover:text-white/60 text-sm transition-colors">← Back to Charta</Link>
        </div>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-[17px] font-semibold text-white/90 mb-4 pb-2 border-b border-white/[0.06]">{title}</h2>
      <div className="text-white/55 text-[15px] leading-relaxed space-y-3 [&_ul]:mt-2 [&_ul]:space-y-1.5 [&_li]:ml-4 [&_li]:list-disc [&_strong]:text-white/80 [&_a]:text-[#a78bfa] [&_a:hover]:text-[#c4b5fd]">
        {children}
      </div>
    </section>
  );
}
