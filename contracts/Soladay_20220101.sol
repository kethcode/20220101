// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;
// pragma experimental ABIEncoderV2;

import "hardhat/console.sol";

/**
 * @title Soladay_20220101
 * @dev first up is a contract to keep track of every deployed contract during this challenge.
 */
contract Soladay_20220101 {

    /*********
    * Events *
    **********/

     /**
     * Announce a Deployment
     * @param _contract Address of deployed Contract
     * @param _deployer Address of account that deployed the Contract
     * @param _timestamp Timestamp of current block of deployment, 
     */
    event SolidayContractDeployed(
        address indexed _deployer,
        address indexed _contract, 
        uint256 _timestamp
    );

    /************
    * Variables *
    *************/

    address public owner;
    bool public locked;
    mapping( address => address[] ) deployments;

    /*******************
    * Public Functions *
    ********************/
    constructor (address _owner) {
        owner = _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    modifier validAddress(address _addr) {
        require(_addr != address(0), "Not valid address");
        _;
    }

    modifier noReentrancy() {
        require(!locked, "No reentrancy");

        locked = true;
        _;
        locked = false;
    }

    function setOwner(address _newOwner) public onlyOwner validAddress(_newOwner) {
        owner = _newOwner;
    }

    function registerDeployment(address _contract, address _deployer, uint256 _timestamp) public noReentrancy
    {
        // how do I check for multiple instances of the same deployment?
        bool duplicateFound = false;
        for(uint256 i = 0; i < deployments[_deployer].length; i++)
        {
            if(deployments[_deployer][i] == _contract)
            {
                duplicateFound = true;
            }
        }

        if(!duplicateFound)
        {
            deployments[_deployer].push(_contract);

            emit SolidayContractDeployed(
                _deployer,
                _contract, 
                _timestamp
            );
        }
    }

    function listDeployments(address _deployer) public view returns (address[] memory) {
        return deployments[_deployer];
    }

}
