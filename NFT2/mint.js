// Import required packages
// web3: Helps us talk to the blockchain
// fs: Helps us read and write files
// path: Helps us work with file paths
// crypto: Helps us create unique hashes for our images
const { web3, compileContract } = require('./utils');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// This is your wallet address from Ganache (your local blockchain)
// Think of this as your digital wallet where you'll keep your NFTs
const ownerAddress = '0x5629beD2b0AE0c34DbE712C2aa21Ad761B5Fa669';

// This function creates a unique fingerprint (hash) for your image
// It's like giving your image a special ID that can't be copied
function calculateImageHash(imagePath) {
    // Read the image file
    const fileBuffer = fs.readFileSync(imagePath);
    // Create a new hash calculator
    const hashSum = crypto.createHash('sha256');
    // Add the image data to the calculator
    hashSum.update(fileBuffer);
    // Get the final hash (a long string of letters and numbers)
    return hashSum.digest('hex');
}

// This is the main function that does everything:
// 1. Deploys the contract (creates our NFT gallery)
// 2. Takes your image
// 3. Creates an NFT from your image
async function deployAndMint() {
    // Step 1: Get our contract ready
    // This is like getting the blueprint for our NFT gallery
    console.log('Getting contract ready...');
    const { abi, bytecode } = compileContract();
    
    // Step 2: Deploy the contract to the blockchain
    // This is like building our NFT gallery on the blockchain
    console.log('Building our NFT gallery on the blockchain...');
    const contract = new web3.eth.Contract(abi);
    const deploy = contract.deploy({ data: bytecode });
    const gas = await deploy.estimateGas();
    const deployedContract = await deploy.send({ from: ownerAddress, gas });
    console.log('Our NFT gallery is ready at:', deployedContract.options.address);

    // Step 3: Get your image
    // This is like choosing which picture to turn into an NFT
    const imageName = process.argv[2]; // Get the image name you typed in the command line
    if (!imageName) {
        console.error('Oops! You forgot to tell me which image to use!');
        console.error('Try running: node mint.js your-image.jpg');
        process.exit(1);
    }

    // Check if your image exists in the folder
    const imagePath = path.join(__dirname, imageName);
    if (!fs.existsSync(imagePath)) {
        console.error(`Sorry! I couldn't find your image: ${imageName}`);
        process.exit(1);
    }

    // Step 4: Create a unique fingerprint for your image
    // This is like giving your image a special ID
    console.log(`Creating a unique fingerprint for your image: ${imageName}`);
    const imageHash = calculateImageHash(imagePath);

    // Step 5: Create your NFT
    // This is like taking your image and turning it into a special digital collectible
    console.log('Creating your NFT...');
    const mintTx = await deployedContract.methods.mint(ownerAddress, imageName, imageHash).send({
        from: ownerAddress,
        gas: 200000
    });

    // Step 6: Get your NFT's ID
    // This is like getting a special number for your NFT
    const tokenId = mintTx.events.Transfer.returnValues.tokenId;
    console.log('Your NFT is ready! Its ID is:', tokenId);

    // Step 7: Save all the important information
    // This is like keeping a record of your NFT
    const contractInfo = {
        contractAddress: deployedContract.options.address,  // Where your NFT gallery is
        tokenId: tokenId,                                  // Your NFT's special number
        ownerAddress: ownerAddress,                        // Your wallet address
        imageName: imageName,                              // Your image's name
        imageHash: imageHash,                              // Your image's unique fingerprint
        imagePath: imagePath                               // Where your image is stored
    };
    fs.writeFileSync('contract-info.json', JSON.stringify(contractInfo, null, 2));
    console.log('I saved all the information about your NFT in contract-info.json');
}

// Let's start creating your NFT!
deployAndMint(); 