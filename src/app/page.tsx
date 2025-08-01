import Category from "@/components/Category";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Newest from "@/components/Newest";

export default function Home() {
  return (
    <main>
      <Hero />
      <Category />
      <Newest />
      <Footer />
    </main>
  );
}
