const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Soladay_20220101", function () {

    it("Should Deploy", async function () {

        let accounts = await ethers.getSigners()
        const todayFactory = await ethers.getContractFactory("Soladay_20220101");
        const todayContract = await todayFactory.deploy(accounts[0].address);
        await todayContract.deployed();

        console.log("Deployed:", todayContract.address);

        describe("Constructor", function () {

            it("Should Set Deployed Owner", async function () {
                let deployOwner = await todayContract.getOwner();
                console.log("owner:", deployOwner);
                expect(
                    deployOwner == accounts[0].address
                )
                .to.be.true
            });
        });

        describe("setOwner", function () {

            it("Should Change Owner", async function () {
                let oldOwner = await todayContract.getOwner();
                console.log("oldOwner:", oldOwner);
                await todayContract.setOwner(accounts[1].address)
                let newOwner = await todayContract.getOwner();
                console.log("newOwner:", newOwner);
                expect(
                    newOwner == accounts[1].address
                )
                .to.be.true
            });
        });

        describe("registerDeployment", function () {

            
            it("Should emit SolidayContractDeployed with expected parameters", async function () {

                let local_timestamp = Date.now();
                // function registerDeployment(address _contract, address _deployer, uint256 _timestamp) public noReentrancy

                // event SolidayContractDeployed(
                //     address indexed _deployer,
                //     address indexed _contract, 
                //     uint256 _timestamp
                // );
                
                console.log("_contract:", accounts[2].address);
                console.log("_deployer:", accounts[1].address);
                console.log("_timestamp:", local_timestamp);
                expect(
                    await todayContract.registerDeployment(accounts[2].address, accounts[1].address, local_timestamp)
                )
                .to.emit(todayContract, 'SolidayContractDeployed')
                .withArgs(
                    accounts[2].address, 
                    accounts[1].address, 
                    local_timestamp)
            });
        });

        describe("registerDeployment", function () {

            
            it("Should emit SolidayContractDeployed with expected parameters", async function () {

                let local_timestamp = Date.now();
                
                console.log("_contract:", accounts[3].address);
                console.log("_deployer:", accounts[1].address);
                console.log("_timestamp:", local_timestamp);
                expect(
                    await todayContract.registerDeployment(accounts[3].address, accounts[1].address, local_timestamp)
                )
                .to.emit(todayContract, 'SolidayContractDeployed')
                .withArgs(
                    accounts[3].address, 
                    accounts[1].address, 
                    local_timestamp)
            });
        });

        describe("registerDeployment", function () {

            
            it("Should emit SolidayContractDeployed with expected parameters", async function () {

                let local_timestamp = Date.now();
                
                console.log("_contract:", accounts[5].address);
                console.log("_deployer:", accounts[4].address);
                console.log("_timestamp:", local_timestamp);
                expect(
                    await todayContract.registerDeployment(accounts[5].address, accounts[4].address, local_timestamp)
                )
                .to.emit(todayContract, 'SolidayContractDeployed')
                .withArgs(
                    accounts[5].address, 
                    accounts[4].address, 
                    local_timestamp)
            });
        });

        describe("getDeployers", function () {

            it("Should Return Deployers", async function () {
                let deployers = await todayContract.getDeployers();
                console.log("deployers:", deployers);
                expect(deployers).to.have.members([accounts[1].address, accounts[4].address])
            });
        });

        describe("getDeployments", function () {

            it("Should Return Deployments", async function () {
                let deployers = await todayContract.getDeployers();
                console.log("deployers:", deployers);
                let deployments = await todayContract.getDeployments(accounts[1].address);
                console.log("deployments:", deployments);
                expect(deployments).to.have.members([accounts[2].address, accounts[3].address])
            });
        });


        describe("getDeployments", function () {

            it("Should Return Deployments", async function () {
                let deployers = await todayContract.getDeployers();
                console.log("deployers:", deployers);
                let deployments = await todayContract.getDeployments(accounts[4].address);
                console.log("deployments:", deployments);
                expect(deployments).to.have.members([accounts[5].address])
            });
        });

        
    });
});