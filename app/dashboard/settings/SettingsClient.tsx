'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import type { ChamaInfo } from '@/lib/mockData'

export default function SettingsClient({ chama, userEmail }: { chama: ChamaInfo; userEmail: string }) {
  const router = useRouter()
  const [chamaName, setChamaName] = useState(chama.name)
  const [amount, setAmount] = useState(String(chama.contributionAmount))
  const [frequency, setFrequency] = useState(chama.frequency)
  const [saving, setSaving] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))
    setSaving(false)
    toast.success('Settings saved!')
    // TODO: PATCH /api/chama/[id] with updated values
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    toast.success('Logged out')
    router.push('/')
  }

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your chama and account</p>
      </div>

      <div className="space-y-6">
        {/* Chama settings */}
        <section className="card p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Chama details</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Chama name</label>
              <input
                value={chamaName}
                onChange={e => setChamaName(e.target.value)}
                className="input-field max-w-sm"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Contribution amount (KES)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="input-field"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Frequency</label>
                <select value={frequency} onChange={e => setFrequency(e.target.value)} className="input-field">
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
            <div>
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </form>
        </section>

        {/* Account */}
        <section className="card p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Account</h2>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-gray-800">Email address</p>
              <p className="text-xs text-gray-400">{userEmail}</p>
            </div>
            <button className="btn-secondary text-xs py-1.5 px-3">Change</button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-gray-800">Password</p>
              <p className="text-xs text-gray-400">Set a password for email login</p>
            </div>
            <button className="btn-secondary text-xs py-1.5 px-3">Set password</button>
          </div>
        </section>

        {/* Notifications */}
        <section className="card p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Notifications</h2>
          <div className="space-y-4">
            {[
              { label: 'Contribution reminders', sub: 'Remind members before due date', key: 'reminders' },
              { label: 'Payment confirmations', sub: 'Notify when a contribution is recorded', key: 'confirmations' },
              { label: 'Monthly summary', sub: 'Send a report at end of each period', key: 'summary' },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.sub}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toast.success('Preference saved')}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-brand-500 transition-colors focus:outline-none"
                  role="switch"
                >
                  <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white shadow transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Danger zone */}
        <section className="card p-6 border-red-100">
          <h2 className="font-semibold text-red-600 mb-5">Danger zone</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">Log out</p>
              <p className="text-xs text-gray-400">End your current session</p>
            </div>
            <button onClick={handleLogout} className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
              Log out →
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
