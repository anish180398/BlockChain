# Simple NFT Platform

A simple platform for creating and transferring NFTs using local images and Ganache blockchain.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Make sure Ganache is running on your local machine
   - Default port: 8545
   - Default network ID: 1337

## Creating an NFT

To create an NFT from an image:

1. Place your image in the project directory
   - Supported formats: JPG, PNG, GIF
   - Example: `my-art.jpg`

2. Run the mint script with your image name:
```bash
node mint.js my-art.jpg
```

The script will:
- Create a unique fingerprint (hash) of your image
- Deploy the NFT contract
- Create your NFT
- Save all information in `contract-info.json`

## Transferring an NFT

To transfer your NFT to another address:

1. Make sure you have the `contract-info.json` file from minting

2. Run the transfer script:
```bash
node transfer.js
```

The script will:
- Read your NFT information
- Transfer the NFT to the recipient address
- Update the ownership records

## Important Files

- `SimpleNFT.sol`: The smart contract that handles NFTs
- `mint.js`: Script for creating NFTs
- `transfer.js`: Script for transferring NFTs
- `utils.js`: Helper functions for blockchain interaction
- `contract-info.json`: Stores information about your NFT

## Troubleshooting

1. If you get "Image file not found":
   - Make sure your image is in the project directory
   - Check the image name spelling
   - Example: `node mint.js my-art.jpg`

2. If you get "Contract deployment failed":
   - Make sure Ganache is running
   - Check your Ganache connection settings
   - Verify you have enough test ETH

3. If you get "Transfer failed":
   - Make sure you have the correct owner address
   - Verify the NFT exists
   - Check if you have enough gas

## Example Commands

```bash
# Create an NFT
node mint.js my-art.jpg

# Transfer the NFT
node transfer.js
```

## Notes

- This platform uses Ganache for local blockchain testing
- Images are stored locally and referenced by their hash
- The contract address and token ID are saved in `contract-info.json`
- Make sure to keep your `contract-info.json` file safe 