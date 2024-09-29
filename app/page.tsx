"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ConnectWallet } from "@/components/ConnectWallet";
import { CreateVoteModal } from "@/components/CreateVoteModal";
import {Vote} from "@/components/Vote";
import { type TVote, type TOption } from "@/types/vote";
import { ethers, Contract } from "ethers";
import { deVotingContractABI, deVotingAddress } from "@/contracts";
import { useAccount } from "@/hooks/account";


export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [votes, setVotes] = useState<TVote[] | []>([]);
  const account = useAccount();


  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getVoteList = async() => {
    const tmpVotes: TVote[] = [];
    // const account = localStorage.getItem('linea_devoting/address');
    
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new Contract(deVotingAddress, deVotingContractABI, provider);
      const voteId = await contract.voteId();

      for (let i = 1; i <= voteId; i++) {
        const voteStruct = await contract.getVote(i);

        const options: TOption[] = voteStruct[1].map((optionName: string, index: number) => ({
          name: optionName,
          voteCount: Number(voteStruct[2][index]), // 将 optionsCount 转为数字
        }));

        // const vote: TVote = {id: i.toString(), title: voteStruct[0], endDate: new Date(Number(voteStruct[4]) * 1000).toISOString().split('T')[0]};
        const vote: TVote = {
          id: i.toString(), // 将 id 转为字符串
          title: voteStruct[0], // 从合约中返回的投票标题
          options: options, // 将选项和对应的投票数填入数组
          totalVotes: options.reduce((total, option) => total + option.voteCount, 0), // 计算总投票数
          endDate: new Date(Number(voteStruct[4]) * 1000).toLocaleString(), // 转换时间戳为日期字符串
        };
        tmpVotes.push(vote);
      }
    }
    setVotes(tmpVotes);
  }

  useEffect(() => {
    getVoteList();
  }, [account]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
    }[] = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      <div className="min-h-screen bg-black text-white relative p-4">
        <canvas ref={canvasRef} className="fixed inset-0" />
        <div className="relative z-10">
          <section className="h-screen flex flex-col justify-center items-center relative snap-start">
            <div
              className="text-center transform transition-transform duration-500 ease-out"
              style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            >
              <Image
                src="/linea-logo.svg"
                alt="Linea Logo"
                width={800}
                height={800}
                className="mx-auto mb-8"
              />
              <h1 className="text-8xl font-bold mb-4 animate-fade-in-up">
                Linea Voting
              </h1>
              <p className="text-xl mb-8 animate-fade-in-up animation-delay-300">
                Decentralized voting on the Linea network
              </p>
            </div>
            <ConnectWallet />
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </section>

          <section className="min-h-screen py-16 px-4 snap-start">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-center">
                Recent Votes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {votes.length > 0 &&
                  votes.filter(vote => {
                    const date = new Date(vote.endDate);
                    return date.getTime() > Date.now();
                  }).map((vote) => (
                    <Vote
                      key={vote.id}
                      title={vote.title}
                      vote_id={vote.id}
                      end_date={vote.endDate}
                    />
                  ))}
              </div>
            </div>
            <CreateVoteModal />
          </section>

          <section className="min-h-screen py-16 px-4 snap-start">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-center">
                History Votes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {votes.length > 0 &&
                  votes.filter(vote => {
                    const date = new Date(vote.endDate);
                    return date.getTime() < Date.now();
                  }).map((vote) => (
                    <Vote
                      key={vote.id}
                      title={vote.title}
                      vote_id={vote.id}
                      end_date={vote.endDate}
                    />
                  ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );}