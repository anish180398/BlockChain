/**
 * SimpleCrypto Token Deployment Script
 * 
 * This script demonstrates the full lifecycle of a cryptocurrency token on a blockchain:
 * 1. Setting up a local blockchain
 * 2. Compiling a Solidity token contract
 * 3. Deploying the contract to the blockchain
 * 4. Interacting with the token (transfers, balance checks)
 * 5. Monitoring gas fees and transaction costs
 * 6. Examining block and transaction details
 * 
 * It's designed to be educational and show all the key blockchain concepts.
 */

// Import required libraries
const ganache = require("ganache");  // Local Ethereum blockchain emulator
const Web3 = require("web3");        // Library to interact with Ethereum blockchain
const fs = require("fs");            // File system access for reading/writing files
const path = require("path");        // Path utilities for file paths
const solc = require("solc");        // Solidity compiler

/**
 * Compile the Solidity contract
 * 
 * This function:
 * 1. Reads the SimpleToken.sol source code
 * 2. Prepares the input for the Solidity compiler
 * 3. Compiles the contract
 * 4. Returns the ABI and bytecode needed for deployment
 * 
 * @returns {Object} Object containing the ABI and bytecode
 */
function compileContract() {
  // Resolve the path to the Solidity contract
  const contractPath = path.resolve(__dirname, "contracts", "SimpleToken.sol");
  // Read the source code from the file
  const source = fs.readFileSync(contractPath, "utf8");

  // Prepare the compiler input in the format solc expects
  const input = {
    language: "Solidity",
    sources: {
      "SimpleToken.sol": {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],  // Output all available information
        },
      },
    },
  };

  // Compile the contract
  const compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));
  
  // Check for compilation errors
  if (compiledContract.errors) {
    compiledContract.errors.forEach(error => {
      console.log(error.formattedMessage);
    });
    
    // Throw an error if there are any severe errors
    if (compiledContract.errors.some(error => error.severity === 'error')) {
      throw new Error('Compilation failed');
    }
  }

  // Extract the contract data for SimpleToken
  const contract = compiledContract.contracts["SimpleToken.sol"].SimpleToken;
  return {
    abi: contract.abi,                     // ABI (Application Binary Interface) - defines how to interact with the contract
    bytecode: contract.evm.bytecode.object // Bytecode - compiled contract code that runs on the EVM
  };
}

/**
 * Main function that runs the complete demo
 */
async function main() {
  let ganacheServer;
  try {
    // STEP 1: Set up the local blockchain
    console.log("Starting local blockchain with Ganache...");
    
    // Configure Ganache with predefined accounts for reproducibility
    ganacheServer = ganache.server({
      accounts: [
        {
          balance: "0x100000000000000000", // 10 ETH in hexadecimal
          secretKey: "0x0123456789012345678901234567890123456789012345678901234567890123", // Deployer account private key
        },
        {
          balance: "0x100000000000000000", // 10 ETH in hexadecimal
          secretKey: "0xabcdef6789012345678901234567890123456789012345678901234567890123", // Recipient account private key
        },
      ],
      logging: { quiet: true }, // Suppress verbose logging
      host: "0.0.0.0", // Allow connections from any IP (including other computers on the network)
      chain: {
        chainId: 1337 // Common chain ID for local development
      }
    });
    
    // Start the Ganache server on port 8545
    await ganacheServer.listen(8545);
    console.log("Ganache running on port 8545 and accessible from the network");
    
    // Get the host machine's IP address to share with others
    const { networkInterfaces } = require('os');
    const nets = networkInterfaces();
    let ipAddress = '';
    
    // Find the non-internal IPv4 address
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        // Skip over non-IPv4 and internal addresses
        if (net.family === 'IPv4' && !net.internal) {
          ipAddress = net.address;
          break;
        }
      }
      if (ipAddress) break;
    }
    
    console.log(`Share this IP address with others to connect: ${ipAddress}:8545`);
    console.log(`\nMetaMask Connection Information:`);
    console.log(`--------------------------------`);
    console.log(`Network Name: SimpleCrypto Local Network`);
    console.log(`New RPC URL: http://${ipAddress}:8545`);
    console.log(`Chain ID: 1337`);
    console.log(`Currency Symbol: ETH`);
    console.log(`--------------------------------`);
    
    // STEP 2: Connect to the blockchain
    // Create a Web3 instance connected to our local Ganache blockchain
    const web3 = new Web3("http://localhost:8545");
    
    // STEP 3: Compile the contract
    console.log("Compiling contract...");
    const { abi, bytecode } = compileContract();
    
    // STEP 4: Prepare for deployment
    // Get available Ethereum accounts
    const accounts = await web3.eth.getAccounts();
    console.log(`Accounts available: ${accounts.length}`);
    console.log(`Deployer account: ${accounts[0]}`);
    console.log(`Recipient account: ${accounts[1]}`);
    
    // Check ETH balances of our accounts
    const balance0 = await web3.eth.getBalance(accounts[0]);
    const balance1 = await web3.eth.getBalance(accounts[1]);
    console.log(`Deployer ETH Balance: ${web3.utils.fromWei(balance0, "ether")} ETH`);
    console.log(`Recipient ETH Balance: ${web3.utils.fromWei(balance1, "ether")} ETH`);
    
    // STEP 5: Deploy the contract
    console.log("\nDeploying SimpleToken contract...");
    // Create a contract instance
    const SimpleToken = new web3.eth.Contract(abi);
    
    // Prepare the deployment transaction
    const deployTx = SimpleToken.deploy({
      data: "0x" + bytecode, // Prepend '0x' to indicate this is hex
    });
    
    // Estimate the gas required for deployment
    const gas = await deployTx.estimateGas();
    console.log(`Estimated gas for deployment: ${gas}`);
    
    // Send the deployment transaction
    const deployedContract = await deployTx.send({
      from: accounts[0], // Deployer account
      gas,               // Gas limit
    });
    
    console.log(`Contract deployed at address: ${deployedContract.options.address}`);
    
    // STEP 6: Save deployment information for future reference
    const deploymentInfo = {
      network: "local",
      address: deployedContract.options.address,
      abi: abi,
      deployer: accounts[0],
      deployedAt: new Date().toISOString(),
    };
    
    // Write deployment info to a JSON file
    fs.writeFileSync(
      path.join(__dirname, "contract-deployment.json"),
      JSON.stringify(deploymentInfo, null, 2)
    );
    
    // STEP 7: Interact with the deployed token contract
    console.log("\n=== SimpleToken Information ===");
    // Call view functions to get token information
    const name = await deployedContract.methods.name().call();
    const symbol = await deployedContract.methods.symbol().call();
    const decimals = await deployedContract.methods.decimals().call();
    const totalSupply = await deployedContract.methods.totalSupply().call();
    
    console.log(`Name: ${name}`);
    console.log(`Symbol: ${symbol}`);
    console.log(`Decimals: ${decimals}`);
    console.log(`Total Supply: ${web3.utils.fromWei(totalSupply, "ether")} ${symbol}`);
    
    // STEP 8: Check initial token balances
    const deployer_balance = await deployedContract.methods.balanceOf(accounts[0]).call();
    console.log(`\nDeployer Token Balance: ${web3.utils.fromWei(deployer_balance, "ether")} ${symbol}`);
    
    // STEP 9: Perform a token transfer
    console.log("\n=== Transferring Tokens ===");
    // Amount to transfer: 100 tokens with 18 decimal places
    const transferAmount = web3.utils.toWei("100", "ether"); // 100 tokens
    
    console.log(`Transferring ${web3.utils.fromWei(transferAmount, "ether")} ${symbol} to ${accounts[1]}`);
    
    // STEP 10: Calculate gas costs
    // Get current gas price (in wei)
    const gasPrice = await web3.eth.getGasPrice();
    console.log(`Current Gas Price: ${web3.utils.fromWei(gasPrice, "gwei")} Gwei`);
    
    // Estimate gas required for the transfer transaction
    const transferGas = await deployedContract.methods
      .transfer(accounts[1], transferAmount)
      .estimateGas({ from: accounts[0] });
    
    console.log(`Estimated Gas for Transfer: ${transferGas}`);
    console.log(`Estimated Transfer Cost: ${web3.utils.fromWei(
      web3.utils.toBN(transferGas).mul(web3.utils.toBN(gasPrice)), 
      "ether"
    )} ETH`);
    
    // STEP 11: Execute the token transfer
    const transferReceipt = await deployedContract.methods
      .transfer(accounts[1], transferAmount)
      .send({ from: accounts[0], gas: transferGas });
    
    console.log(`Transfer Transaction Hash: ${transferReceipt.transactionHash}`);
    console.log(`Gas Used for Transfer: ${transferReceipt.gasUsed}`);
    console.log(`Transfer Cost: ${web3.utils.fromWei(
      web3.utils.toBN(transferReceipt.gasUsed).mul(web3.utils.toBN(gasPrice)),
      "ether"
    )} ETH`);
    
    // STEP 12: Check balances after transfer
    const deployer_balance_after = await deployedContract.methods.balanceOf(accounts[0]).call();
    const recipient_balance = await deployedContract.methods.balanceOf(accounts[1]).call();
    
    console.log(`\nDeployer Token Balance after transfer: ${web3.utils.fromWei(deployer_balance_after, "ether")} ${symbol}`);
    console.log(`Recipient Token Balance: ${web3.utils.fromWei(recipient_balance, "ether")} ${symbol}`);
    
    // STEP 13: Analyze blockchain data
    // Get details of the transfer transaction
    const transferTx = await web3.eth.getTransaction(transferReceipt.transactionHash);
    const transferBlock = await web3.eth.getBlock(transferReceipt.blockNumber);
    
    // Display block information
    console.log("\n=== Block Information ===");
    console.log(`Block Number: ${transferBlock.number}`);
    console.log(`Block Hash: ${transferBlock.hash}`);
    console.log(`Timestamp: ${new Date(transferBlock.timestamp * 1000).toLocaleString()}`);
    console.log(`Number of Transactions in Block: ${transferBlock.transactions.length}`);
    console.log(`Gas Used in Block: ${transferBlock.gasUsed}`);
    console.log(`Gas Limit: ${transferBlock.gasLimit}`);
    
    // Display transaction information
    console.log("\n=== Transaction Information ===");
    console.log(`Transaction Hash: ${transferTx.hash}`);
    console.log(`From: ${transferTx.from}`);
    console.log(`To (Contract Address): ${transferTx.to}`);
    console.log(`Gas Price: ${web3.utils.fromWei(transferTx.gasPrice, "gwei")} Gwei`);
    console.log(`Gas Limit Set: ${transferTx.gas}`);
    console.log(`Nonce: ${transferTx.nonce}`);
    
    // STEP 14: Summary of demonstrated concepts
    console.log("\n=== Blockchain Concepts Demonstrated ===");
    console.log("1. Smart Contract Deployment - We deployed a token contract to the blockchain");
    console.log("2. Custom Cryptocurrency - We created our own token called Monolith (MLC)");
    console.log("3. Token Transfers - We transferred 100 MLC tokens between accounts");
    console.log("4. Gas Fees - We calculated and paid gas fees for our transactions");
    console.log("5. Blocks - We saw how transactions are included in blocks on the blockchain");
    console.log("6. Transaction Verification - The transaction was processed and verified");
    
    console.log("\nAll operations completed successfully!");
    
    // Keep the blockchain running for MetaMask connections
    console.log("\n=== Blockchain Server Running ===");
    console.log("The local blockchain is now running and ready for MetaMask connections.");
    console.log("To add the token to MetaMask, use these details:");
    console.log(`Token Contract Address: ${deployedContract.options.address}`);
    console.log(`Token Symbol: ${symbol} (MLC)`);
    console.log(`Decimals: ${decimals}`);
    
    // Function to create new accounts and give them MLC tokens
    async function createAccountWithTokens() {
      try {
        // Create a new account
        const newAccount = web3.eth.accounts.create();
        console.log("\n=== New Account Created ===");
        console.log(`Address: ${newAccount.address}`);
        console.log(`Private Key: ${newAccount.privateKey}`);
        
        // Send some ETH to the new account for gas
        await web3.eth.sendTransaction({
          from: accounts[0],
          to: newAccount.address,
          value: web3.utils.toWei("1", "ether")
        });
        
        // Send 20 MLC tokens to the new account
        const tokenAmount = web3.utils.toWei("20", "ether"); // 20 tokens
        const receipt = await deployedContract.methods
          .transfer(newAccount.address, tokenAmount)
          .send({ from: accounts[0] });
        
        console.log(`\nSent 20 MLC tokens to the new account`);
        console.log(`Transaction hash: ${receipt.transactionHash}`);
        
        // Instructions to import to MetaMask
        console.log("\nTo use this account in MetaMask:");
        console.log("1. Click on the account icon in MetaMask");
        console.log("2. Select 'Import Account'");
        console.log("3. Paste the private key above (without quotes)");
        console.log("4. Click 'Import'");
        
        return newAccount;
      } catch (error) {
        console.error("Error creating account:", error.message);
      }
    }
    
    // Set up a simple HTTP server to create new accounts on demand
    const http = require('http');
    const server = http.createServer(async (req, res) => {
      if (req.url === '/new-account') {
        const newAccount = await createAccountWithTokens();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
          address: newAccount.address,
          privateKey: newAccount.privateKey,
          message: 'Account created with 20 MLC tokens'
        }));
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
          <html>
            <head><title>Monolith (MLC) Blockchain</title></head>
            <body>
              <h1>Monolith (MLC) Blockchain Server</h1>
              <p>The blockchain is running. Use MetaMask to connect to it.</p>
              <button onclick="createAccount()">Create New Account with 20 MLC</button>
              <div id="result" style="margin-top: 20px;"></div>
              
              <script>
                function createAccount() {
                  fetch('/new-account')
                    .then(response => response.json())
                    .then(data => {
                      document.getElementById('result').innerHTML = 
                        '<h3>New Account Created</h3>' +
                        '<p><strong>Address:</strong> ' + data.address + '</p>' +
                        '<p><strong>Private Key:</strong> ' + data.privateKey + '</p>' +
                        '<p>This account has been funded with 20 MLC tokens and 1 ETH.</p>' +
                        '<p>To use this account in MetaMask:</p>' +
                        '<ol>' +
                        '<li>Click on the account icon in MetaMask</li>' +
                        '<li>Select "Import Account"</li>' +
                        '<li>Paste the private key above</li>' +
                        '<li>Click "Import"</li>' +
                        '</ol>';
                    });
                }
              </script>
            </body>
          </html>
        `);
      }
    });
    
    // Start the HTTP server on port 3000
    server.listen(3000);
    console.log(`\nAccount creation service running at http://${ipAddress}:3000`);
    console.log("Visit this URL in your browser to create new accounts with 20 MLC tokens");
    
    console.log("\nPress Ctrl+C to stop the blockchain server when done.");
    
    // Keep the script running indefinitely
    await new Promise(() => {});
    
  } catch (error) {
    console.error("Error:", error);
    if (ganacheServer) {
      await ganacheServer.close();
    }
  }
}

// Execute the main function
main(); 