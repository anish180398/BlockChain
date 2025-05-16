const Web3 = require('web3');
const fs = require('fs');

// Load contract artifact
const contractArtifact = JSON.parse(fs.readFileSync('./build/contracts/SimpleNFT.json', 'utf8'));
const contractAddress = process.argv[2] || '0x5ea4690cfA3f90E5978737c301817AC60afa5Cf7';

async function verifyContract() {
  console.log(`Attempting to verify contract at address: ${contractAddress}`);
  
  // Connect to Ganache
  const web3 = new Web3('http://127.0.0.1:7545');
  
  try {
    // Check if the address has code
    const code = await web3.eth.getCode(contractAddress);
    if (code === '0x' || code === '0x0') {
      console.error('No contract deployed at this address!');
      return;
    }
    
    console.log('Contract exists at this address.');
    
    // Create contract instance
    const contract = new web3.eth.Contract(contractArtifact.abi, contractAddress);
    
    // Try to call some basic functions
    try {
      const name = await contract.methods.name().call();
      const symbol = await contract.methods.symbol().call();
      console.log(`Contract verified! Name: ${name}, Symbol: ${symbol}`);
      
      // Get token count
      const tokenCount = await contract.methods.getTokenCount().call();
      console.log(`Total tokens minted: ${tokenCount}`);
      
      // Get network info
      const networkId = await web3.eth.net.getId();
      const chainId = await web3.eth.getChainId();
      console.log(`Connected to Network ID: ${networkId}, Chain ID: ${chainId}`);
      
      // Get accounts
      const accounts = await web3.eth.getAccounts();
      console.log(`Available accounts: ${accounts.slice(0, 3).join(', ')}... (${accounts.length} total)`);
      
    } catch (error) {
      console.error('Error calling contract methods:', error.message);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

verifyContract(); 