import Link from 'next/link'

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information we collect',
      body: `We collect information you provide directly: your name, email address, phone number, and chama details when you create an account or set up a group. We also collect contribution records and member interactions within your chama. We do not sell your personal data to third parties.`,
    },
    {
      title: 'How we use your information',
      body: `Your information is used to operate ChamaConnect — to manage your chama, send contribution reminders, generate financial reports, and keep your account secure. We may send transactional emails (e.g. OTP codes, payment confirmations) and, with your consent, occasional product updates.`,
    },
    {
      title: 'Data sharing',
      body: `We share your information only with members of your chama (as you configure), and with trusted service providers who help us operate the platform (e.g. email delivery, hosting). All providers are contractually bound to protect your data. We will disclose data to comply with legal obligations where required.`,
    },
    {
      title: 'Data security',
      body: `We use industry-standard security measures including HTTPS encryption, HTTP-only session cookies, and regular security reviews. Sensitive fields like M-Pesa references are stored encrypted at rest. No system is 100% secure — please use a strong, unique password and log out from shared devices.`,
    },
    {
      title: 'Your rights',
      body: `You have the right to access, correct, or delete your personal data at any time. You may request a copy of your data or ask us to delete your account by emailing privacy@chamaconnect.io. We will respond within 30 days.`,
    },
    {
      title: 'Cookies',
      body: `We use a single HTTP-only session cookie to keep you logged in. We do not use advertising or tracking cookies. You can clear this cookie by logging out or clearing your browser data.`,
    },
    {
      title: 'Changes to this policy',
      body: `We may update this policy from time to time. If we make significant changes, we will notify you by email or with a banner in the app. Continued use of ChamaConnect after such notice constitutes your acceptance of the updated policy.`,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 p-5">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="h-7 w-7 rounded-lg bg-brand-600 flex items-center justify-center">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
            </svg>
          </div>
          <span className="font-bold text-gray-900">ChamaConnect</span>
        </Link>
      </nav>

      <main className="mx-auto max-w-2xl px-4 sm:px-6 py-16">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mt-2">Last updated: January 2025</p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            At ChamaConnect we take your privacy seriously. This policy explains what data we collect, how we use it, and your rights around it. If you have questions, email us at{' '}
            <a href="mailto:privacy@chamaconnect.io" className="text-brand-600 hover:underline">privacy@chamaconnect.io</a>.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((s, i) => (
            <section key={s.title}>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {i + 1}. {s.title}
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <Link href="/" className="btn-secondary text-sm">← Back to ChamaConnect</Link>
        </div>
      </main>
    </div>
  )
}
