import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { mockChama } from '@/lib/mockData'
import DashboardNav from '@/components/DashboardNav'
import SettingsClient from './SettingsClient'

export default async function SettingsPage() {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav
        userName={session.email.split('@')[0]}
        userEmail={session.email}
        chamaName={mockChama.name}
      />
      <SettingsClient chama={mockChama} userEmail={session.email} />
    </div>
  )
}
