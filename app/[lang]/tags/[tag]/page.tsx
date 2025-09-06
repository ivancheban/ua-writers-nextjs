import Link from 'next/link';
import { getSortedPostsData, getAllTags } from '@/lib/posts';
import PostImage from '@/app/components/PostImage';
import Image from 'next/image';

export async function generateStaticParams() {
  const tags = getAllTags('en').concat(getAllTags('uk')); // Combine tags from both languages
  const uniqueTags = [...new Set(tags)]; // Ensure unique tags
  return uniqueTags.map(tag => ({
    tag: tag,
  }));
}

export default function TagPage({ params }: { params: { lang: string, tag: string } }) {
  const { lang, tag } = params;
  const decodedTag = decodeURIComponent(tag);
  const allPostsData = getSortedPostsData(lang, decodedTag);

  return (
    <section>
      <h1 className="text-4xl font-extrabold mb-8 border-b pb-4">
        Posts tagged with: <span className="text-accent-orange">#{decodedTag}</span>
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
                  {tags.map(t => (
                    <Link href={`/${lang}/tags/${t}`} key={t} className="text-xs font-semibold bg-gray-100 text-text-secondary px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">
                      {t}
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