export interface Voucher {
  id: number;
  code: string;
  value: number;
  limit: number;
  eventId: number;
  createdBy: number;
  createdAt: string;
  event?: {
    id: number;
    name: string;
  };
  user?: {
    id: number;
    name: string;
  };
}

export interface CreateVoucherProps {
  events: {
    id: string;
    name: string;
  }[];
}
