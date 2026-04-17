/**
 * Mock data — replace every import here with real DB queries (Drizzle/Postgres).
 * The shapes are intentionally close to what a real schema would return.
 */

export interface Member {
  id: string
  name: string
  email: string
  phone: string
  role: 'admin' | 'treasurer' | 'secretary' | 'member'
  status: 'active' | 'inactive'
  joinedAt: string
  totalContributed: number
  lastPaid: string | null
}

export interface Contribution {
  id: string
  memberId: string
  memberName: string
  amount: number
  date: string
  status: 'confirmed' | 'pending' | 'missed'
  method: 'M-Pesa' | 'Bank' | 'Cash'
  reference?: string
}

export interface ChamaInfo {
  id: string
  name: string
  type: string
  contributionAmount: number
  frequency: string
  totalSaved: number
  nextMeetingDate: string
  memberCount: number
  adminName: string
  adminEmail: string
}

export const mockChama: ChamaInfo = {
  id: 'chama-001',
  name: 'Umoja Investment Group',
  type: 'investment',
  contributionAmount: 5000,
  frequency: 'monthly',
  totalSaved: 360000,
  nextMeetingDate: '2025-02-15',
  memberCount: 12,
  adminName: 'Jane Wanjiku',
  adminEmail: 'jane@example.com',
}

export const mockMembers: Member[] = [
  { id: 'm1', name: 'Jane Wanjiku', email: 'jane@example.com', phone: '0712 345 678', role: 'admin', status: 'active', joinedAt: '2024-01-01', totalContributed: 60000, lastPaid: '2025-01-05' },
  { id: 'm2', name: 'Peter Kamau', email: 'peter@example.com', phone: '0723 456 789', role: 'treasurer', status: 'active', joinedAt: '2024-01-01', totalContributed: 55000, lastPaid: '2025-01-03' },
  { id: 'm3', name: 'Grace Achieng', email: 'grace@example.com', phone: '0734 567 890', role: 'secretary', status: 'active', joinedAt: '2024-01-15', totalContributed: 50000, lastPaid: '2025-01-07' },
  { id: 'm4', name: 'David Otieno', email: 'david@example.com', phone: '0745 678 901', role: 'member', status: 'active', joinedAt: '2024-02-01', totalContributed: 45000, lastPaid: '2025-01-02' },
  { id: 'm5', name: 'Mary Njeri', email: 'mary@example.com', phone: '0756 789 012', role: 'member', status: 'active', joinedAt: '2024-02-01', totalContributed: 45000, lastPaid: '2025-01-08' },
  { id: 'm6', name: 'John Mwangi', email: 'john@example.com', phone: '0767 890 123', role: 'member', status: 'active', joinedAt: '2024-03-01', totalContributed: 40000, lastPaid: '2025-01-04' },
  { id: 'm7', name: 'Alice Wambua', email: 'alice@example.com', phone: '0778 901 234', role: 'member', status: 'inactive', joinedAt: '2024-03-15', totalContributed: 25000, lastPaid: '2024-11-10' },
  { id: 'm8', name: 'Samuel Korir', email: 'samuel@example.com', phone: '0789 012 345', role: 'member', status: 'active', joinedAt: '2024-04-01', totalContributed: 35000, lastPaid: '2025-01-06' },
]

export const mockContributions: Contribution[] = [
  { id: 'c1', memberId: 'm1', memberName: 'Jane Wanjiku', amount: 5000, date: '2025-01-05', status: 'confirmed', method: 'M-Pesa', reference: 'QGJ8X4K2P1' },
  { id: 'c2', memberId: 'm2', memberName: 'Peter Kamau', amount: 5000, date: '2025-01-03', status: 'confirmed', method: 'M-Pesa', reference: 'RHK9Y5L3Q2' },
  { id: 'c3', memberId: 'm3', memberName: 'Grace Achieng', amount: 5000, date: '2025-01-07', status: 'confirmed', method: 'Bank', reference: 'TRF-20250107' },
  { id: 'c4', memberId: 'm4', memberName: 'David Otieno', amount: 5000, date: '2025-01-02', status: 'confirmed', method: 'M-Pesa', reference: 'SJL0Z6M4R3' },
  { id: 'c5', memberId: 'm5', memberName: 'Mary Njeri', amount: 5000, date: '2025-01-08', status: 'confirmed', method: 'M-Pesa', reference: 'TKM1A7N5S4' },
  { id: 'c6', memberId: 'm6', memberName: 'John Mwangi', amount: 5000, date: '2025-01-04', status: 'confirmed', method: 'Cash' },
  { id: 'c7', memberId: 'm7', memberName: 'Alice Wambua', amount: 5000, date: '2025-01-09', status: 'pending', method: 'M-Pesa' },
  { id: 'c8', memberId: 'm8', memberName: 'Samuel Korir', amount: 5000, date: '2025-01-06', status: 'confirmed', method: 'M-Pesa', reference: 'VLN2B8O6T5' },
  { id: 'c9', memberId: 'm7', memberName: 'Alice Wambua', amount: 5000, date: '2024-12-10', status: 'missed', method: 'M-Pesa' },
]
