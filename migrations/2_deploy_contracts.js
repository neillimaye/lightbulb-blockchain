var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Lightbulb = artifacts.require("./Lightbulb.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Lightbulb);
};
