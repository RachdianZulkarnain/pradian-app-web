import Header from "@/components/Header";
import EventList from "./_components/EventList";
import FooterSection from "@/components/Footer";

const Events = () => {
  return (
    <div className="container mx-auto px-4">
      {/* <Header/> */}
      <EventList />
      <FooterSection/>
    </div>
  );
};

export default Events;
