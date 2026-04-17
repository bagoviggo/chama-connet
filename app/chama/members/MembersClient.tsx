'use client'
import { useState } from 'react'
import type { Member } from '@/lib/mockData'
import toast from 'react-hot-toast'

const ROLE_BADGE: Record<string, string> = {
  admin: 'bg-brand-100 text-brand-700',
  treasurer: 'bg-blue-100 text-blue-700',
  secretary: 'bg-purple-100 text-purple-700',
  member: 'bg-gray-100 text-gray-600',
}

export default function MembersClient({ members: initial }: { members: Member[] }) {
  const [members, setMembers] = useState(initial)
  const [search, setSearch] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [showInvite, setShowInvite] = useState(false)
  const [sending, setSending] = useState(false)

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail.includes('@')) { toast.error('Enter a valid email'); return }
    setSending(true)
    await new Promise(r => setTimeout(r, 900))
    setSending(false)
    toast.success(`Invitation sent to ${inviteEmail}`)
    setInviteEmail('')
    setShowInvite(false)
  }

  const toggleStatus = (id: string) => {
    setMembers(prev => prev.map(m =>
      m.id === id ? { ...m, status: m.status === 'active' ? 'inactive' : 'active' } : m
    ))
    toast.success('Member status updated')
  }

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Members</h1>
          <p className="text-sm text-gray-500 mt-1">{members.filter(m => m.status === 'active').length} active · {members.length} total</p>
        </div>
        <button onClick={() => setShowInvite(true)} className="btn-primary text-sm self-start sm:self-auto">
          + Invite member
        </button>
      </div>

      {/* Invite modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="card w-full max-w-md p-6 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Invite a member</h2>
            <p className="text-sm text-gray-500 mb-5">They'll receive an email to join your chama.</p>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="member@example.com"
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowInvite(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" disabled={sending} className="btn-primary flex-1">
                  {sending ? 'Sending…' : '📨 Send invite'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-5 relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          className="input-field pl-11 max-w-sm"
          placeholder="Search members…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide border-b border-gray-100">
                <th className="text-left px-5 py-3 font-medium">Member</th>
                <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Phone</th>
                <th className="text-left px-5 py-3 font-medium">Role</th>
                <th className="text-right px-5 py-3 font-medium hidden md:table-cell">Contributed</th>
                <th className="text-right px-5 py-3 font-medium hidden lg:table-cell">Last paid</th>
                <th className="text-right px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(m => (
                <tr key={m.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold
                        ${m.status === 'active' ? 'bg-brand-100 text-brand-700' : 'bg-gray-100 text-gray-400'}`}>
                        {m.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{m.name}</p>
                        <p className="text-xs text-gray-400">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-gray-500 hidden sm:table-cell">{m.phone}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${ROLE_BADGE[m.role]}`}>
                      {m.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-medium text-gray-900 hidden md:table-cell">
                    KES {m.totalContributed.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 text-right text-gray-400 text-xs hidden lg:table-cell">
                    {m.lastPaid ? formatDate(m.lastPaid) : '—'}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full
                      ${m.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => toggleStatus(m.id)}
                      className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
                      title={m.status === 'active' ? 'Deactivate' : 'Activate'}
                    >
                      {m.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-gray-400 text-sm">
                    No members match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })
}
