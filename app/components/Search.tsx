'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface SearchResult {
  id: string;
  title: string;
  lang: string;
  excerpt?: string;
  searchText?: string;
}

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const currentLang = (params?.lang as string) || 'en';

  // Load the posts on mount
  useEffect(() => {
    const initSearch = async () => {
      const res = await fetch('/api/search');
      const data = await res.json();
      setPosts(data);
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

    if (q.length > 1) {
      setIsOpen(true);
      
      const lowerQuery = q.toLowerCase();
      
      const hits = posts
        .filter((post) => {
          // Removed language filter to allow searching across all languages
          // Check if query exists in searchText (which includes title, excerpt, tags, content)
          return post.searchText?.includes(lowerQuery);
        })
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
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-medium text-text-primary truncate flex-1">{result.title}</h4>
                    {/* Show language badge */}
                    <span className="ml-2 text-[10px] uppercase font-bold text-text-secondary bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                      {result.lang}
                    </span>
                  </div>
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