import { Event } from "./event";
import { TransactionDetail } from "./transaction-detail";

export interface Transaction {
  id: number;
  userId: number;
  eventId: number;
  paymentMethod: string | null;
  voucherId: number | null;
  uuid: string;
  status: string;
  paymentProof: string | null;
  couponUsed: string | null;
  pointsUsed: number | null;
  createdAt: string;
  updatedAt: string;

  event?: Event;
  transactionDetail?: TransactionDetail[];
}
