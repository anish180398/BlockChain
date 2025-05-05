// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title SimpleToken
 * @dev Implementation of a basic ERC20-like token
 * This contract demonstrates the core functionality of a cryptocurrency token
 * on the Ethereum blockchain.
 */
contract SimpleToken {
    // Token metadata
    string public name = "Monolith";     // Name of the token
    string public symbol = "MLC";           // Symbol/ticker of the token (like BTC, ETH)
    uint8 public decimals = 18;             // Number of decimal places (standard is 18, same as ETH)
    uint256 public totalSupply = 1000000 * 10**18; // 1 million tokens with 18 decimal places

    // State variables
    
    // Mapping of addresses to their token balances
    // This acts as the ledger of who owns how many tokens
    mapping(address => uint256) public balanceOf;
    
    // Nested mapping for token allowances
    // First key: token owner, Second key: spender, Value: allowed amount
    // This enables the "approve and transferFrom" pattern for delegated spending
    mapping(address => mapping(address => uint256)) public allowance;

    // Events - blockchain's way of logging activity and changes
    
    // Emitted when tokens are transferred from one address to another
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    // Emitted when an owner approves a spender to transfer tokens on their behalf
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Constructor that initializes the token
     * When the contract is deployed, the total supply is assigned to the deployer
     */
    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    /**
     * @dev Transfer tokens from the sender to another address
     * @param to The address to transfer tokens to
     * @param value The amount of tokens to transfer
     * @return success Whether the transfer was successful
     *
     * This is the main function for moving tokens between addresses
     * It verifies the sender has enough tokens before transferring
     */
    function transfer(address to, uint256 value) public returns (bool success) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        
        emit Transfer(msg.sender, to, value);
        return true;
    }

    /**
     * @dev Approve a spender to spend tokens on the sender's behalf
     * @param spender The address allowed to spend tokens
     * @param value The amount of tokens the spender is allowed to use
     * @return success Whether the approval was successful
     *
     * This is used for decentralized exchanges, automated contracts, etc.
     * It sets up a delegate allowance relationship
     */
    function approve(address spender, uint256 value) public returns (bool success) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    /**
     * @dev Transfer tokens from one address to another on behalf of a user
     * @param from The address to transfer tokens from
     * @param to The address to transfer tokens to
     * @param value The amount of tokens to transfer
     * @return success Whether the transfer was successful
     *
     * This function allows approved spenders to move tokens between addresses
     * It requires prior approval via the approve() function
     */
    function transferFrom(address from, address to, uint256 value) public returns (bool success) {
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Insufficient allowance");
        
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        
        emit Transfer(from, to, value);
        return true;
    }
} 