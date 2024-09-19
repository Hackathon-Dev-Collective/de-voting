type TOption = {
  name: string;
  voteCount: number;
};
export type TVote = {
  title: string;
  id: string;
  options: Array<TOption>;
  totalVotes: number;
  endDate: string;
};

export type TVoteData = Omit<TVote, "id" | "endDate">;
