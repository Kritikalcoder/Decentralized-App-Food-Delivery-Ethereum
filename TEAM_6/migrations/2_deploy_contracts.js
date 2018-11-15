var Quizzer = artifacts.require("Delivery.sol");

module.exports = function(deployer) {
  deployer.deploy(Quizzer);
};
