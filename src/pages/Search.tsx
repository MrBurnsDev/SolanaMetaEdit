import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';
import { searchService, type SearchResults } from '../services/search';
import { Search as SearchIcon, ExternalLink, Loader2 } from 'lucide-react';

export function Search() {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Parse search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    const query = params.get('q') || '';
    setSearchQuery(query);
    if (query) {
      performSearch(query);
    } else {
      // Load popular collections if no query
      performSearch('');
    }
  }, [location]);

  const performSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const searchResults = await searchService.search(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    setLocation(`/search${query ? `?q=${encodeURIComponent(query)}` : ''}`);
  };

  const handleSelectNFT = (mint: string) => {
    setLocation(`/nft/${mint}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search collections, creators, or NFT names..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-lg"
                data-testid="input-search"
              />
            </div>
            <Button type="submit" data-testid="button-search">
              <SearchIcon className="w-5 h-5 mr-2" />
              Search
            </Button>
          </form>

          {results && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Found {results.total} results
              {searchQuery && ` for "${searchQuery}"`}
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">Searching...</span>
          </div>
        )}

        {/* Results */}
        {results && !isLoading && (
          <div className="space-y-12">
            {/* Collections */}
            {results.collections.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Collections ({results.collections.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {results.collections.map((collection) => (
                    <Card key={collection.address} className="group cursor-pointer hover:scale-105 transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="aspect-square overflow-hidden rounded-t-2xl">
                          <img 
                            src={collection.image} 
                            alt={collection.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                              {collection.name}
                            </h3>
                            {collection.verified && (
                              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                            {collection.description}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              {collection.nftCount.toLocaleString()} items
                            </span>
                            {collection.floorPrice && (
                              <span className="font-medium text-purple-600 dark:text-purple-400">
                                ◎{collection.floorPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* NFTs */}
            {results.nfts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  NFTs ({results.nfts.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {results.nfts.map((nft) => (
                    <Card 
                      key={nft.mint} 
                      className="group cursor-pointer hover:scale-105 transition-all duration-300"
                      onClick={() => handleSelectNFT(nft.mint)}
                      data-testid={`card-nft-${nft.mint}`}
                    >
                      <CardContent className="p-0">
                        <div className="aspect-square overflow-hidden rounded-t-2xl">
                          <img 
                            src={nft.image} 
                            alt={nft.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                            {nft.name}
                          </h3>
                          {nft.collectionName && (
                            <p className="text-sm text-purple-600 dark:text-purple-400 mb-2">
                              {nft.collectionName}
                            </p>
                          )}
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                            {nft.description}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-gray-400 font-mono">
                              {nft.mint.slice(0, 4)}...{nft.mint.slice(-4)}
                            </span>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* No Results */}
            {results.total === 0 && searchQuery && (
              <div className="text-center py-12">
                <SearchIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your search terms or browse popular collections
                </p>
                <Button variant="outline" onClick={() => setLocation('/search')}>
                  Browse All Collections
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}