"use client"

import Link from "next/link";

type VoteProps = {
    title: string;
    vote_id: string;
    end_date: string;
}
export default function Vote({
    title,
    vote_id,
    end_date,
}: VoteProps) {

    const endDate = new Date(end_date);
    const now = Date.now();
    const dateDiff = Math.floor((endDate.getTime() - now) / (1000 * 60 * 60 * 24));

    if (dateDiff < 0) {
      return (
        <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30 hover:scale-105">
          <h3 className="text-2xl font-semibold mb-4">{title}</h3>
          <p className="mb-4">Ended in {endDate.toLocaleDateString()}</p>
          <Link
            href={`/vote/${vote_id}`}
            className="inline-block bg-white text-black px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors"
          >
            View Results
          </Link>
        </div>
      );
    }

    return (
      <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30 hover:scale-105">
        <h3 className="text-2xl font-semibold mb-4">{title}</h3>
        <p className="mb-4">{`Ends in ${dateDiff} days`}</p>
        <Link
          href={`/vote/${vote_id}`}
          className="inline-block bg-white text-black px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors"
        >
          Vote
        </Link>
      </div>
    );
}