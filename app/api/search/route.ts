import { NextResponse } from 'next/server';
import { getSortedPostsData, getPostData } from '@/lib/posts'; // Import getPostData

// Define locales locally since i18n-config is missing
const i18n = {
  locales: ['en', 'uk'],
};

export async function GET() {
  let allPosts: any[] = [];

  // Fetch posts for all supported locales
  for (const locale of i18n.locales) {
    const posts = getSortedPostsData(locale);
    
    // We need to fetch full content for each post to index it
    const postsWithContent = await Promise.all(posts.map(async (post) => {
        const fullPostData = await getPostData(locale, post.id);
        // Strip HTML tags for better search indexing
        const contentText = fullPostData?.contentHtml?.replace(/<[^>]*>?/gm, '') || '';
        
        return {
            ...post,
            lang: locale,
            // Append full content to searchText
            searchText: `${post.title} ${post.excerpt || ''} ${post.tags?.join(' ') || ''} ${contentText}`.toLowerCase(),
        };
    }));

    allPosts = [...allPosts, ...postsWithContent];
  }

  return NextResponse.json(allPosts);
}