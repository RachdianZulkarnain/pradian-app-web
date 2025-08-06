export interface User {
  id: number;
  name: string;
  email: string;
  pictureProfile: string;
  referralCode: string;
  referralPoints: number;
  role: string;
  coupon: string;
  createdAt: Date;
  updatedAt: Date;
  accessToken: string;
}
