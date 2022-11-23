export type Transaction = {
  id: number;
  sourceId: number;
  amount: number;
  description: string;
  transferDate: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};
