import Header from "@/components/Header";
import EventList from "./_components/EventList";
import FooterSection from "@/components/Footer";
import { Suspense } from "react";

const Events = () => {
  return (
    <div className="container mx-auto px-4">
      {/* <Header/> */}
      <Suspense>
        <EventList />
      </Suspense>
      <FooterSection />
    </div>
  );
};

export default Events;
