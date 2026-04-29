import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Home Notes by Home Sales Ready',
  description: 'Privacy Policy for Home Notes, the AI-powered property area intelligence tool by Home Sales Ready.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-black text-slate-900 text-lg tracking-tight hover:opacity-80 transition-opacity">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <svg className="text-white w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            Home<span className="text-blue-600">Notes</span>
          </Link>
          <Link href="/" className="text-sm font-bold text-blue-600 hover:underline">← Back to Home Notes</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-slate-500 text-sm mb-8">Last updated: 28 April 2026</p>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">

            <section>
              <h2 className="text-xl font-black text-slate-900 mb-3">1. Who We Are</h2>
              <p>Home Notes is a service provided by <strong>Kadima Systems Ltd</strong>, trading as <strong>Home Sales Ready</strong> ("we", "us", "our"). We are registered in England and Wales.</p>
              <p className="mt-2">If you have any questions about this Privacy Policy or how we handle your data, please contact us:</p>
              <ul className="mt-2 space-y-1 list-none pl-0">
                <li><strong>Website:</strong> <a href="https://homesalesready.com" className="text-blue-600 hover:underline">homesalesready.com</a></li>
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/447724601320" className="text-blue-600 hover:underline">07724 601320</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900 mb-3">2. What Data We Collect</h2>
              <p>We collect and process the following personal data when you use Home Notes:</p>
              <ul className="mt-3 space-y-2 list-disc pl-5">
                <li><strong>Account information:</strong> Your email address and a hashed password when you create an account.</li>
                <li><strong>Property searches:</strong> The addresses you search for and the AI-generated reports produced. These are stored in your account history.</li>
                <li><strong>Newsletter sign-ups:</strong> Your email address if you choose to subscribe to our newsletter.</li>
                <li><strong>Usage data:</strong> Technical information such as your browser type, device type, and the pages you visit, collected via standard web analytics.</li>
              </ul>
              <p className="mt-3">We do <strong>not</strong> collect payment information, government identifiers, or sensitive personal data as defined under UK GDPR.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900 mb-3">3. How We Use Your Data</h2>
              <p>We use your personal data to:</p>
              <ul className="mt-3 space-y-2 list-disc pl-5">
                <li>Provide and operate the Home Notes service, including generating and saving property area reports.</li>
                <li>Send you our newsletter (only with your explicit consent).</li>
                <li>Respond to support enquiries.</li>
                <li>Improve and develop our services.</li>
                <li>Comply with legal obligations.</li>
              </ul>
              <p className="mt-3">Our legal basis for processing your data is:</p>
              <ul className="mt-2 space-y-1 list-disc pl-5">
                <li><strong>Contract performance</strong> — to deliver the service you have signed up for.</li>
                <li><strong>Legitimate interests</strong> — to improve and secure our service.</li>
                <li><strong>Consent</strong> — for newsletter emails, which you can withdraw at any time.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900 mb-3">4. AI-Generated Reports</h2>
              <p>Home Notes uses the <strong>Anthropic Claude API</strong> to generate property area reports. When you submit an address, that address is sent to Anthropic's servers for processing. Anthropic's own privacy policy governs how they handle data. We do not send any personal information about you to Anthropic — only the property address you enter.</p>
              <p className="mt-2">All reports are AI-generated and may be inaccurate. They do not constitute professional advice. Please see our <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> for the full disclaimer.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900 mb-3">5. Data Storage & Security</h2>
              <p>Your account data and saved reports are stored in <strong>Supabase</strong> (hosted on AWS in the EU region). Your authentication is managed by <strong>Firebase Authentication</strong> (Google). Both services are GDPR-compliant and employ industry-standard encryption in transit and at rest.</p>
              <p className="mt-2">We retain your account data for as long as your account is active. If you delete your account, your personal data is deleted within 30 days. Newsletter subscribers can unsubscribe at any time.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900 mb-3">6. Third-Party Services</h2>
              <p>We use the following third-party services to operate Home Notes:</p>
              <ul className="mt-3 space-y-2 list-disc pl-5">
                <li><strong>Anthropic</strong> — AI report generation</li>
                <li><strong>Firebase (Google)</strong> — User authentication</li>
                <li><strong>Supabase</strong> — Database and data storage</li>
                <li><strong>Vercel</strong> — Web hosting and deployment</li>
              </ul>
              <p className="mt-2">Each provider has their own privacy policy. We select providers who meet GDPR standards.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900 mb-3">7. Your Rights Under UK GDPR</h2>
              <p>You have the right to:</p>
              <ul className="mt-3 space-y-2 list-disc pl-5">
                <li><strong>Access</strong> the personal data we hold about you.</li>
                <li><strong>Rectify</strong> inaccurate data.</li>
                <li><strong>Erase</strong> your data ("right to be forgotten").</li>
                <li><strong>Restrict</strong> or <strong>object</strong> to processing.</li>
                <li><strong>Data portability</strong> — receive your data in a machine-readable format.</li>
                <li><strong>Withdraw consent</strong> for newsletter communications at any time.</li>
              </ul>
              <p className="mt-3">To exercise any of these rights, contact us via WhatsApp or the Home Sales Ready website. We will respond within 30 days.</p>
              <p className="mt-2">You also have the right to lodge a complaint with the <strong>Information Commissioner's Office (ICO)</strong> at <a href="https://ico.org.uk" className="text-blue-600 hover:underline">ico.org.uk</a>.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900 mb-3">8. Cookies</h2>
              <p>Home Notes uses only essential cookies required for authentication and session management. We do not use advertising or tracking cookies.</p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-900 mb-3">9. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page. Continued use of the service after changes constitutes acceptance of the updated policy.</p>
            </section>

          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-xs text-slate-400">
        © 2026 Kadima Systems Ltd · <Link href="/" className="hover:text-slate-600">Home Notes</Link> · <a href="https://homesalesready.com" className="hover:text-slate-600">Home Sales Ready</a>
      </footer>
    </div>
  );
}
