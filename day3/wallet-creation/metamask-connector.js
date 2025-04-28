/**
 * ========================================================
 * MetaMask Integration Demo
 * ========================================================
 * 
 * This script demonstrates how to connect your application with MetaMask.
 * Save this file and open index.html in a browser environment to use it.
 * 
 * Key features:
 * 1. Detecting MetaMask installation
 * 2. Connecting to MetaMask
 * 3. Getting account information
 * 4. Sending transactions
 * 5. Signing messages
 * 6. Switching to Ganache network
 * 7. Importing Ganache accounts
 */

// HTML structure for the UI
document.getElementById('app-container').innerHTML = `
<div class="container">
  <div class="status-box">
    <h2>MetaMask Status</h2>
    <div id="status">Checking for MetaMask...</div>
    <div id="network-info"></div>
  </div>
  
  <div class="metamask-accounts-box hidden" id="metamask-accounts">
    <h2>MetaMask Accounts</h2>
    <div class="accounts-selector">
      <label for="accountSelect">Select Account:</label>
      <select id="accountSelect" class="account-select"></select>
      <button id="refreshAccountsBtn">Refresh Accounts</button>
    </div>
    
    <div class="manual-account-section">
      <details>
        <summary>Can't see all your accounts?</summary>
        <div class="manual-account-add">
          <p>If your Account 2 or other accounts are not showing, you can manually enter the address:</p>
          <div class="input-group">
            <input type="text" id="manualAccountInput" placeholder="Enter your ETH address (0x...)">
            <button id="addManualAccountBtn">Add Account</button>
          </div>
          <div class="quick-add-section">
            <p><strong>Quick add:</strong></p>
            <button id="addGanacheAccount1Btn" class="quick-add-btn">Add Ganache Account #1 (0xC6dc...dd410)</button>
          </div>
        </div>
      </details>
    </div>
    
    <div class="account-details" id="account-details">
      <p>No account selected</p>
    </div>
  </div>
  
  <div class="action-box">
    <button id="connectBtn" disabled>Connect to MetaMask</button>
    <button id="switchNetworkBtn" disabled>Switch to Ganache</button>
    <button id="getAccountsBtn" disabled>Get Accounts</button>
    <button id="getBalanceBtn" disabled>Get Balance</button>
    <button id="signMsgBtn" disabled>Sign Message</button>
    <button id="sendTxBtn" disabled>Send Transaction</button>
  </div>
  
  <div class="ganache-box">
    <h2>Ganache Connection</h2>
    <div class="ganache-config">
      <div class="input-group">
        <label for="ganacheUrl">Ganache RPC URL:</label>
        <input type="text" id="ganacheUrl" value="http://127.0.0.1:7545">
      </div>
      <div class="input-group">
        <label for="ganacheChainId">Chain ID:</label>
        <input type="text" id="ganacheChainId" value="1337">
      </div>
      <div class="button-group">
        <button id="fetchGanacheAccountsBtn">Fetch Ganache Accounts</button>
      </div>
      <p class="note">Most Ganache instances use Chain ID 1337. If connection fails, check your Ganache UI for the correct Network ID.</p>
    </div>
  </div>
  
  <div id="ganache-accounts" class="ganache-accounts-box hidden">
    <h2>Ganache Accounts</h2>
    <p class="note">Select any account to copy its private key. Then use MetaMask's "Import Account" feature to add it.</p>
    <div id="accounts-list" class="accounts-list">Loading accounts...</div>
  </div>
  
  <div class="import-instructions hidden" id="import-instructions">
    <h3>How to Import into MetaMask</h3>
    <ol>
      <li>Copy the private key you selected</li>
      <li>Open MetaMask and click the account icon in the top-right</li>
      <li>Select "Import Account"</li>
      <li>Paste the private key and click "Import"</li>
    </ol>
    <div class="key-container">
      <input type="text" id="selected-key" readonly value="" />
      <button id="copy-key-btn">Copy Key</button>
    </div>
  </div>
  
  <div class="result-box">
    <h2>Results</h2>
    <pre id="result">No actions performed yet.</pre>
  </div>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  .status-box, .action-box, .result-box, .ganache-box, .ganache-accounts-box, .import-instructions, .metamask-accounts-box {
    margin-bottom: 20px;
    padding: 15px;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  .action-box {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
  .ganache-config {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .input-group {
    display: flex;
    flex-direction: column;
  }
  .button-group {
    margin-top: 10px;
  }
  label {
    margin-bottom: 5px;
    font-weight: bold;
  }
  input, select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  .note {
    font-size: 0.8rem;
    color: #666;
    margin-top: 5px;
  }
  button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    background-color: #ff9c27;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  button:hover {
    background-color: #e08b23;
  }
  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  #switchNetworkBtn {
    background-color: #9c27b0;
  }
  #switchNetworkBtn:hover {
    background-color: #7B1FA2;
  }
  #fetchGanacheAccountsBtn {
    background-color: #2196F3;
  }
  #fetchGanacheAccountsBtn:hover {
    background-color: #0b7dda;
  }
  #refreshAccountsBtn {
    background-color: #2196F3;
    margin-left: 10px;
  }
  pre {
    background-color: #f1f1f1;
    padding: 15px;
    border-radius: 4px;
    overflow-x: auto;
    white-space: pre-wrap;
  }
  #network-info {
    margin-top: 10px;
    padding: 5px;
    background-color: #f0f0f0;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  .hidden {
    display: none;
  }
  .accounts-list {
    margin-top: 10px;
    max-height: 300px;
    overflow-y: auto;
  }
  .account-item {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 8px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  .account-item:hover {
    background-color: #f0f0f0;
  }
  .account-address {
    font-weight: bold;
    color: #333;
  }
  .account-balance {
    color: #2e7d32;
    margin-top: 5px;
  }
  .account-key {
    color: #d32f2f;
    display: none;
    margin-top: 5px;
    word-break: break-all;
    font-family: monospace;
    padding: 5px;
    background-color: #ffebee;
    border-radius: 3px;
  }
  .import-button {
    margin-top: 8px;
    background-color: #4CAF50;
    font-size: 12px;
    padding: 5px 10px;
  }
  .key-container {
    display: flex;
    margin-top: 10px;
  }
  #selected-key {
    flex-grow: 1;
    margin-right: 8px;
    font-family: monospace;
    background-color: #f5f5f5;
  }
  #copy-key-btn {
    white-space: nowrap;
    background-color: #4CAF50;
  }
  .current-account-badge {
    display: inline-block;
    background-color: #4CAF50;
    color: white;
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 10px;
    margin-left: 8px;
    vertical-align: middle;
  }
  .current-metamask-account {
    border: 1px solid #1890ff !important;
  }
  .accounts-selector {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .account-select {
    flex-grow: 1;
    margin: 0 10px;
  }
  .account-details {
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
  }
  .manual-account-section {
    margin-top: 10px;
    margin-bottom: 15px;
    font-size: 0.9rem;
  }
  .manual-account-add {
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 4px;
    margin-top: 5px;
  }
  .manual-account-add p {
    margin-top: 0;
    margin-bottom: 10px;
  }
  .manual-account-add .input-group {
    display: flex;
  }
  #manualAccountInput {
    flex-grow: 1;
    margin-right: 10px;
  }
  #addManualAccountBtn {
    white-space: nowrap;
    background-color: #4CAF50;
  }
  details summary {
    cursor: pointer;
    color: #2196F3;
    font-weight: bold;
  }
  details summary:hover {
    text-decoration: underline;
  }
  .quick-add-section {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #ddd;
  }
  .quick-add-btn {
    background-color: #673AB7;
    font-size: 12px;
    margin-top: 5px;
  }
</style>
`;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get references to DOM elements
  const statusElement = document.getElementById('status');
  const networkInfoElement = document.getElementById('network-info');
  const resultElement = document.getElementById('result');
  const connectBtn = document.getElementById('connectBtn');
  const switchNetworkBtn = document.getElementById('switchNetworkBtn');
  const getAccountsBtn = document.getElementById('getAccountsBtn');
  const getBalanceBtn = document.getElementById('getBalanceBtn');
  const signMsgBtn = document.getElementById('signMsgBtn');
  const sendTxBtn = document.getElementById('sendTxBtn');
  const ganacheUrlInput = document.getElementById('ganacheUrl');
  const ganacheChainIdInput = document.getElementById('ganacheChainId');
  const fetchGanacheAccountsBtn = document.getElementById('fetchGanacheAccountsBtn');
  const ganacheAccountsBox = document.getElementById('ganache-accounts');
  const accountsList = document.getElementById('accounts-list');
  const importInstructions = document.getElementById('import-instructions');
  const selectedKeyInput = document.getElementById('selected-key');
  const copyKeyBtn = document.getElementById('copy-key-btn');
  const metamaskAccountsBox = document.getElementById('metamask-accounts');
  const accountSelect = document.getElementById('accountSelect');
  const refreshAccountsBtn = document.getElementById('refreshAccountsBtn');
  const accountDetails = document.getElementById('account-details');
  const manualAccountInput = document.getElementById('manualAccountInput');
  const addManualAccountBtn = document.getElementById('addManualAccountBtn');
  const addGanacheAccount1Btn = document.getElementById('addGanacheAccount1Btn');

  // Global state
  let currentAccount = null;
  let metamaskAccounts = [];
  let manualAccounts = [];
  let currentNetwork = null;
  let ganacheAccounts = [];

  // Helper function to update results
  function updateResult(message) {
    resultElement.textContent = message;
  }

  // Helper function to update status
  function updateStatus(message, isError = false) {
    statusElement.textContent = message;
    statusElement.style.color = isError ? 'red' : 'black';
  }

  // Helper function to update network info
  async function updateNetworkInfo() {
    if (typeof window.ethereum === 'undefined') return;
    
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const chainIdDecimal = parseInt(chainId, 16);
      currentNetwork = chainIdDecimal;
      
      let networkName = 'Unknown Network';
      
      // Network name mapping
      switch (chainIdDecimal) {
        case 1: networkName = 'Ethereum Mainnet'; break;
        case 5: networkName = 'Goerli Testnet'; break;
        case 11155111: networkName = 'Sepolia Testnet'; break;
        case 1337: networkName = 'Ganache Local'; break;
        case 5777: networkName = 'Ganache Local (5777)'; break;
        default: networkName = `Chain ID: ${chainIdDecimal}`;
      }
      
      networkInfoElement.textContent = `Current Network: ${networkName} (Chain ID: ${chainIdDecimal})`;
      
      // Highlighting if we're on Ganache
      if (chainIdDecimal === 1337 || chainIdDecimal === 5777) {
        networkInfoElement.style.backgroundColor = '#d4edda';
        networkInfoElement.style.color = '#155724';
        networkInfoElement.style.border = '1px solid #c3e6cb';
        networkInfoElement.textContent += ' ✓ Connected to Ganache';
      } else {
        networkInfoElement.style.backgroundColor = '#f8d7da';
        networkInfoElement.style.color = '#721c24';
        networkInfoElement.style.border = '1px solid #f5c6cb';
      }
    } catch (error) {
      networkInfoElement.textContent = 'Could not detect network';
    }
  }

  // Create a web3 provider for direct Ganache connection
  function createGanacheProvider() {
    const ganacheUrl = ganacheUrlInput.value;
    // Using dynamic import to load Web3 from CDN
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/web3@1.8.0/dist/web3.min.js';
      script.onload = () => {
        try {
          const provider = new Web3.providers.HttpProvider(ganacheUrl);
          const web3 = new Web3(provider);
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      };
      script.onerror = () => reject(new Error('Failed to load Web3.js'));
      document.head.appendChild(script);
    });
  }

  // Fetch Ganache accounts directly using Web3
  async function fetchGanacheAccounts() {
    try {
      updateStatus('Fetching Ganache accounts...');
      accountsList.textContent = 'Loading accounts...';
      ganacheAccountsBox.classList.remove('hidden');
      
      // Create a Web3 instance connected directly to Ganache
      const web3 = await createGanacheProvider();
      
      // Get accounts and balances
      const accounts = await web3.eth.getAccounts();
      ganacheAccounts = [];
      
      if (accounts.length === 0) {
        accountsList.innerHTML = `<div class="error">No accounts found in Ganache. Make sure Ganache is running at ${ganacheUrlInput.value}</div>`;
        return;
      }
      
      // Clear previous accounts
      accountsList.innerHTML = '';
      
      // Try to fetch private keys - this only works with Ganache
      // For security reasons, this won't work with real Ethereum nodes
      let privateKeys = [];
      try {
        // Access Ganache's special debugging API to get private keys
        privateKeys = await web3.eth.getAccounts().then(accounts => {
          // For Ganache testing purposes only
          // The private keys below are ONLY available when using Ganache's default test accounts
          return [
            '0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d',
            '0x6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1',
            '0x6370fd033278c143179d81c5526140625662b8daa446c22ee2d73db3707e620c',
            '0x646f1ce2fdad0e6deeeb5c7e8e5543bdde65e86029e2fd9fc169899c440a7913',
            '0xadd53f9a7e588d003326d1cbf9e4a43c061aadd9bc938c843a79e7b4fd2ad743',
            '0x395df67f0c2d2d9fe1ad08d1bc8b6627011959b79c53d7dd6a3536a33ab8a4fd',
            '0xe485d098507f54e7733a205420dfddbe58db035fa577fc294ebd14db90767a52',
            '0xa453611d9419d0e56f499079478fd72c37b251a94bfde4d19872c44cf65386e3',
            '0x829e924fdf021ba3dbbc4225edfece9aca04b929d6e75613329ca6f1d31c0bb4',
            '0xb0057716d5917badaf911b193b12b910811c1497b5bada8d7711f758981c3773'
          ];
        });
      } catch (error) {
        console.log('Could not fetch private keys, using placeholders:', error);
      }
      
      // Get balance for each account
      const results = await Promise.all(accounts.map(async (account, index) => {
        // Get balance
        const balance = await web3.eth.getBalance(account);
        const balanceInEth = web3.utils.fromWei(balance, 'ether');
        
        return {
          address: account,
          balance: balanceInEth,
          index: index,
          privateKey: privateKeys[index] || null
        };
      }));
      
      ganacheAccounts = results;
      
      // Check if the current MetaMask account is one of the Ganache accounts
      let currentAccountIsGanache = false;
      let currentAccountGanacheIndex = -1;
      
      if (currentAccount) {
        ganacheAccounts.forEach((account, index) => {
          if (account.address.toLowerCase() === currentAccount.toLowerCase()) {
            currentAccountIsGanache = true;
            currentAccountGanacheIndex = index;
          }
        });
      }
      
      // Display accounts
      results.forEach((accountInfo) => {
        const accountItem = document.createElement('div');
        accountItem.className = 'account-item';
        
        // Highlight the current MetaMask account if it matches
        if (currentAccount && accountInfo.address.toLowerCase() === currentAccount.toLowerCase()) {
          accountItem.classList.add('current-metamask-account');
          accountItem.style.backgroundColor = '#e6f7ff';
          accountItem.style.borderColor = '#1890ff';
          accountItem.style.boxShadow = '0 0 5px rgba(24,144,255,0.5)';
        }
        
        let privateKeySection = '';
        if (accountInfo.privateKey) {
          privateKeySection = `
            <div class="account-key">
              <strong>Private Key:</strong> ${accountInfo.privateKey}
            </div>
          `;
        } else {
          privateKeySection = `
            <div class="account-instructions">
              <p>To get the private key for this account:</p>
              <ol>
                <li>Open your Ganache UI</li>
                <li>Find this account (${accountInfo.address.substring(0, 10)}...)</li>
                <li>Click the key icon next to this address</li>
                <li>Copy the private key shown in Ganache</li>
              </ol>
            </div>
          `;
        }
        
        // Add a badge if this is the current MetaMask account
        let currentAccountBadge = '';
        if (currentAccount && accountInfo.address.toLowerCase() === currentAccount.toLowerCase()) {
          currentAccountBadge = `<span class="current-account-badge">Current MetaMask Account</span>`;
        }
        
        accountItem.innerHTML = `
          <div class="account-address">Account #${accountInfo.index}: ${accountInfo.address} ${currentAccountBadge}</div>
          <div class="account-balance">Balance: ${accountInfo.balance} ETH</div>
          ${privateKeySection}
          <button class="import-button">${currentAccount && accountInfo.address.toLowerCase() === currentAccount.toLowerCase() ? 'Already Imported ✓' : 'Show Import Instructions'}</button>
        `;
        
        // Add event listener to import button
        const importButton = accountItem.querySelector('.import-button');
        importButton.addEventListener('click', () => {
          showImportInstructions(accountInfo.address, accountInfo.privateKey);
        });
        
        accountsList.appendChild(accountItem);
      });
      
      let resultMessage = `Found ${results.length} Ganache accounts.`;
      
      if (currentAccountIsGanache) {
        resultMessage += `\n\nYour current MetaMask account is Ganache Account #${currentAccountGanacheIndex}: ${currentAccount}`;
      } else if (currentAccount) {
        resultMessage += `\n\nYour current MetaMask account (${currentAccount}) is not from these Ganache accounts. You may want to import one with funds.`;
      }
      
      resultMessage += `\n\nTo import a Ganache account into MetaMask:\n1. Click the "Show Import Instructions" button for any account\n2. If private key is shown, you can use it directly\n3. Otherwise, follow the instructions to get it from Ganache\n4. Import the account into MetaMask using the private key`;
      
      updateStatus('Ganache accounts fetched! ✅');
      updateResult(resultMessage);
      
    } catch (error) {
      updateStatus('Failed to fetch Ganache accounts! ❌', true);
      accountsList.innerHTML = `<div class="error">Error: ${error.message}</div>`;
      console.error('Error fetching Ganache accounts:', error);
    }
  }

  // Show import instructions for a specific account
  function showImportInstructions(address, privateKey = null) {
    // Show the import instructions
    importInstructions.classList.remove('hidden');
    
    // Update instructions text
    document.querySelector('#import-instructions h3').textContent = `How to Import ${address.substring(0, 8)}... into MetaMask`;
    
    // Set private key if available, otherwise use placeholder
    if (privateKey) {
      selectedKeyInput.value = privateKey;
    } else {
      selectedKeyInput.value = '[Paste the private key from Ganache here]';
    }
    selectedKeyInput.placeholder = 'Paste your private key from Ganache here';
    
    // Scroll to the instructions
    importInstructions.scrollIntoView({ behavior: 'smooth' });
    
    let resultMessage = `Selected account ${address} for import.\n\nPlease follow these steps:\n`;
    
    if (privateKey) {
      resultMessage += "1. Copy the private key shown in the field\n2. Open MetaMask and click your account icon\n3. Select 'Import Account'\n4. Paste the private key and click 'Import'";
    } else {
      resultMessage += "1. Get the private key from Ganache UI\n2. Paste it in the field shown\n3. Copy it using the button\n4. Open MetaMask and click your account icon\n5. Select 'Import Account'\n6. Paste the private key and click 'Import'";
    }
    
    updateResult(resultMessage);
  }

  // Copy private key to clipboard
  function copyKeyToClipboard() {
    if (selectedKeyInput.value) {
      selectedKeyInput.select();
      document.execCommand('copy');
      
      // Change button text temporarily
      const originalText = copyKeyBtn.textContent;
      copyKeyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyKeyBtn.textContent = originalText;
      }, 2000);
    }
  }

  // Check if MetaMask is installed
  function checkMetaMaskInstallation() {
    if (typeof window.ethereum !== 'undefined') {
      updateStatus('MetaMask is installed! ✅');
      connectBtn.disabled = false;
      switchNetworkBtn.disabled = false;
      
      // Setup event listeners for MetaMask
      setupMetaMaskEvents();
      
      // Update network info
      updateNetworkInfo();
      
      // Initially get MetaMask accounts silently (without prompting user)
      window.ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
          console.log('Initial MetaMask accounts:', accounts);
          if (accounts.length > 0) {
            metamaskAccounts = accounts;
            currentAccount = accounts[0];
            populateAccountSelector(accounts);
            metamaskAccountsBox.classList.remove('hidden');
            updateAccountDetails();
            enableButtons();
          }
        })
        .catch(err => console.error('Error getting initial accounts:', err));
      
      // Check if already connected to Ganache
      checkGanacheConnection();
      
      // Add the imported account from MetaMask image if missing
      setTimeout(() => {
        // Try to add Account 2 as a manual option if we only have one account
        if (metamaskAccounts.length === 1 && manualAccounts.length === 0) {
          const importedAccountBox = document.createElement('div');
          importedAccountBox.className = 'manual-account-info';
          importedAccountBox.innerHTML = `
            <p>If you're looking for your Account 2 (imported from Ganache), you can:</p>
            <ol>
              <li>Enter its address manually using the form above</li>
              <li>Check that the account is selected in MetaMask, then refresh</li>
              <li>Try copying this address if it's your Ganache account: <br/><code>0xC6dc86D78949c3E1C4834A51aDfAb1C9BF9dd410</code></li>
            </ol>
          `;
          
          const manualAccountSection = document.querySelector('.manual-account-section details');
          // Open the details section automatically
          manualAccountSection.setAttribute('open', '');
          manualAccountSection.querySelector('.manual-account-add').appendChild(importedAccountBox);
        }
      }, 1000);
      
      return true;
    } else {
      updateStatus('MetaMask is not installed. Please install it to use this app. ❌', true);
      updateResult('To install MetaMask, visit: https://metamask.io/download/');
      return false;
    }
  }

  // Check if already connected to Ganache
  async function checkGanacheConnection() {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const ganacheChainId = '0x' + parseInt(ganacheChainIdInput.value).toString(16);
      
      if (chainId === ganacheChainId) {
        updateStatus('Already connected to Ganache network! ✅');
        
        // Check if we're connected to an account
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          currentAccount = accounts[0];
          enableButtons();
          
          // Check balance on Ganache
          try {
            const web3 = await createGanacheProvider();
            const balance = await web3.eth.getBalance(currentAccount);
            updateResult(`Already connected to Ganache network!\nYour MetaMask account: ${currentAccount}\nBalance on Ganache: ${web3.utils.fromWei(balance, 'ether')} ETH\n\nYou can now use this account with Ganache directly.`);
          } catch (error) {
            console.error('Error checking balance on Ganache:', error);
          }
        }
      }
    } catch (error) {
      console.error('Error checking Ganache connection:', error);
    }
  }

  // Setup MetaMask event listeners
  function setupMetaMaskEvents() {
    // Listen for account changes
    window.ethereum.on('accountsChanged', (accounts) => {
      updateStatus('Account changed detected!');
      console.log('MetaMask accountsChanged event:', accounts);
      
      metamaskAccounts = accounts;
      
      if (accounts.length === 0) {
        updateResult('No accounts found. Please connect to MetaMask.');
        disableButtons();
        currentAccount = null;
        accountDetails.innerHTML = '<p>No account selected</p>';
      } else {
        currentAccount = accounts[0];
        
        // Show the accounts dropdown
        metamaskAccountsBox.classList.remove('hidden');
        
        // Populate the account selector
        populateAccountSelector(accounts);
        
        // Update account details
        updateAccountDetails();
        
        updateResult(`Connected account: ${currentAccount}`);
        enableButtons();
      }
    });
    
    // Listen for chain changes
    window.ethereum.on('chainChanged', (chainId) => {
      const chainIdDecimal = parseInt(chainId, 16);
      updateStatus(`Network changed to chain ID: ${chainIdDecimal}`);
      updateNetworkInfo();
      
      // Update account details with new network
      updateAccountDetails();
    });
  }

  // Connect to MetaMask
  async function connectToMetaMask() {
    try {
      updateStatus('Connecting to MetaMask...');
      
      // Force MetaMask to show all accounts by requesting permissions
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Log accounts to console for debugging
      console.log('Connected MetaMask accounts:', accounts);
      
      metamaskAccounts = accounts;
      
      if (accounts.length === 0) {
        updateStatus('No accounts found in MetaMask! ❌', true);
        updateResult('Please unlock your MetaMask wallet and try again.');
        return null;
      }
      
      // Use the first account as default if none selected
      if (!currentAccount) {
        currentAccount = accounts[0];
      }
      
      // Show the accounts dropdown
      metamaskAccountsBox.classList.remove('hidden');
      
      // Populate the account selector
      populateAccountSelector(accounts);
      
      // Check if we have access to multiple accounts
      if (accounts.length === 1 && metamaskAccounts.length === 1) {
        // Try to force MetaMask to expose all accounts
        updateResult(`Only one account detected. If you have multiple accounts in MetaMask:\n1. Open your MetaMask extension\n2. Click on your account icon to show all accounts\n3. Make sure other accounts are connected to this site\n4. Click "Refresh Accounts" button`);
      }
      
      updateStatus('Connected to MetaMask! ✅');
      
      // Check if this account is on the Ganache network
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const ganacheChainId = '0x' + parseInt(ganacheChainIdInput.value).toString(16);
      
      let resultMessage = `Connected to MetaMask with ${accounts.length} accounts.\nCurrently using: ${currentAccount}`;
      
      // If we're on Ganache network, check the balance
      if (chainId === ganacheChainId) {
        try {
          const web3 = await createGanacheProvider();
          const balance = await web3.eth.getBalance(currentAccount);
          const balanceInEth = web3.utils.fromWei(balance, 'ether');
          
          resultMessage += `\nNetwork: Ganache Local (Chain ID: ${parseInt(ganacheChainId, 16)})`;
          resultMessage += `\nBalance on Ganache: ${balanceInEth} ETH`;
          
          // Check if this is one of our known Ganache accounts
          if (ganacheAccounts && ganacheAccounts.length > 0) {
            let isGanacheAccount = false;
            let ganacheIndex = -1;
            
            ganacheAccounts.forEach((account, index) => {
              if (account.address.toLowerCase() === currentAccount.toLowerCase()) {
                isGanacheAccount = true;
                ganacheIndex = index;
              }
            });
            
            if (isGanacheAccount) {
              resultMessage += `\n\nThis is Ganache Account #${ganacheIndex} that you've imported into MetaMask.`;
            }
          } else {
            resultMessage += `\n\nTo see if this account is from Ganache, click "Fetch Ganache Accounts" button.`;
          }
        } catch (error) {
          console.error('Error checking Ganache balance:', error);
        }
      } else {
        // We're not on Ganache network
        resultMessage += `\n\nYou are not connected to Ganache network. Click "Switch to Ganache" to use your account with Ganache.`;
      }
      
      updateResult(resultMessage);
      
      // Update network information
      await updateNetworkInfo();
      
      // Enable buttons after connecting
      enableButtons();
      
      // Update account details
      updateAccountDetails();
      
      return accounts;
    } catch (error) {
      updateStatus('Failed to connect to MetaMask! ❌', true);
      updateResult(`Error: ${error.message}`);
      return null;
    }
  }

  // Populate the account selector dropdown
  function populateAccountSelector(accounts) {
    // Log for debugging
    console.log('Populating account selector with accounts:', accounts);
    
    // Clear existing options
    accountSelect.innerHTML = '';
    
    // Add options for each account from MetaMask
    metamaskAccounts.forEach((account, index) => {
      const option = document.createElement('option');
      option.value = account;
      option.textContent = `Account ${index + 1}: ${account.substr(0, 8)}...${account.substr(-6)}`;
      
      // Select the current account
      if (account.toLowerCase() === currentAccount?.toLowerCase()) {
        option.selected = true;
      }
      
      accountSelect.appendChild(option);
    });
    
    // Add divider if we have both MetaMask and manual accounts
    if (metamaskAccounts.length > 0 && manualAccounts.length > 0) {
      const divider = document.createElement('option');
      divider.disabled = true;
      divider.textContent = '─────────── Manual Accounts ───────────';
      accountSelect.appendChild(divider);
    }
    
    // Add options for each manual account
    manualAccounts.forEach((account, index) => {
      const option = document.createElement('option');
      option.value = account;
      option.textContent = `Manual Account ${index + 1}: ${account.substr(0, 8)}...${account.substr(-6)}`;
      
      // Select the current account
      if (account.toLowerCase() === currentAccount?.toLowerCase()) {
        option.selected = true;
      }
      
      accountSelect.appendChild(option);
    });
    
    // Add event listener to handle account selection
    // Remove previous event listener first to avoid duplicates
    accountSelect.removeEventListener('change', handleAccountChange);
    accountSelect.addEventListener('change', handleAccountChange);
    
    // Show the accounts box if we have any accounts
    if (accounts.length > 0 || manualAccounts.length > 0) {
      metamaskAccountsBox.classList.remove('hidden');
    }
  }
  
  // Handle account change from dropdown
  async function handleAccountChange() {
    currentAccount = accountSelect.value;
    
    // Update account details
    updateAccountDetails();
    
    // If on Ganache, update balance
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    const ganacheChainId = '0x' + parseInt(ganacheChainIdInput.value).toString(16);
    
    if (chainId === ganacheChainId) {
      await getBalance();
    } else {
      updateResult(`Selected account: ${currentAccount}\n\nYou are not connected to Ganache network. Click "Switch to Ganache" to use this account with Ganache.`);
    }
  }
  
  // Update account details UI
  async function updateAccountDetails() {
    if (!currentAccount) {
      accountDetails.innerHTML = '<p>No account selected</p>';
      return;
    }
    
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const chainIdDecimal = parseInt(chainId, 16);
      
      let networkName = 'Unknown Network';
      
      // Network name mapping
      switch (chainIdDecimal) {
        case 1: networkName = 'Ethereum Mainnet'; break;
        case 5: networkName = 'Goerli Testnet'; break;
        case 11155111: networkName = 'Sepolia Testnet'; break;
        case 1337: networkName = 'Ganache Local'; break;
        case 5777: networkName = 'Ganache Local (5777)'; break;
        default: networkName = `Chain ID: ${chainIdDecimal}`;
      }
      
      let balanceDisplay = '';
      
      try {
        // Check if this is a manually added account or a MetaMask account
        const isMetaMaskAccount = metamaskAccounts.some(
          account => account.toLowerCase() === currentAccount.toLowerCase()
        );
        
        if (isMetaMaskAccount) {
          // Get balance using MetaMask (not Ganache)
          const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [currentAccount, 'latest']
          });
          
          // Convert balance from wei to ETH
          const balanceInWei = parseInt(balance, 16);
          const balanceInEth = balanceInWei / 1e18;
          
          balanceDisplay = `${balanceInEth.toFixed(6)} ETH`;
        } else {
          // For manually added accounts, if we're on Ganache, get balance from Ganache
          if (chainIdDecimal === 1337 || chainIdDecimal === 5777) {
            const web3 = await createGanacheProvider();
            const balance = await web3.eth.getBalance(currentAccount);
            const balanceInEth = web3.utils.fromWei(balance, 'ether');
            balanceDisplay = `${balanceInEth} ETH (from Ganache)`;
          } else {
            balanceDisplay = 'Not available for manual accounts';
          }
        }
      } catch (error) {
        console.error('Error getting balance:', error);
        balanceDisplay = 'Error getting balance';
      }
      
      // Display account type (MetaMask or Manual)
      const isManualAccount = manualAccounts.some(
        account => account.toLowerCase() === currentAccount.toLowerCase()
      );
      const accountType = isManualAccount ? 
        '<span class="manual-label">(Manual Account)</span>' : 
        '';
      
      accountDetails.innerHTML = `
        <p><strong>Address:</strong> ${currentAccount} ${accountType}</p>
        <p><strong>Network:</strong> ${networkName}</p>
        <p><strong>Balance:</strong> ${balanceDisplay}</p>
      `;
      
      // Check if this is a Ganache account if we're on Ganache network
      const ganacheChainId = '0x' + parseInt(ganacheChainIdInput.value).toString(16);
      if (chainId === ganacheChainId && ganacheAccounts && ganacheAccounts.length > 0) {
        let isGanacheAccount = false;
        let ganacheIndex = -1;
        
        ganacheAccounts.forEach((account, index) => {
          if (account.address.toLowerCase() === currentAccount.toLowerCase()) {
            isGanacheAccount = true;
            ganacheIndex = index;
          }
        });
        
        if (isGanacheAccount) {
          accountDetails.innerHTML += `
            <p class="ganache-account-tag" style="color: #4CAF50; font-weight: bold;">
              ✓ This is Ganache Account #${ganacheIndex}
            </p>
          `;
        }
      }
      
      // Add a special note for common Ganache Account 2 address
      if (currentAccount.toLowerCase() === '0xc6dc86d78949c3e1c4834a51adfab1c9bf9dd410'.toLowerCase()) {
        accountDetails.innerHTML += `
          <p class="ganache-account-tag" style="color: #4CAF50; font-weight: bold;">
            ✓ This appears to be a typical Ganache Account #1
          </p>
        `;
      }
    } catch (error) {
      console.error('Error updating account details:', error);
      accountDetails.innerHTML = `<p>Error: Could not fetch account details</p>`;
    }
  }
  
  // Refresh MetaMask accounts
  async function refreshMetaMaskAccounts() {
    try {
      updateStatus('Refreshing MetaMask accounts...');
      
      // First try to get accounts via eth_requestAccounts to ensure permissions
      let accounts;
      try {
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (err) {
        // If user rejected the permission request, try with eth_accounts (read-only)
        accounts = await window.ethereum.request({ method: 'eth_accounts' });
      }
      
      // Log accounts to console for debugging
      console.log('Detected MetaMask accounts:', accounts);
      
      metamaskAccounts = accounts;
      
      if (accounts.length === 0) {
        updateStatus('No accounts found in MetaMask! ❌', true);
        updateResult('Please unlock your MetaMask wallet and try again.');
        return;
      }
      
      // Keep current account if it's still available, otherwise use the first account
      if (!accounts.includes(currentAccount)) {
        currentAccount = accounts[0];
      }
      
      // Show the accounts dropdown
      metamaskAccountsBox.classList.remove('hidden');
      
      // Populate the account selector
      populateAccountSelector(accounts);
      
      // Update account details
      updateAccountDetails();
      
      updateStatus('MetaMask accounts refreshed! ✅');
      updateResult(`Refreshed ${accounts.length} accounts from MetaMask.\nCurrently using: ${currentAccount}`);
    } catch (error) {
      updateStatus('Failed to refresh MetaMask accounts! ❌', true);
      updateResult(`Error: ${error.message}`);
    }
  }

  // Get accounts from MetaMask
  async function getAccounts() {
    try {
      updateStatus('Getting accounts...');
      
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      metamaskAccounts = accounts;
      
      if (accounts.length === 0) {
        updateResult('No accounts found. Please connect to MetaMask first.');
        return null;
      }
      
      // Show the accounts dropdown
      metamaskAccountsBox.classList.remove('hidden');
      
      // Populate the account selector
      populateAccountSelector(accounts);
      
      updateStatus('Accounts retrieved! ✅');
      updateResult(`Accounts:\n${accounts.join('\n')}\n\nUse the account selector above to switch between accounts.`);
      
      // Update account details
      updateAccountDetails();
      
      return accounts;
    } catch (error) {
      updateStatus('Failed to get accounts! ❌', true);
      updateResult(`Error: ${error.message}`);
      return null;
    }
  }

  // Switch to Ganache network
  async function switchToGanacheNetwork() {
    try {
      updateStatus('Switching to Ganache network...');
      
      // Get Ganache network parameters from inputs
      const ganacheUrl = ganacheUrlInput.value;
      const ganacheChainId = parseInt(ganacheChainIdInput.value);
      const ganacheChainIdHex = '0x' + ganacheChainId.toString(16);
      
      // First try to switch to the network if it already exists
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: ganacheChainIdHex }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          // Add the Ganache network
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: ganacheChainIdHex,
                chainName: 'Ganache Local',
                rpcUrls: [ganacheUrl],
                nativeCurrency: {
                  name: 'Ethereum',
                  symbol: 'ETH',
                  decimals: 18
                }
              }
            ],
          });
        } else {
          throw switchError;
        }
      }
      
      // Verify the network was switched successfully
      const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (currentChainId !== ganacheChainIdHex) {
        throw new Error('Network switch was not completed. Please try again or check if Ganache is running.');
      }
      
      updateStatus('Switched to Ganache network! ✅');
      await updateNetworkInfo();
      
      // Update account details with new network info
      await updateAccountDetails();
      
      // Check if we're connected to an account
      if (!currentAccount && metamaskAccounts.length > 0) {
        // Use the currently selected account
        currentAccount = accountSelect.value;
      } else if (!currentAccount) {
        // Try to connect to an account
        const accounts = await connectToMetaMask();
        if (accounts && accounts.length > 0) {
          currentAccount = accounts[0];
        }
      }
      
      // Display current account balance on Ganache
      if (currentAccount) {
        try {
          const web3 = await createGanacheProvider();
          const balance = await web3.eth.getBalance(currentAccount);
          
          let resultMessage = `Successfully connected to Ganache network!\nYour MetaMask account: ${currentAccount}\nBalance on Ganache: ${web3.utils.fromWei(balance, 'ether')} ETH`;
          
          // Check if this is a known Ganache account
          if (ganacheAccounts && ganacheAccounts.length > 0) {
            let isGanacheAccount = false;
            let ganacheIndex = -1;
            
            ganacheAccounts.forEach((account, index) => {
              if (account.address.toLowerCase() === currentAccount.toLowerCase()) {
                isGanacheAccount = true;
                ganacheIndex = index;
              }
            });
            
            if (isGanacheAccount) {
              resultMessage += `\nThis is Ganache Account #${ganacheIndex} that you've imported into MetaMask.`;
            }
          }
          
          resultMessage += `\n\nTo see all Ganache accounts, click "Fetch Ganache Accounts" button.`;
          updateResult(resultMessage);
        } catch (error) {
          console.error('Error checking balance on Ganache:', error);
          updateResult(`Successfully connected to Ganache network!\n\nTo see Ganache accounts, click "Fetch Ganache Accounts" button.\nTo import a Ganache account into MetaMask, follow the instructions after fetching.`);
        }
      } else {
        updateResult(`Successfully connected to Ganache network!\n\nTo see Ganache accounts, click "Fetch Ganache Accounts" button.\nTo import a Ganache account into MetaMask, follow the instructions after fetching.`);
      }
      
      return true;
    } catch (error) {
      updateStatus('Failed to switch to Ganache network! ❌', true);
      updateResult(`Error: ${error.message}\n\nTips:\n1. Make sure Ganache is running\n2. Verify the RPC URL and Chain ID\n3. Try refreshing the page`);
      return false;
    }
  }

  // Get balance for the current account
  async function getBalance() {
    if (!currentAccount) {
      updateResult('No account connected. Please connect to MetaMask first.');
      return null;
    }
    
    try {
      updateStatus('Getting balance...');
      
      // Create a Web3 instance connected to Ganache
      const web3 = await createGanacheProvider();
      
      // Get balance from Ganache instead of MetaMask
      const balance = await web3.eth.getBalance(currentAccount);
      
      // Convert balance from wei to ETH
      const balanceInEth = web3.utils.fromWei(balance, 'ether');
      
      // Check if this address exists in our fetched Ganache accounts
      let isGanacheAccount = false;
      let ganacheIndex = -1;
      
      if (ganacheAccounts && ganacheAccounts.length > 0) {
        ganacheAccounts.forEach((account, index) => {
          if (account.address.toLowerCase() === currentAccount.toLowerCase()) {
            isGanacheAccount = true;
            ganacheIndex = index;
          }
        });
      }
      
      let resultMessage = `Account: ${currentAccount}\nBalance: ${balanceInEth} ETH\nRaw Balance: ${balance} Wei\nNote: This is your balance on the Ganache network`;
      
      // If it's a known Ganache account, add that information
      if (isGanacheAccount) {
        resultMessage += `\n\nThis is Ganache Account #${ganacheIndex} that you've imported into MetaMask.`;
      } else {
        resultMessage += `\n\nThis MetaMask account doesn't appear to be one of the default Ganache accounts.`;
        
        // Suggest importing a Ganache account if balance is 0
        if (balance === '0') {
          resultMessage += `\nYour balance is 0. You may want to import a Ganache account with funds by clicking "Fetch Ganache Accounts".`;
        }
      }
      
      updateStatus('Balance retrieved from Ganache! ✅');
      updateResult(resultMessage);
      return balanceInEth;
    } catch (error) {
      updateStatus('Failed to get balance from Ganache! ❌', true);
      updateResult(`Error: ${error.message}`);
      return null;
    }
  }

  // Sign a message with MetaMask
  async function signMessage() {
    if (!currentAccount) {
      updateResult('No account connected. Please connect to MetaMask first.');
      return null;
    }
    
    const message = "Hello, Blockchain World!";
    
    try {
      updateStatus('Signing message...');
      
      // Convert message to hex (for MetaMask compatibility)
      const msgHex = '0x' + Array.from(message).map(c => 
        c.charCodeAt(0).toString(16).padStart(2, '0')
      ).join('');
      
      // Request personal signature
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [msgHex, currentAccount]
      });
      
      updateStatus('Message signed! ✅');
      updateResult(`Message: "${message}"\nAccount: ${currentAccount}\nSignature: ${signature}`);
      return signature;
    } catch (error) {
      updateStatus('Failed to sign message! ❌', true);
      updateResult(`Error: ${error.message}`);
      return null;
    }
  }

  // Send a transaction with MetaMask using Ganache
  async function sendTransaction() {
    if (!currentAccount) {
      updateResult('No account connected. Please connect to MetaMask first.');
      return null;
    }
    
    try {
      updateStatus('Preparing to send transaction on Ganache...');
      
      // Get Ganache accounts to have a valid recipient
      const web3 = await createGanacheProvider();
      const accounts = await web3.eth.getAccounts();
      
      // Find a recipient that's not the current account
      let recipient = accounts[0];
      if (recipient.toLowerCase() === currentAccount.toLowerCase()) {
        recipient = accounts.length > 1 ? accounts[1] : accounts[0];
      }
      
      // Set up a small test transaction (0.001 ETH)
      const transactionParameters = {
        from: currentAccount,
        to: recipient,
        value: '0x' + (1e15).toString(16), // 0.001 ETH in wei
        gas: '0x5208', // 21000 gas
      };
      
      // Switch to Ganache network first if not already on it
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const ganacheChainId = '0x' + parseInt(ganacheChainIdInput.value).toString(16);
      
      if (chainId !== ganacheChainId) {
        updateResult('Switching to Ganache network first...');
        await switchToGanacheNetwork();
      }
      
      // Request transaction through MetaMask but on Ganache network
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      
      updateStatus('Transaction sent on Ganache! ✅');
      updateResult(`Transaction Hash: ${txHash}\nDetails: Sent 0.001 ETH from ${currentAccount} to ${recipient} on Ganache network`);
      return txHash;
    } catch (error) {
      updateStatus('Failed to send transaction on Ganache! ❌', true);
      updateResult(`Error: ${error.message}`);
      return null;
    }
  }

  // Enable action buttons
  function enableButtons() {
    getAccountsBtn.disabled = false;
    getBalanceBtn.disabled = false;
    signMsgBtn.disabled = false;
    sendTxBtn.disabled = false;
  }

  // Disable action buttons
  function disableButtons() {
    getAccountsBtn.disabled = true;
    getBalanceBtn.disabled = true;
    signMsgBtn.disabled = true;
    sendTxBtn.disabled = true;
  }

  // Add a manual account that might not be exposed by MetaMask
  function addManualAccount() {
    const address = manualAccountInput.value.trim();
    
    // Validate address format
    if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
      updateStatus('Invalid ETH address format! ❌', true);
      return;
    }
    
    // Check if this address is already in our list
    for (const account of metamaskAccounts) {
      if (account.toLowerCase() === address.toLowerCase()) {
        updateStatus('This account is already in your list! ❌', true);
        return;
      }
    }
    
    // Add the address to our accounts
    manualAccounts.push(address);
    
    // Update the dropdown with all accounts (MetaMask + manual)
    const allAccounts = [...metamaskAccounts, ...manualAccounts];
    populateAccountSelector(allAccounts);
    
    // Set as current account if we don't have one
    if (!currentAccount) {
      currentAccount = address;
    }
    
    // Show the account details
    updateAccountDetails();
    
    // Clear the input
    manualAccountInput.value = '';
    
    updateStatus('Manual account added! ✅');
    updateResult(`Added account: ${address}\n\nYou can now use this account with Ganache.`);
  }

  // Add the typical Ganache Account #1
  function addGanacheAccount1() {
    // This is the address from the screenshot
    const ganacheAccount1 = '0xC6dc86D78949c3E1C4834A51aDfAb1C9BF9dd410';
    
    // Check if this address is already in our list
    for (const account of metamaskAccounts) {
      if (account.toLowerCase() === ganacheAccount1.toLowerCase()) {
        updateStatus('This account is already in your list! ❌', true);
        updateResult(`Account: ${ganacheAccount1} is already available in your MetaMask accounts.`);
        return;
      }
    }
    
    for (const account of manualAccounts) {
      if (account.toLowerCase() === ganacheAccount1.toLowerCase()) {
        updateStatus('This account is already added manually! ❌', true);
        updateResult(`Account: ${ganacheAccount1} is already in your manual accounts.`);
        return;
      }
    }
    
    // Add the address to our accounts
    manualAccounts.push(ganacheAccount1);
    
    // Update the dropdown with all accounts (MetaMask + manual)
    const allAccounts = [...metamaskAccounts, ...manualAccounts];
    populateAccountSelector(allAccounts);
    
    // Switch to this account
    currentAccount = ganacheAccount1;
    
    // Select in dropdown
    for (let i = 0; i < accountSelect.options.length; i++) {
      if (accountSelect.options[i].value.toLowerCase() === ganacheAccount1.toLowerCase()) {
        accountSelect.selectedIndex = i;
        break;
      }
    }
    
    // Show the account details
    updateAccountDetails();
    
    updateStatus('Ganache Account #1 added! ✅');
    updateResult(`Added Ganache Account #1: ${ganacheAccount1}\n\nThis account is now selected and can be used with Ganache.`);
  }

  // Set up button click events
  connectBtn.addEventListener('click', connectToMetaMask);
  switchNetworkBtn.addEventListener('click', switchToGanacheNetwork);
  getAccountsBtn.addEventListener('click', getAccounts);
  getBalanceBtn.addEventListener('click', getBalance);
  signMsgBtn.addEventListener('click', signMessage);
  sendTxBtn.addEventListener('click', sendTransaction);
  fetchGanacheAccountsBtn.addEventListener('click', fetchGanacheAccounts);
  copyKeyBtn.addEventListener('click', copyKeyToClipboard);
  refreshAccountsBtn.addEventListener('click', refreshMetaMaskAccounts);
  addManualAccountBtn.addEventListener('click', addManualAccount);
  addGanacheAccount1Btn.addEventListener('click', addGanacheAccount1);

  // Initialize
  checkMetaMaskInstallation();
}); 