import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { mockChama, mockMembers } from '@/lib/mockData'
import DashboardNav from '@/components/DashboardNav'
import MembersClient from './MembersClient'

export default async function MembersPage() {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav
        userName={session.email.split('@')[0]}
        userEmail={session.email}
        chamaName={mockChama.name}
      />
      <MembersClient members={mockMembers} />
    </div>
  )
}
