export const deVotingContractABI = [
  "function voteId() public view returns (uint256)",
  "function getVote(uint256 voteId) public view returns(string memory _topic, string[] memory _options, uint256[] memory _optionsCount, address _owner, uint256 _endTime)",
  "function createVote(string _topic, string[] _options, uint256 _endTimestampSeconds) returns (uint256)",
  "function submitVote(uint256 _voteId, uint256 _optionIndex, uint256 _optionCount) returns (bool)",
  "function submitVote(uint256 _voteId, uint256 _optionIndex, uint256 _optionCount) public returns (bool)",
  "function checkIfUserVoted(uint256 _voteId) view returns (bool)",
];
export const deVotingAddress = "0x57Ea7AcA1331e403192BcCdF5449937a54CF2C45";

export const voteToken = "0x1F9Ec6c29eE87b89c3732984cEf8BD7e99d9c713";

export const voteTokenABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];