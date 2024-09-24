"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { type TVote, type TOption } from "../../../types/vote";
import { ethers, Contract } from "ethers";

const deVotingContractABI = [
  "function voteId() public view returns (uint256)",
  "function getVote(uint256 voteId) public view returns(string memory _topic, string[] memory _options, uint256[] memory _optionsCount, address _owner, uint256 _endTime)"
]
const deVotingAddress = "0x57Ea7AcA1331e403192BcCdF5449937a54CF2C45";

export default function VoteResultPage() {
  const { id } = useParams();
  // const [voteData, setVoteData] = useState<TVoteData| null>(null);
  const [voteData, setVoteData] = useState<TVote| null>(null);

  const getVote = async() => {
    // const account = localStorage.getItem('linea_devoting/address');
    
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new Contract(deVotingAddress, deVotingContractABI, provider);
      const voteStruct = await contract.getVote(id);

      const options: TOption[] = voteStruct[1].map((optionName: string, index: number) => ({
        name: optionName,
        voteCount: Number(voteStruct[2][index]), // 将 optionsCount 转为数字
      }));

      // const vote: TVote = {id: i.toString(), title: voteStruct[0], endDate: new Date(Number(voteStruct[4]) * 1000).toISOString().split('T')[0]};
      const vote: TVote = {
        id: id.toString(), // 将 id 转为字符串
        title: voteStruct[0], // 从合约中返回的投票标题
        options: options, // 将选项和对应的投票数填入数组
        totalVotes: options.reduce((total, option) => total + option.voteCount, 0), // 计算总投票数
        endDate: new Date(Number(voteStruct[4]) * 1000).toISOString().split('T')[0], // 转换时间戳为日期字符串
      };
      setVoteData(vote);
    }
  }


  // get vote data
  useEffect(() => {
    getVote();
  }, [id]);

  if (!voteData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-md mx-auto bg-white bg-opacity-20 p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">{voteData.title}</h1>
        <p className="mb-4">Total Votes: {voteData.totalVotes}</p>
        {voteData.options.map((option, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold">{option.name}</p>
            <div className="bg-white bg-opacity-30 h-8 rounded-full overflow-hidden">
              <div
                className="bg-white h-full"
                style={{
                  width: `${(option.voteCount / voteData.totalVotes) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-sm mt-1">
              {option.voteCount} votes (
              {((option.voteCount / voteData.totalVotes) * 100).toFixed(2)}%)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
