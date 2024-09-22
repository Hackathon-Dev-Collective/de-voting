import { useState, useEffect } from "react";
import { ethers, Contract, formatUnits } from "ethers";

type Vote = {
  id: string;
  title: string;
  date: string;
  choice: string;
};

const deVotingContractABI = [
  "function voteId() public view returns (uint256)",
  "function getVote(uint256 voteId) public view returns(string memory _topic, string[] memory _options, uint256[] memory _optionsCount, address _owner, uint256 _endTime)"
]
const deVotingAddress = "0x57Ea7AcA1331e403192BcCdF5449937a54CF2C45";

export function VoteHistory({ address }: { address: string }) {
  const [votes, setVotes] = useState<Vote[]>([]);

  useEffect(() => {
    const getVoteList = async () => {
      const Votes: Vote[] = [];
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new Contract(deVotingAddress, deVotingContractABI, provider);
        const voteId = await contract.voteId();

        for (let i = 1; i <= voteId; i++) {
          const voteStruct = await contract.getVote(i);
          console.info(voteStruct);
          const vote: Vote = {id: i.toString(), title: voteStruct[0], date: new Date(Number(voteStruct[4]) * 1000).toISOString().split('T')[0], choice: "yes"};
          Votes.push(vote);
        }
      }
      // 这里应该是从后端获取投票历史的逻辑
      // 为了演示,我们使用模拟数据
      // const mockVotes: Vote[] = [
      //   { id: "1", title: "Proposal A", date: "2023-06-01", choice: "Yes" },
      //   { id: "2", title: "Proposal B", date: "2023-06-15", choice: "No" },
      //   { id: "3", title: "Proposal C", date: "2023-07-01", choice: "Yes" },
      // ];
      setVotes(Votes);
    }
    getVoteList();
  }, [address]);

  return (
    <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-md">
      <h2 className="text-2xl font-bold mb-4">Vote History</h2>
      {votes.length > 0 ? (
        <ul className="space-y-4">
          {votes.map((vote) => (
            <li key={vote.id} className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h3 className="font-semibold">{vote.title}</h3>
              <p className="text-sm">Date: {vote.date}</p>
              <p className="text-sm">Choice: {vote.choice}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No voting history available.</p>
      )}
    </div>
  );
}
