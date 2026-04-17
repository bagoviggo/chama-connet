import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/session'
import { mockChama, mockMembers } from '@/lib/mockData'
import DashboardNav from '@/components/DashboardNav'

const TYPE_LABELS: Record<string, string> = {
  'merry-go-round': '🔄 Merry-go-round',
  'investment': '📈 Investment Club',
  'savings': '🏦 Savings Group',
  'welfare': '🤝 Welfare Group',
}

const FREQ_LABELS: Record<string, string> = {
  weekly: 'Every week',
  biweekly: 'Every 2 weeks',
  monthly: 'Every month',
}

export default async function ChamaPage() {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  const chama = mockChama
  const members = mockMembers
  const active = members.filter(m => m.status === 'active')

  const roleOrder = ['admin', 'treasurer', 'secretary', 'member']
  const sorted = [...members].sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role))

  const roleBadge = (role: string) => {
    if (role === 'admin') return 'bg-brand-100 text-brand-700'
    if (role === 'treasurer') return 'bg-blue-100 text-blue-700'
    if (role === 'secretary') return 'bg-purple-100 text-purple-700'
    return 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav userName={session.name || session.email.split('@')[0]} userEmail={session.email} chamaName={chama.name} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{chama.name}</h1>
            <p className="text-sm text-gray-500 mt-1">{TYPE_LABELS[chama.type]} · {FREQ_LABELS[chama.frequency]}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/chama/members" className="btn-primary text-sm">+ Invite member</Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chama info card */}
          <div className="space-y-5">
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-2xl text-white font-extrabold">
                  {chama.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{chama.name}</p>
                  <p className="text-xs text-gray-400">{TYPE_LABELS[chama.type]}</p>
                </div>
              </div>
              <dl className="space-y-3 text-sm">
                {[
                  { label: 'Contribution', value: `KES ${chama.contributionAmount.toLocaleString()}` },
                  { label: 'Frequency', value: FREQ_LABELS[chama.frequency] },
                  { label: 'Members', value: `${active.length} active / ${members.length} total` },
                  { label: 'Total Saved', value: `KES ${chama.totalSaved.toLocaleString()}` },
                  { label: 'Next Meeting', value: formatDate(chama.nextMeetingDate) },
                  { label: 'Admin', value: chama.adminName },
                ].map(row => (
                  <div key={row.label} className="flex justify-between">
                    <dt className="text-gray-500">{row.label}</dt>
                    <dd className="font-medium text-gray-900 text-right">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Share invite link</h3>
              <div className="rounded-xl bg-gray-50 p-3 text-xs font-mono text-gray-500 break-all mb-3">
                chamaconnect.io/join/umoja-inv-2025
              </div>
              <button className="btn-secondary w-full text-sm py-2">📋 Copy link</button>
            </div>
          </div>

          {/* Members list */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Members <span className="text-gray-400 font-normal text-sm">({members.length})</span></h2>
              <Link href="/chama/members" className="text-xs text-brand-600 font-medium hover:underline">Manage →</Link>
            </div>
            <div className="divide-y divide-gray-50">
              {sorted.map(member => (
                <div key={member.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold
                    ${member.status === 'active' ? 'bg-brand-100 text-brand-700' : 'bg-gray-100 text-gray-400'}`}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${roleBadge(member.role)}`}>
                        {member.role}
                      </span>
                      {member.status === 'inactive' && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">inactive</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{member.phone} · Joined {formatDate(member.joinedAt)}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-gray-900">KES {member.totalContributed.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">total</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
}
