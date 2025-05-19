// Import required packages
const { web3, compileContract } = require('./utils');
const fs = require('fs');

// Your account addresses from Ganache
const ownerAddress = '0x5629beD2b0AE0c34DbE712C2aa21Ad761B5Fa669';
const recipientAddress = '0x9223C19F1668ffAb2cCCd698f65A16Ad65EEEB4d';

// Main function to transfer NFT
async function transferNFT() {
    // Read contract information from saved file
    const contractInfo = JSON.parse(fs.readFileSync('contract-info.json', 'utf8'));
    const { contractAddress, tokenId } = contractInfo;

    // Get the contract ABI
    const { abi } = compileContract();
    
    // Print the ABI structure
    console.log('\nContract ABI Structure:');
    console.log('Functions available in the contract:');
    abi.forEach(item => {
        if (item.type === 'function') {
            console.log(`- ${item.name}: ${item.inputs.map(input => input.type).join(', ')}`);
        }
    });
    console.log('\n');

    // Create contract instance
    const contract = new web3.eth.Contract(abi, contractAddress);
    
    // First approve the transfer
    console.log('Approving transfer...');
    await contract.methods.approve(recipientAddress, tokenId).send({
        from: ownerAddress,
        gas: 200000
    });
    
    console.log('Transfer approved');

    // Then transfer the NFT
    console.log('Transferring NFT...');
    const transferTx = await contract.methods.transferFrom(ownerAddress, recipientAddress, tokenId).send({
        from: ownerAddress,
        gas: 200000
    });
    
    console.log('NFT transferred successfully!');
    console.log('Transfer transaction hash:', transferTx.transactionHash);

    // Verify the new owner
    const newOwner = await contract.methods.ownerOf(tokenId).call();
    console.log('New owner of token', tokenId, 'is:', newOwner);

    // Update contract info with new owner
    contractInfo.ownerAddress = recipientAddress;
    fs.writeFileSync('contract-info.json', JSON.stringify(contractInfo, null, 2));
    console.log('Contract information updated in contract-info.json');
}

// Run the transfer process
transferNFT(); 