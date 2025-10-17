// Off-chain metadata fetching service
export interface OffChainMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export async function fetchOffChainMetadata(uri: string): Promise<OffChainMetadata | null> {
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const metadata = await response.json();
    
    return {
      name: metadata.name || '',
      description: metadata.description || '',
      image: metadata.image || '',
      attributes: metadata.attributes || [],
    };
  } catch (error) {
    console.error('Failed to fetch off-chain metadata:', error);
    return null;
  }
}