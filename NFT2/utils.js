// Import required packages
// Web3: Library to interact with Ethereum blockchain
// fs: File system operations
// solc: Solidity compiler
// path: Handle file paths
const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
const path = require('path');

// Connect to local Ganache blockchain
// Ganache runs on http://127.0.0.1:7545 by default
const web3 = new Web3('http://127.0.0.1:7545');

// Function to handle importing other Solidity files
// This is needed because our contract imports OpenZeppelin contracts
function findImports(importPath) {
    // For OpenZeppelin contracts, look in node_modules
    if (importPath.startsWith('@openzeppelin/')) {
        return { 
            contents: fs.readFileSync(path.join(__dirname, 'node_modules', importPath), 'utf8') 
        };
    }
    // For local contracts, look in current directory
    return { 
        contents: fs.readFileSync(path.join(__dirname, importPath), 'utf8') 
    };
}

// Function to compile the NFT contract
// This converts our Solidity code into bytecode that can run on Ethereum
function compileContract() {
    // Read our NFT contract file
    const source = fs.readFileSync('SimpleNFT.sol', 'utf8');

    // Prepare the input for the Solidity compiler
    // This tells the compiler what to compile and what output we want
    const input = {
        language: 'Solidity',
        sources: {
            'SimpleNFT.sol': { content: source }
        },
        settings: {
            outputSelection: {
                '*': { '*': ['*'] }  // Get all output types
            }
        }
    };

    // Compile the contract
    // This converts Solidity code to bytecode and generates the ABI
    const compiledContract = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

    // Get the compiled contract data
    const contract = compiledContract.contracts['SimpleNFT.sol']['SimpleNFT'];

    // Return two important things:
    // 1. ABI: Interface that tells other programs how to interact with our contract
    // 2. Bytecode: The actual contract code that will be deployed to the blockchain
    return {
        abi: contract.abi,
        bytecode: contract.evm.bytecode.object
    };
}

// Export our tools so other files can use them
module.exports = {
    web3,           // The connection to our blockchain
    compileContract // The function to compile our contract
}; 