import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy — Home Notes by Home Sales Ready',
  description: 'Cookie Policy for Home Notes, operated by Kadima Systems Ltd.',
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-slate-50">
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
          <h1 className="text-3xl font-black text-slate-900 mb-2">Cookie Policy</h1>
          <p className="text-slate-500 text-sm mb-10">Version 2.1 · Kadima Systems Ltd</p>

          <div className="space-y-8 text-slate-700 leading-relaxed text-sm">

            <section>
              <h2 className="text-lg font-black text-slate-900 mb-3">What&rsquo;s a Cookie?</h2>
              <p>A &ldquo;cookie&rdquo; is a piece of information that is stored on your computer&rsquo;s hard drive if you agree to this and which records how you move your way around a website so that, when you revisit that website, it can present tailored options based on the information stored about your last visit. Cookies can also be used to analyse traffic and for advertising and marketing purposes.</p>
              <p className="mt-3">Cookies are used by nearly all websites and do not harm your system.</p>
              <p className="mt-3">We are required to obtain your consent for all non-essential cookies used on our website. You can block cookies (including essential cookies) at any time by activating the setting on your browser that allows you to refuse the setting of all or some cookies. However, if you use your browser settings to block essential cookies you may not be able to access all or parts of our site.</p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-900 mb-3">How Do We Use Cookies?</h2>
              <p>We use cookies to track your use of our website. This enables us to understand how you use the site and track any patterns with regards how you are using our website. This helps us to develop and improve our website as well as products and/or services in response to what you might need or want.</p>

              <div className="mt-5 space-y-4">
                <h3 className="font-bold text-slate-900">Cookies are either:</h3>
                <div className="space-y-3">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p><strong>Session cookies:</strong> these are only stored on your computer during your web session and are automatically deleted when you close your browser — they usually store an anonymous session ID allowing you to browse a website without having to log in to each page but they do not collect any personal data from your computer.</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p><strong>Persistent cookies:</strong> a persistent cookie is stored as a file on your computer and it remains there when you close your web browser. The cookie can be read by the website that created it when you visit that website again.</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <h3 className="font-bold text-slate-900">Cookies can also be categorised as follows:</h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-200 pl-4">
                    <p><strong>Strictly necessary cookies:</strong> These cookies are essential to enable you to use the website effectively. Without these cookies, the services available to you on our website cannot be provided. These cookies do not gather information about you that could be used for marketing or remembering where you have been on the internet.</p>
                  </div>
                  <div className="border-l-4 border-blue-200 pl-4">
                    <p><strong>Performance cookies:</strong> These cookies enable us to monitor and improve the performance of our website. For example, they allow us to count visits, identify traffic sources and see which parts of the site are most popular.</p>
                  </div>
                  <div className="border-l-4 border-blue-200 pl-4">
                    <p><strong>Functionality cookies:</strong> These cookies allow our website to remember choices you make and provide enhanced features. For instance, we may be able to provide you with news or updates relevant to the services you use. The information these cookies collect is usually anonymised.</p>
                  </div>
                  <div className="border-l-4 border-blue-200 pl-4">
                    <p><strong>Targeting cookies:</strong> These cookies record your visit to our website, the pages you have visited and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests.</p>
                  </div>
                  <div className="border-l-4 border-blue-200 pl-4">
                    <p><strong>First and third party cookies:</strong> First party cookies are cookies set by our website. Third party cookies are cookies on our website that are set by a website other than our website, such as where we have adverts on our website or use Facebook pixels so that we can show you relevant content from us when you are on Facebook.</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <p><strong>We use only first party cookies on this website.</strong></p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-900 mb-3">Managing Your Cookie Preferences</h2>
              <p>You can alter your cookie preferences at any time by <strong>deleting your cache and then re-entering our website.</strong> Please refresh your page to ensure that the new settings have taken effect.</p>
              <p className="mt-3">You can also control your cookie settings through your web browser.</p>
              <p className="mt-3">You can opt out of being tracked by Google Analytics across all websites by going to <a href="http://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">tools.google.com/dlpage/gaoptout</a>.</p>
              <p className="mt-3">Except for essential cookies, all cookies will expire after 30 days.</p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-900 mb-3">Contact Us</h2>
              <p>If you have any questions about the cookies that we use, please contact us:</p>
              <div className="mt-3 bg-slate-50 rounded-2xl p-4 space-y-1">
                <p><strong>Email:</strong> <a href="mailto:OFFICE@KADIMASYSTEMS.CO.UK" className="text-blue-600 hover:underline">OFFICE@KADIMASYSTEMS.CO.UK</a></p>
                <p><strong>Address:</strong> Bayside Business Centre, Willis Way, Poole, BH15 3TB</p>
              </div>
            </section>

          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-xs text-slate-400">
        © 2026 Kadima Systems Ltd &middot; <Link href="/" className="hover:text-slate-600">Home Notes</Link> &middot; <a href="https://homesalesready.com" className="hover:text-slate-600">Home Sales Ready</a>
      </footer>
    </div>
  );
}
