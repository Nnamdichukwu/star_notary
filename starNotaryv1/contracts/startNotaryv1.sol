// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract starNotary{
    string public starName;
    address public starOwner;

    event starClaimed(address owner);
    event renamedStar(string starName);

    constructor () {
        starName =  "This is a star";
    }
    function claimStar() public{
        starOwner = msg.sender;
        emit starClaimed(msg.sender);
    }
    function renameStar(string memory _renameStar) public{
        require(starOwner == msg.sender);
        starName = _renameStar;
        emit renamedStar(starName);
    }
}