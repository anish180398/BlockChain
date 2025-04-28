# Ethereum Wallet Toolkit

A comprehensive toolkit for working with Ethereum wallets in your development environment.

## Features

- **Wallet Creation**: Generate new Ethereum wallets with ethers.js
- **Ganache Account Inspection**: View details of all accounts in your local Ganache instance
- **Fund Transfers**: Transfer ETH between accounts
- **Digital Signatures**: Demonstrate cryptographic signing and verification
- **Wallet Management**: Store and retrieve wallet information between sessions
- **Account Import**: Import existing Ganache accounts into your saved wallet
- **Educational Content**: Detailed explanations of wallet concepts and blockchain operations
- **MetaMask Integration**: Connect to MetaMask wallet through a browser interface

## Files in this Project

- **wallet.js**: Educational script that demonstrates core Ethereum wallet concepts
- **wallet-toolkit.js**: Complete toolkit for wallet operations in a development environment
- **saved-wallet.json**: Automatically created file to store your wallet information
- **metamask-connector.js**: Browser-based script for connecting to MetaMask
- **index.html**: Web interface for interacting with MetaMask
- **README.md**: This documentation file

## Prerequisites

- Node.js and npm
- Truffle framework (for wallet-toolkit.js)
- Ganache (running locally for toolkit features)
- MetaMask browser extension (for MetaMask integration)

## Installation

Make sure you have the required dependencies installed:

```bash
# Install Truffle globally if needed
npm install -g truffle

# Install ethers.js locally
npm install ethers
```

## Usage

This project provides three main ways to interact with Ethereum wallets:

### 1. Educational Wallet Demo (wallet.js)

Run the wallet demonstration script directly with Node.js:

```bash
node wallet.js
```

This script:
- Creates a new random Ethereum wallet
- Demonstrates wallet recovery from private key
- Shows how digital signatures work
- Provides detailed explanations of blockchain wallet concepts

### 2. Wallet Toolkit (wallet-toolkit.js)

The toolkit offers several operations that can be executed individually or all at once:

```bash
# Run all operations
truffle exec wallet-toolkit.js all --network development

# Create/load a wallet
truffle exec wallet-toolkit.js create --network development

# View all Ganache accounts
truffle exec wallet-toolkit.js inspect --network development

# Transfer funds between accounts
truffle exec wallet-toolkit.js transfer --network development

# Import a Ganache account (e.g., account index 1)
truffle exec wallet-toolkit.js import 1 --network development
```

### 3. MetaMask Integration (index.html & metamask-connector.js)

Connect to your MetaMask wallet through a web interface:

1. Make sure you have the MetaMask browser extension installed
2. Open `index.html` in your web browser
3. Click "Connect to MetaMask" and approve the connection
4. Use the interface to view accounts, check balances, sign messages, and send transactions

## Key Ethereum Wallet Concepts

The scripts in this project demonstrate several fundamental concepts:

1. **Private/Public Key Pairs**: The cryptographic foundation of wallets
2. **Wallet Addresses**: Derived from public keys, used as account identifiers
3. **Digital Signatures**: Prove ownership without revealing private keys
4. **Message Verification**: Confirm the authenticity of signed messages
5. **Wallet Recovery**: Reconstructing a wallet using only the private key

## Connecting to MetaMask

The MetaMask integration allows you to:

1. Connect to an existing MetaMask wallet
2. Access your MetaMask accounts
3. View account balances
4. Sign messages using your MetaMask wallet
5. Send transactions through MetaMask

This provides a bridge between the standalone scripts and a real wallet that you might use for DApps and other Ethereum applications.

## Customization

You can modify the scripts to:

- Change transfer amounts or account indices
- Customize signature messages
- Adjust console output formatting
- Add new wallet operations

## Manual Account Import

If automatic Ganache account import doesn't work, you can manually update your wallet:

1. View account details with `truffle exec wallet-toolkit.js inspect`
2. Open Ganache UI and click the key icon for your chosen account
3. Copy the private key
4. Edit `saved-wallet.json`:

```json
{
  "privateKey": "0x11108fc47d6b3a850df4f2341b2bca17ebbf0eabc78af8ba758f9d0d77c6ed80",
  "address": "0xe69ca98A27fB0Cd92Ca346eaD7A45E78049f5371",
  "createdAt": "2025-04-27T20:45:54.484Z",
  "importedFrom": "Ganache account 0"
}
```

## Security Notes

- These scripts are for educational and development purposes only
- Never share your private keys with anyone
- The wallet files store private keys in plain text - these should never be used in production
- Always use proper security practices with real cryptocurrency assets 