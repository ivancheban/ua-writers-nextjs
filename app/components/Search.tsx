'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import lunr from 'lunr';

interface SearchResult {
  id: string;
  title: string;
  lang: string;
  excerpt?: string;
}

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState<lunr.Index | null>(null);
  const [posts, setPosts] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const currentLang = (params?.lang as string) || 'en';

  // Load the search index on mount
  useEffect(() => {
    const initSearch = async () => {
      const res = await fetch('/api/search');
      const data = await res.json();
      setPosts(data);

      const lunrIndex = lunr(function () {
        this.field('title', { boost: 10 });
        this.field('excerpt');
        this.field('searchText');
        this.ref('id');

        data.forEach((doc: any) => {
          this.add({
            id: doc.id,
            title: doc.title,
            excerpt: doc.excerpt,
            searchText: doc.searchText,
            lang: doc.lang // We index lang to potentially filter, though we handle it in UI
          });
        });
      });

      setIndex(lunrIndex);
    };

    initSearch();
  }, []);

  // Handle clicks outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);

    if (q.length > 1 && index) {
      setIsOpen(true);
      // Search and filter by current language relevance (optional, or show all)
      const searchResults = index.search(`${q}*`);
      
      const hits = searchResults
        .map((result) => posts.find((post) => post.id === result.ref))
        .filter((post): post is SearchResult => post !== undefined && post.lang === currentLang)
        .slice(0, 5); // Limit to 5 results

      setResults(hits);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder={currentLang === 'uk' ? "Пошук..." : "Search..."}
          className="w-32 sm:w-48 pl-3 pr-8 py-1.5 text-sm rounded-full border border-border-color bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          onFocus={() => { if(query) setIsOpen(true); }}
        />
        <div className="absolute right-3 text-text-secondary pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-card rounded-lg shadow-lg border border-border-color overflow-hidden z-50">
          <ul>
            {results.map((result) => (
              <li key={result.id} className="border-b border-border-color last:border-none">
                <Link
                  href={`/${result.lang}/posts/${result.id}`}
                  className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <h4 className="text-sm font-medium text-text-primary truncate">{result.title}</h4>
                  {result.excerpt && (
                    <p className="text-xs text-text-secondary truncate mt-1">{result.excerpt}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isOpen && query.length > 1 && results.length === 0 && (
         <div className="absolute right-0 top-full mt-2 w-64 bg-card rounded-lg shadow-lg border border-border-color p-4 z-50 text-sm text-text-secondary text-center">
           {currentLang === 'uk' ? "Нічого не знайдено" : "No results found"}
         </div>
      )}
    </div>
  );
};

export default Search;