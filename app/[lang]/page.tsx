import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import PostImage from '@/app/components/PostImage';
import Image from 'next/image';

export default function Home({ params: { lang } }: { params: { lang: string }}) {
  const allPostsData = getSortedPostsData(lang);
  const dict = {
    en: { latestArticles: 'Latest Articles' },
    uk: { latestArticles: 'Останні статті' }
  }[lang];

  if (!dict) {
    // Handle the case where the language is not supported
    // This could be a redirect or a custom 404 page
    // For now, we'll just return null to prevent a crash
    return null;
  }

  return (
    <section>
      <h1 className="text-4xl font-extrabold text-accent-orange mb-8">
        {dict.latestArticles}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {allPostsData.map(({ id, date, title, excerpt, image, author, authorImage, tags }) => (
          <div key={id} className="bg-content-bg border border-border-color rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <Link href={`/${lang}/posts/${id}`} className="block">
              <PostImage
                src={image}
                alt={`Image for ${title}`}
                className="w-full h-56 object-cover rounded-t-xl"
                fallbackSrc="https://placehold.co/600x400/E2E8F0/718096?text=Image"
              />
            </Link>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex-grow">
                <div className="flex flex-wrap gap-3 mb-4">
                  {tags.map(tag => (
                    <Link href={`/${lang}/tags/${tag}`} key={tag} className="text-xs font-semibold bg-gray-100 text-text-secondary px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">
                      {tag}
                    </Link>
                  ))}
                </div>
                <Link href={`/${lang}/posts/${id}`} className="block group">
                  <h2 className="text-2xl font-bold text-text-primary mb-3 group-hover:underline">{title}</h2>
                  <p className="text-text-secondary text-base">{excerpt}</p>
                </Link>
              </div>
              <div className="mt-6 pt-4 border-t border-border-color flex items-center">
                <Image 
                  src={authorImage} 
                  alt={author} 
                  width={32} 
                  height={32} 
                  // THIS IS THE FIX: object-cover prevents image distortion
                  className="rounded-full mr-3 object-cover w-8 h-8" 
                />
                <div>
                  <p className="font-semibold text-text-primary text-sm">{author}</p>
                  <p className="text-xs text-text-secondary">{date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}