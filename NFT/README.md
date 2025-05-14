# NFT Creation and Exchange Platform

A simple platform to create, view, and transfer NFTs using a local Ganache blockchain and MetaMask wallet.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [Ganache](https://trufflesuite.com/ganache/) - Local Ethereum blockchain
- [MetaMask](https://metamask.io/) browser extension
- [Truffle](https://trufflesuite.com/truffle/) - For smart contract deployment

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repo-url>
cd NFT
npm install
```

### 2. Start Ganache

- Open Ganache and start a new workspace
- Ensure it's running on port 7545 (default)
- Keep it running throughout development

### 3. Deploy Smart Contract

```bash
truffle compile
truffle migrate --reset
```

After deployment, copy the contract address displayed in the terminal, you'll need it later.

### 4. Configure MetaMask

- Connect MetaMask to your local Ganache network:
  - Network Name: Ganache
  - RPC URL: http://127.0.0.1:7545
  - Chain ID: 1337
  - Currency Symbol: ETH

- Import an account from Ganache to MetaMask:
  - In Ganache, click on the key icon next to an account
  - Copy the private key
  - In MetaMask, click "Import Account" and paste the private key

### 5. Start the Application

```bash
npm run dev
```

The application should open in your browser at http://localhost:3000

- When prompted, paste the NFT contract address you copied after deployment

## Usage

### Creating an NFT

1. Connect your MetaMask wallet when prompted
2. Fill in the NFT details (name, description)
3. Upload an image
4. Click "Mint NFT"
5. Approve the transaction in MetaMask

### Transferring an NFT

1. Enter the Token ID you wish to transfer
2. Enter the recipient's address (use another account from Ganache)
3. Click "Transfer NFT"
4. Approve the transaction in MetaMask

### Viewing NFTs in MetaMask

To see your NFTs in MetaMask:

1. In MetaMask, go to "NFTs" tab
2. Click "Import NFTs"
3. Enter the NFT contract address and the token ID

## Troubleshooting

- **MetaMask not connecting**: Make sure you're on the correct network (Ganache)
- **Transactions failing**: Ensure your account has enough ETH for gas fees
- **NFTs not showing**: Try refreshing the app or reopening the browser

## License

MIT 