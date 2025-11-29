import { NextResponse } from 'next/server';
import { getSortedPostsData } from '@/lib/posts';

// Define locales locally since i18n-config is missing
const i18n = {
  locales: ['en', 'uk'],
};

export async function GET() {
  let allPosts: any[] = [];

  // Fetch posts for all supported locales
  for (const locale of i18n.locales) {
    const posts = getSortedPostsData(locale);
    // Add the locale to each post object so we can filter/route correctly
    const localizedPosts = posts.map((post) => ({
      ...post,
      lang: locale,
      // Create a combined text field for search indexing
      // We append title, excerpt and tags to make them searchable
      searchText: `${post.title} ${post.excerpt || ''} ${post.tags?.join(' ') || ''}`.toLowerCase(),
    }));
    allPosts = [...allPosts, ...localizedPosts];
  }

  return NextResponse.json(allPosts);
}