import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

import HeroBanner from "./components/Home/HeroBanner";
import AboutSection from "./components/Home/About";
import PortfolioSection from "./components/Home/Portfolio";
import ServicesSection from "./components/Home/Services";
import ContactForm from "./components/Home/Contact";

export default function Home() {
  return (
    <div className="bg-[var(--bg)] text-[var(--text-color)]">
      {/* HEADER */}
      <Header />

      {/* HERO */}
      <section id="hero"  className="pt-16" >
        <HeroBanner />
      </section>

      {/* ABOUT */}
      <section id="about" >
        <AboutSection/>
      </section>

      {/* PORTFOLIO */}
      <section id="project" >
        <PortfolioSection   />
      </section>

      {/* SERVICES / LEARNING */}
      <section id="services" >
        <ServicesSection />
      </section>

      {/* CONTACT */}
      <section id="contact" >
        <ContactForm />
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
