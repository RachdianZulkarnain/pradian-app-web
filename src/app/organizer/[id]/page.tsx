// app/organizer/[id]/page.tsx
import { Suspense } from "react";
import Loading from "@/components/Loading";
import OrganizerHeader from "./components/OrganizerHeader";
import OrganizerBody from "./components/OrganizerBody";

interface OrganizerProfilePageProps {
  params: { id: string };
}

const OrganizerProfile = ({ params }: OrganizerProfilePageProps) => {
  const id = params.id;

  console.log("Organizer ID:", id); // Untuk debugging

  return (
    <main className="container mx-auto px-4 pb-20">
      <Suspense fallback={<Loading />}>
        <OrganizerHeader  />
        <OrganizerBody />
      </Suspense>
    </main>
  );
};

export default OrganizerProfile;
