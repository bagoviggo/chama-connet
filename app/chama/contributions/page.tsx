import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/session'
import { mockChama, mockMembers, mockContributions } from '@/lib/mockData'
import DashboardNav from '@/components/DashboardNav'

export default async function ContributionsPage() {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  const chama = mockChama
  const members = mockMembers
  const contributions = [...mockContributions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const confirmed = contributions.filter(c => c.status === 'confirmed')
  const pending = contributions.filter(c => c.status === 'pending')
  const totalCollected = confirmed.reduce((sum, c) => sum + c.amount, 0)

  const statusBadge = (s: string) => {
    if (s === 'confirmed') return 'bg-green-100 text-green-700'
    if (s === 'pending') return 'bg-amber-100 text-amber-700'
    return 'bg-red-100 text-red-700'
  }

  // Build per-member status for current month
  const thisMonth = '2025-01'
  const memberStatus = members.map(m => {
    const c = contributions.find(x => x.memberId === m.id && x.date.startsWith(thisMonth))
    return { ...m, contribution: c }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav userName={session.email.split('@')[0]} userEmail={session.email} chamaName={chama.name} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contributions</h1>
            <p className="text-sm text-gray-500 mt-1">Track and record member payments</p>
          </div>
          <button className="btn-primary text-sm self-start sm:self-auto">+ Record payment</button>
        </div>

        {/* Summary cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Collected', value: `KES ${totalCollected.toLocaleString()}`, sub: `${confirmed.length} payments`, icon: '✅', color: 'bg-green-50' },
            { label: 'Pending', value: `${pending.length} members`, sub: `KES ${(pending.length * chama.contributionAmount).toLocaleString()} outstanding`, icon: '⏳', color: 'bg-amber-50' },
            { label: 'Not Yet Paid', value: `${members.length - confirmed.length - pending.length} members`, sub: 'This month', icon: '❌', color: 'bg-red-50' },
          ].map(s => (
            <div key={s.label} className="card p-5 flex items-start gap-3">
              <div className={`h-10 w-10 rounded-xl ${s.color} flex items-center justify-center text-xl shrink-0`}>{s.icon}</div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{s.label}</p>
                <p className="text-xl font-extrabold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-400">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Transaction log */}
          <div className="lg:col-span-3 card">
            <div className="p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Transaction log</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                    <th className="text-left px-5 py-3 font-medium">Member</th>
                    <th className="text-left px-5 py-3 font-medium">Date</th>
                    <th className="text-left px-5 py-3 font-medium">Method</th>
                    <th className="text-right px-5 py-3 font-medium">Amount</th>
                    <th className="text-right px-5 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {contributions.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50/50">
                      <td className="px-5 py-3 font-medium text-gray-900">{c.memberName}</td>
                      <td className="px-5 py-3 text-gray-500">{formatDate(c.date)}</td>
                      <td className="px-5 py-3 text-gray-500">{c.method}{c.reference ? <span className="ml-1 text-xs text-gray-300">· {c.reference}</span> : null}</td>
                      <td className="px-5 py-3 text-right font-semibold text-gray-900">KES {c.amount.toLocaleString()}</td>
                      <td className="px-5 py-3 text-right">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusBadge(c.status)}`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* This month status */}
          <div className="lg:col-span-2 card">
            <div className="p-5 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">January 2025 status</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {memberStatus.map(m => (
                <div key={m.id} className="flex items-center gap-3 px-5 py-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                    {m.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <p className="flex-1 text-sm font-medium text-gray-800 truncate">{m.name}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0
                    ${m.contribution?.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      m.contribution?.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'}`}>
                    {m.contribution?.status ?? 'not paid'}
                  </span>
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
