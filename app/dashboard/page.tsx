import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/session'
import { mockChama, mockMembers, mockContributions } from '@/lib/mockData'
import DashboardNav from '@/components/DashboardNav'

function StatCard({ label, value, sub, color = 'brand', icon }: {
  label: string; value: string; sub?: string; color?: string; icon: string
}) {
  return (
    <div className="card p-5 flex items-start gap-4">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl
        ${color === 'brand' ? 'bg-brand-50' : color === 'blue' ? 'bg-blue-50' : color === 'amber' ? 'bg-amber-50' : 'bg-purple-50'}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-extrabold text-gray-900 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

export default async function Dashboard() {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  const chama = mockChama
  const members = mockMembers
  const contributions = mockContributions

  const thisMonthContribs = contributions.filter(c => c.date.startsWith('2025-01'))
  const confirmed = thisMonthContribs.filter(c => c.status === 'confirmed')
  const pending = thisMonthContribs.filter(c => c.status === 'pending')
  const missed = thisMonthContribs.filter(c => c.status === 'missed')
  const collectionRate = Math.round((confirmed.length / members.length) * 100)

  const recentActivity = contributions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)

  const statusBadge = (status: string) => {
    if (status === 'confirmed') return 'bg-green-100 text-green-700'
    if (status === 'pending') return 'bg-amber-100 text-amber-700'
    return 'bg-red-100 text-red-700'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav userName={session.name || session.email.split('@')[0]} userEmail={session.email} chamaName={chama.name} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Good {getGreeting()}, {(session.name || session.email).split(' ')[0]} 👋
            </h1>
            <p className="text-sm text-gray-500 mt-1">{chama.name} · January 2025</p>
          </div>
          <div className="flex gap-3">
            <Link href="/chama/contributions" className="btn-secondary text-sm">
              View contributions
            </Link>
            <Link href="/chama/members" className="btn-primary text-sm">
              + Add member
            </Link>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Saved"
            value={`KES ${(chama.totalSaved / 1000).toFixed(0)}K`}
            sub="All time"
            icon="💰"
            color="brand"
          />
          <StatCard
            label="This Month"
            value={`KES ${(confirmed.length * chama.contributionAmount / 1000).toFixed(0)}K`}
            sub={`${confirmed.length}/${members.length} paid`}
            icon="📅"
            color="blue"
          />
          <StatCard
            label="Collection Rate"
            value={`${collectionRate}%`}
            sub={`${pending.length} pending · ${missed.length} missed`}
            icon="📊"
            color={collectionRate >= 80 ? 'brand' : 'amber'}
          />
          <StatCard
            label="Active Members"
            value={`${members.filter(m => m.status === 'active').length}`}
            sub={`of ${members.length} total`}
            icon="👥"
            color="purple"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent activity */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Recent Activity</h2>
              <Link href="/chama/contributions" className="text-xs text-brand-600 hover:underline font-medium">
                View all →
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {recentActivity.map(c => (
                <div key={c.id} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                    {c.memberName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{c.memberName}</p>
                    <p className="text-xs text-gray-400">{formatDate(c.date)} · {c.method}{c.reference ? ` · ${c.reference}` : ''}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-gray-900">KES {c.amount.toLocaleString()}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusBadge(c.status)}`}>
                      {c.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <div className="card p-5">
              <h2 className="font-semibold text-gray-900 mb-4">January Collection</h2>
              <div className="space-y-3">
                {[
                  { label: 'Confirmed', count: confirmed.length, total: members.length, color: 'bg-green-500' },
                  { label: 'Pending', count: pending.length, total: members.length, color: 'bg-amber-400' },
                  { label: 'Missed', count: missed.length, total: members.length, color: 'bg-red-400' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{item.label}</span>
                      <span>{item.count}/{item.total}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all`}
                        style={{ width: `${(item.count / item.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming */}
            <div className="card p-5">
              <h2 className="font-semibold text-gray-900 mb-3">Upcoming</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <span className="text-xs font-bold leading-none">FEB</span>
                    <span className="text-sm font-extrabold leading-none">15</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Monthly Meeting</p>
                    <p className="text-xs text-gray-400">Contributions due · KES {chama.contributionAmount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                    <span className="text-xs font-bold leading-none">FEB</span>
                    <span className="text-sm font-extrabold leading-none">28</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Q1 Financial Report</p>
                    <p className="text-xs text-gray-400">Treasurer to prepare summary</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="card p-5">
              <h2 className="font-semibold text-gray-900 mb-3">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { label: 'Record contribution', href: '/chama/contributions', icon: '➕' },
                  { label: 'Invite a member', href: '/chama/members', icon: '📨' },
                  { label: 'Download statement', href: '#', icon: '📄' },
                ].map(a => (
                  <Link key={a.label} href={a.href}
                    className="flex items-center gap-3 rounded-xl p-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <span className="text-base">{a.icon}</span>
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
}
