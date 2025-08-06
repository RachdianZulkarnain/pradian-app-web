export interface Organizer {
  id: string;
  name: string;
  email: string;
  pictureProfile: string | null;
  role: "ADMIN" | string;
}

