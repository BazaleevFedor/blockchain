const SkillToken = artifacts.require("SkillToken");

module.exports = function (deployer) {
    deployer.deploy(SkillToken, {
        value: web3.utils.toWei("0.1", "ether")
    });
};
