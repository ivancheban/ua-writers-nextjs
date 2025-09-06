import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'UA Writers\' Space',
  description: 'A blog for Ukrainian tech writers.',
}

// NOTE: The 'lang' parameter is not directly available here,
// but the nested layout will be rendered within this structure.
// We set a default lang, and the browser will prioritize the nested info.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}