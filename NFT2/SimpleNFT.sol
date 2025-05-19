// SPDX-License-Identifier: MIT
// This line specifies the license for the contract (MIT License)

// Specify the Solidity version to use
pragma solidity ^0.8.17;

// Import the ERC721 standard from OpenZeppelin
// ERC721 is the standard interface for non-fungible tokens (NFTs)
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Define our NFT contract that inherits from ERC721
// This means our contract will have all the standard NFT functionality
contract SimpleNFT is ERC721 {
    // Private variable to keep track of token IDs
    // This will increment each time a new NFT is minted
    uint256 private _tokenIds;

    // Constructor function that runs when the contract is deployed
    // It sets the name and symbol for our NFT collection
    // "SimpleNFT" is the name of the collection
    // "SNFT" is the symbol/ticker for the collection
    constructor() ERC721("SimpleNFT", "SNFT") {}

    // Function to mint a new NFT
    // Parameters:
    // - recipient: The address that will receive the newly minted NFT
    // Returns:
    // - uint256: The ID of the newly minted NFT
    function mint(address recipient) public returns (uint256) {
        // Increment the token ID counter
        _tokenIds++;
        
        // Store the new token ID
        uint256 newItemId = _tokenIds;
        
        // Mint the new NFT to the recipient's address
        // _mint is an internal function from ERC721 that creates the NFT
        _mint(recipient, newItemId);
        
        // Return the new token ID
        return newItemId;
    }
} 