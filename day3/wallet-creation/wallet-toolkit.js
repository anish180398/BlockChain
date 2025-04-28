/**
 * Ethereum Wallet Toolkit
 * 
 * A toolkit for Ethereum wallet operations in a development environment.
 * 
 * Usage:
 * - Complete toolkit: truffle exec wallet-toolkit.js all --network development
 * - Create/load wallet: truffle exec wallet-toolkit.js create --network development
 * - Transfer funds: truffle exec wallet-toolkit.js transfer --network development
 * - Inspect accounts: truffle exec wallet-toolkit.js inspect --network development
 * - Import Ganache account: truffle exec wallet-toolkit.js import <index> --network development
 */

const { ethers } = require("ethers");
const fs = require('fs');
const path = require('path');

// File for storing wallet data
const WALLET_FILE = path.join(__dirname, 'saved-wallet.json');

// Main command handler
module.exports = async function(callback) {
  try {
    const args = process.argv.slice(4);
    const command = args[0] || 'all';
    
    printBanner("ETHEREUM WALLET TOOLKIT");
    console.log(`Running command: '${command}'`);
    
    // Execute command
    switch(command.toLowerCase()) {
      case 'create': await createWallet(); break;
      case 'transfer': await transferFunds(); break;
      case 'inspect': await inspectGanache(); break;
      case 'import': 
        const accountIndex = parseInt(args[1]) || 0;
        await importGanacheAccount(accountIndex);
        break;
      case 'all':
        await inspectGanache();
        await createWallet();
        await transferFunds();
        printBanner("DEMONSTRATION COMPLETE");
        break;
      default:
        console.log(`Unknown command: '${command}'`);
        console.log("\nAvailable commands: create, transfer, inspect, import, all");
    }
    
    callback();
  } catch (error) {
    console.error("\n❌ ERROR:", error.message);
    callback(error);
  }
};

// Creates or loads an Ethereum wallet
async function createWallet() {
  printBanner("WALLET CREATION & MANAGEMENT");

  // Check for existing wallet
  let wallet;
  let isNewWallet = false;
  
  if (fs.existsSync(WALLET_FILE)) {
    // Load existing wallet
    const walletData = JSON.parse(fs.readFileSync(WALLET_FILE, 'utf8'));
    wallet = new ethers.Wallet(walletData.privateKey);
    console.log("\n✅ EXISTING WALLET LOADED");
    if (walletData.importedFrom) {
      console.log(`Imported from: ${walletData.importedFrom}`);
    }
  } else {
    // Generate new wallet
    wallet = ethers.Wallet.createRandom();
    isNewWallet = true;
    console.log("\n🆕 NEW WALLET CREATED");
    
    // Save wallet
    fs.writeFileSync(
      WALLET_FILE, 
      JSON.stringify({
        privateKey: wallet.privateKey,
        address: wallet.address,
        createdAt: new Date().toISOString(),
      }, null, 2)
    );
  }
  
  // Display wallet details
  console.log(`\nAddress: ${wallet.address}`);
  console.log(`Private Key: ${wallet.privateKey}`);
  
  // Show public key
  const signingKey = new ethers.SigningKey(wallet.privateKey);
  console.log(`Public Key: ${signingKey.publicKey}`);
  
  // Get current balance
  const accounts = await web3.eth.getAccounts();
  if (accounts.length > 0) {
    const networkId = await web3.eth.net.getId();
    if (networkId === 1337 || networkId === 5777) {
      const previousBalance = await web3.eth.getBalance(wallet.address);
      const balanceEth = web3.utils.fromWei(previousBalance, "ether");
      console.log(`\nCurrent balance: ${balanceEth} ETH`);
      
      // Fund wallet if new or empty
      if (isNewWallet || balanceEth === "0") {
        await fundWallet(wallet.address, accounts[0]);
      }
    }
  }
  
  // Demonstrate signature
  await signAndVerifyMessage(wallet);
  
  return wallet;
}

// Imports a Ganache account to the saved wallet
async function importGanacheAccount(accountIndex = 0) {
  printBanner("IMPORT GANACHE ACCOUNT");
  
  const accounts = await web3.eth.getAccounts();
  const selectedAccount = accounts[accountIndex];
  
  if (accountIndex >= accounts.length) {
    console.error(`\n❌ ERROR: Account index ${accountIndex} is out of bounds`);
    return null;
  }
  
  console.log(`Importing account: ${selectedAccount}`);
  
  // Request private key from Ganache
  const privateKey = await new Promise((resolve, reject) => {
    web3.currentProvider.send({
      jsonrpc: '2.0',
      method: 'eth_private_key',
      params: [selectedAccount],
      id: new Date().getTime()
    }, (err, response) => {
      if (err || response.error) reject(err || response.error);
      else resolve(response.result);
    });
  });
  
  // Create and verify wallet
  const wallet = new ethers.Wallet(privateKey);
  
  // Save imported wallet
  fs.writeFileSync(
    WALLET_FILE, 
    JSON.stringify({
      privateKey: privateKey,
      address: selectedAccount,
      createdAt: new Date().toISOString(),
      importedFrom: `Ganache account ${accountIndex}`
    }, null, 2)
  );
  
  // Display wallet details
  console.log("\n✅ GANACHE ACCOUNT IMPORTED SUCCESSFULLY");
  console.log(`Address: ${selectedAccount}`);
  console.log(`Private Key: ${privateKey}`);
  
  // Show balance
  const balance = await web3.eth.getBalance(selectedAccount);
  console.log(`Balance: ${web3.utils.fromWei(balance, "ether")} ETH`);
  
  return wallet;
}

// Sends ETH to the specified wallet address
async function fundWallet(walletAddress, fromAccount) {
  printBanner("FUNDING WALLET");
  
  // Check current balance before funding
  const previousBalance = await web3.eth.getBalance(walletAddress);
  console.log(`Current balance: ${web3.utils.fromWei(previousBalance, "ether")} ETH`);
  
  // Send 1 ETH
  const fundAmount = web3.utils.toWei("1", "ether");
  console.log(`Sending ${web3.utils.fromWei(fundAmount, "ether")} ETH...`);
  
  // Execute transaction
  const receipt = await web3.eth.sendTransaction({
    from: fromAccount,
    to: walletAddress,
    value: fundAmount
  });
  
  // Check new balance
  const newBalance = await web3.eth.getBalance(walletAddress);
  console.log(`\nNew balance: ${web3.utils.fromWei(newBalance, "ether")} ETH`);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  
  return receipt;
}

// Demonstrates cryptographic signing
async function signAndVerifyMessage(wallet) {
  printBanner("SIGNATURE DEMONSTRATION");
  
  const message = "Hello, Blockchain!";
  console.log(`Message to sign: "${message}"`);
  
  // Sign message
  const signature = await wallet.signMessage(message);
  console.log(`\nSignature: ${signature}`);
  
  // Verify signature
  const recoveredAddr = ethers.verifyMessage(message, signature);
  console.log(`\nRecovered address: ${recoveredAddr}`);
  console.log(`Verification: ${recoveredAddr === wallet.address ? "✅ VALID" : "❌ INVALID"}`);
  
  return signature;
}

// Transfers ETH between accounts
async function transferFunds() {
  printBanner("ACCOUNT TRANSFER");

  const accounts = await web3.eth.getAccounts();
  if (accounts.length < 2) {
    console.error("❌ ERROR: Need at least 2 accounts");
    return null;
  }
  
  const sourceAccount = accounts[0];
  const destAccount = accounts[1];
  
  // Check initial balances
  const initialSourceBalance = await web3.eth.getBalance(sourceAccount);
  const initialDestBalance = await web3.eth.getBalance(destAccount);
  
  console.log(`From: ${sourceAccount} (${web3.utils.fromWei(initialSourceBalance, "ether")} ETH)`);
  console.log(`To: ${destAccount} (${web3.utils.fromWei(initialDestBalance, "ether")} ETH)`);
  
  // Transfer 5 ETH
  const amountToTransfer = web3.utils.toWei("5", "ether");
  console.log(`\nTransferring ${web3.utils.fromWei(amountToTransfer, "ether")} ETH...`);
  
  const receipt = await web3.eth.sendTransaction({
    from: sourceAccount,
    to: destAccount,
    value: amountToTransfer,
    gas: 21000
  });
  
  // Check final balances
  const finalSourceBalance = await web3.eth.getBalance(sourceAccount);
  const finalDestBalance = await web3.eth.getBalance(destAccount);
  
  console.log(`\nTransaction hash: ${receipt.transactionHash}`);
  console.log(`\nNew balances:`);
  console.log(`From: ${web3.utils.fromWei(finalSourceBalance, "ether")} ETH`);
  console.log(`To: ${web3.utils.fromWei(finalDestBalance, "ether")} ETH`);
  
  return receipt;
}

// Shows details of all Ganache accounts
async function inspectGanache() {
  printBanner("GANACHE ACCOUNTS");
  
  const accounts = await web3.eth.getAccounts();
  const networkId = await web3.eth.net.getId();
  
  console.log(`Network ID: ${networkId}`);
  console.log(`Found ${accounts.length} accounts\n`);
  
  // Display accounts
  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    const balance = await web3.eth.getBalance(account);
    console.log(`Account #${i}: ${account}`);
    console.log(`Balance: ${web3.utils.fromWei(balance, "ether")} ETH\n`);
  }
  
  return accounts;
}

// Print section header
function printBanner(title) {
  console.log(`\n==== ${title} ====`);
} 