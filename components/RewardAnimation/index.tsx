"use client";

import { useEffect, useState } from "react";

export function RewardAnimation() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg text-purple-600 text-center">
        <h2 className="text-4xl font-bold mb-4">Congratulations!</h2>
        <p className="text-2xl">{"You've earned 45 tokens!"}</p>
        <div className="mt-4 text-6xl animate-bounce">🎉</div>
      </div>
    </div>
  );
}
