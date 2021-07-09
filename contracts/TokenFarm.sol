// SPDX-License-Identifier: MIT
pragma solidity >0.7.4;

import "./FijiToken.sol";
import "./DaiToken.sol";


contract TokenFarm {
    string public name = "Token Farm";

    address public owner;
    DaiToken public daiToken;
    FijiToken public fijiToken;

    address[] public stakers;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;
    mapping(address => uint) public stakingBalance;


    constructor(FijiToken _fijiToken, DaiToken _daiToken) {
        fijiToken = _fijiToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }

    // 1. Stake tokens (Deposit)
    function stakeTokens(uint _amount) public {

        // require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // transfer dai tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        // update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // add user to stakers array if they have not staked already
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // update staking status
        hasStaked[msg.sender] = true;
        isStaking[msg.sender] = true;
    }

    // 2. Unstaking Tokens (Withdraw)

    // 3. Issuing Tokens 
}