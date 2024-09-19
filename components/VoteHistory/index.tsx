import { useState, useEffect } from "react";

type Vote = {
  id: string;
  title: string;
  date: string;
  choice: string;
};

export function VoteHistory({ address }: { address: string }) {
  const [votes, setVotes] = useState<Vote[]>([]);

  useEffect(() => {
    // 这里应该是从后端获取投票历史的逻辑
    // 为了演示,我们使用模拟数据
    const mockVotes: Vote[] = [
      { id: "1", title: "Proposal A", date: "2023-06-01", choice: "Yes" },
      { id: "2", title: "Proposal B", date: "2023-06-15", choice: "No" },
      { id: "3", title: "Proposal C", date: "2023-07-01", choice: "Yes" },
    ];
    setVotes(mockVotes);
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
