// Global variables
let web3;
let accounts = [];
let nftContract;
// Set contract address to null to allow manual entry
let contractAddress = null;

// Complete ABI from the deployed contract
const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_fromTokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_toTokenId",
        "type": "uint256"
      }
    ],
    "name": "BatchMetadataUpdate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "MetadataUpdate",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      }
    ],
    "name": "NFTMinted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tokenCreators",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      }
    ],
    "name": "mint",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTokenCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

// Initialization when page loads
window.addEventListener('load', async () => {
  setupEventListeners();
  
  // Create debug panel
  createDebugPanel();
  
  // Add contract status indicator
  const header = document.querySelector('header');
  const contractStatus = document.createElement('div');
  contractStatus.id = 'contract-status';
  contractStatus.className = 'alert alert-secondary mt-2';
  contractStatus.innerHTML = 'Contract: <span id="contract-address-display">Not connected</span>';
  header.appendChild(contractStatus);
  
  await setupWeb3();
  
  // Add button for changing contract address
  const accountInfo = document.getElementById('account-info');
  const addressButton = document.createElement('button');
  addressButton.className = 'btn btn-sm btn-primary ms-2';
  addressButton.textContent = 'Set Contract Address';
  addressButton.onclick = promptForContractAddress;
  accountInfo.appendChild(addressButton);
  
  // Check for stored address
  const storedAddress = localStorage.getItem('nftContractAddress');
  if (storedAddress) {
    contractAddress = storedAddress;
    console.log("Using stored contract address:", contractAddress);
    document.getElementById('contract-address-display').textContent = `${formatAddress(contractAddress)} (Verifying...)`;
    initializeContract();
  } else {
    console.log("No stored contract address found");
    document.getElementById('contract-address-display').textContent = 'Not set - click "Set Contract Address"';
    // Prompt for contract address after a short delay
    setTimeout(() => {
      promptForContractAddress();
    }, 1000);
  }
});

function setupEventListeners() {
  document.getElementById('image-upload').addEventListener('change', previewImage);
  document.getElementById('nft-form').addEventListener('submit', mintNFT);
  document.getElementById('transfer-form').addEventListener('submit', transferNFT);
  document.getElementById('refresh-nfts').addEventListener('click', loadNFTs);
}

async function setupWeb3() {
  if (window.ethereum) {
    try {
      // First check if MetaMask is connected to the correct network
      web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      const chainId = await web3.eth.getChainId();
      
      console.log("Connected to network ID:", networkId, "Chain ID:", chainId);
      
      // Check if we're on the correct network (Ganache)
      if (networkId !== 5777 && networkId !== 1337 && chainId !== 1337) {
        // Not connected to Ganache, show detailed instructions
        updateStatusMessage('account-info', 
          'Please configure MetaMask for Ganache: <button class="btn btn-sm btn-warning" id="configure-metamask">Show Instructions</button>', 
          'warning');
        
        document.getElementById('configure-metamask').onclick = showMetaMaskInstructions;
        return;
      }
      
      // Request accounts
      accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Connected accounts:", accounts);
      
      // Check if the deployer account is available
      const deployerAccount = "0x2b1FB7aD7cd615D10568d677dc4c05cE9903E2B6".toLowerCase();
      const isDeployerConnected = accounts.some(account => account.toLowerCase() === deployerAccount);
      
      if (!isDeployerConnected) {
        console.warn("Deployer account not connected. Current accounts:", accounts);
        updateStatusMessage('account-info', 
          `Using account ${formatAddress(accounts[0])}. Note: This is not the deployer account that created the NFT contract.`, 
          'warning');
      } else {
        console.log("Deployer account connected:", deployerAccount);
        updateStatusMessage('account-info', `Connected with deployer account: ${formatAddress(accounts[0])}`, 'success');
      }
      
      // Listen for account changes
      window.ethereum.on('accountsChanged', (newAccounts) => {
        accounts = newAccounts;
        updateStatusMessage('account-info', `Connected: ${formatAddress(accounts[0])}`, 'success');
        loadNFTs();
      });
      
      // Listen for network changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    } catch (error) {
      console.error("MetaMask connection error:", error);
      updateStatusMessage('account-info', "Please connect to MetaMask", 'danger');
    }
  } else {
    updateStatusMessage('account-info', "Please install MetaMask", 'danger');
  }
}

// Show detailed MetaMask configuration instructions
function showMetaMaskInstructions() {
  const instructions = `
    <div class="alert alert-info">
      <h5>MetaMask Configuration for Ganache</h5>
      <ol>
        <li>Open MetaMask</li>
        <li>Click on the network dropdown at the top</li>
        <li>Select "Add Network" or "Custom RPC"</li>
        <li>Enter the following details:
          <ul>
            <li>Network Name: Ganache</li>
            <li>New RPC URL: http://127.0.0.1:7545</li>
            <li>Chain ID: 1337</li>
            <li>Currency Symbol: ETH</li>
          </ul>
        </li>
        <li>Click Save</li>
        <li>Make sure you have imported an account from Ganache:
          <ul>
            <li>In Ganache, click the key icon 🔑 next to an account</li>
            <li>Copy the private key</li>
            <li>In MetaMask, click on your account icon → Import Account</li>
            <li>Paste the private key and click Import</li>
          </ul>
        </li>
        <li>Refresh this page after completing these steps</li>
      </ol>
    </div>
  `;
  
  const modal = document.createElement('div');
  modal.className = 'modal fade show';
  modal.style.display = 'block';
  modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
  modal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">MetaMask Configuration</h5>
          <button type="button" class="btn-close" id="close-instructions"></button>
        </div>
        <div class="modal-body">
          ${instructions}
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.getElementById('close-instructions').onclick = () => {
    document.body.removeChild(modal);
  };
}

function createDebugPanel() {
  const debugPanel = document.createElement('div');
  debugPanel.className = 'card mt-4';
  debugPanel.innerHTML = `
    <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
      <h5 class="mb-0">Debug Panel</h5>
      <button class="btn btn-sm btn-outline-light" id="toggle-debug">Hide</button>
    </div>
    <div class="card-body p-0">
      <div id="debug-output" style="height:150px; overflow-y:auto; padding:10px; font-family:monospace; font-size:12px;"></div>
    </div>
  `;
  
  document.querySelector('.container').appendChild(debugPanel);
  
  document.getElementById('toggle-debug').addEventListener('click', (e) => {
    const debugOutput = document.getElementById('debug-output');
    if (debugOutput.style.display === 'none') {
      debugOutput.style.display = 'block';
      e.target.textContent = 'Hide';
    } else {
      debugOutput.style.display = 'none';
      e.target.textContent = 'Show';
    }
  });
}

// Function to prompt for contract address
function promptForContractAddress() {
  // Get the latest deployed address from the build artifacts
  const suggestedAddress = "0x5ea4690cfA3f90E5978737c301817AC60afa5Cf7"; // Your latest deployed address
  const newAddress = prompt(`Please enter your NFT contract address from Ganache:\n\nSuggestion: ${suggestedAddress}`);
  
  if (!newAddress) return; // User cancelled
  
  // Basic validation - check if it looks like an Ethereum address
  if (/^0x[a-fA-F0-9]{40}$/.test(newAddress)) {
    contractAddress = newAddress;
    localStorage.setItem('nftContractAddress', contractAddress);
    console.log("Contract address set to:", contractAddress);
    
    // Update UI
    document.getElementById('contract-address-display').textContent = `${formatAddress(contractAddress)} (Verifying...)`;
    document.getElementById('contract-status').className = 'alert alert-warning mt-2';
    
    // Re-initialize the contract with the new address
    initializeContract();
  } else {
    alert("Invalid Ethereum address format. Address must start with '0x' followed by 40 hexadecimal characters.");
  }
}

function initializeContract() {
  if (!web3) {
    console.error("Web3 not initialized yet");
    return;
  }
  
  // Prompt for address if none is set
  if (!contractAddress) {
    console.log("No contract address set");
    promptForContractAddress();
    return;
  }
  
  try {
    console.log("Connecting to NFT contract at:", contractAddress);
    
    // Create a minimal ABI just for verification
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
    
    // First verify with minimal ABI
    const verificationContract = new web3.eth.Contract(minimalAbi, contractAddress);
    
    // Add debug message to the debug panel
    const debugOutput = document.getElementById('debug-output');
    debugOutput.innerHTML += `<div>Attempting to verify contract at: ${contractAddress}</div>`;
    
    // Verify the contract exists and is an NFT by calling basic functions
    verificationContract.methods.name().call()
      .then(name => {
        console.log("Contract verified successfully. Name:", name);
        debugOutput.innerHTML += `<div style="color:green">Contract verified! Name: ${name}</div>`;
        
        // Now create the full contract with complete ABI
        nftContract = new web3.eth.Contract(abi, contractAddress);
        
        // Update UI
        updateStatusMessage('mint-status', `NFT contract connected: ${name}`, 'success');
        document.getElementById('contract-address-display').textContent = `${formatAddress(contractAddress)} (Verified: ${name})`;
        document.getElementById('contract-status').className = 'alert alert-success mt-2';
        
        loadNFTs();
      })
      .catch(error => {
        console.error("Contract verification failed:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
        
        // Add detailed error to debug panel
        debugOutput.innerHTML += `<div style="color:red">Contract verification failed: ${error.message}</div>`;
        
        // Try to get more information about the contract
        web3.eth.getCode(contractAddress)
          .then(code => {
            if (code === '0x' || code === '0x0') {
              debugOutput.innerHTML += `<div style="color:red">No contract exists at this address!</div>`;
            } else {
              debugOutput.innerHTML += `<div style="color:orange">Contract exists but may not be an NFT contract or may be on a different network.</div>`;
            }
          })
          .catch(err => {
            debugOutput.innerHTML += `<div style="color:red">Error checking contract code: ${err.message}</div>`;
          });
        
        // Update contract status
        document.getElementById('contract-address-display').textContent = `${formatAddress(contractAddress)} (INVALID)`;
        document.getElementById('contract-status').className = 'alert alert-danger mt-2';
        
        updateStatusMessage('mint-status', `Unable to connect to contract: ${error.message}`, 'danger');
      });
  } catch (error) {
    console.error("Contract initialization error:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    
    // Update contract status
    document.getElementById('contract-address-display').textContent = `${formatAddress(contractAddress)} (ERROR)`;
    document.getElementById('contract-status').className = 'alert alert-danger mt-2';
    
    updateStatusMessage('mint-status', `Contract initialization failed: ${error.message}`, 'danger');
  }
}

function updateStatusMessage(elementId, message, type) {
  const element = document.getElementById(elementId);
  element.innerHTML = type === 'success' ? `<strong>${message}</strong>` : message;
  element.className = `alert alert-${type}`;
}

function formatAddress(address) {
  return `${address.substring(0, 6)}...${address.substring(38)}`;
}

function previewImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const previewImg = document.getElementById('preview-image');
      previewImg.src = e.target.result;
      previewImg.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
}

async function mintNFT(event) {
  event.preventDefault();
  
  if (!isConnected()) {
    updateStatusMessage('mint-status', "Please connect to MetaMask and verify contract address", 'danger');
    return;
  }
  
  const name = document.getElementById('nft-name').value;
  const description = document.getElementById('nft-description').value;
  const imageFile = document.getElementById('image-upload').files[0];
  
  if (!name || !imageFile) {
    updateStatusMessage('mint-status', "Please provide a name and image for your NFT", 'warning');
    return;
  }

  try {
    showSpinner('mint-spinner', 'mintBtn');
    updateStatusMessage('mint-status', "Processing... Please wait", 'info');
    
    // Add debug information
    const debugOutput = document.getElementById('debug-output');
    debugOutput.innerHTML += `<div>Preparing to mint NFT: ${name}</div>`;
    debugOutput.innerHTML += `<div>Image size: ${(imageFile.size / 1024).toFixed(2)} KB</div>`;
    
    // Check if the image is too large (> 1MB)
    if (imageFile.size > 1024 * 1024) {
      debugOutput.innerHTML += `<div style="color:orange">Image is large. Compressing...</div>`;
      // We'll need to compress the image
    }
    
    // Convert image to base64 with possible compression
    const imageURI = await compressAndConvertImage(imageFile);
    debugOutput.innerHTML += `<div>Base64 image size: ${(imageURI.length / 1024).toFixed(2)} KB</div>`;
    
    // Create metadata
    const metadata = { name, description, image: imageURI };
    const metadataStr = JSON.stringify(metadata);
    
    debugOutput.innerHTML += `<div>Metadata size: ${(metadataStr.length / 1024).toFixed(2)} KB</div>`;
    
    // Check if metadata is too large (Ethereum has ~24KB transaction size limit)
    if (metadataStr.length > 20000) {
      debugOutput.innerHTML += `<div style="color:red">Metadata is too large (${(metadataStr.length / 1024).toFixed(2)} KB). 
        Consider using IPFS or reducing image size.</div>`;
      updateStatusMessage('mint-status', "Metadata is too large. Please use a smaller image.", 'danger');
      hideSpinner('mint-spinner', 'mintBtn');
      return;
    }
    
    console.log("Metadata created, length:", metadataStr.length);
    console.log("Preparing to mint NFT with name:", name);
    
    // Check if the account has sufficient funds
    const balance = await web3.eth.getBalance(accounts[0]);
    console.log("Account balance:", web3.utils.fromWei(balance, 'ether'), "ETH");
    
    if (web3.utils.fromWei(balance, 'ether') < 0.01) {
      debugOutput.innerHTML += `<div style="color:red">Account balance too low: ${web3.utils.fromWei(balance, 'ether')} ETH</div>`;
      updateStatusMessage('mint-status', "Your account balance is too low for gas fees", 'danger');
      hideSpinner('mint-spinner', 'mintBtn');
      return;
    }
    
    // Mint NFT with specific gas settings for Ganache
    debugOutput.innerHTML += `<div>Calling mint function...</div>`;
    
    const mintMethod = nftContract.methods.mint(metadataStr);
    
    // Estimate gas to ensure we set a proper limit
    let gasEstimate;
    try {
      gasEstimate = await mintMethod.estimateGas({from: accounts[0]});
      debugOutput.innerHTML += `<div>Estimated gas: ${gasEstimate}</div>`;
    } catch (gasError) {
      debugOutput.innerHTML += `<div style="color:red">Gas estimation failed: ${gasError.message}</div>`;
      // Use a default high value if estimation fails
      gasEstimate = 5000000;
    }
    
    // Send the transaction with specific settings
    const result = await mintMethod.send({ 
      from: accounts[0],
      gas: Math.floor(gasEstimate * 1.5), // Add 50% buffer
      gasPrice: web3.utils.toWei('20', 'gwei')
    });
    
    console.log("Transaction successful:", result.transactionHash);
    debugOutput.innerHTML += `<div style="color:green">Transaction successful: ${result.transactionHash}</div>`;
    
    // Get the token ID from the event
    let tokenId;
    if (result.events && result.events.NFTMinted) {
      tokenId = result.events.NFTMinted.returnValues.tokenId;
      console.log("NFT minted with token ID:", tokenId);
      debugOutput.innerHTML += `<div style="color:green">NFT minted with token ID: ${tokenId}</div>`;
    } else {
      console.log("Minting successful but couldn't extract token ID from events");
      tokenId = "unknown";
    }
    
    updateStatusMessage('mint-status', `NFT minted successfully! Token ID: ${tokenId}`, 'success');
    
    // Reset form and reload NFTs
    document.getElementById('nft-form').reset();
    document.getElementById('preview-image').style.display = 'none';
    loadNFTs();
  } catch (error) {
    console.error("Error minting NFT:", error);
    debugOutput.innerHTML += `<div style="color:red">Error: ${error.message}</div>`;
    
    // Create a detailed error message
    let errorMessage = error.message || "Unknown error";
    
    // Check for specific errors
    if (errorMessage.includes("Internal JSON-RPC error")) {
      errorMessage = "Internal JSON-RPC error. This usually means one of the following:\n" +
        "1. MetaMask can't communicate with Ganache properly\n" +
        "2. The metadata might be too large for the transaction\n" + 
        "3. Your account might not have enough ETH for gas fees";
      
      debugOutput.innerHTML += `<div style="color:orange">Possible solutions:</div>`;
      debugOutput.innerHTML += `<div>1. Make sure Ganache is running on port 7545</div>`;
      debugOutput.innerHTML += `<div>2. Try using a smaller image</div>`;
      debugOutput.innerHTML += `<div>3. Make sure your account has enough ETH</div>`;
    }
    
    updateStatusMessage('mint-status', `Error minting NFT: ${errorMessage}`, 'danger');
  } finally {
    hideSpinner('mint-spinner', 'mintBtn');
  }
}

// Function to compress and convert image to base64
async function compressAndConvertImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas for compression
        const canvas = document.createElement('canvas');
        
        // Calculate new dimensions (max 800px width/height)
        let width = img.width;
        let height = img.height;
        const maxDimension = 800;
        
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        
        // Resize the image
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 with compression
        const quality = 0.7; // 70% quality
        const base64 = canvas.toDataURL('image/jpeg', quality);
        
        resolve(base64);
      };
      img.onerror = reject;
      img.src = event.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function transferNFT(event) {
  event.preventDefault();
  
  if (!isConnected()) {
    updateStatusMessage('transfer-status', "Please connect to MetaMask and verify contract address", 'danger');
    return;
  }
  
  const tokenId = document.getElementById('token-id').value;
  const recipientAddress = document.getElementById('recipient-address').value;
  
  if (!tokenId || !recipientAddress) {
    updateStatusMessage('transfer-status', "Please provide a token ID and recipient address", 'warning');
    return;
  }

  try {
    showSpinner('transfer-spinner', 'transferBtn');
    updateStatusMessage('transfer-status', "Processing transfer... Please wait", 'info');
    
    // Verify ownership
    const owner = await nftContract.methods.ownerOf(tokenId).call();
    if (owner.toLowerCase() !== accounts[0].toLowerCase()) {
      throw new Error("You don't own this NFT");
    }
    
    // Transfer NFT
    await nftContract.methods.transferFrom(accounts[0], recipientAddress, tokenId)
      .send({ from: accounts[0] });
    
    updateStatusMessage('transfer-status', `NFT transferred successfully to ${recipientAddress}`, 'success');
    document.getElementById('transfer-form').reset();
    loadNFTs();
  } catch (error) {
    updateStatusMessage('transfer-status', `Error transferring NFT: ${error.message}`, 'danger');
  } finally {
    hideSpinner('transfer-spinner', 'transferBtn');
  }
}

async function loadNFTs() {
  if (!isConnected()) return;
  
  const nftContainer = document.getElementById('nft-container');
  const noNftsMessage = document.getElementById('no-nfts-message');
  
  try {
    nftContainer.innerHTML = '';
    
    const totalTokens = await nftContract.methods.getTokenCount().call();
    let userNftsCount = 0;
    
    for (let i = 1; i <= totalTokens; i++) {
      try {
        const owner = await nftContract.methods.ownerOf(i).call();
        
        if (owner.toLowerCase() === accounts[0].toLowerCase()) {
          userNftsCount++;
          await displayNFT(i, nftContainer);
        }
      } catch (error) {
        console.error(`Error checking token ${i}:`, error);
      }
    }
    
    noNftsMessage.style.display = userNftsCount === 0 ? 'block' : 'none';
  } catch (error) {
    console.error("Error loading NFTs:", error);
  }
}

async function displayNFT(tokenId, container) {
  try {
    const tokenURIData = await nftContract.methods.tokenURI(tokenId).call();
    let metadata, nftCard;
    
    try {
      metadata = JSON.parse(tokenURIData);
      nftCard = createNFTCard(tokenId, metadata.name, metadata.description, metadata.image);
    } catch {
      nftCard = createNFTCard(tokenId, `NFT #${tokenId}`, 'Unable to parse metadata', null);
    }
    
    container.appendChild(nftCard);
  } catch (error) {
    console.error(`Error displaying NFT ${tokenId}:`, error);
  }
}

function createNFTCard(tokenId, name, description, imageUrl) {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'col-md-4 mb-4';
  
  let imageHtml = '';
  if (imageUrl) {
    imageHtml = `<img src="${imageUrl}" class="card-img-top nft-image" alt="${name}">`;
  }
  
  cardDiv.innerHTML = `
    <div class="card">
      ${imageHtml}
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${description || 'No description'}</p>
        <p class="card-text"><small class="text-muted">Token ID: ${tokenId}</small></p>
      </div>
    </div>
  `;
  
  return cardDiv;
}

// Helper functions
function isConnected() {
  return web3 && nftContract && accounts && accounts.length > 0;
}

function showSpinner(spinnerId, buttonId) {
  document.getElementById(spinnerId).style.display = 'inline-block';
  document.getElementById(buttonId).disabled = true;
}

function hideSpinner(spinnerId, buttonId) {
  document.getElementById(spinnerId).style.display = 'none';
  document.getElementById(buttonId).disabled = false;
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
