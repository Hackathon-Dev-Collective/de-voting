"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { type TVote, type TOption } from "@/types/vote";
import { ethers, Contract } from "ethers";
import { deVotingAddress, deVotingContractABI } from "@/contracts";

export default function VoteResultPage() {
  const { id } = useParams();
  // const [voteData, setVoteData] = useState<TVoteData| null>(null);
  const [voteData, setVoteData] = useState<TVote| null>(null);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [isVoted, setIsVoted] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  function handleSelect(index: number) {
    if (index !== selectedOption) {
      setSelectedOption(index);
    } else {
      setSelectedOption(null);
    } 
  }

  async function handleClick() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(deVotingAddress, deVotingContractABI, signer);
      const tx = await contract.submitVote(id, selectedOption, 1);
      console.log(tx);
    }
  }

  const getVote = async() => {
    // const account = localStorage.getItem('linea_devoting/address');
    
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner()
      const contract = new Contract(deVotingAddress, deVotingContractABI, provider);
      const userVoted = await contract.checkIfUserVoted(id, signer.address);
      setIsVoted(userVoted);
      const voteStruct = await contract.getVote(id);

      const options: TOption[] = voteStruct[1].map((optionName: string, index: number) => ({
        name: optionName,
        voteCount: Number(voteStruct[2][index]), // 将 optionsCount 转为数字
      }));

      const endDate = new Date(Number(voteStruct[4]) * 1000);
      const now = Date.now();
      setIsEnded(endDate.getTime() < now);

      // const vote: TVote = {id: i.toString(), title: voteStruct[0], endDate: new Date(Number(voteStruct[4]) * 1000).toISOString().split('T')[0]};
      const vote: TVote = {
        id: id.toString(), // 将 id 转为字符串
        title: voteStruct[0], // 从合约中返回的投票标题
        options: options, // 将选项和对应的投票数填入数组
        totalVotes: options.reduce((total, option) => total + option.voteCount, 0), // 计算总投票数
        endDate: endDate.toISOString().split('T')[0], // 转换时间戳为日期字符串
      };
      
      setVoteData(vote);
    }
  }


  // get vote data
  useEffect(() => {
    getVote();
  }, [id]);

  if (!voteData) return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-8">
      <h2>Loading...</h2>
    </div>
  );

  function renderOptions() {
    if (isVoted || isEnded) {
      return (
        <>
          <p className="mb-4">Total Votes: {voteData!.totalVotes}</p>
          {voteData!.options.map((option, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{option.name}</p>
              <div className="bg-white bg-opacity-30 h-8 rounded-full overflow-hidden">
                <div
                  className="bg-white h-full"
                  style={{
                    width: `${
                      voteData!.totalVotes !== 0
                        ? (option.voteCount / voteData!.totalVotes) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-sm mt-1">
                {option.voteCount} votes (
                {voteData!.totalVotes !== 0
                  ? (option.voteCount / voteData!.totalVotes) * 100
                  : 0}
                %)
              </p>
            </div>
          ))}
        </>
      );
    } else {
      return (
        <>
          {voteData!.options.map((option, index) => (
            <div
              key={`${index}@${option.name}`}
              onClick={() => handleSelect(index)}
            >
              <Choice name={option.name} selected={selectedOption === index} />
            </div>
          ))}
          <div className="container text-center">
          <button 
            className="bg-custom-blue bg-opacity-30 px-7 py-2 rounded-full mt-4 hover:scale-105 transition-transform duration-300 cursor-pointer" disabled={isEnded || selectedOption === null}
            onClick={handleClick}
          >
            Vote
          </button>
          </div>
        </>
      )
    }

  }
  
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto bg-white bg-opacity-20 p-8 rounded-3xl shadow-lg">
      <div className="container text-center">
        <h1 className="text-3xl font-bold mb-4">
          <a href="/">{voteData.title}</a>
        </h1>
        </div>
        {renderOptions()}
      </div>
    </div>
  );
}

function Choice({name, selected}: {
  name: string,
  selected: boolean
}) {
  if (selected) {
    return (
      <div className="mb-4 bg-custom-blue p-3 rounded-3xl cursor-pointer">
        <p className="font-semibold">{name}</p>
      </div>
    );
  }

  return (
    <div className="mb-4 p-2">
      <p className="font-semibold">{name}</p>
    </div>
  )
}