import { useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import { Vote, OwnerVoteInfo} from "@/components/Vote";
import { deVotingAddress, deVotingContractABI } from "@/contracts";

type Vote = {
  id: string;
  title: string;
  date: string;
  choice: string;
};

export function VoteHistory({ address }: { address: string }) {
  const [votes, setVotes] = useState<Vote[]>([]);

  useEffect(() => {
    const getVoteList = async () => {
      const Votes: Vote[] = [];
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(deVotingAddress, deVotingContractABI, provider);
        const voteId = await contract.voteId();

        for (let i = 1; i <= voteId; i++) {
          const voteStruct = await contract.getVote(i);
          const userVoteInfo = await contract.getVotedInfo(i, signer.address);
          const vote: Vote = {id: i.toString(), title: voteStruct[0], date: new Date(Number(userVoteInfo[2]) * 1000).toLocaleString(), choice: userVoteInfo[0]};
          Votes.push(vote);
        }
      }
      setVotes(Votes);
    }
    getVoteList();
  }, [address]);

  return (
    <div className="container mx-auto flex flex-col bg-write bg-opacity-20 p-6 rounded-lg backdrop-blur-md">
      <div className="container text-center" >
        <h2 className="text-2xl font-bold mb-4 ">Vote History</h2>
      </div>
      <div className="grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 text-center gap-8">
        {votes.length > 0 && 
            votes.filter(vote => {
              return vote.choice.length != 0;
            }).map((vote) => (
              <OwnerVoteInfo
                choice={vote.choice}
                title={vote.title}
                vote_id={vote.id}
                end_date={vote.date}
              />
            ))}
      </div>
    </div>
  );
}
