// Import required packages
// web3: Helps us talk to the blockchain
// fs: Helps us read and write files
const { web3, compileContract } = require('./utils');
const fs = require('fs');

// These are the wallet addresses from Ganache (your local blockchain)
// Think of these as digital wallets where NFTs can be stored
const ownerAddress = '0x5629beD2b0AE0c34DbE712C2aa21Ad761B5Fa669';      // Your wallet
const recipientAddress = '0x9223C19F1668ffAb2cCCd698f65A16Ad65EEEB4d';  // The person you're sending to

// This is the main function that transfers your NFT to someone else
// It's like giving your digital collectible to a friend
async function transferNFT() {
    // Step 1: Get information about your NFT
    // This is like checking your NFT's details before sending it
    console.log('Reading your NFT information...');
    const contractInfo = JSON.parse(fs.readFileSync('contract-info.json', 'utf8'));
    const { contractAddress, tokenId } = contractInfo;

    // Step 2: Get the contract ready
    // This is like opening the door to your NFT gallery
    console.log('Opening your NFT gallery...');
    const { abi } = compileContract();
    
    // Step 3: Show what we can do with the contract
    // This is like showing the list of things we can do in your NFT gallery
    console.log('\nHere are the things we can do with your NFT:');
    abi.forEach(item => {
        if (item.type === 'function') {
            console.log(`- ${item.name}: ${item.inputs.map(input => input.type).join(', ')}`);
        }
    });
    console.log('\n');

    // Step 4: Connect to your NFT gallery
    // This is like walking into your NFT gallery
    const contract = new web3.eth.Contract(abi, contractAddress);
    
    // Step 5: Give permission to transfer
    // This is like saying "yes, you can take this NFT"
    console.log('Giving permission to transfer your NFT...');
    await contract.methods.approve(recipientAddress, tokenId).send({
        from: ownerAddress,
        gas: 200000
    });
    
    console.log('Permission granted!');

    // Step 6: Send the NFT
    // This is like handing over your digital collectible
    console.log('Sending your NFT...');
    const transferTx = await contract.methods.transferFrom(ownerAddress, recipientAddress, tokenId).send({
        from: ownerAddress,
        gas: 200000
    });
    
    console.log('Your NFT has been sent successfully!');
    console.log('Transaction ID:', transferTx.transactionHash);

    // Step 7: Check who owns the NFT now
    // This is like checking who has your digital collectible
    const newOwner = await contract.methods.ownerOf(tokenId).call();
    console.log('The new owner of NFT #', tokenId, 'is:', newOwner);

    // Step 8: Update the records
    // This is like updating your address book with the new owner
    contractInfo.ownerAddress = recipientAddress;
    fs.writeFileSync('contract-info.json', JSON.stringify(contractInfo, null, 2));
    console.log('I updated the records in contract-info.json');
}

// Let's start transferring your NFT!
transferNFT(); 