import { useState, useEffect } from "react";

type Reward = {
  id: string;
  amount: number;
  date: string;
  reason: string;
};

export function RewardHistory({ address }: { address: string }) {
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    // 这里应该是从后端获取奖励历史的逻辑
    // 为了演示,我们使用模拟数据
    const mockRewards: Reward[] = [];
    setRewards(mockRewards);
  }, [address]);

  return (
    <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-md">
      <h2 className="text-2xl font-bold mb-4">Reward History</h2>
      {rewards.length > 0 ? (
        <ul className="space-y-4">
          {rewards.map((reward) => (
            <li
              key={reward.id}
              className="bg-white bg-opacity-10 p-4 rounded-lg"
            >
              <h3 className="font-semibold">{reward.amount} tokens</h3>
              <p className="text-sm">Date: {reward.date}</p>
              <p className="text-sm">Reason: {reward.reason}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>{`No reward history available. 
          We'll later complete this feature`}</p>
      )}
    </div>
  );
}
