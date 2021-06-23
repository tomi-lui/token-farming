// const ConvertLib = artifacts.require("ConvertLib");
// const MetaCoin = artifacts.require("MetaCoin");
const DaiToken = artifacts.require("DaiToken");
const FijiToken = artifacts.require("FijiToken");
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(deployer, network, accounts) {
  

  // deploy Fiji Token
  await deployer.deploy(FijiToken);
  const fijiToken = await FijiToken.deployed()

  // deploy Dai Token
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed()

  // deploy Token Farm
  deployer.deploy(TokenFarm);
  const tokenFarm = await TokenFarm.deployed()

  // Transfer all tokens to TokenFarm (1 mill)
  await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

  // Transfer 100 DAI tokens to investor
  await daiToken.transfer(accounts[1],'100000000000000000000')
};
