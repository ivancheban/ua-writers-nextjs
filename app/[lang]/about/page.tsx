import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | UA Writers\' Space',
  description: 'Meet the team behind UA Writers\' Space and learn about our mission.',
};

export default function About({ params: { lang } }: { params: { lang: string } }) {
  
  // Content Switcher
  if (lang === 'uk') {
    return (
      <div className="max-w-4xl mx-auto">
        {/* Main Content Section (Ukrainian) */}
        <section className="bg-card p-8 rounded-xl shadow-sm border border-border-color mb-12">
          <h1 className="text-4xl font-extrabold mb-8 text-text-primary border-b border-border-color pb-4">
            Про нас
          </h1>
          
          <div className="prose prose-lg max-w-none text-text-secondary space-y-6">
            <p className="text-xl font-medium text-text-primary">
              Зустрічайте наш новий майданчик для техрайтерів, UX-райтерів, контент-райтерів, копірайтерів і всіх інших райтерів, які хочуть поділитися своїми ідеями та досвідом.
            </p>
  
            <p>Любі колеги,</p>
  
            <p>
              Цей день настав! Тепер у райтерів України є власний майданчик для публікації власних статей і обміну досвідом.
            </p>

            <p className="font-semibold">Які задачі ми хочемо вирішити власною платформою:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Сюди зможуть писати всі та багато.</li>
              <li>Можливість пропіарити себе і доповнити своє портфоліо публікаціями. Хто не впевнений у своїй англійській, пишіть рідною.</li>
              <li>Плануємо розвивати інші напрямки окрім блогу, зокрема вакансії та події. Хочемо не обмежуватися виключно IT-сектором.</li>
              <li>Підвищення авторитету України та українських райтерів у світі. Саме тому мова сайту англійська, саме тому є посилання на «Повернись живим».</li>
            </ul>
  
            <p>
              Сайт в активній розробці та буде змінюватися, тому можливі певні технічні моменти. Це має бути наш спільний майданчик, тому чим раніше ви долучитеся, тим краще. Пишіть ваші пропозиції нам в особисті.
            </p>

            <p>
              Ну і, звісно, пишіть статті! Вітається все, що стосується техрайтингу, UX-райтингу, копірайтингу та дотичних напрямків. Також не забудьте натиснути «Підписка», щоб отримувати сповіщення про нові статті на вашу пошту.
            </p>
  
            <div className="mt-8 pt-6 border-t border-border-color">
              <p className="font-semibold text-text-primary">З найкращими побажаннями,</p>
              <p className="font-medium text-text-primary mt-1">Іван Чебан і Ярослава Качан</p>
            </div>
          </div>
        </section>
  
        {/* Maintainers Section (Ukrainian) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ivan Cheban */}
          <div className="bg-card p-6 rounded-xl shadow-sm border border-border-color flex flex-col items-center text-center">
            <div className="relative w-32 h-32 mb-4">
              <Image
                src="/images/ivan-cheban.jpg"
                alt="Ivan Cheban"
                fill
                className="object-cover rounded-full border-4 border-background shadow-md"
              />
            </div>
            <h3 className="text-xl font-bold text-text-primary">Іван Чебан</h3>
            <p className="text-sm text-text-secondary mt-1">Засновник Ukrainian Writers&apos; Space</p>
          </div>
  
          {/* Yaroslava Kachan */}
          <div className="bg-card p-6 rounded-xl shadow-sm border border-border-color flex flex-col items-center text-center">
            <div className="relative w-32 h-32 mb-4">
              <Image
                src="/images/yaroslava-kachan.jpg"
                alt="Yaroslava Kachan"
                fill
                className="object-cover rounded-full border-4 border-background shadow-md"
              />
            </div>
            <h3 className="text-xl font-bold text-text-primary">Ярослава Качан</h3>
            <p className="text-sm text-text-secondary mt-1">Засновниця Ukrainian Writers&apos; Space</p>
          </div>
        </section>
      </div>
    );
  }

  // Default English Content
  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Content Section */}
      <section className="bg-card p-8 rounded-xl shadow-sm border border-border-color mb-12">
        <h1 className="text-4xl font-extrabold mb-8 text-text-primary border-b border-border-color pb-4">
          About us
        </h1>
        
        <div className="prose prose-lg max-w-none text-text-secondary space-y-6">
          <p className="text-xl font-medium text-text-primary">
            Meet our new platform for technical writers, UX writers, content writers, copywriters, and all other kinds of writers who are eager to share their ideas and expertise in the form of a blog article.
          </p>

          <p>Dear writers,</p>

          <p>
            We&apos;ve been nursing the idea of a platform where we could exchange our expertise and advice on different subjects relating to writing for a long time. Finally, the idea has shaped itself into a blog. This blog allows you to publish and edit your posts, read what others write, and add comments or reactions.
          </p>

          <p>
            You know that we have been talking to each other on Telegram channels for technical writers and UX writers of Ukraine. Those channels are a good place for communication in real time. This blog is for writing! Yes, we&apos;re excited to announce that now you have a space, Ukrainian Writer&apos;s Space, where you can actually show your writing and share your ideas.
          </p>

          <div className="mt-8 pt-6 border-t border-border-color">
            <p className="font-semibold text-text-primary">Sincerely,</p>
            <p className="font-medium text-text-primary mt-1">Yaroslava Kachan and Ivan Cheban</p>
            <p className="text-sm text-text-secondary">Maintainers of Ukrainian Writers&apos; Space</p>
          </div>
        </div>
      </section>

      {/* Maintainers Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ivan Cheban */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border-color flex flex-col items-center text-center">
          <div className="relative w-32 h-32 mb-4">
            <Image
              src="/images/ivan-cheban.jpg"
              alt="Ivan Cheban"
              fill
              className="object-cover rounded-full border-4 border-background shadow-md"
            />
          </div>
          <h3 className="text-xl font-bold text-text-primary">Ivan Cheban</h3>
          <p className="text-sm text-text-secondary mt-1">Maintainer of Ukrainian Writers&apos; Space</p>
        </div>

        {/* Yaroslava Kachan */}
        <div className="bg-card p-6 rounded-xl shadow-sm border border-border-color flex flex-col items-center text-center">
          <div className="relative w-32 h-32 mb-4">
            <Image
              src="/images/yaroslava-kachan.jpg"
              alt="Yaroslava Kachan"
              fill
              className="object-cover rounded-full border-4 border-background shadow-md"
            />
          </div>
          <h3 className="text-xl font-bold text-text-primary">Yaroslava Kachan</h3>
          <p className="text-sm text-text-secondary mt-1">Maintainer of Ukrainian Writers&apos; Space</p>
        </div>
      </section>
    </div>
  );
}