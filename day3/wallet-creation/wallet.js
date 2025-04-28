/**
 * ========================================================
 * Ethereum Wallet Fundamentals
 * ========================================================
 * 
 * This standalone script demonstrates the core concepts of Ethereum wallets:
 * 1. Wallet creation - generating cryptographic key pairs
 * 2. Wallet recovery - reconstructing a wallet from a private key
 * 3. Digital signatures - signing and verifying messages
 * 
 * Run with: node wallet.js
 */

const { ethers } = require("ethers");

// =====================================================
// SECTION 1: WALLET CREATION AND BASIC DETAILS
// =====================================================

// Generate a completely random wallet with a new private key
// This uses cryptographically secure random values
console.log("\n🔑 GENERATING A NEW RANDOM WALLET...");
const wallet = ethers.Wallet.createRandom();

console.log("\n╔════════════════════════════════════════════════════╗");
console.log("║                 WALLET GENERATION                  ║");
console.log("╚════════════════════════════════════════════════════╝");

// The private key is the most sensitive piece of information
// With it, anyone can control all funds in the wallet
console.log("\n🔐 PRIVATE KEY (NEVER SHARE THIS!):");
console.log(wallet.privateKey);
console.log("This 32-byte hexadecimal value is your wallet's secret key.");
console.log("Anyone with this key can control your funds.");

// The public key is derived from the private key using elliptic curve multiplication
console.log("\n📢 PUBLIC KEY:");
console.log(wallet.publicKey);
console.log("This 65-byte hexadecimal value is derived from your private key.");
console.log("It's used in the creation of your address and in signature verification.");

// The address is the last 20 bytes of the keccak256 hash of the public key
console.log("\n📫 ETHEREUM ADDRESS:");
console.log(wallet.address);
console.log("This 20-byte (40 hex characters) value is your public wallet identifier.");
console.log("This is what others use to send you ETH or tokens.");

// =====================================================
// SECTION 2: WALLET RECOVERY FROM PRIVATE KEY
// =====================================================

// Demonstrate how a wallet can be recreated using only the private key
// This is how wallet import functionality works in crypto applications
console.log("\n╔════════════════════════════════════════════════════╗");
console.log("║               WALLET RECOVERY DEMO                 ║");
console.log("╚════════════════════════════════════════════════════╝");

console.log("\n💡 WHAT IS WALLET RECOVERY?");
console.log("--------------------------------------------------");
console.log("Recovery means recreating a wallet using only the private key.");
console.log("This is how wallet imports work in crypto applications.");
console.log("No blockchain interaction is needed - it's pure cryptography.");
console.log("--------------------------------------------------");

console.log("\n🔄 RECREATING WALLET FROM PRIVATE KEY...");
const customWallet = new ethers.Wallet(wallet.privateKey);

console.log("\n✅ RECOVERY VERIFICATION:");
console.log("--------------------------------------------------");
console.log("Original Wallet Address:  ", wallet.address);
console.log("Recovered Wallet Address: ", customWallet.address);

const addressesMatch = customWallet.address === wallet.address;
console.log("Addresses Match:          ", addressesMatch ? "✅ YES" : "❌ NO");
console.log("--------------------------------------------------");
console.log(addressesMatch 
  ? "Success! The private key fully determines the wallet." 
  : "Error! The addresses should match.");

// =====================================================
// SECTION 3: DIGITAL SIGNATURES AND VERIFICATION
// =====================================================

// This function demonstrates cryptographic signing and verification
// It shows how blockchain transactions prove ownership without revealing private keys
async function signAndVerify() {
    console.log("\n╔════════════════════════════════════════════════════╗");
    console.log("║            DIGITAL SIGNATURES EXPLAINED            ║");
    console.log("╚════════════════════════════════════════════════════╝");
    
    console.log("\n💡 WHAT ARE DIGITAL SIGNATURES?");
    console.log("--------------------------------------------------");
    console.log("Digital signatures prove you own a wallet without revealing your private key.");
    console.log("They are fundamental to blockchain transactions and authentication.");
    console.log("Key properties:");
    console.log("1. Authentication - Proves the signer owns the private key");
    console.log("2. Non-repudiation - Signer cannot deny having signed the message");
    console.log("3. Integrity - Proves the message hasn't been altered");
    console.log("--------------------------------------------------");
    
    // The message we want to sign
    // In real applications, this could be transaction data, authentication proof, etc.
    const message = "Hello, Blockchain Developers!";
    
    // -----------------------------------------------
    // Step 1: Sign the message with the private key
    // -----------------------------------------------
    console.log("\n✍️  STEP 1: SIGNING A MESSAGE");
    console.log("--------------------------------------------------");
    console.log("Message to sign: ", message);
    console.log("Wallet address:  ", wallet.address);
    console.log("--------------------------------------------------");
    console.log("Signing message with private key...");
    
    // The wallet uses the private key to create a digital signature
    // The private key never leaves the wallet - only the signature is shared
    const flatSig = await wallet.signMessage(message);
    
    console.log("\n📝 SIGNATURE CREATED:");
    console.log("--------------------------------------------------");
    console.log(flatSig);
    console.log("--------------------------------------------------");
    console.log("This signature proves the owner of", wallet.address);
    console.log("authorized this message, without revealing the private key.");
  
    // -----------------------------------------------
    // Step 2: Examine the signature components
    // -----------------------------------------------
    
    // Split signature into its cryptographic components (v, r, s)
    // These values are used in the elliptic curve digital signature algorithm (ECDSA)
    const sig = ethers.Signature.from(flatSig);
    
    console.log("\n🧩 STEP 2: SIGNATURE COMPONENTS (ECDSA VALUES)");
    console.log("--------------------------------------------------");
    console.log("A digital signature consists of three components:");
    console.log(`v (recovery id):             ${sig.v}`);
    console.log(`r (first half of signature): ${sig.r}`);
    console.log(`s (second half of signature):${sig.s}`);
    console.log("--------------------------------------------------");
    console.log("These components are used in the Elliptic Curve Digital Signature Algorithm");
    console.log("to verify the authenticity of the message and recover the signer's address.");
  
    // -----------------------------------------------
    // Step 3: Verify the signature
    // -----------------------------------------------
    
    // Verify the signature by recovering the address from the signature
    // This is how blockchain nodes verify that transactions are authentic
    console.log("\n🔍 STEP 3: SIGNATURE VERIFICATION");
    console.log("--------------------------------------------------");
    console.log("To verify, we need only the:");
    console.log("1. Original message");
    console.log("2. Signature");
    console.log("(No private key required for verification!)");
    console.log("--------------------------------------------------");
    
    // Recover the signer's address from the message and signature
    const recoveredAddr = ethers.verifyMessage(message, flatSig);
    
    console.log("Original message:   ", message);
    console.log("Signature:          ", flatSig.slice(0, 30) + "...");
    console.log("--------------------------------------------------");
    console.log("Expected signer:    ", wallet.address);
    console.log("Recovered signer:   ", recoveredAddr);
    
    const isValid = recoveredAddr === wallet.address;
    console.log("Verification result: ", isValid ? "✅ VALID SIGNATURE" : "❌ INVALID SIGNATURE");
    console.log("--------------------------------------------------");
    console.log(isValid 
      ? "Success! The signature is valid and was created by the expected wallet."
      : "Failure! The signature verification failed.");
    
    // -----------------------------------------------
    // Step 4: Demonstrate tampering detection
    // -----------------------------------------------
    
    // Show what happens when the message is altered after signing
    const tamperedMessage = message + " (tampered)";
    
    console.log("\n⚠️  STEP 4: SECURITY CHECK - MESSAGE TAMPERING");
    console.log("--------------------------------------------------");
    console.log("What happens if someone changes the message after it's signed?");
    console.log("Original message:   ", message);
    console.log("Tampered message:   ", tamperedMessage);
    console.log("(Using the same signature as before)");
    console.log("--------------------------------------------------");
    
    // Try to verify with the tampered message
    const recoveredAddrFromTampered = ethers.verifyMessage(tamperedMessage, flatSig);
    
    console.log("Wallet address:     ", wallet.address);
    console.log("Recovered address:  ", recoveredAddrFromTampered);
    
    const tamperedIsValid = recoveredAddrFromTampered === wallet.address;
    console.log("Verification result: ", tamperedIsValid 
      ? "⚠️ UNEXPECTEDLY VALID (this is unusual)" 
      : "✅ CORRECTLY REJECTED (tampering detected)");
    console.log("--------------------------------------------------");
    console.log(tamperedIsValid
      ? "Unusual! The signature verified despite message tampering. This should not happen."
      : "Success! The verification correctly failed when the message was altered.");
    
    // -----------------------------------------------
    // Summary
    // -----------------------------------------------
    console.log("\n📋 DIGITAL SIGNATURES SUMMARY");
    console.log("--------------------------------------------------");
    console.log("1. Created a signature with the private key");
    console.log("2. Examined the signature components (v, r, s)");
    console.log("3. Verified the signature without using the private key");
    console.log("4. Demonstrated how tampering is detected");
    console.log("--------------------------------------------------");
    console.log("These principles secure billions in cryptocurrency transactions");
    console.log("and are fundamental to all blockchain operations.");
}
  
// Execute the signing and verification process
signAndVerify().then(() => {
    console.log("\n╔════════════════════════════════════════════════════╗");
    console.log("║              DEMONSTRATION COMPLETE                ║");
    console.log("╚════════════════════════════════════════════════════╝");
}).catch(error => {
    console.error("Error during demonstration:", error);
}); 