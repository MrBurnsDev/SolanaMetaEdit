import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { NFTMetadataEditor } from '../components/NFTMetadataEditor';
import { WalletConnection } from '../components/WalletConnection';
import { searchService, type SearchNFT } from '../services/search';
import { useWallet } from '../hooks/useWallet';
import { verifyUpdateAuthority } from '../services/solana';
import { ExternalLink, ArrowLeft, Edit3, Lock } from 'lucide-react';

export function NFTDetail() {
  const [match, params] = useRoute('/nft/:mint');
  const [nft, setNft] = useState<SearchNFT | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const { isConnected, publicKey } = useWallet();

  const mint = params?.mint || '';

  useEffect(() => {
    if (mint) {
      loadNFT(mint);
    }
  }, [mint]);

  const loadNFT = async (mintAddress: string) => {
    setIsLoading(true);
    try {
      const nftData = await searchService.getNFT(mintAddress);
      setNft(nftData);
    } catch (error) {
      console.error('Failed to load NFT:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const canEdit = () => {
    if (!nft || !isConnected || !publicKey) return false;
    return verifyUpdateAuthority(
      {
        mint: nft.mint,
        name: nft.name,
        symbol: nft.symbol,
        description: nft.description,
        image: nft.image,
        updateAuthority: nft.updateAuthority
      },
      publicKey
    );
  };

  const handleMetadataUpdate = async (updatedMetadata: Partial<SearchNFT>) => {
    if (nft) {
      setNft({ ...nft, ...updatedMetadata });
      setShowEditor(false);
    }
  };

  if (!match) {
    return <div>NFT not found</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading NFT...</p>
        </div>
      </div>
    );
  }

  if (!nft) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            NFT Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The NFT you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => window.history.back()}
          className="mb-6"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* NFT Image */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden rounded-2xl">
                  <img 
                    src={nft.image} 
                    alt={nft.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Collection Info */}
            {nft.collectionName && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Collection
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg"></div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {nft.collectionName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {nft.collection?.slice(0, 8)}...{nft.collection?.slice(-8)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* NFT Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {nft.name}
                    </h1>
                    <p className="text-lg text-purple-600 dark:text-purple-400">
                      {nft.symbol}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`https://solscan.io/token/${nft.mint}`, '_blank')}
                    data-testid="button-explorer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Solscan
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {nft.description || 'No description available'}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mint Address
                    </h3>
                    <p className="text-sm font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      {nft.mint}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Update Authority
                    </h3>
                    <p className="text-sm font-mono text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      {nft.updateAuthority}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Edit Section */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Edit Metadata
                </h3>
              </CardHeader>
              <CardContent>
                {!isConnected ? (
                  <div className="text-center space-y-4">
                    <Lock className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Connect your wallet to edit this NFT's metadata
                      </p>
                      <WalletConnection />
                    </div>
                  </div>
                ) : !canEdit() ? (
                  <div className="text-center space-y-4">
                    <Lock className="w-12 h-12 text-red-400 mx-auto" />
                    <div>
                      <p className="text-red-600 dark:text-red-400 font-medium">
                        You don't have authority to edit this NFT
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Only the update authority can modify metadata
                      </p>
                    </div>
                  </div>
                ) : showEditor ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        Editing Metadata
                      </h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowEditor(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                    <NFTMetadataEditor 
                      metadata={{
                        mint: nft.mint,
                        name: nft.name,
                        symbol: nft.symbol,
                        description: nft.description,
                        image: nft.image,
                        updateAuthority: nft.updateAuthority
                      }}
                      onUpdate={handleMetadataUpdate}
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-green-600 dark:text-green-400 font-medium mb-4">
                      ✓ You have authority to edit this NFT
                    </p>
                    <Button 
                      onClick={() => setShowEditor(true)}
                      data-testid="button-edit"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Metadata
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}