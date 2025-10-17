// Phantom wallet types
export interface PhantomProvider {
  isPhantom: boolean;
  publicKey: { toString(): string } | null;
  isConnected: boolean;
  connect(): Promise<{ publicKey: { toString(): string } }>;
  disconnect(): Promise<void>;
  signAndSendTransaction(transaction: any): Promise<{ signature: string }>;
  signMessage(message: Uint8Array): Promise<{ signature: Uint8Array }>;
}

declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}

// NFT metadata types
export interface NFTMetadata {
  mint: string;
  name: string;
  symbol: string;
  description: string;
  image: string;
  updateAuthority: string;
  creators?: Array<{
    address: string;
    verified: boolean;
    share: number;
  }>;
  attributes?: Array<{
    trait_type: string;
    value: string;
  }>;
}