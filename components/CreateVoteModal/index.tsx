"use client";

import { useState } from "react";
import { deVotingAddress, deVotingContractABI } from "@/contracts";
import { ethers, Contract } from "ethers";
import { useAccount } from "@/hooks/account";

export function CreateVoteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState<Array<string>>(["", ""]);
  const [endDate, setEndDate] = useState("");
  const { account } = useAccount();

  const createVote = async() => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(deVotingAddress, deVotingContractABI, signer);

      const endDateTimeStamp = new Date(endDate); // 将其转换为 Date 对象
      const unixTimestampInSeconds = Math.floor(endDateTimeStamp.getTime() / 1000);
      const voteId = await contract.createVote(title, options, unixTimestampInSeconds);
      await voteId.wait();
      setIsOpen(false);
    }
  }
  const handleCreateVote = (e: React.FormEvent) => {
    e.preventDefault();
    createVote();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-custom-blue text-black px-6 py-3 rounded-full font-semibold enabled:hover:bg-opacity-90 transition-colors shadow-lg disabled:opacity-50"
        disabled={account ? false : true}
      >
        Create Vote
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-black p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Create New Vote</h2>
            <form onSubmit={handleCreateVote}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Vote title"
                className="w-full p-2 mb-4 border rounded"
              />
              {options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value.toString();
                    setOptions(newOptions);
                  }}
                  placeholder={`Option ${index + 1}`}
                  className="w-full p-2 mb-4 border rounded"
                />
              ))}
              <button
                type="button"
                onClick={() => setOptions([...options, ""])}
                className="mb-4 text-sm underline"
              >
                Add Option
              </button>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mr-2 px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
