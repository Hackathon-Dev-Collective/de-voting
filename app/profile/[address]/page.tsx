"use client";

// import { RewardAnimation } from "@/components/RewardAnimation";
import { RewardHistory } from "@/components/RewardHistory";
import { VoteHistory } from "@/components/VoteHistory";
import Link from "next/link";
import { useAccount } from "@/hooks/account";


export default function ProfilePage() {
  const { account, balance, tokenSymbol, isLoading } = useAccount();

  // const [isVerified, setIsVerified] = useState(false);

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

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white p-8">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-black p-8 rounded-lg backdrop-blur-md mb-8">
          <h1 className="text-3xl font-bold mb-4">
            <Link href="/">User Profile</Link>
          </h1>
          <p className="mb-4">Address: {account}</p>
          <p className="mb-4">Balance: {`${balance} ${tokenSymbol}`}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <VoteHistory address={account!} />
          <RewardHistory address={account!} />
        </div>
      </div>
      {/* {showReward && <RewardAnimation />} */}
    </div>
  );
}
