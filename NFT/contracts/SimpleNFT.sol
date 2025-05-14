// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SimpleNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Mapping to store token creators
    mapping(uint256 => address) public tokenCreators;
    
    // Event that will be emitted on NFT mint
    event NFTMinted(uint256 tokenId, address creator, string tokenURI);
    
    constructor() ERC721("SimpleNFT", "SNFT") {}

    function mint(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        // Record token creator
        tokenCreators[newTokenId] = msg.sender;
        
        // Emit event
        emit NFTMinted(newTokenId, msg.sender, tokenURI);
        
        return newTokenId;
    }
    
    function getTokenCount() public view returns (uint256) {
        return _tokenIds.current();
    }
}
