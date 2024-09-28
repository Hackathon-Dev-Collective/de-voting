'use client'

import { useAccount } from '@/hooks/account';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import AddressShorten from '@/components/AddressShorten';

export function ConnectWallet() {
  // const [isConnecting, setIsConnecting] = useState(false)
  const { account, balance, error, tokenSymbol, connectWallet, disconnectWallet } = useAccount()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const router = useRouter(); 

  const handleConnect = async () => {
    await connectWallet();
  };

  const handleDisconnect = async () => {
    disconnectWallet();
  }

  const handleClick = () => {
    if (account) {
      router.push(`/profile/${account}`);
    }
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 300); // 300ms delay before closing
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (account) {
    return (
      <div
        className="fixed top-8 right-8 cursor-pointer bg-custom-blue text-black px-6 py-3 rounded-full font-semibold enabled:hover:bg-opacity-90 transition-colors shadow-lg disabled:opacity-50"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AddressShorten address={account  } />
        {isHovering && (
          <div
            className="absolute top-full left-0 mt-2 w-full bg-slate-400 text-white rounded shadow-lg p-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {balance !== null && tokenSymbol && (
              <div className="mb-2 text-center">
                <div>Balance</div>
                <div className='text-lg'>{`${balance} ${tokenSymbol}`}</div>
              </div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDisconnect();
              }}
              className="w-full bg-red-400 text-white px-4 py-2 rounded-full hover:bg-red-9 00 transition-colors"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
    >
      Connect Wallet to Start
    </button>
  )
}