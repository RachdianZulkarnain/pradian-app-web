export interface Review {
  id: number;
  comment: string;
  rating: number;
  createdAt: string; // ISO string dari Date
  updatedAt: string;
  deletedAt: string | null;
  userId: number;
  eventId: number;
  user: {
    id: number;
    name: string;
    pictureProfile: string | null;
  };
}
