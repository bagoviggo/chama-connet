'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }
    setLoading(true)
    // Simulate sending OTP (replace with real OTP endpoint)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setStep('otp')
    toast.success('OTP sent! (use 123456 in demo)')
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    })
    const data = await res.json()
    setLoading(false)
    if (data.success) {
      toast.success('Welcome back!')
      router.push('/dashboard')
    } else {
      toast.error(data.error || 'Invalid OTP')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-teal-50 flex flex-col">
      <nav className="p-5">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="h-7 w-7 rounded-lg bg-brand-600 flex items-center justify-center">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
            </svg>
          </div>
          <span className="font-bold text-gray-900">ChamaConnect</span>
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="card p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                {step === 'email' ? 'Welcome back' : 'Check your email'}
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                {step === 'email'
                  ? 'Sign in to manage your chama'
                  : `We sent a 6-digit code to ${email}`}
              </p>
            </div>

            {step === 'email' ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                  {loading ? 'Sending code…' : 'Continue with email →'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">6-digit code</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    className="input-field text-center tracking-[0.5em] text-xl font-bold"
                    placeholder="123456"
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    autoFocus
                  />
                </div>
                <button type="submit" disabled={loading || otp.length < 6} className="btn-primary w-full py-3">
                  {loading ? 'Verifying…' : 'Sign in →'}
                </button>
                <button
                  type="button"
                  onClick={() => setStep('email')}
                  className="w-full text-sm text-gray-500 hover:text-brand-600 transition-colors"
                >
                  ← Use a different email
                </button>
              </form>
            )}

            <div className="mt-6 text-center text-sm text-gray-500">
              New to ChamaConnect?{' '}
              <Link href="/onboarding" className="text-brand-600 font-medium hover:underline">
                Create a chama free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
