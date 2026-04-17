import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  title: 'ChamaConnect – Save Together, Grow Together',
  description: 'The easiest way to manage your chama, investment group, or savings circle online.',
  keywords: ['chama', 'savings', 'investment group', 'Kenya', 'merry-go-round'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '12px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#16a34a', secondary: '#fff' },
            },
          }}
        />
      </body>
    </html>
  )
}
