import { Ticket } from "./ticket";

export interface TransactionDetail {
  id: number;
  transactionId: number;
  ticketId: number;
  qty: number;
  price: number;
  createdAt: string;
  updateAt: string;
  ticket: Ticket;
}
