import Category from "@/components/Category";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
