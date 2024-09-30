"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import type {  TVote, TOption } from "@/types/vote";
import { ethers, Contract } from "ethers";
import { deVotingAddress, deVotingContractABI } from "@/contracts";

export default function VoteResultPage() {
  const { id } = useParams();
  // const [voteData, setVoteData] = useState<TVoteData| null>(null);
  const [voteData, setVoteData] = useState<TVote| null>(null);
  const [isEnded, setIsEnded] = useState<boolean>(false);
  const [isVoted, setIsVoted] = useState<boolean>(false);
  const [canAllowance, setCanAllowance] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [message, setMessage] = useState<TMessage | null>(null);
  const [inviteAddress, setInviteAddress] = useState<string | null>(null);

  type TMessage = {
    id: number;
    text: string;
  }

  function handleSelect(index: number) {
    if (index !== selectedOption) {
      setSelectedOption(index);
    } else {
      setSelectedOption(null);
    } 
  }

  function messageAlter() {
    setMessage(
      { id: Date.now(), text: "you have no access to vote this. please find allowance." }
    );
  }

  async function handleClick() {
    if (!canAllowance) {
      messageAlter();
      return;
    }
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(deVotingAddress, deVotingContractABI, signer);
        const rewardcount = await contract.rewardCount();
        const tx = await contract.submitVote(id, selectedOption, 1);
        console.log(tx);
        if (tx) {
          alert(`submitVote success, you will get ${rewardcount} DVT`);
        } else {
          alert(`submitVote failed`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const inviteSubmit = async() => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(deVotingAddress, deVotingContractABI, signer);
        const tx = await contract.inviteUserVote(id, inviteAddress);
        console.log(tx);
        if (tx) {
          alert(`invite user ${inviteAddress} success`);
        } else {
          alert(`invite user ${inviteAddress} failed`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    inviteSubmit();
  }

  

  // get vote data
  useEffect(() => {
    const getVote = async () => {
      // const account = localStorage.getItem('linea_devoting/address');

      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(
          deVotingAddress,
          deVotingContractABI,
          provider
        );
        const userVoted = await contract.checkIfUserVoted(id, signer.address);
        setIsVoted(userVoted);
        const voteStruct = await contract.getVote(id);

        // 是否有权限邀请人来投票
        const _canAllowance = await contract.checkIfUserHavaAllowance(
          id,
          signer.address
        );
        setCanAllowance(_canAllowance);

        const options: TOption[] = voteStruct[1].map(
          (optionName: string, index: number) => ({
            name: optionName,
            voteCount: Number(voteStruct[2][index]), // 将 optionsCount 转为数字
          })
        );

        const endDate = new Date(Number(voteStruct[4]) * 1000);
        const now = Date.now();
        setIsEnded(endDate.getTime() < now);

        // const vote: TVote = {id: i.toString(), title: voteStruct[0], endDate: new Date(Number(voteStruct[4]) * 1000).toISOString().split('T')[0]};
        const vote: TVote = {
          id: id.toString(), // 将 id 转为字符串
          title: voteStruct[0], // 从合约中返回的投票标题
          options: options, // 将选项和对应的投票数填入数组
          totalVotes: options.reduce(
            (total, option) => total + option.voteCount,
            0
          ), // 计算总投票数
          endDate: endDate.toISOString().split("T")[0], // 转换时间戳为日期字符串
        };

        setVoteData(vote);
      }
    };

    getVote();
  }, [id]);

  if (!voteData) return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-8">
      <h2>Loading...</h2>
    </div>
  );

  function inviteUser() {
    return (
      <>
          <form onSubmit={handleInviteSubmit} className="flex items-center space-x-4 w-full">
            <div className="w-full">
              <input 
                type="text"
                placeholder="You can invite user to vote. please input user address"
                value={inviteAddress || ""}
                onChange={(e) => setInviteAddress(e.target.value)}
                className="text-black w-full border rounded-full h-10"
              />
            </div>
            <div>
              <button type="submit" className="bg-custom-blue px-7 py-2 rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer text-black">
                Invite
              </button>
            </div>
          </form>
      </>
    )
  }

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
                  className="bg-custom-blue h-full"
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
            className="bg-custom-blue px-7 py-2 rounded-full text-black mt-4 hover:scale-105 transition-transform duration-300 cursor-pointer" disabled={isEnded || selectedOption === null}
            onClick={handleClick}
          >
            Vote
          </button>
          <div className="mt-4">
            { message && (
              <div
                key={message.id}
                className="bg-gray-100 border border-gray-300 rounded p-4 mb-2 transition-opacity duration-500 text-black"
                style={{ opacity: 1, animation: 'fadeOut 5s forwards' }}
                onAnimationEnd={() => setMessage(null)}
              >
                {message.text}
              </div>
            )}
            </div>
            <style jsx>{`
              @keyframes fadeOut {
                0% {
                  opacity: 1;
                }
                100% {
                  opacity: 0;
                }
              }
            `}</style>
          </div>
        </>
      )
    }

  }

  // function 
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto bg-white bg-opacity-20 p-8 rounded-3xl shadow-lg">
        <div className="container text-center">
          <h1 className="text-3xl font-bold mb-4">
            <a href="/">{voteData.title}</a>
          </h1>
        </div>
          {renderOptions()}
        <div className="flex w-full mt-10">
          {inviteUser()}
        </div>
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