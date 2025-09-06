import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsRootDirectory = path.join(process.cwd(), 'posts');

export type PostData = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  author: string;
  authorImage: string;
  tags: string[];
  contentHtml?: string;
  lang: string;
};

export function getSortedPostsData(lang: string, tag?: string): Omit<PostData, 'contentHtml'>[] {
  const postsDirectory = path.join(postsRootDirectory, lang);
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  let allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      lang,
      image: matterResult.data.image || '/images/default-post-image.png',
      author: matterResult.data.author || 'Anonymous',
      authorImage: matterResult.data.authorImage || '/images/default-author.png',
      tags: matterResult.data.tags || [],
      ...(matterResult.data as { date: string; title: string; excerpt: string }),
    };
  });

  if (tag) {
    allPostsData = allPostsData.filter(post => post.tags.includes(tag));
  }

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllTags(lang: string) {
  const allPosts = getSortedPostsData(lang);
  const allTags = new Set<string>();
  allPosts.forEach(post => {
    post.tags.forEach(tag => allTags.add(tag));
  });
  return Array.from(allTags);
}

export function getAllPostIds() {
  const locales = ['en', 'uk'];
  let paths: { slug: string; lang: string }[] = [];

  locales.forEach(lang => {
    const postsDirectory = path.join(postsRootDirectory, lang);
    if (fs.existsSync(postsDirectory)) {
      const fileNames = fs.readdirSync(postsDirectory);
      const langPaths = fileNames.map(fileName => ({
        slug: fileName.replace(/\.md$/, ''),
        lang: lang,
      }));
      paths = [...paths, ...langPaths];
    }
  });
  
  return paths;
}


export async function getPostData(lang: string, id: string): Promise<PostData | null> {
  const fullPath = path.join(postsRootDirectory, lang, `${id}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    lang,
    contentHtml,
    image: matterResult.data.image || '/images/default-post-image.png',
    author: matterResult.data.author || 'Anonymous',
    authorImage: matterResult.data.authorImage || '/images/default-author.png',
    tags: matterResult.data.tags || [],
    ...(matterResult.data as { date: string; title: string; excerpt: string }),
  };
}