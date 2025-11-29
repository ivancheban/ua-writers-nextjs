import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | UA Writers\' Space',
  description: 'Meet the team behind UA Writers\' Space and learn about our mission.',
};

export default function About({ params: { lang } }: { params: { lang: string } }) {
  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-text-primary">About us</h1>
      
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

        <div className="font-semibold text-text-primary pt-6 border-t border-border-color mt-8">
          <p className="mb-1">Sincerely,</p>
          <p>Yaroslava Kachan and Ivan Cheban</p>
          <p className="font-normal text-text-secondary text-sm">Maintainers of Ukrainian Writers&apos; Space</p>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ivan Cheban */}
        <div className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-xl border border-border-color shadow-sm hover:shadow-md transition-shadow">
          <div className="relative w-32 h-32 mb-4">
            <Image
              src="/images/ivan-cheban.jpg"
              alt="Ivan Cheban"
              fill
              className="object-cover rounded-full border-4 border-white shadow-md"
            />
          </div>
          <h3 className="text-xl font-bold text-text-primary">Ivan Cheban</h3>
          <p className="text-sm text-text-secondary">Maintainer of Ukrainian Writers&apos; Space</p>
        </div>

        {/* Yaroslava Kachan */}
        <div className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-xl border border-border-color shadow-sm hover:shadow-md transition-shadow">
          <div className="relative w-32 h-32 mb-4">
            <Image
              src="/images/yaroslava-kachan.jpg"
              alt="Yaroslava Kachan"
              fill
              className="object-cover rounded-full border-4 border-white shadow-md"
            />
          </div>
          <h3 className="text-xl font-bold text-text-primary">Yaroslava Kachan</h3>
          <p className="text-sm text-text-secondary">Maintainer of Ukrainian Writers&apos; Space</p>
        </div>
      </div>
    </section>
  );
}