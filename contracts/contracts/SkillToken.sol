// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract ERC20 is IERC20 {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public override totalSupply;

    mapping(address => uint256) public override balanceOf;
    mapping(address => mapping(address => uint256)) public override allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(string memory _name, string memory _symbol, uint8 _decimals) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint256 amount) public override returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        require(allowance[sender][msg.sender] >= amount, "Not approved");
        require(balanceOf[sender] >= amount, "Insufficient balance");
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function _mint(address to, uint256 amount) internal {
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
    }

    function _burn(address from, uint256 amount) internal {
        require(balanceOf[from] >= amount, "Insufficient balance to burn");
        balanceOf[from] -= amount;
        totalSupply -= amount;
        emit Transfer(from, address(0), amount);
    }
}

contract SkillToken is ERC20 {
    address public owner;
    uint constant _initial_supply = 1000000;
    string constant _name = "Skill Token";
    string constant _symbol = "SKILL";
    uint8 constant _decimals = 0;

    constructor() payable ERC20(_name, _symbol, _decimals) {
        owner = msg.sender;

        _mint(address(this), _initial_supply);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    /// @notice списание токенов у пользователя в пользу контракта
    function deductFromUser(address user, uint256 amount) external {
        require(balanceOf[user] >= amount, "Insufficient user balance");

        balanceOf[user] -= amount;
        balanceOf[address(this)] += amount;

        emit Transfer(user, address(this), amount);
    }

    /// @notice перевод токенов юзеру
    function rewardUser(address user, uint256 amount) external onlyOwner {
        require(balanceOf[address(this)] >= amount, "Insufficient tokens in contract");

        balanceOf[address(this)] -= amount;

        balanceOf[user] += amount;

        emit Transfer(address(this), user, amount);
    }

    /// @notice получение баланса юзера
    function getMyPoints() external view returns (uint256) {
        return balanceOf[msg.sender];
    }
}
