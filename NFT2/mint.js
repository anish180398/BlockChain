// Import required packages
const { web3, compileContract } = require('./utils');
const fs = require('fs');

// Your account address from Ganache
const ownerAddress = '0x5629beD2b0AE0c34DbE712C2aa21Ad761B5Fa669';

// Main function to deploy contract and mint NFT
async function deployAndMint() {
    // Get the contract ABI and bytecode from our utils
    const { abi, bytecode } = compileContract();

    // Get the first account from Ganache to deploy the contract
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    console.log('Deploying contract from account:', account);
    console.log('Account balance:', await web3.eth.getBalance(account));

    // Create a new contract instance and prepare it for deployment
    const contract = new web3.eth.Contract(abi);
    const deploy = contract.deploy({
        data: bytecode
    });

    // Estimate gas needed for deployment
    const gas = await deploy.estimateGas();
    console.log('Estimated gas:', gas);

    // Deploy the contract to the blockchain
    const deployedContract = await deploy.send({
        from: account,
        gas: gas
    });

    console.log('Contract deployed at:', deployedContract.options.address);

    // Mint a new NFT to the owner address
    console.log('Minting NFT to:', ownerAddress);
    const mintTx = await deployedContract.methods.mint(ownerAddress).send({
        from: account,
        gas: 200000
    });

    console.log('NFT minted successfully!');
    console.log('Transaction hash:', mintTx.transactionHash);

    // Get the token ID from the mint event
    const mintEvents = await deployedContract.getPastEvents('Transfer', {
        fromBlock: mintTx.blockNumber,
        toBlock: mintTx.blockNumber
    });
    
    const tokenId = mintEvents[0].returnValues.tokenId;
    console.log('Minted Token ID:', tokenId);

    // Save contract information for later use
    const contractInfo = {
        contractAddress: deployedContract.options.address,
        tokenId: tokenId,
        ownerAddress: ownerAddress
    };

    // Save to JSON file
    fs.writeFileSync('contract-info.json', JSON.stringify(contractInfo, null, 2));
    console.log('Contract information saved to contract-info.json');
}

// Run the deployment and minting process
deployAndMint(); 