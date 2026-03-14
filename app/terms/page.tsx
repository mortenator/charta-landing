import Link from "next/link";
import { BarChart3 } from "lucide-react";

export const metadata = {
  title: "Terms of Service — Charta",
  description: "Terms of Service for Charta, the chart generation tool for Google Slides.",
};

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-white mb-3">Terms of Service</h1>
          <p className="text-white/35 text-sm">
            <span className="font-medium text-white/50">Charta</span> · getcharta.ai · Last updated: March 3, 2026
          </p>
        </header>

        <div className="prose prose-sm max-w-none">
          <Section title="1. Acceptance of Terms">
            By installing or using Charta (&ldquo;the Add-on&rdquo;), you agree to these Terms of Service. If you don&apos;t agree, don&apos;t use Charta.
          </Section>

          <Section title="2. What Charta Does">
            Charta is a Google Workspace Add-on that helps you build charts inside Google Slides using AI. It runs as a sidebar within Google Slides and requires a Google account.
          </Section>

          <Section title="3. Your Account and Access">
            <ul>
              <li>You must have a valid Google account to use Charta</li>
              <li>You&apos;re responsible for all activity that occurs under your account</li>
              <li>You may not share access to paid features with others (one account = one user)</li>
            </ul>
          </Section>

          <Section title="4. Free and Paid Plans">
            <p><strong>Free plan:</strong></p>
            <ul>
              <li>5 AI credits per day, reset daily</li>
              <li>No payment required</li>
            </ul>
            <p><strong>Paid plans (Plus and Business):</strong></p>
            <ul>
              <li>Billed monthly via Stripe</li>
              <li>You can cancel any time — cancellation takes effect at the end of your billing period</li>
              <li>No refunds for partial months</li>
              <li>We reserve the right to change pricing with 30 days&apos; notice</li>
            </ul>
          </Section>

          <Section title="5. Acceptable Use">
            <p>You agree not to use Charta to:</p>
            <ul>
              <li>Violate any law or regulation</li>
              <li>Scrape, reverse engineer, or extract our source code</li>
              <li>Attempt to exceed credit limits through unauthorized means</li>
              <li>Use the add-on to generate content that is illegal, harmful, or deceptive</li>
              <li>Resell or sublicense access to Charta</li>
            </ul>
          </Section>

          <Section title="6. Intellectual Property">
            <ul>
              <li>Charta and all associated software, design, and branding are owned by the developer</li>
              <li>Charts you create using Charta belong to you — we make no claim on your content</li>
              <li>You grant us no rights to your presentation content</li>
            </ul>
          </Section>

          <Section title="7. Third-Party Services">
            <p>Charta integrates with:</p>
            <ul>
              <li><strong>Google Gemini API</strong> — for AI chart generation</li>
              <li><strong>Exa Search API</strong> — for web data retrieval in AI mode</li>
              <li><strong>Stripe</strong> — for payment processing (paid plans)</li>
              <li><strong>Supabase</strong> — for analytics (paid plans)</li>
            </ul>
            <p>Each of these services has its own terms and privacy policies. We&apos;re not responsible for their practices.</p>
          </Section>

          <Section title="8. Disclaimer of Warranties">
            Charta is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied. We don&apos;t guarantee that the add-on will be error-free, uninterrupted, or produce accurate results — especially for AI-generated chart data. Always verify data before using it in important documents.
          </Section>

          <Section title="9. Limitation of Liability">
            <p>To the maximum extent permitted by law, we&apos;re not liable for any indirect, incidental, special, or consequential damages arising from your use of Charta — including (without limitation) loss of data, loss of business, or errors in AI-generated content.</p>
            <p>Our total liability to you for any claim arising from these terms or use of Charta will not exceed the amount you paid us in the 12 months prior to the claim.</p>
          </Section>

          <Section title="10. Termination">
            We may suspend or terminate your access to Charta at any time if you violate these Terms. You can stop using Charta and revoke its Google permissions at any time through your Google Account settings.
          </Section>

          <Section title="11. Changes to These Terms">
            We may update these Terms from time to time. We&apos;ll update the &ldquo;Last updated&rdquo; date when we do. Continued use after changes = acceptance.
          </Section>

          <Section title="12. Governing Law">
            These Terms are governed by the laws of the State of New York, without regard to its conflict of law provisions.
          </Section>

          <Section title="13. Contact">
            Questions? Email us at: <a href="mailto:support@getcharta.ai" className="text-[#a78bfa] hover:text-[#c4b5fd]">support@getcharta.ai</a>
          </Section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex items-center justify-between">
          <Link href="/privacy" className="text-[#7C5CFC] hover:text-[#a78bfa] text-sm transition-colors">Privacy Policy →</Link>
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
