import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900">ChamaConnect</span>
            </div>
            <div className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
              <a href="#features" className="hover:text-brand-600 transition-colors">Features</a>
              <a href="#how" className="hover:text-brand-600 transition-colors">How it works</a>
              <a href="#pricing" className="hover:text-brand-600 transition-colors">Pricing</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="btn-secondary text-xs px-4 py-2">Log in</Link>
              <Link href="/onboarding" className="btn-primary text-xs px-4 py-2">Get started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-teal-50 py-20 sm:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMmM1NWUiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0zMHY2aDZ2LTZoLTZ6TTYgNHY2aDZWNEg2em0wIDMwdjZoNnYtNkg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-xs font-semibold text-brand-700 mb-6">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span></span>
            Now in beta · Free for early groups
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Save together,<br />
            <span className="text-brand-600">grow together</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 mb-10">
            ChamaConnect makes it easy to run your chama, merry-go-round, or investment club — track contributions, manage members, and grow your wealth as a group.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/onboarding" className="btn-primary text-base px-8 py-3.5">
              Start your chama free →
            </Link>
            <a href="#how" className="btn-secondary text-base px-8 py-3.5">See how it works</a>
          </div>
          <p className="mt-6 text-xs text-gray-400">No credit card required · Takes 2 minutes to set up</p>
        </div>

        {/* Stats */}
        <div className="relative mx-auto max-w-4xl px-4 mt-20">
          <div className="card p-8 grid grid-cols-3 gap-8 text-center shadow-md">
            {[
              { label: 'Active Chamas', value: '2,400+' },
              { label: 'Total Saved', value: 'KES 48M' },
              { label: 'Members', value: '18,000+' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-brand-600">{s.value}</div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Everything your chama needs</h2>
            <p className="mt-4 text-gray-500">Built specifically for Kenyan savings groups</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '💰', title: 'Contribution Tracking', desc: 'Record and verify every M-Pesa payment automatically. No more WhatsApp confusion.' },
              { icon: '👥', title: 'Member Management', desc: 'Add members, assign roles, track attendance, and manage your roster with ease.' },
              { icon: '📊', title: 'Financial Reports', desc: 'Auto-generated statements, balances, and audit trails ready for your next AGM.' },
              { icon: '🔔', title: 'Smart Reminders', desc: 'SMS and email nudges so no one forgets their contribution day.' },
              { icon: '🗳️', title: 'Voting & Decisions', desc: 'Run polls, approve loans, and make group decisions transparently.' },
              { icon: '📱', title: 'Mobile First', desc: 'Works beautifully on any phone — no app download needed.' },
            ].map((f) => (
              <div key={f.title} className="card p-6 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 bg-brand-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Up and running in minutes</h2>
          <p className="text-gray-500 mb-16">Three simple steps to digitise your chama</p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Create your chama', desc: 'Name it, set your contribution schedule, and invite members.' },
              { step: '2', title: 'Add your members', desc: 'Share a link or import from your contacts. Members join in seconds.' },
              { step: '3', title: 'Start tracking', desc: 'Record contributions, approve loans, and watch your group wealth grow.' },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-brand-600 text-white flex items-center justify-center text-xl font-bold mb-4">{s.step}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
          <Link href="/onboarding" className="btn-primary inline-flex mt-12 text-base px-8 py-3.5">
            Create your chama now →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-brand-600 flex items-center justify-center">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-800">ChamaConnect</span>
          </div>
          <div className="flex gap-6 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-brand-600">Privacy Policy</Link>
            <a href="mailto:hello@chamaconnect.io" className="hover:text-brand-600">Contact</a>
            <span>© 2025 ChamaConnect</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
