const main = async () => {
    
    const todayFactory = await hre.ethers.getContractFactory("Soladay_20220101");
    const todayContract = await todayFactory.deploy(process.env.KETHIC_ETH_ADDRESS);
    await todayContract.deployed();

    console.log("Deployed:", todayContract.address);

    let local_timestamp = Date.now();
    let txn = await todayContract.registerDeployment(todayContract.address, process.env.KETHIC_ETH_ADDRESS, local_timestamp)
    await txn.wait();
    console.log("Soladay_20220101 deployed and registered");

};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();