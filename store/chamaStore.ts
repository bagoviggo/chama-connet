import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ContributionFrequency = 'weekly' | 'biweekly' | 'monthly'
export type ChamaType = 'merry-go-round' | 'investment' | 'savings' | 'welfare'

export interface OnboardingDraft {
  chamaName: string
  chamaType: ChamaType | ''
  contributionAmount: string
  frequency: ContributionFrequency | ''
  memberCount: string
  description: string
  adminName: string
  adminEmail: string
}

interface ChamaStore {
  draft: Partial<OnboardingDraft>
  currentStep: number
  setDraft: (data: Partial<OnboardingDraft>) => void
  setStep: (step: number) => void
  clearDraft: () => void
}

export const useChamaStore = create<ChamaStore>()(
  persist(
    (set) => ({
      draft: {},
      currentStep: 0,
      setDraft: (data) => set((state) => ({ draft: { ...state.draft, ...data } })),
      setStep: (step) => set({ currentStep: step }),
      clearDraft: () => set({ draft: {}, currentStep: 0 }),
    }),
    {
      name: 'chama-onboarding-draft',
    }
  )
)
