const { ethers } = require("ethers");

// Private key
const privateKey = "0x9cb68832f27ec3c9e8253d902e51fbd5add165ce8b3e3826f8bb4524bd4b1946";

// Create wallet from private key
const wallet = new ethers.Wallet(privateKey);

// Get address
console.log("Address:", wallet.address);

const signingKey = new ethers.SigningKey(privateKey);
console.log("Public Key:", signingKey.publicKey);

// Display private key
console.log("Private Key:", privateKey);