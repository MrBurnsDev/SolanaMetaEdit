// Search service for NFT collections and metadata without wallet requirement
export interface Collection {
  address: string;
  name: string;
  description: string;
  image: string;
  nftCount: number;
  floorPrice?: number;
  verified: boolean;
}

export interface SearchNFT {
  mint: string;
  name: string;
  symbol: string;
  description: string;
  image: string;
  collection?: string;
  collectionName?: string;
  updateAuthority: string;
}

export interface SearchResults {
  collections: Collection[];
  nfts: SearchNFT[];
  total: number;
}

// Mock data for immediate UI implementation
const MOCK_COLLECTIONS: Collection[] = [
  {
    address: "DRiP2Pn2K6fuMLKQmt5rZWxa91jin8ypNLeSr2Lme5Mp",
    name: "DRiP Collection",
    description: "A premier NFT collection on Solana with stunning digital art",
    image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=400&h=400&fit=crop",
    nftCount: 10000,
    floorPrice: 0.5,
    verified: true
  },
  {
    address: "SMBtHCCC6RYRutFEPb4gZqeBLUZbMNhRKaMKZZLHi7W",
    name: "Solana Monkey Business",
    description: "The first major NFT project on Solana blockchain",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    nftCount: 5000,
    floorPrice: 2.1,
    verified: true
  },
  {
    address: "DeGodsPFPTokenAccountAddress123456789",
    name: "DeGods",
    description: "Elite PFP collection with exclusive utility",
    image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400&h=400&fit=crop",
    nftCount: 8888,
    floorPrice: 10.5,
    verified: true
  }
];

const MOCK_NFTS: SearchNFT[] = [
  {
    mint: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    name: "DRiP #1234",
    symbol: "DRIP",
    description: "A unique digital artwork from the DRiP collection",
    image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=400&h=400&fit=crop",
    collection: "DRiP2Pn2K6fuMLKQmt5rZWxa91jin8ypNLeSr2Lme5Mp",
    collectionName: "DRiP Collection",
    updateAuthority: "AxFuniPo7RaDgPH6Gizf9hY1Mn1LLdHRnxXkvf8z1wbr"
  },
  {
    mint: "7pktgQhFW7Z4SmvLb7RSNX4KqvsBbxQ9YNebV7bZhzzr",
    name: "SMB #789",
    symbol: "SMB", 
    description: "A legendary Solana Monkey Business NFT",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    collection: "SMBtHCCC6RYRutFEPb4gZqeBLUZbMNhRKaMKZZLHi7W",
    collectionName: "Solana Monkey Business",
    updateAuthority: "BxFuniPo7RaDgPH6Gizf9hY1Mn1LLdHRnxXkvf8z2wcr"
  }
];

export class SearchService {
  async searchCollections(query: string): Promise<Collection[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!query.trim()) return MOCK_COLLECTIONS;
    
    return MOCK_COLLECTIONS.filter(collection =>
      collection.name.toLowerCase().includes(query.toLowerCase()) ||
      collection.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  async searchNFTs(query: string): Promise<SearchNFT[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!query.trim()) return MOCK_NFTS;
    
    return MOCK_NFTS.filter(nft =>
      nft.name.toLowerCase().includes(query.toLowerCase()) ||
      nft.description.toLowerCase().includes(query.toLowerCase()) ||
      nft.collectionName?.toLowerCase().includes(query.toLowerCase())
    );
  }

  async getCollection(address: string): Promise<Collection | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return MOCK_COLLECTIONS.find(c => c.address === address) || null;
  }

  async getNFT(mint: string): Promise<SearchNFT | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return MOCK_NFTS.find(nft => nft.mint === mint) || null;
  }

  async search(query: string): Promise<SearchResults> {
    const [collections, nfts] = await Promise.all([
      this.searchCollections(query),
      this.searchNFTs(query)
    ]);

    return {
      collections,
      nfts,
      total: collections.length + nfts.length
    };
  }
}

// Singleton instance
export const searchService = new SearchService();