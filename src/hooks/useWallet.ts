import { useState, useEffect } from 'react';
import type { PhantomProvider } from '../types/solana';

export function useWallet() {
  const [wallet, setWallet] = useState<PhantomProvider | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.solana?.isPhantom) {
      setWallet(window.solana);
      if (window.solana.isConnected && window.solana.publicKey) {
        setPublicKey(window.solana.publicKey.toString());
      }
    }
  }, []);

  const connect = async () => {
    if (!wallet) {
      window.open('https://phantom.app/', '_blank');
      return;
    }

    setIsConnecting(true);
    try {
      const response = await wallet.connect();
      setPublicKey(response.publicKey.toString());
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    if (wallet) {
      await wallet.disconnect();
      setPublicKey(null);
    }
  };

  return {
    wallet,
    publicKey,
    isConnected: !!publicKey,
    isConnecting,
    connect,
    disconnect,
  };
}