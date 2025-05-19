// SPDX-License-Identifier: MIT
// This line specifies the license for the contract (MIT License)

// Specify the Solidity version to use
pragma solidity ^0.8.17;

// Import the ERC721 standard from OpenZeppelin
// ERC721 is the standard interface for non-fungible tokens (NFTs)
// It provides basic functionality for tracking and transferring NFTs
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Define our NFT contract that inherits from ERC721
// This means our contract will have all the standard NFT functionality
contract SimpleNFT is ERC721 {
    // Private variable to keep track of token IDs
    // This will increment each time a new NFT is minted
    // Starting from 0, each new NFT gets a unique ID
    uint256 private _tokenIds;

    // Structure to store NFT data
    // This is like a template for what information we store for each NFT
    struct NFTData {
        string imageName;    // Name of the image file
        string imageHash;    // SHA-256 hash of the image for verification
    }
    
    // Mapping from token ID to NFT data
    // This is like a database where we store information for each NFT
    // tokenId => NFTData (imageName, imageHash)
    mapping(uint256 => NFTData) private _tokenData;

    // Constructor function that runs when the contract is deployed
    // It sets the name and symbol for our NFT collection
    // "SimpleNFT" is the name of the collection
    // "SNFT" is the symbol/ticker for the collection
    constructor() ERC721("SimpleNFT", "SNFT") {}

    // Function to mint a new NFT with image data
    // Parameters:
    // - recipient: The address that will receive the newly minted NFT
    // - imageName: The name of the image file (e.g., "my-art.jpg")
    // - imageHash: The SHA-256 hash of the image file for verification
    // Returns:
    // - uint256: The ID of the newly minted NFT
    function mint(address recipient, string memory imageName, string memory imageHash) public returns (uint256) {
        // Increment the token ID counter
        _tokenIds++;
        
        // Store the new token ID
        uint256 newItemId = _tokenIds;
        
        // Mint the NFT to the recipient's address
        // _mint is an internal function from ERC721 that creates the NFT
        _mint(recipient, newItemId);
        
        // Store the NFT data (image name and hash) in our mapping
        _tokenData[newItemId] = NFTData(imageName, imageHash);
        
        // Return the new token ID
        return newItemId;
    }

    // Function to get NFT data
    // Parameters:
    // - tokenId: The ID of the NFT to look up
    // Returns:
    // - imageName: The name of the image file
    // - imageHash: The SHA-256 hash of the image file
    // This function allows anyone to verify the NFT's image data
    function getNFTData(uint256 tokenId) public view returns (string memory imageName, string memory imageHash) {
        // Check if the token exists
        require(_exists(tokenId), "Token does not exist");
        
        // Get the NFT data from our mapping
        NFTData memory data = _tokenData[tokenId];
        
        // Return the image name and hash
        return (data.imageName, data.imageHash);
    }
} 