import { getPostData, getAllPostIds } from '@/lib/posts';
import { notFound } from 'next/navigation';
import PostImage from '@/app/components/PostImage';
import Link from 'next/link';
import Image from 'next/image';

export async function generateStaticParams() {
  return getAllPostIds();
}

export async function generateMetadata({ params }: { params: { lang: string, slug: string } }) {
    const postData = await getPostData(params.lang, params.slug);
    if (!postData) {
        return {
            title: 'Post Not Found'
        }
    }
    return {
        title: postData.title,
    };
}

export default async function Post({ params }: { params: { lang: string, slug: string } }) {
  const postData = await getPostData(params.lang, params.slug);

  if (!postData) {
    notFound();
  }

  return (
    <article className="bg-card p-6 sm:p-8 rounded-lg shadow-md">
      <PostImage
        src={postData.image}
        alt={`Banner for ${postData.title}`}
        className="w-full h-64 object-cover rounded-md mb-8"
        fallbackSrc="https://placehold.co/800x400/f8f9fa/6c757d?text=Image"
      />
      <div className="flex flex-wrap gap-2 mb-3">
        {postData.tags.map(tag => (
          <Link href={`/${params.lang}/tags/${tag}`} key={tag} className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full hover:bg-primary/20 transition-colors">
            {tag}
          </Link>
        ))}
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-3">{postData.title}</h1>
      <div className="mt-4 mb-8 pb-4 border-b border-gray-200 flex items-center">
        {/* ADDED w-10 h-10 and object-cover to prevent deformation */}
        <Image src={postData.authorImage} alt={postData.author} width={40} height={40} className="rounded-full mr-3 w-10 h-10 object-cover" />
        <div>
          <p className="font-semibold text-foreground">{postData.author}</p>
          <p className="text-sm text-muted">{postData.date}</p>
        </div>
      </div>
      {postData.contentHtml && (
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      )}
    </article>
  );
}