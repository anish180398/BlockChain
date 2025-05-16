# NFT Contract Connection Troubleshooting

If you're experiencing issues connecting to your NFT contract from the frontend, follow these steps to troubleshoot:

## 1. Verify Ganache is Running

Make sure Ganache is running on port 7545. You can download Ganache from [https://trufflesuite.com/ganache/](https://trufflesuite.com/ganache/).

## 2. Check Contract Deployment

Run this command to verify your contract is deployed:

```
node verify-contract.js
```

If it shows "No contract deployed at this address!", you need to redeploy your contract.

## 3. Redeploy the Contract

Run this command to redeploy your contract:

```
truffle migrate --reset
```

This will deploy a new instance of the contract. Note the new contract address in the output.

## 4. Update the Frontend

When you open the frontend application, click on "Set Contract Address" and enter the new contract address.

## 5. Check Network Configuration

Make sure MetaMask is connected to the correct network:
- Network Name: Ganache
- RPC URL: http://127.0.0.1:7545
- Chain ID: 1337
- Currency Symbol: ETH

## 6. Common Issues and Solutions

### "Invalid Contract" Error

This usually means one of the following:

1. The contract doesn't exist at the specified address (Ganache was restarted)
2. You're connected to the wrong network in MetaMask
3. The contract was deployed with a different version of Solidity

### MetaMask Not Connected

If MetaMask is not connecting:
1. Make sure you've added Ganache as a custom network
2. Import at least one account from Ganache using its private key
3. Refresh the page after connecting

## 7. Using the Verification Script

You can use the verification script to check any contract address:

```
node verify-contract.js 0xYourContractAddressHere
```

This will tell you if the contract exists and is a valid NFT contract.

## Current Contract Address

The current deployed contract address is: `0x5ea4690cfA3f90E5978737c301817AC60afa5Cf7` 