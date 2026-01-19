'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { notes, type Note } from '@/lib/notes-data';
import Link from 'next/link';
import { FileText, Search } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { useRouter } from 'next/navigation';

type SearchResult = {
  topic: string;
  path: string;
  snippets: {
    text: string;
    query: string;
  }[];
};

function HighlightedSnippet({ text, query }: { text: string; query: string }) {
  if (!query) return <span>{text}</span>;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <span>
      ...
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <strong key={i} className="text-foreground">{part}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
      ...
    </span>
  );
}

export function SearchCommand({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  const handleResultClick = (path: string) => {
    onOpenChange(false);
    router.push(path);
  };
  
  useEffect(() => {
    if (query.length > 2) {
      const searchResults: SearchResult[] = [];
      notes.forEach((note) => {
        const regex = new RegExp(`(.{0,40}${query}.{0,40})`, 'gi');
        const matches = [...note.content.matchAll(regex)];

        if (matches.length > 0) {
          searchResults.push({
            topic: note.topic,
            path: note.pagePath,
            snippets: matches.slice(0, 3).map((match) => ({ text: match[0], query: query })),
          });
        }
      });
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    if (!open) {
      // Small delay to prevent flash of empty results before dialog closes
      setTimeout(() => {
        setQuery('');
        setResults([]);
      }, 100);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl gap-0 p-0">
        <div className='flex items-center gap-2 p-4 border-b'>
          <Search className="h-5 w-5 text-muted-foreground"/>
          <input
            placeholder="Search notes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='w-full bg-transparent outline-none border-none placeholder:text-muted-foreground'
          />
        </div>
        <ScrollArea className="max-h-[450px]">
          <div className="p-4">
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((result) => (
                  <div key={result.topic}>
                    <button
                      className="w-full text-left p-3 rounded-lg hover:bg-accent"
                      onClick={() => handleResultClick(result.path)}
                    >
                      <h3 className="font-semibold flex items-center gap-2 text-md mb-1">
                        <FileText size={16} /> {result.topic}
                      </h3>
                      <div className="space-y-1 pl-6">
                        {result.snippets.map((snippet, index) => (
                          <p
                            key={index}
                            className="text-sm text-muted-foreground"
                          >
                            <HighlightedSnippet text={snippet.text} query={snippet.query} />
                          </p>
                        ))}
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              query.length > 2 && <p className="text-center text-muted-foreground py-8">No results found.</p>
            )}
            {query.length <= 2 && (
               <p className="text-center text-muted-foreground py-8">Start typing to search the notes.</p>
            )}
          </div>
        </ScrollArea>
        <div className='p-2 border-t text-xs text-muted-foreground flex items-center justify-end gap-2'>
            <span>Jump to: <kbd>Tab</kbd></span>
            <span>Select: <kbd>Enter</kbd></span>
            <span>Close: <kbd>Esc</kbd></span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
