import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;
const distPath = join(__dirname, 'dist');

// Serve static files from dist
app.use(express.static(distPath));

// Handle SPA routing - send all non-static requests to index.html
app.use((req, res) => {
  res.sendFile(join(distPath, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Solana NFT Metadata Editor running on port ${port}`);
});