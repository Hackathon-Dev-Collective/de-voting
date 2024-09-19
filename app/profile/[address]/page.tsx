"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { RewardAnimation } from "@/components/RewardAnimation";
import { VoteHistory } from "@/components/VoteHistory";
import { RewardHistory } from "@/components/RewardHistory";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { address } = useParams();
  const [isVerified, setIsVerified] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const router = useRouter();
  const state = {
    isConnected: true,
    address: address[0],
  };

  useEffect(() => {
    if (!state.isConnected) {
      router.push('/')
    }
  }, [state.isConnected, router])

  useEffect(() => {
    // 模拟验证过程
    setTimeout(() => {
      setIsVerified(true);
    }, 2000);
  }, []);

  const claimReward = () => {
    setShowReward(true);
    // 这里应该有领取奖励的逻辑
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white bg-opacity-20 p-8 rounded-lg backdrop-blur-md mb-8">
          <h1 className="text-3xl font-bold mb-4">User Profile</h1>
          <p className="mb-4">Address: {state.address}</p>
          <p className="mb-4">
            Status: {isVerified ? "Verified" : "Verifying..."}
          </p>
          {isVerified && (
            <button
              onClick={claimReward}
              className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
            >
              Claim Reward
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <VoteHistory address={state.address} />
          <RewardHistory address={state.address} />
        </div>
      </div>
      {showReward && <RewardAnimation />}
    </div>
  );
}
