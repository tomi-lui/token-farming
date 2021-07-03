// SPDX-License-Identifier: MIT
pragma solidity >0.7.4;

import "./FijiToken.sol";
import "./DaiToken.sol";


contract TokenFarm {
    string public name = "Token Farm";

    DaiToken public daiToken;
    FijiToken public fijiToken;

    // constructor(FijiToken _fijiToken, DaiToken _daiToken ) {
    //     daiToken = _daiToken;
    //     fijiToken = _fijiToken;
    // }

    // constructor () public {
        
    // }

}