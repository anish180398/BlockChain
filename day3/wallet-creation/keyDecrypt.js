const { ethers } = require("ethers");

// Private key
const privateKey = "0xb2c4ed3cf4572629ec10c02c3799b0d21800d9009928dc2adda504768f7af0d6";

// Create wallet from private key
const wallet = new ethers.Wallet(privateKey);

// Get address
console.log("Address:", wallet.address);

const signingKey = new ethers.SigningKey(privateKey);
console.log("Public Key:", signingKey.publicKey);

// Display private key
console.log("Private Key:", privateKey);