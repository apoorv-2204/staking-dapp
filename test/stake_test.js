const { ethers, network } = require("hardhat");
const { expect } = require("chai");
var debug = require('debug')


const SECONDS_IN_A_DAY = 86400;

async function moveBlocks(amount) {
  // we are just adding blocks ?? without txns ????????
  //   sir please brief moveing block meaning
  // why we want to move blocks
  // Instead of Time dependent rewards , we can block nb based reward system
  console.log("Moving blocks...");
  for (let index = 0; index < amount; index++) {
    await network.provider.send("evm_mine", []);
  }
  console.log(`Moved ${amount} blocks.`);
}

async function moveTime(amount) {
  console.log("Moving time...");
  await network.provider.send("evm_increaseTime", [amount]);
  console.log(`Moved forward in time ${amount} seconds.`);
}

describe("Staking Tests", async function () {
  let staking;
  let RewardToken;
  let deployer;
  let stakeAmount;

  beforeEach(async function () {
    const accounts = await ethers.getSigners();
    deployer = accounts[0];

    const _rewardToken = await ethers.getContractFactory("RewardToken");
    RewardToken = await _rewardToken.deploy();

    const _staking = await ethers.getContractFactory("Staking");
    staking = await _staking.deploy(RewardToken.address, RewardToken.address);
    stakeAmount = ethers.utils.parseEther("100000");
  });

  it("should be able to stake tokens", async function () {
    // approve staking contract to spend reward token
    // sc is allowed only approved to manipulate stake Amount
    await RewardToken.approve(staking.address, stakeAmount);
    await staking.stake(stakeAmount);

    const deployerAddress = deployer.getAddress();
    const startingEarned = await staking.earned(deployerAddress);

    console.log(`Starting Earned: ${startingEarned}`);

    await moveTime(SECONDS_IN_A_DAY);
    await moveBlocks(1);

    const endingEarned = await staking.earned(deployerAddress);
    console.log(`Total rewards after 24 hrs Ending Earned: ${endingEarned}`);
    debug("as")('booting %d', endingEarned);

    expect(startingEarned).to.be.equal(0);
    expect(endingEarned).to.be.equal(8600000);
  });
});

// describe("Stakingdapp", async () => {
//   let staking;
//   let RewardToken;
//   let deployer;
//   let stakeAmount;

//   beforeEach(async () => {
//     // get details of accounts
//     const accounts = await ether.getSigners();
//     deployer = accounts[0];

//     // init contract
//     const _rewardToken = await ethers.getContractFactory("RewardToken");
//     RewardToken = await _rewardToken.deploy();

//     const _staking = await ethers.getContractFactory("Staking");
//     staking = await _staking.deploy(RewardToken.address, RewardToken.address);
//   })
// });