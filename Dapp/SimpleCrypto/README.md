# Cryptocurrency Demonstration App

A simple, educational tool that demonstrates core blockchain and cryptocurrency concepts including token creation, transactions, gas fees, and block verification.

## Features

- Creates a local blockchain using Ganache
- Deploys a SimpleToken ERC-20 compatible contract
- Performs token transfers between accounts
- Displays gas fees and transaction costs
- Shows detailed block and transaction information

## Prerequisites

- Node.js v18.19.0
- npm

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```

## Usage

Run the demonstration with:

```
npm run demo
```

This will:
1. Start a local blockchain with Ganache
2. Compile and deploy the SimpleToken contract
3. Display token information (name, symbol, total supply)
4. Transfer 100 tokens between accounts
5. Show gas fees and transaction costs
6. Display block and transaction details

The script is well-commented and explains each step of the blockchain process as it runs.

## Networked Usage (Multiple Computers)

This app can be used across multiple computers on the same network to simulate a real blockchain network:

### On the Host Computer (Node)
1. Make sure your firewall allows incoming connections on port 8545
2. Run the demonstration with:
   ```
   npm run demo
   ```
3. The script will display your IP address, which others will use to connect

### Using MetaMask (Recommended)
You can use MetaMask to connect to your local blockchain and interact with the token:

1. Install the [MetaMask extension](https://metamask.io/download/) in your browser if you haven't already
2. Run the blockchain node on the host computer with `npm run demo`
3. In MetaMask, click on the network selector (usually says "Ethereum Mainnet")
4. Click "Add Network" > "Add a network manually"
5. Enter the following details (as shown in the console output):
   - Network Name: SimpleCrypto Local Network
   - New RPC URL: http://[HOST-IP]:8545 (replace [HOST-IP] with the IP address shown in the console)
   - Chain ID: 1337
   - Currency Symbol: ETH
6. Click "Save"
7. To add the token to MetaMask:
   - Click "Import tokens" in MetaMask
   - Enter the token contract address (shown in the console)
   - Symbol: MLC
   - Decimals: 18
   - Click "Add Custom Token" then "Import Tokens"

8. You can now send and receive tokens using MetaMask's interface!

### Creating New Accounts with MLC Tokens

The app provides a simple web interface to create new accounts automatically funded with MLC tokens:

1. Run the blockchain node on the host computer with `npm run demo`
2. Open a web browser and navigate to `http://[HOST-IP]:3000` (where [HOST-IP] is the IP address shown in the console)
3. Click the "Create New Account with 20 MLC" button
4. You'll receive a new account address and private key
5. Import this account into MetaMask using the private key
6. The account will already have 20 MLC tokens and 1 ETH (for gas fees)

This makes it easy to create new accounts for testing and demonstrations.

### Using the Client Script
Alternatively, you can use the provided client script:

1. Clone this repository and install dependencies
2. Create a file called `client.js` with the following content:
   ```javascript
   const Web3 = require('web3');
   const fs = require('fs');
   
   // Replace with the IP address from the host computer
   const hostIP = '192.168.x.x'; 
   
   async function main() {
     try {
       // Connect to the blockchain on the host computer
       const web3 = new Web3(`http://${hostIP}:8545`);
       
       // Check connection
       const blockNumber = await web3.eth.getBlockNumber();
       console.log(`Successfully connected to blockchain at block ${blockNumber}`);
       
       // Get local accounts
       const accounts = await web3.eth.getAccounts();
       console.log(`Available accounts: ${accounts.slice(0, 3).join(', ')}...`);
       
       // Load contract info from host (needs to be copied from host)
       const deploymentInfo = JSON.parse(fs.readFileSync('./contract-deployment.json', 'utf8'));
       const tokenContract = new web3.eth.Contract(deploymentInfo.abi, deploymentInfo.address);
       
       // Get token info
       const name = await tokenContract.methods.name().call();
       const symbol = await tokenContract.methods.symbol().call();
       console.log(`Connected to ${name} (${symbol}) at ${deploymentInfo.address}`);
       
       // Now you can perform transactions with the token
       // Example: Check your balance
       const myBalance = await tokenContract.methods.balanceOf(accounts[0]).call();
       console.log(`Your balance: ${web3.utils.fromWei(myBalance, 'ether')} ${symbol}`);
       
     } catch (error) {
       console.error('Error:', error);
     }
   }
   
   main();
   ```
3. Copy the `contract-deployment.json` file from the host computer after it runs the demo
4. Run the client script:
   ```
   node client.js
   ```

### To Perform Transactions
To transfer tokens between computers on the network:
```javascript
// In client.js, add:
async function sendTokens(toAddress, amount) {
  const web3 = new Web3(`http://host-ip:8545`);
  const accounts = await web3.eth.getAccounts();
  const deploymentInfo = JSON.parse(fs.readFileSync('./contract-deployment.json', 'utf8'));
  const tokenContract = new web3.eth.Contract(deploymentInfo.abi, deploymentInfo.address);
  
  const amountWei = web3.utils.toWei(amount.toString(), 'ether');
  const receipt = await tokenContract.methods.transfer(toAddress, amountWei)
    .send({ from: accounts[0] });
    
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(`Transferred ${amount} tokens to ${toAddress}`);
}

// Example usage:
// sendTokens('0x...recipient address...', 10);
```

**Note:** This networked setup is for educational purposes and demonstration only. It is not secure for real-value transactions.

## Project Structure

- `contracts/SimpleToken.sol` - ERC-20 compatible token contract
- `deploy-token.js` - Main demonstration script
- `package.json` - Project configuration and dependencies
- `contract-deployment.json` - Generated file with deployment information

## How It Works

### SimpleToken Contract

The SimpleToken contract implements core ERC-20 functionality including:
- Token metadata (name, symbol, decimals)
- Balance tracking for addresses
- Token transfers between accounts
- Allowance mechanism for delegated transfers

### Demonstration Script

The deploy-token.js script:
1. Sets up a local blockchain using Ganache
2. Compiles the SimpleToken contract
3. Deploys the contract to the blockchain
4. Interacts with the contract (transfers tokens)
5. Analyzes gas fees, blocks, and transactions
6. Explains blockchain concepts at each step

## Blockchain Concepts Demonstrated

- Smart Contract Deployment
- Custom Cryptocurrency Creation
- Token Transfers
- Gas Fees and Transaction Costs
- Block Creation and Mining
- Transaction Verification

## Technologies Used

- Solidity - Smart contract language
- Ganache - Local Ethereum blockchain
- Web3.js - Ethereum JavaScript API
- solc - Solidity compiler
- Node.js - JavaScript runtime 