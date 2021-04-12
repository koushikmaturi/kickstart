pragma solidity ^0.6.5;

contract CampaignFactory {

    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
       address newCampaign = address(new Campaign(minimum, msg.sender));
       deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}



contract Campaign {
    // Request Structure Definition
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    // State Variables
    address payable public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint public approversCount;

    // Modifiers
    // Manager only modifier
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    // Constructor
    constructor(uint minimum, address payable creator) public {
        // manager = contract creator
        manager = creator;
        minimumContribution = minimum;
    }

    // Methods
    function contribute() public payable {
        require(msg.value > minimumContribution);
        if(!approvers[msg.sender]) {
                  approversCount ++;
                }
                approvers[msg.sender] = true;
    }

    function createRequest(string memory description, uint value, address payable recipient)
        public restricted {
          // Ensure we can't ask for more money than the contract holds
          require(value <= address(this).balance);
        // Remember the difference between storage and memory
        Request memory newReq = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        // No need to initialize reference types, that's why mapping isn't
        // initialized, the rest are value types

        requests.push(newReq);

    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];
        // Check 1 - Did the person contribute
        require(approvers[msg.sender]);

        //Check 2 - Did the person vote before?
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        //Checks
        require(request.approvalCount > approversCount/2);
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;

    }

    function getSummary() public view returns (
      uint, uint, uint, uint, address
      ) {
        return (
          minimumContribution,
          address(this).balance,
          requests.length,
          approversCount,
          manager
          );
    }

    function getRequestsCount() public view returns (uint) {
      return requests.length;
    }

}
