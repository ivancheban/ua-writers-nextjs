import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

export default function LangLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header lang={lang} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}