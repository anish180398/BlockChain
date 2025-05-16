// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import OpenZeppelin's ERC721URIStorage implementation which extends the basic ERC721 standard
// This provides functionality for storing token URIs (metadata) for each NFT
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// Import OpenZeppelin's Counters utility for safely incrementing/decrementing uints
// This helps prevent overflow bugs when managing token IDs
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title SimpleNFT
 * @dev A basic NFT contract that allows users to mint NFTs with associated metadata
 * This contract inherits from ERC721URIStorage, which provides:
 * - Standard ERC721 functionality (transfer, ownership, approvals)
 * - Storage for token URIs (metadata links or inline data)
 */
contract SimpleNFT is ERC721URIStorage {
    // Use the Counters library for the Counter struct type
    using Counters for Counters.Counter;
    // Create a private counter to track and generate unique token IDs
    Counters.Counter private _tokenIds;
    
    // Mapping to keep track of who created each token
    // Maps token ID => creator's address
    mapping(uint256 => address) public tokenCreators;
    
    // Event emitted when a new NFT is minted
    // Allows applications to listen for new mints and react accordingly
    event NFTMinted(uint256 tokenId, address creator, string tokenURI);
    
    /**
     * @dev Constructor initializes the NFT collection
     * ERC721 constructor takes:
     * - name: The name of the NFT collection ("SimpleNFT")
     * - symbol: The trading symbol for the collection ("SNFT")
     */
    constructor() ERC721("SimpleNFT", "SNFT") {}

    /**
     * @dev Mint a new NFT with specified metadata
     * @param tokenURI The URI or inline data containing the NFT's metadata (name, description, image, etc.)
     * @return The ID of the newly minted token
     * 
     * This function:
     * 1. Increments the token ID counter
     * 2. Mints the token to the caller (msg.sender)
     * 3. Sets the token's metadata URI
     * 4. Records the token's creator
     * 5. Emits an event with the details
     */
    function mint(string memory tokenURI) public returns (uint256) {
        // Increment the token ID counter to get a new unique ID
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        // Mint the new token to the caller's address
        // _safeMint includes safety checks to prevent minting to contracts
        // that can't handle ERC721 tokens
        _safeMint(msg.sender, newTokenId);
        
        // Store the token's metadata URI
        _setTokenURI(newTokenId, tokenURI);
        
        // Record who created this token
        tokenCreators[newTokenId] = msg.sender;
        
        // Emit an event with the details of the new NFT
        // Applications can listen for this event to detect new mints
        emit NFTMinted(newTokenId, msg.sender, tokenURI);
        
        // Return the new token's ID
        return newTokenId;
    }
    
    /**
     * @dev Get the total number of tokens minted so far
     * @return The current token ID counter value
     */
    function getTokenCount() public view returns (uint256) {
        return _tokenIds.current();
    }
}
