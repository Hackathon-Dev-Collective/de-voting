"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { type TVoteData } from "../../../types/vote";

export default function VoteResultPage() {
  const { id } = useParams();
  const [voteData, setVoteData] = useState<TVoteData| null>(null);

  // get vote data
  useEffect(() => {
    setVoteData({
      title: "Sample Vote Topic",
      options: [
        { name: "Option 1", voteCount: 10 },
        { name: "Option 2", voteCount: 15 },
        { name: "Option 3", voteCount: 5 },
      ],
      totalVotes: 30,
    });
  }, [id]);

  if (!voteData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-8">
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
