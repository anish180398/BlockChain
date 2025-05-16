const Web3 = require('web3');

// Contract address to verify
const contractAddress = process.argv[2] || '0x5ea4690cfA3f90E5978737c301817AC60afa5Cf7';

// Minimal ABI for verification
const minimalAbi = [
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  }
];

async function testConnection() {
  console.log(`=== Contract Connection Test ===`);
  console.log(`Testing contract at address: ${contractAddress}`);
  
  // Connect to Ganache
  try {
    const web3 = new Web3('http://127.0.0.1:7545');
    console.log('Connected to Web3 provider');
    
    // Check network
    const networkId = await web3.eth.net.getId();
    const chainId = await web3.eth.getChainId();
    console.log(`Network ID: ${networkId}, Chain ID: ${chainId}`);
    
    // Check if the contract exists
    const code = await web3.eth.getCode(contractAddress);
    console.log(`Code at address: ${code.slice(0, 10)}... (${code.length} bytes)`);
    
    if (code === '0x' || code === '0x0') {
      console.error('ERROR: No contract deployed at this address!');
      return;
    }
    
    // Try to create contract instance
    try {
      console.log('Creating contract instance...');
      const contract = new web3.eth.Contract(minimalAbi, contractAddress);
      
      // Try to call name() function with trace
      console.log('Calling name() function...');
      try {
        const name = await contract.methods.name().call();
        console.log(`SUCCESS! Contract name: ${name}`);
      } catch (nameError) {
        console.error('Failed to call name():', nameError.message);
      }
      
      // Try to get accounts
      const accounts = await web3.eth.getAccounts();
      console.log(`Available accounts: ${accounts.length > 0 ? accounts[0] : 'none'}`);
      
    } catch (contractError) {
      console.error('Failed to create contract instance:', contractError.message);
    }
  } catch (web3Error) {
    console.error('Failed to connect to Web3:', web3Error.message);
  }
}

testConnection().catch(console.error); 