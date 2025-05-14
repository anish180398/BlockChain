const { MerkleTree } = require('merkletreejs');
const crypto = require('crypto');

///////////////////////////////
// 🔐 SHA-256 Hash Function //
///////////////////////////////
function sha256(data) {
  // Create a SHA-256 hash and return it as a Buffer
  return crypto.createHash('sha256').update(data).digest();
}

//////////////////////////////////////
// 📦 Sample Transaction List (TXs) //
//////////////////////////////////////
const transactions = ['tx1', 'tx2', 'tx3', 'tx4'];

// Hash each transaction to create the leaf nodes
const leaves = transactions.map(sha256); // each leaf is a Buffer

//////////////////////////////////////
// 🌲 Build the Merkle Tree        //
//////////////////////////////////////
const tree = new MerkleTree(leaves, sha256); // build tree from hashed leaves
const root = tree.getRoot(); // get the Merkle Root as a Buffer

console.log('✅ Merkle Root:', root.toString('hex')); // convert to hex string for display
console.log('\n🌲 Merkle Tree Structure:\n');
console.log(tree.toString()); // pretty-print the full tree

/////////////////////////////////////////////////
// ✅ Verifying an Original Transaction (tx2) //
/////////////////////////////////////////////////
const originalTx = 'tx2';                      // the original transaction
const hashedTx = sha256(originalTx);           // hash it to match Merkle leaf
const proof = tree.getProof(hashedTx);         // generate the Merkle Proof path

// Verify that hashedTx is part of the Merkle Tree using the proof and root
const isValid = tree.verify(proof, hashedTx, root);

console.log(`\n🔍 Verifying original tx (${originalTx}):`, isValid ? '✅ Valid' : '❌ Invalid');

////////////////////////////////////////////////////
// ❌ Verifying a Tampered Transaction (tx2-fake) //
////////////////////////////////////////////////////
const tamperedTx = 'tx2-fake';               // tampered transaction string
const tamperedHash = sha256(tamperedTx);     // hash it

// ❗ Using the original tx2's proof to verify tampered data — should fail
const isTamperedValid = tree.verify(proof, tamperedHash, root);
console.log(`\n⚠️ Verifying tampered tx (${tamperedTx}) using tx2's proof:`, isTamperedValid ? '✅ Valid' : '❌ Invalid');

// 🔎 Check if this tampered transaction even exists in the tree
const tamperedProof = tree.getProof(tamperedHash);
console.log(`\n📜 Tampered proof exists?`, tamperedProof.length > 0 ? 'Yes' : 'No');
