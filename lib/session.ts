import { cookies } from 'next/headers'

export interface SessionUser {
  email: string
  userId: string
  name?: string
  iat: number
}

/**
 * Decode the HTTP-only session cookie.
 * Returns null if missing or malformed.
 * TODO: replace with JWT verification (e.g. jose) once real auth is wired.
 */
export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies()
    const raw = cookieStore.get('session')?.value
    if (!raw) return null
    const decoded = Buffer.from(raw, 'base64').toString('utf-8')
    return JSON.parse(decoded) as SessionUser
  } catch {
    return null
  }
}
