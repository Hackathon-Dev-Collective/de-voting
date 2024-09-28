export const deVotingContractABI = [
  "function voteId() public view returns (uint256)",
  "function getVote(uint256 voteId) public view returns(string memory _topic, string[] memory _options, uint256[] memory _optionsCount, address _owner, uint256 _endTime)",
  "function createVote(string _topic, string[] _options, uint256 _endTimestampSeconds) returns (uint256)",
  "function submitVote(uint256 _voteId, uint256 _optionIndex, uint256 _optionCount) returns (bool)",
  "function submitVote(uint256 _voteId, uint256 _optionIndex, uint256 _optionCount) public returns (bool)",
  "function checkIfUserVoted(uint256 _voteId, address user) public view returns (bool)",
  "function getVotedInfo(uint256 _voteId, address user) public view returns (string memory choice, uint256 choseCount, uint256 timeStamp)"
];
export const deVotingAddress = "0xAe8868Cb2500a2b6c8035c24207e66AF92d05259";

export const voteToken = "0x1F9Ec6c29eE87b89c3732984cEf8BD7e99d9c713";

export const voteTokenABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];