'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function ConnectWallet() {
  // const [isConnecting, setIsConnecting] = useState(false)
  const [account, setAccount] = useState(null)
  const router = useRouter()

  const switchToLineaSepolia = async () => {
    if (account == null) {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          "method": "eth_requestAccounts",
          "params": [],
        });
        await setAccount(accounts[0])

        // how to switch net: https://docs.metamask.io/wallet/reference/wallet_switchethereumchain/
        // what's the net chainId?: https://chainlist.org/?testnets=true&search=linea
        await window.ethereum.request({
          "method": "wallet_switchEthereumChain",
          "params": [
          {
            chainId: "0xe705"
          }
        ],
        });

        router.push(`/profile/${accounts[0]}`)
      }
    }
    router.push(`/profile/${account}`)
  }

  // 加载时从 localStorage 中恢复状态
  useEffect(() => {
    const savedState = localStorage.getItem('linea_devoting/address');
    if (savedState) {
      setAccount(savedState);
    }
  }, []);

  // 保存状态到 localStorage
  useEffect(() => {
    if (account) {
      localStorage.setItem('linea_devoting/address', account);
    }
  }, [account]);

  // const connectWallet = async () => {
  //   setIsConnecting(true)
  //   // 这里应该是实际的钱包连接逻辑
  //   await new Promise(resolve => setTimeout(resolve, 1000))
  //   setIsConnecting(false)
  //   router.push(`/profile/${account}`) // 假设地址是0x123
  // }

  return (
    <button
      onClick={switchToLineaSepolia}
      // disabled={isConnecting}
      className="bg-custom-blue text-black px-8 py-2 rounded-full font-semibold hover:bg-opacity-70 transition-colors"
    >
      {account != null ? (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      <img
        src="/icn-metamask.svg"
        width="20"
        height="20"
        alt="MetaMask Icon"
        style={{ display: 'inline-block', verticalAlign: 'middle' }}
      />
      <span style={{ marginLeft: '8px' }}>{`${account.slice(0, 5)}...${account.slice(-3)}`}</span>
    </span>
  ) : (
    'Connect Wallet'
  )}
    </button>
  )
}