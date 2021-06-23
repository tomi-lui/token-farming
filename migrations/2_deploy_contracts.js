// const ConvertLib = artifacts.require("ConvertLib");
// const MetaCoin = artifacts.require("MetaCoin");
const DaiToken = artifacts.require("DaiToken");
const FijiToken = artifacts.require("FijiToken");
const TokenFarm = artifacts.require("TokenFarm");

module.exports = function(deployer) {
  // deployer.deploy(FijiToken);
  // deployer.deploy(DaiToken);
  deployer.deploy(TokenFarm);
  // deployer.link(ConvertLib, MetaCoin);
  // deployer.deploy(MetaCoin);
};
