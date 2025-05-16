const Web3 = require('web3');

async function checkTransaction() {
  try {
    console.log("Checking transaction details...");
    
    // Connect to Ganache
    const web3 = new Web3('http://127.0.0.1:7545');
    
    // Get pending transactions
    const pendingBlock = await web3.eth.getBlock('pending');
    console.log(`Found ${pendingBlock.transactions.length} pending transactions`);
    
    if (pendingBlock.transactions.length > 0) {
      const txHash = pendingBlock.transactions[0];
      console.log(`Examining transaction: ${txHash}`);
      
      try {
        // Try to get transaction details
        const tx = await web3.eth.getTransaction(txHash);
        console.log("\nTransaction details:");
        console.log(`From: ${tx.from}`);
        console.log(`To: ${tx.to}`);
        console.log(`Value: ${web3.utils.fromWei(tx.value, 'ether')} ETH`);
        console.log(`Gas: ${tx.gas}`);
        console.log(`Gas Price: ${web3.utils.fromWei(tx.gasPrice, 'gwei')} gwei`);
        console.log(`Nonce: ${tx.nonce}`);
        
        // Check account balance
        const balance = await web3.eth.getBalance(tx.from);
        console.log(`\nSender balance: ${web3.utils.fromWei(balance, 'ether')} ETH`);
        
        // Calculate required gas cost
        const gasCost = web3.utils.toBN(tx.gas).mul(web3.utils.toBN(tx.gasPrice));
        console.log(`Estimated gas cost: ${web3.utils.fromWei(gasCost, 'ether')} ETH`);
        
        if (web3.utils.toBN(balance).lt(gasCost)) {
          console.log("ERROR: Insufficient funds for gas");
        }
        
        // Check if the account is unlocked/available
        try {
          const accounts = await web3.eth.getAccounts();
          const isAccountAvailable = accounts.some(acc => acc.toLowerCase() === tx.from.toLowerCase());
          console.log(`Is account available: ${isAccountAvailable}`);
        } catch (error) {
          console.log("Error checking account availability:", error.message);
        }
        
        // Try to manually execute the transaction
        console.log("\nAttempting to manually process the transaction...");
        
        // Get the contract ABI
        const fs = require('fs');
        const contractArtifact = JSON.parse(fs.readFileSync('./build/contracts/SimpleNFT.json', 'utf8'));
        const nftContract = new web3.eth.Contract(contractArtifact.abi, tx.to);
        
        // Get transaction input data
        const inputData = tx.input;
        console.log(`Input data length: ${inputData.length} bytes`);
        
        // Try to decode function call
        try {
          const decodedData = web3.eth.abi.decodeParameters(['string'], '0x' + inputData.slice(10));
          console.log("Decoded data:", decodedData);
        } catch (error) {
          console.log("Could not decode input data:", error.message);
        }
        
        // Try to manually mint an NFT with minimal data
        console.log("\nTrying to mint a test NFT with minimal data...");
        const testMetadata = JSON.stringify({
          name: "Test NFT",
          description: "A test NFT to check if minting works",
          image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        });
        
        try {
          const accounts = await web3.eth.getAccounts();
          const result = await nftContract.methods.mint(testMetadata).send({
            from: accounts[0],
            gas: 3000000
          });
          
          console.log("Test mint successful!");
          console.log("Transaction hash:", result.transactionHash);
          
          // Check token count after minting
          const tokenCount = await nftContract.methods.getTokenCount().call();
          console.log(`Total tokens minted now: ${tokenCount}`);
        } catch (error) {
          console.log("Error minting test NFT:", error.message);
        }
        
      } catch (error) {
        console.log("Error getting transaction details:", error.message);
      }
    } else {
      console.log("No pending transactions found");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

checkTransaction(); 