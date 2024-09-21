'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ConnectWallet() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [account, setAccount] = useState(null)
  const router = useRouter()

  const switchToLinea = async () => {
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
      }
    }
  }

  const connectWallet = async () => {
    setIsConnecting(true)
    // 这里应该是实际的钱包连接逻辑
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsConnecting(false)
    router.push('/profile/0x123') // 假设地址是0x123
  }

  return (
    <button
      onClick={switchToLinea}
      disabled={isConnecting}
      className="bg-custom-blue text-black px-8 py-2 rounded-full font-semibold hover:bg-opacity-70 transition-colors"
    >
      {account != null ? account : 'Connect Wallet'}
    </button>
  )
}