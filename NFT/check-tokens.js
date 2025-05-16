const Web3 = require('web3');
const fs = require('fs');
const contractArtifact = JSON.parse(fs.readFileSync('./build/contracts/SimpleNFT.json', 'utf8'));

async function checkTokens() {
  try {
    console.log("Checking NFT tokens...");
    
    // Connect to Ganache
    const web3 = new Web3('http://127.0.0.1:7545');
    
    // Get contract instance
    const contractAddress = '0x1BD8C7D3e39Db32bBc38210ba94B7B68c1EE368b';
    const nftContract = new web3.eth.Contract(contractArtifact.abi, contractAddress);
    
    // Get accounts
    const accounts = await web3.eth.getAccounts();
    console.log(`Available accounts: ${accounts.slice(0, 3).join(', ')}... (${accounts.length} total)`);
    
    // Check token count
    const tokenCount = await nftContract.methods.getTokenCount().call();
    console.log(`Total tokens minted: ${tokenCount}`);
    
    // If tokens exist, check their owners
    if (parseInt(tokenCount) > 0) {
      console.log("\nToken details:");
      
      for (let i = 1; i <= parseInt(tokenCount); i++) {
        try {
          // Get owner
          const owner = await nftContract.methods.ownerOf(i).call();
          
          // Get creator
          const creator = await nftContract.methods.tokenCreators(i).call();
          
          // Get URI (this will be large, so we'll just show beginning)
          const tokenURI = await nftContract.methods.tokenURI(i).call();
          const shortenedURI = tokenURI.length > 100 
            ? tokenURI.substring(0, 100) + '...' 
            : tokenURI;
          
          console.log(`\nToken ID: ${i}`);
          console.log(`Owner: ${owner}`);
          console.log(`Creator: ${creator}`);
          console.log(`TokenURI (start): ${shortenedURI}`);
          
          // Try to parse the metadata if it's JSON
          try {
            const metadata = JSON.parse(tokenURI);
            console.log(`Name: ${metadata.name}`);
            console.log(`Description: ${metadata.description || 'None'}`);
            console.log(`Image size: ${metadata.image ? metadata.image.length : 0} chars`);
          } catch (e) {
            console.log("Could not parse metadata as JSON");
          }
        } catch (error) {
          console.log(`Error fetching token ${i}: ${error.message}`);
        }
      }
    }
    
    // Check if the first account has any NFTs
    if (accounts.length > 0) {
      const balance = await nftContract.methods.balanceOf(accounts[0]).call();
      console.log(`\nFirst account (${accounts[0]}) has ${balance} NFTs`);
    }
    
    // Check for pending transactions
    const pendingBlock = await web3.eth.getBlock('pending');
    console.log(`\nPending transactions: ${pendingBlock.transactions.length}`);
    
  } catch (error) {
    console.error("Error:", error.message);
  }
}

checkTokens(); 