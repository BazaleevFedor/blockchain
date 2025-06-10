const SkillToken = artifacts.require("SkillToken");

module.exports = function (deployer) {
    deployer.deploy(SkillToken);
};
