// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

contract Escrow {
	address public arbiter;
	address payable public beneficiary;
	address public depositor;

	bool public isApproved;

	constructor(address _arbiter, address payable _beneficiary) payable {
		arbiter = _arbiter;
		beneficiary = _beneficiary;
		depositor = msg.sender;
	}

	event Approved(uint);

	function approve() external {
		require(msg.sender == arbiter);
		uint balance = address(this).balance;
		beneficiary.transfer(balance);
		emit Approved(balance);
		isApproved = true;
	}

	function viewData() external view returns(address, address, address) {
		require(msg.sender == arbiter || msg.sender == beneficiary || msg.sender == depositor, "Insufficient permissions to view contract");
		return (arbiter, beneficiary, depositor);
	}
}
