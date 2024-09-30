"use client"

import Link from "next/link";

type VoteProps = {
    title: string;
    vote_id: string;
    end_date: string;
}

export function Vote({
    title,
    vote_id,
    end_date,
}: VoteProps) {
  // new Date(Number(end_date) * 1000).toLocaleString()
    // const endDate = new Date(Number(end_date) * 1000);
    const currentDate = new Date().toLocaleDateString();
    // const dateDiff = Math.floor((endDate.getTime() - now) / (1000 * 60 * 60 * 24));

    if (currentDate > end_date) {
      return (
        <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30 hover:scale-110">
          <h3 className="text-2xl font-semibold mb-4">{title}</h3>
          <p className="mb-4">Ended in {end_date}</p>
          <Link
            href={`/vote/${vote_id}`}
            className="inline-block bg-custom-blue text-black px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors"
          >
            Vote
          </Link>
        </div>
      );
    }

    return (
      <div className="bg-white bg-opacity-20 p-6 rounded-3xl backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30 hover:scale-110">
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <p className="mb-4">Ends at {end_date}</p>
        <Link
          href={`/vote/${vote_id}`}
          className="inline-block bg-custom-blue text-black px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors"
        >
          View Results
        </Link>
      </div>
    );
}


type OwnerVoteProps = {
  vote_id: string;
  title: string;
  choice: string;
  end_date: string;
}

export function OwnerVoteInfo({
  vote_id, title, choice, end_date
}: OwnerVoteProps) {

  return (
  <div className="bg-white bg-opacity-20 p-6 rounded-3xl backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30 hover:scale-110">
    <h3 className="text-2xl font-semibold mb-4">{title}</h3>
    <p className="mb-4">Choince: {choice}</p>
    <p className="mb-4">Voted at {end_date}</p>
    <Link
      href={`/vote/${vote_id}`}
      className="inline-block bg-white text-black px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors"
    >
      Vote
    </Link>
  </div>
  )
}