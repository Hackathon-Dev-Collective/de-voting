"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RewardAnimation } from "@/components/RewardAnimation";
import { VoteHistory } from "@/components/VoteHistory";
import { RewardHistory } from "@/components/RewardHistory";
import { useRouter } from "next/navigation";
import { ethers, Contract, formatUnits } from "ethers";

const dvtContractABI = [
  // "function balanceOf(address owner) view returns (uint256)",
  // "function balanceOf(address account) public view virtual returns (uint256)"
  "function balanceOf(address owner) view returns (uint256)"
];
// DVT address
const dvtAddress = "0x1F9Ec6c29eE87b89c3732984cEf8BD7e99d9c713";

export default function ProfilePage() {
  const { address } = useParams();
  const [dvtBalance, setDvtBalance] = useState(0);

  const [provider, setProvider] = useState<ethers.Provider | null>(null);
  const router = useRouter();
  const state = {
    isConnected: true,
    address: address,
  };

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        // https://docs.ethers.org/v6/getting-started/
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        const contract = new Contract(dvtAddress, dvtContractABI, provider);
        const balanceInWei = await contract.balanceOf(address);
        setDvtBalance(formatUnits(balanceInWei, 18));
      } else {
        console.error("MetaMask is not installed");
      }
    };

    connectWallet();
  }, []);

  // useEffect(() => {
  //   if (!state.isConnected) {
  //     router.push('/')
  //   }
  // }, [state.isConnected, router])

  // useEffect(() => {
  //   // 模拟验证过程
  //   setTimeout(() => {
  //     setIsVerified(true);
  //   }, 2000);
  // }, []);

  // 我们直接发吧，不要用户来领取，少做点
  // const claimReward = () => {
  //   setShowReward(true);
  //   // 这里应该有领取奖励的逻辑
  // };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black p-8 rounded-lg backdrop-blur-md mb-8">
          {/* <h1 className="text-3xl font-bold mb-4">User Profile</h1> */}
          <p className="mb-4">Address: {state.address}</p>
          <p className="mb-4">DVT: {dvtBalance}</p>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> */}
          <VoteHistory address={state.address} />
          {/* <RewardHistory address={state.address} /> */}
        {/* </div> */}
      </div>
      {/* {showReward && <RewardAnimation />} */}
    </div>
  );
}
