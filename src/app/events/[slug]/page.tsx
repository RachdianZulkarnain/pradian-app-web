import { Suspense } from "react";
import EventHeader from "./components/EventHeader";
import Loading from "@/components/Loading";
import FooterSection from "@/components/Footer";

const EventDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  return (
    <main className="container mx-auto px-4 pb-20">
      <Suspense fallback={<Loading />}>
        <EventHeader slug={slug} />
        <FooterSection />
      </Suspense>
    </main>
  );
};

export default EventDetail;
