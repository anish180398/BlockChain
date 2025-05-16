const Web3 = require('web3');

async function mineTransactions() {
  try {
    console.log("Checking for pending transactions...");
    
    // Connect to Ganache
    const web3 = new Web3('http://127.0.0.1:7545');
    
    // Get pending transactions
    const pendingBlock = await web3.eth.getBlock('pending');
    console.log(`Found ${pendingBlock.transactions.length} pending transactions`);
    
    if (pendingBlock.transactions.length > 0) {
      console.log("Transaction hashes:", pendingBlock.transactions);
      
      // Force mining by sending a small transaction
      console.log("\nSending a small transaction to trigger mining...");
      const accounts = await web3.eth.getAccounts();
      
      if (accounts.length >= 2) {
        const result = await web3.eth.sendTransaction({
          from: accounts[0],
          to: accounts[1],
          value: web3.utils.toWei('0.001', 'ether'),
          gas: 21000
        });
        
        console.log(`Mining trigger transaction sent: ${result.transactionHash}`);
        console.log("This should help process any pending transactions");
        
        // Wait a moment and check again
        setTimeout(async () => {
          const newPendingBlock = await web3.eth.getBlock('pending');
          console.log(`\nAfter mining: ${newPendingBlock.transactions.length} pending transactions`);
          
          // Check token count again
          try {
            const contractArtifact = JSON.parse(require('fs').readFileSync('./build/contracts/SimpleNFT.json', 'utf8'));
            const nftContract = new web3.eth.Contract(
              contractArtifact.abi, 
              '0x1BD8C7D3e39Db32bBc38210ba94B7B68c1EE368b'
            );
            
            const tokenCount = await nftContract.methods.getTokenCount().call();
            console.log(`Total tokens minted now: ${tokenCount}`);
            
            if (parseInt(tokenCount) > 0) {
              console.log("\nSuccess! Your NFT was minted. Please refresh the app page.");
            } else {
              console.log("\nNo tokens minted yet. There might be an issue with the transaction.");
            }
          } catch (error) {
            console.error("Error checking token count:", error.message);
          }
        }, 3000);
      } else {
        console.log("Not enough accounts to trigger mining");
      }
    } else {
      console.log("No pending transactions found. Your transaction may have failed.");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

mineTransactions(); 