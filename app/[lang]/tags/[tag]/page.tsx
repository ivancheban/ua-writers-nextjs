import Link from 'next/link';
import { getSortedPostsData, getAllTags } from '@/lib/posts';
import PostImage from '@/app/components/PostImage';
import Image from 'next/image';

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(tag => ({
    tag: tag,
  }));
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);
  const allPostsData = getSortedPostsData(decodedTag);

  return (
    <section>
      <h1 className="text-4xl font-extrabold mb-8 border-b pb-4">
        Posts tagged with: <span className="text-primary">#{decodedTag}</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {allPostsData.map(({ id, date, title, excerpt, image, author, authorImage, tags }) => (
          <div key={id} className="bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden h-full flex flex-col">
            <Link href={`/posts/${id}`} className="block group">
              <PostImage
                src={image}
                alt={`Image for ${title}`}
                className="w-full h-48 object-cover"
                fallbackSrc="https://placehold.co/600x400/f8f9fa/6c757d?text=Image"
              />
            </Link>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex-grow">
                 <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map(t => (
                    <Link href={`/tags/${t}`} key={t} className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full hover:bg-primary/20 transition-colors">
                      {t}
                    </Link>
                  ))}
                </div>
                <Link href={`/posts/${id}`} className="block group">
                  <h2 className="text-2xl font-bold text-primary mb-3 group-hover:underline">{title}</h2>
                  <p className="text-muted text-sm">{excerpt}</p>
                </Link>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center">
                <Image src={authorImage} alt={author} width={40} height={40} className="rounded-full mr-3" />
                <div>
                  <p className="font-semibold text-foreground">{author}</p>
                  <p className="text-sm text-muted">{date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}