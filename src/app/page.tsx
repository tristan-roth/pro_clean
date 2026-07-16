import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import BookingSection from "@/components/booking/BookingSection";
import ZoneContact from "@/components/ZoneContact";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <BookingSection />
        <ZoneContact />
      </main>
      <Footer />
    </>
  );
}
