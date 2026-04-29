import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Notice — Home Notes by Home Sales Ready',
  description: 'Website Privacy Notice for Home Notes, operated by Kadima Systems Ltd.',
};

export default function PrivacyPolicy() {
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
          <h1 className="text-3xl font-black text-slate-900 mb-2">Website Privacy Notice</h1>
          <p className="text-slate-500 text-sm mb-10">Version 1.4 · Kadima Systems Ltd</p>

          <div className="space-y-10 text-slate-700 leading-relaxed text-sm">

            <section>
              <h2 className="text-lg font-black text-slate-900 mb-3">1. Introduction</h2>
              <p>This privacy notice provides you with details of how we collect and process your personal data through your use of our site at <strong>Home Notes</strong>.</p>
              <p className="mt-3"><strong>Kadima Systems Ltd</strong> are the data controller and we are responsible for your personal data (referred to as &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo; in this privacy notice).</p>
              <p className="mt-3">We have appointed a Data Protection Officer who is in charge of privacy related matters for us. If you have any questions about this privacy notice, please contact the Data Protection Officer using the details set out below.</p>
              <div className="mt-4 bg-slate-50 rounded-2xl p-5 space-y-1">
                <p><strong>Full name of legal entity:</strong> KADIMA SYSTEMS LTD</p>
                <p><strong>Data Protection Officer:</strong> Mrs B Gould</p>
                <p><strong>Email:</strong> <a href="mailto:OFFICE@KADIMASYSTEMS.CO.UK" className="text-blue-600 hover:underline">OFFICE@KADIMASYSTEMS.CO.UK</a></p>
                <p><strong>Postal address:</strong> Bayside Business Centre, Willis Way, Poole, BH15 3TB</p>
              </div>
              <p className="mt-4">It is very important that the information we hold about you is accurate and up to date. Please let us know if at any time your personal information changes by emailing us at <a href="mailto:OFFICE@KADIMASYSTEMS.CO.UK" className="text-blue-600 hover:underline">OFFICE@KADIMASYSTEMS.CO.UK</a>.</p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-900 mb-3">2. What Data We Collect, For What Purpose and On What Ground We Process It</h2>
              <p>Personal data means any information capable of identifying an individual. It does not include anonymised data.</p>
              <p className="mt-3">We may process the following categories of personal data about you:</p>
              <ul className="mt-4 space-y-4 list-none pl-0">
                <li className="border-l-4 border-blue-200 pl-4">
                  <p><strong>Communication Data</strong> — any communication that you send to us whether through the contact form on our website, through email, text, social media messaging, social media posting or any other communication that you send us. We process this data for the purposes of communicating with you, for record keeping and for the establishment, pursuance or defence of legal claims. Our lawful ground for this processing is our legitimate interests which in this case are to reply to communications sent to us, to keep records and to establish, pursue or defend legal claims.</p>
                </li>
                <li className="border-l-4 border-blue-200 pl-4">
                  <p><strong>Customer Data</strong> — data relating to any purchases of goods and/or services such as your name, title, billing address, delivery address, email address, phone number, contact details, purchase details and your card details. We process this data to supply the goods and/or services you have purchased and to keep records of such transactions. Our lawful ground for this processing is the performance of a contract between you and us and/or taking steps at your request to enter into such a contract.</p>
                </li>
                <li className="border-l-4 border-blue-200 pl-4">
                  <p><strong>User Data</strong> — data about how you use our website and any online services together with any data that you post for publication on our website or through other online services. We process this data to operate our website and ensure relevant content is provided to you, to ensure the security of our website, to maintain back-ups of our website and/or databases and to enable publication and administration of our website, other online services and business. Our lawful ground for this processing is our legitimate interests which in this case are to enable us to properly administer our website and our business.</p>
                </li>
                <li className="border-l-4 border-blue-200 pl-4">
                  <p><strong>Technical Data</strong> — data about your use of our website and online services such as your IP address, your login data, details about your browser, length of visit to pages on our website, page views and navigation paths, details about the number of times you use our website, time zone settings and other technology on the devices you use to access our website. The source of this data is from our analytics tracking system. We process this data to analyse your use of our website and other online services, to administer and protect our business and website, to deliver relevant website content and to understand the effectiveness of our advertising. Our lawful ground for this processing is our legitimate interests which in this case are to enable us to properly administer our website and our business and to grow our business and to decide our marketing strategy.</p>
                </li>
                <li className="border-l-4 border-blue-200 pl-4">
                  <p><strong>Marketing Data</strong> — data about your preferences in receiving marketing from us and our third parties and your communication preferences. We process this data to enable you to partake in our promotions such as competitions, prize draws and free give-aways, to deliver relevant website content and to measure or understand the effectiveness of this advertising. Our lawful ground for this processing is our legitimate interests which in this case are to study how customers use our products/services, to develop them, to grow our business and to decide our marketing strategy.</p>
                </li>
              </ul>
              <p className="mt-4">Where we are required to collect personal data by law, or under the terms of the contract between us and you do not provide us with that data when requested, we may not be able to perform the contract. If you don&rsquo;t provide us with the requested data, we may have to cancel a product or service you have ordered but if we do, we will notify you at the time.</p>
              <p className="mt-3">We will only use your personal data for a purpose it was collected for or a reasonably compatible purpose if necessary. For more information on this please email us at <a href="mailto:OFFICE@KADIMASYSTEMS.CO.UK" className="text-blue-600 hover:underline">OFFICE@KADIMASYSTEMS.CO.UK</a>.</p>
              <p className="mt-3">We may process your personal data without your knowledge or consent where this is required or permitted by law. We do not carry out automated decision making or any type of automated profiling.</p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-900 mb-3">3. How We Collect Your Personal Data</h2>
              <p>We may collect data about you by you providing the data directly to us (for example by filling in forms on our site or by sending us emails). We may automatically collect certain data from you as you use our website by using cookies and similar technologies. Please see our <Link href="/cookies" className="text-blue-600 hover:underline">Cookie Policy</Link> for more details about this.</p>
              <p className="mt-3">We may receive data from third parties such as analytics providers such as Google based outside the UK, advertising networks such as Facebook based outside the UK, and search information providers such as Google based outside the UK, providers of technical, payment and delivery services, such as data brokers or aggregators.</p>
              <p className="mt-3">We may also receive data from publicly available sources such as Companies House and the Electoral Register based inside the UK.</p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-900 mb-3">4. Marketing Communications</h2>
              <p>Our lawful ground of processing your personal data to send you marketing communications is either your consent or our legitimate interests (namely to grow our business).</p>
              <p className="mt-3">Under the Privacy and Electronic Communications Regulations, we may send you marketing communications from us if (i) you made a purchase or asked for information from us about our goods or services or (ii) you agreed to receive marketing communications and in each case you have not opted out of receiving such communications since.</p>
              <p className="mt-3">Before we share your personal data with any third party for their own marketing purposes we will get your express consent. You can ask us or third parties to stop sending you marketing messages at any time by following the opt-out links on any marketing message sent to you.</p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-900 mb-3">5. Disclosures of Your Personal Data</h2>
              <p>We may have to share your personal data with the parties set out below:</p>
              <ul className="mt-3 space-y-1 list-disc pl-5">
                <li>Other companies in our group who provide services to us.</li>
                <li>Service providers who provide IT and system administration services.</li>
                <li>Professional advisers including lawyers, bankers, auditors and insurers.</li>
                <li>Government bodies that require us to report processing activities.</li>
                <li>Third parties to whom we sell, transfer, or merge parts of our business or our assets.</li>
              </ul>
              <p className="mt-3">We require all third parties to whom we transfer your data to respect the security of your personal data and to treat it in accordance with the law. We only allow such third parties to process your personal data for specified purposes and in accordance with our instructions.</p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-900 mb-3">6. International Transfers</h2>
              <p>We do not transfer your personal data outside the UK.</p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-900 mb-3">7. Data Security</h2>
              <p>We have put in place security measures to prevent your personal data from being accidentally lost, used, altered, disclosed, or accessed without authorisation. We also allow access to your personal data only to those employees and partners who have a business need to know such data. They will only process your personal data on our instructions and they must keep it confidential.</p>
              <p className="mt-3">We have procedures in place to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach if we are legally required to.</p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-900 mb-3">8. Data Retention</h2>
              <p>We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
              <p className="mt-3">When deciding what the correct time is to keep the data for we look at its amount, nature and sensitivity, potential risk of harm from unauthorised use or disclosure, the processing purposes, if these can be achieved by other means and legal requirements.</p>
              <p className="mt-3">For tax purposes the law requires us to keep basic information about our customers (including Contact, Identity, Financial and Transaction Data) for six years after they stop being customers.</p>
              <p className="mt-3">In some circumstances we may anonymise your personal data for research or statistical purposes in which case we may use this information indefinitely without further notice to you.</p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-900 mb-3">9. Your Legal Rights</h2>
              <p>Under data protection laws you have rights in relation to your personal data that include the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.</p>
              <p className="mt-3">You can see more about these rights at: <a href="https://ico.org.uk/for-organisations/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">ico.org.uk</a></p>
              <p className="mt-3">If you wish to exercise any of the rights set out above, please email us at <a href="mailto:OFFICE@KADIMASYSTEMS.CO.UK" className="text-blue-600 hover:underline">OFFICE@KADIMASYSTEMS.CO.UK</a>.</p>
              <p className="mt-3">You will not have to pay a fee to access your personal data (or to exercise any of the other rights). However, we may charge a reasonable fee if your request is clearly unfounded, repetitive or excessive or refuse to comply with your request in these circumstances.</p>
              <p className="mt-3">We try to respond to all legitimate requests within one month. If you are not happy with any aspect of how we collect and use your data, you have the right to complain to the Information Commissioner&rsquo;s Office (ICO) at <a href="https://www.ico.org.uk" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.ico.org.uk</a>.</p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-900 mb-3">10. Third-Party Links</h2>
              <p>This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy notice of every website you visit.</p>
            </section>

            <section>
              <h2 className="text-lg font-black text-slate-900 mb-3">11. Cookies</h2>
              <p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly. For more information about the cookies we use, please see our <Link href="/cookies" className="text-blue-600 hover:underline">Cookie Policy</Link>.</p>
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
