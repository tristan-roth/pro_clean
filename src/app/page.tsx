import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Atelier3D from "@/components/Atelier3D";
import BookingSection from "@/components/booking/BookingSection";
import ZoneContact from "@/components/ZoneContact";
import Footer from "@/components/Footer";
import Spotlight from "@/components/fx/Spotlight";

export default function HomePage() {
  return (
    <>
      {/* Trame textile + lampe d'inspection, derrière toute la page */}
      <Spotlight />

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Services />
          <Gallery />
          <Atelier3D />
          <BookingSection />
          <ZoneContact />
        </main>
        <Footer />
      </div>
    </>
  );
}
