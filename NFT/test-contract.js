// Simple script to test contract interaction
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// Read contract ABI and deployed address
const contractBuildPath = path.join(__dirname, 'build/contracts/SimpleNFT.json');
const contractData = JSON.parse(fs.readFileSync(contractBuildPath, 'utf8'));
const abi = contractData.abi;
const contractAddress = '0x280b8D15277C4510237F7d96a0F4988adcB71aD2'; // Your latest deployed address

// Connect to Ganache
const web3 = new Web3('http://127.0.0.1:7545');

async function testContract() {
  try {
    console.log("Testing contract connection...");
    
    // Create contract instance
    const nftContract = new web3.eth.Contract(abi, contractAddress);
    
    // Get accounts from Ganache
    const accounts = await web3.eth.getAccounts();
    console.log("Available accounts:", accounts);
    
    // Try calling contract methods
    console.log("Calling contract methods...");
    
    try {
      const name = await nftContract.methods.name().call();
      console.log("Contract name:", name);
    } catch (error) {
      console.error("Error calling name():", error.message);
    }
    
    try {
      const symbol = await nftContract.methods.symbol().call();
      console.log("Contract symbol:", symbol);
    } catch (error) {
      console.error("Error calling symbol():", error.message);
    }
    
    try {
      const tokenCount = await nftContract.methods.getTokenCount().call();
      console.log("Token count:", tokenCount);
    } catch (error) {
      console.error("Error calling getTokenCount():", error.message);
    }
    
    console.log("Contract test complete!");
  } catch (error) {
    console.error("Test failed:", error);
  }
}

testContract(); 