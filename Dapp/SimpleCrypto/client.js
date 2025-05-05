/**
 * SimpleCrypto Client
 * This script connects to a running blockchain node on another computer
 * and allows interaction with the SimpleToken contract.
 */

const Web3 = require('web3');
const fs = require('fs');
const readline = require('readline');

// Replace with the IP address from the host computer
const hostIP = '192.168.x.x'; // <-- CHANGE THIS to the IP shown by the host computer

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt the user for input
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  try {
    console.log('Connecting to blockchain node...');
    
    // Connect to the blockchain on the host computer
    const web3 = new Web3(`http://${hostIP}:8545`);
    
    // Check connection
    const blockNumber = await web3.eth.getBlockNumber();
    console.log(`Successfully connected to blockchain at block ${blockNumber}`);
    
    // Get local accounts
    const accounts = await web3.eth.getAccounts();
    console.log(`\nAvailable accounts:`);
    accounts.slice(0, 5).forEach((account, i) => {
      console.log(`${i}: ${account}`);
    });
    
    // Load contract info from host (needs to be copied from host)
    try {
      const deploymentInfo = JSON.parse(fs.readFileSync('./contract-deployment.json', 'utf8'));
      const tokenContract = new web3.eth.Contract(deploymentInfo.abi, deploymentInfo.address);
      
      // Get token info
      const name = await tokenContract.methods.name().call();
      const symbol = await tokenContract.methods.symbol().call();
      const totalSupply = await tokenContract.methods.totalSupply().call();
      
      console.log(`\nConnected to ${name} (${symbol}) at ${deploymentInfo.address}`);
      console.log(`Total Supply: ${web3.utils.fromWei(totalSupply, 'ether')} ${symbol}`);
      
      // Check balances
      console.log('\n=== Account Balances ===');
      for (let i = 0; i < Math.min(accounts.length, 5); i++) {
        const balance = await tokenContract.methods.balanceOf(accounts[i]).call();
        console.log(`Account ${i}: ${web3.utils.fromWei(balance, 'ether')} ${symbol}`);
      }
      
      // Interactive menu
      while (true) {
        console.log('\n=== Available Actions ===');
        console.log('1. Check balance');
        console.log('2. Send tokens');
        console.log('3. Check last block');
        console.log('4. Exit');
        
        const choice = await prompt('Enter your choice (1-4): ');
        
        if (choice === '1') {
          const accountIndex = await prompt('Enter account index: ');
          if (accountIndex >= 0 && accountIndex < accounts.length) {
            const balance = await tokenContract.methods.balanceOf(accounts[accountIndex]).call();
            console.log(`Balance: ${web3.utils.fromWei(balance, 'ether')} ${symbol}`);
          } else {
            console.log('Invalid account index');
          }
        } 
        else if (choice === '2') {
          const fromIndex = await prompt('From account index: ');
          const toAddress = await prompt('To address: ');
          const amount = await prompt('Amount to send: ');
          
          if (fromIndex >= 0 && fromIndex < accounts.length) {
            try {
              const amountWei = web3.utils.toWei(amount, 'ether');
              const receipt = await tokenContract.methods.transfer(toAddress, amountWei)
                .send({ from: accounts[fromIndex] });
              
              console.log(`Transaction successful!`);
              console.log(`Transaction hash: ${receipt.transactionHash}`);
              console.log(`Gas used: ${receipt.gasUsed}`);
            } catch (error) {
              console.error('Error sending tokens:', error.message);
            }
          } else {
            console.log('Invalid account index');
          }
        }
        else if (choice === '3') {
          const latestBlock = await web3.eth.getBlock('latest');
          console.log('\n=== Latest Block Information ===');
          console.log(`Block Number: ${latestBlock.number}`);
          console.log(`Block Hash: ${latestBlock.hash}`);
          console.log(`Timestamp: ${new Date(latestBlock.timestamp * 1000).toLocaleString()}`);
          console.log(`Transactions: ${latestBlock.transactions.length}`);
        }
        else if (choice === '4') {
          console.log('Exiting...');
          rl.close();
          break;
        }
        else {
          console.log('Invalid choice');
        }
      }
      
    } catch (error) {
      console.error('Failed to load contract deployment information.', error.message);
      console.log('Make sure you copied the contract-deployment.json file from the host computer.');
      rl.close();
    }
    
  } catch (error) {
    console.error('Error connecting to the blockchain:', error.message);
    console.log('Make sure the host IP is correct and the blockchain is running.');
    rl.close();
  }
}

main(); 