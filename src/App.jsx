import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import ParallaxBanner from "./components/ParallaxBanner";
import Features from "./components/Features";
import About from "./components/About";
import Transformation from "./components/Transformation";
import Testimonials from "./components/Testimonials";
import Instagram from "./components/Instagram";
import BookingCTA from "./components/BookingCTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import AmbientBackground from "./components/AmbientBackground";

export default function App() {
  return (
    <div>
      <AmbientBackground />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Gallery />
        <ParallaxBanner />
        <Features />
        <About />
        <Transformation />
        <Testimonials />
        <Instagram />
        <BookingCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
