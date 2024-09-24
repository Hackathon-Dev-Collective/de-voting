import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { voteToken, voteTokenABI } from "@/contracts";

export function useAccount() {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [tokenSymbol, setTokenSymbol] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0xe705" }],
          });
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0xe705",
                    chainName: "Linea Sepolia",
                    nativeCurrency: {
                      name: "Linea Ether",
                      symbol: "ETH",
                      decimals: 18,
                    },
                    rpcUrls: ["https://rpc.sepolia.linea.build"],
                    blockExplorerUrls: ["https://sepolia.lineascan.build"],
                  },
                ],
              });
            } catch (addError) {
              setError("Failed to add Linea Sepolia network");
            }
          } else {
            setError("Failed to switch to Linea Sepolia network");
          }
        }

        await updateTokenInfo(address, provider);
      } else {
        setError("MetaMask is not installed");
      }
    } catch (err) {
      setError("Failed to connect to MetaMask");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
    setTokenSymbol(null);
  };

  const updateTokenInfo = async (
    address: string,
    provider: ethers.BrowserProvider
  ) => {
    try {
      const contract = new ethers.Contract(voteToken, voteTokenABI, provider);
      const balance = await contract.balanceOf(address);
      const decimals = await contract.decimals();
      const symbol = await contract.symbol();

      setBalance(ethers.formatUnits(balance, decimals));
      setTokenSymbol(symbol);
    } catch (err) {
      setError("Failed to fetch token information");
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const address = await accounts[0].getAddress();
          setAccount(address);
          await updateTokenInfo(address, provider);
        }
      }
    };

    checkConnection();

    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", async (accounts: string[]) => {
        const newAccount = accounts[0] || null;
        setAccount(newAccount);
        if (newAccount) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await updateTokenInfo(newAccount, provider);
        } else {
          setBalance(null);
          setTokenSymbol(null);
        }
      });
    }

    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener("accountsChanged", () => {});
      }
    };
  }, []);

  return {
    account,
    error,
    balance,
    tokenSymbol,
    connectWallet,
    disconnectWallet,
  };
}
