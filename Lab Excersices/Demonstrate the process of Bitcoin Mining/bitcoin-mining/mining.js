const CryptoJS = require("crypto-js");

function mineBlock(difficulty, transactions) {
  let nonce = 0;
  const prefix = "0".repeat(difficulty);

  while (true) {
    const hash = CryptoJS.SHA256(nonce + transactions).toString();
    if (hash.startsWith(prefix)) {
      return { nonce, hash };
    }
    nonce++;
  }
}

console.log("Mining... (This may take a few seconds)");
const result = mineBlock(4, "Alice pays Bob 1 BTC");
console.log("Nonce:", result.nonce);
console.log("Hash:", result.hash);
