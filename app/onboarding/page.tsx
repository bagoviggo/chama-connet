'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useChamaStore } from '@/store/chamaStore'

const STEPS = ['Your Details', 'Chama Info', 'Contribution', 'Review']

const step0Schema = z.object({
  adminName: z.string().min(2, 'Name must be at least 2 characters'),
  adminEmail: z.string().email('Enter a valid email'),
})
const step1Schema = z.object({
  chamaName: z.string().min(2, 'Chama name must be at least 2 characters'),
  chamaType: z.enum(['merry-go-round', 'investment', 'savings', 'welfare']),
  description: z.string().optional(),
})
const step2Schema = z.object({
  contributionAmount: z.string().min(1, 'Enter an amount').refine(v => !isNaN(Number(v)) && Number(v) > 0, 'Enter a valid amount'),
  frequency: z.enum(['weekly', 'biweekly', 'monthly']),
  memberCount: z.string().min(1).refine(v => !isNaN(Number(v)) && Number(v) >= 2, 'Minimum 2 members'),
})

const schemas = [step0Schema, step1Schema, step2Schema]

const CHAMA_TYPES = [
  { value: 'merry-go-round', label: 'Merry-go-round', icon: '🔄', desc: 'Rotating contributions' },
  { value: 'investment', label: 'Investment Club', icon: '📈', desc: 'Grow wealth together' },
  { value: 'savings', label: 'Savings Group', icon: '🏦', desc: 'Pool savings together' },
  { value: 'welfare', label: 'Welfare Group', icon: '🤝', desc: 'Support each other' },
]

export default function Onboarding() {
  const { draft, currentStep, setDraft, setStep, clearDraft } = useChamaStore()
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const schema = schemas[currentStep] || z.object({})
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: currentStep < 3 ? zodResolver(schema) : undefined,
    defaultValues: draft as any,
  })

  const selectedType = watch('chamaType')

  // restore draft into form
  useEffect(() => {
    Object.entries(draft).forEach(([k, v]) => {
      if (v) setValue(k as any, v)
    })
  }, [])

  const onNext = (data: any) => {
    setDraft(data)
    setStep(currentStep + 1)
  }

  const onBack = () => setStep(currentStep - 1)

  const onSubmit = async () => {
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    setSubmitting(false)
    clearDraft()
    toast.success('Chama created! Check your email to set a password.')
    router.push('/auth/login')
  }

  const progress = ((currentStep) / STEPS.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-teal-50 flex flex-col">
      <nav className="p-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-brand-600 flex items-center justify-center">
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
            </svg>
          </div>
          <span className="font-bold text-gray-900">ChamaConnect</span>
        </Link>
        <span className="text-xs text-gray-400">Step {currentStep + 1} of {STEPS.length}</span>
      </nav>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100">
        <div
          className="h-full bg-brand-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 py-10">
        <div className="w-full max-w-lg">
          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all
                  ${i < currentStep ? 'bg-brand-600 text-white' : i === currentStep ? 'bg-brand-600 text-white ring-4 ring-brand-100' : 'bg-gray-100 text-gray-400'}`}>
                  {i < currentStep ? '✓' : i + 1}
                </div>
                {i < STEPS.length - 1 && <div className={`h-0.5 w-8 ${i < currentStep ? 'bg-brand-400' : 'bg-gray-100'}`} />}
              </div>
            ))}
          </div>

          <div className="card p-8 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-1">{STEPS[currentStep]}</h2>
            <p className="text-sm text-gray-500 mb-6">
              {currentStep === 0 && "Let's start with your details as the group admin."}
              {currentStep === 1 && 'Tell us about your chama.'}
              {currentStep === 2 && 'Set up your contribution schedule.'}
              {currentStep === 3 && 'Review everything before creating your chama.'}
            </p>

            {currentStep === 0 && (
              <form onSubmit={handleSubmit(onNext)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Your name</label>
                  <input {...register('adminName')} className="input-field" placeholder="Jane Wanjiku" />
                  {errors.adminName && <p className="text-xs text-red-500 mt-1">{errors.adminName.message as string}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                  <input {...register('adminEmail')} type="email" className="input-field" placeholder="jane@example.com" />
                  {errors.adminEmail && <p className="text-xs text-red-500 mt-1">{errors.adminEmail.message as string}</p>}
                </div>
                <button type="submit" className="btn-primary w-full py-3 mt-2">Continue →</button>
              </form>
            )}

            {currentStep === 1 && (
              <form onSubmit={handleSubmit(onNext)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Chama name</label>
                  <input {...register('chamaName')} className="input-field" placeholder="Umoja Investment Group" />
                  {errors.chamaName && <p className="text-xs text-red-500 mt-1">{errors.chamaName.message as string}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Type of group</label>
                  <div className="grid grid-cols-2 gap-3">
                    {CHAMA_TYPES.map(t => (
                      <label key={t.value} className={`cursor-pointer rounded-xl border-2 p-3 transition-all
                        ${selectedType === t.value ? 'border-brand-500 bg-brand-50' : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}>
                        <input type="radio" value={t.value} {...register('chamaType')} className="sr-only" />
                        <div className="text-xl mb-1">{t.icon}</div>
                        <div className="text-xs font-semibold text-gray-800">{t.label}</div>
                        <div className="text-xs text-gray-400">{t.desc}</div>
                      </label>
                    ))}
                  </div>
                  {errors.chamaType && <p className="text-xs text-red-500 mt-1">{errors.chamaType.message as string}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Description <span className="text-gray-400">(optional)</span></label>
                  <textarea {...register('description')} className="input-field min-h-[80px] resize-none" placeholder="What is your chama about?" />
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={onBack} className="btn-secondary flex-1 py-3">← Back</button>
                  <button type="submit" className="btn-primary flex-1 py-3">Continue →</button>
                </div>
              </form>
            )}

            {currentStep === 2 && (
              <form onSubmit={handleSubmit(onNext)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Contribution amount (KES)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">KES</span>
                    <input {...register('contributionAmount')} type="number" className="input-field pl-14" placeholder="5000" min="1" />
                  </div>
                  {errors.contributionAmount && <p className="text-xs text-red-500 mt-1">{errors.contributionAmount.message as string}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Contribution frequency</label>
                  <select {...register('frequency')} className="input-field">
                    <option value="">Select frequency…</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly (every 2 weeks)</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  {errors.frequency && <p className="text-xs text-red-500 mt-1">{errors.frequency.message as string}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Expected number of members</label>
                  <input {...register('memberCount')} type="number" className="input-field" placeholder="12" min="2" />
                  {errors.memberCount && <p className="text-xs text-red-500 mt-1">{errors.memberCount.message as string}</p>}
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={onBack} className="btn-secondary flex-1 py-3">← Back</button>
                  <button type="submit" className="btn-primary flex-1 py-3">Review →</button>
                </div>
              </form>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="rounded-xl bg-gray-50 p-4 space-y-3 text-sm">
                  {[
                    ['Admin', draft.adminName],
                    ['Email', draft.adminEmail],
                    ['Chama Name', draft.chamaName],
                    ['Type', CHAMA_TYPES.find(t => t.value === draft.chamaType)?.label],
                    ['Contribution', `KES ${draft.contributionAmount} / ${draft.frequency}`],
                    ['Members', draft.memberCount],
                  ].map(([label, val]) => val && (
                    <div key={label as string} className="flex justify-between">
                      <span className="text-gray-500">{label}</span>
                      <span className="font-medium text-gray-800">{val}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 text-center">
                  By creating a chama you agree to our{' '}
                  <Link href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</Link>.
                </p>
                <div className="flex gap-3">
                  <button type="button" onClick={onBack} className="btn-secondary flex-1 py-3">← Back</button>
                  <button
                    onClick={onSubmit}
                    disabled={submitting}
                    className="btn-primary flex-1 py-3"
                  >
                    {submitting ? 'Creating chama…' : '🎉 Create chama'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
