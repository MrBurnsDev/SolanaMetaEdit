import { useWallet } from '../hooks/useWallet';
import { Button } from './ui/Button';
import { Wallet, LogOut } from 'lucide-react';

export function WalletConnection() {
  const { publicKey, isConnected, isConnecting, connect, disconnect } = useWallet();

  if (isConnected) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-green-800 dark:text-green-200">
            {publicKey?.slice(0, 4)}...{publicKey?.slice(-4)}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={disconnect}
          data-testid="button-disconnect"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={connect}
      disabled={isConnecting}
      size="sm"
      data-testid="button-connect"
    >
      <Wallet className="w-4 h-4 mr-2" />
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
}