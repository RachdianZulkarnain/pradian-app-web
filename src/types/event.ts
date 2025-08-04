export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: string;
  content: string;
  category: string;
  thumbnail: string;
  startDate: Date;
  endDate: Date;
  adminId: number;
  updatedAt: Date;
  createdAt: Date;
  tickets?: {
    price: number;
  }[];
  admin?: {
    name: string;
    pictureProfile?: string;
  };
}
