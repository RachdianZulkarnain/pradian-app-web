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
  price: number;
  adminId: number;
  updatedAt: Date;
  createdAt: Date;
}
