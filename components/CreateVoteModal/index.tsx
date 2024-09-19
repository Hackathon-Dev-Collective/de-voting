"use client";

import { useState } from "react";
import { type TVote } from "../../types/vote";

export function CreateVoteModal({
  addVotes, disabled = false
}: {
  addVotes: (value: TVote) => void,
  disabled?: boolean
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [endDate, setEndDate] = useState("");

  const handleCreateVote = (e: React.FormEvent) => {
    e.preventDefault();
    addVotes({
      title,
      id: Date.now().toString(),
      options: 
        options.map((option) => ({ name: option, voteCount: 0 })),
      totalVotes: 0,
      endDate,
    })
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-white text-purple-600 px-6 py-3 rounded-full font-semibold enabled:hover:bg-opacity-90 transition-colors shadow-lg disabled:opacity-50"
        disabled={disabled}
      >
        Create Vote
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-purple-600 p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Create New Vote</h2>
            <form onSubmit={handleCreateVote}>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Vote title"
                className="w-full p-2 mb-4 border rounded"
              />
              {options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                  placeholder={`Option ${index + 1}`}
                  className="w-full p-2 mb-4 border rounded"
                />
              ))}
              <button
                type="button"
                onClick={() => setOptions([...options, ""])}
                className="mb-4 text-sm underline"
              >
                Add Option
              </button>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mr-2 px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
