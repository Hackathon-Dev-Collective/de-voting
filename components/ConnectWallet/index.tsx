'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ConnectWallet() {
  const [isConnecting, setIsConnecting] = useState(false)
  const router = useRouter()

  const connectWallet = async () => {
    setIsConnecting(true)
    // 这里应该是实际的钱包连接逻辑
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsConnecting(false)
    router.push('/profile/0x123') // 假设地址是0x123
  }

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
    >
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  )
}