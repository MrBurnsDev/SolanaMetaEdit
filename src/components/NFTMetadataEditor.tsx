import { useState } from 'react';
import type { NFTMetadata } from '../types/solana';
import { useWallet } from '../hooks/useWallet';
import { verifyUpdateAuthority, updateNFTMetadata } from '../services/solana';

interface NFTMetadataEditorProps {
  metadata: NFTMetadata;
  onUpdate: (updatedMetadata: Partial<NFTMetadata>) => Promise<void>;
}

export function NFTMetadataEditor({ metadata, onUpdate }: NFTMetadataEditorProps) {
  const { isConnected, wallet, publicKey } = useWallet();
  const [formData, setFormData] = useState({
    name: metadata.name,
    description: metadata.description,
    image: metadata.image,
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !wallet || !publicKey) return;

    // Verify authority before attempting update
    if (!verifyUpdateAuthority(metadata, publicKey)) {
      alert('You do not have authority to update this NFT');
      return;
    }

    setIsUpdating(true);
    try {
      const signature = await updateNFTMetadata(metadata.mint, wallet, {
        name: formData.name,
        symbol: metadata.symbol, // Keep existing symbol for now
      });
      
      console.log('Update signature:', signature);
      await onUpdate(formData);
    } catch (error) {
      console.error('Failed to update metadata:', error);
      alert('Failed to update NFT metadata');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Connect your wallet to edit NFT metadata
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Edit NFT Metadata
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
          {metadata.mint}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            data-testid="input-name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            data-testid="input-description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Image URL
          </label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            data-testid="input-image"
          />
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-md transition-colors font-medium"
          data-testid="button-update"
        >
          {isUpdating ? 'Updating...' : 'Update Metadata'}
        </button>
      </form>
    </div>
  );
}