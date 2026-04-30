import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/landing/Navbar";
import { Hero } from "./components/landing/Hero";
import { Destinations } from "./components/landing/Destinations";
import { Activities } from "./components/landing/Activities";
import { HowItWorks } from "./components/landing/HowItWorks";
import { Testimonials } from "./components/landing/Testimonials";
import { OperatorCTA } from "./components/landing/OperatorCTA";
import { Footer } from "./components/landing/Footer";

const Landing = () => (
  <main data-testid="landing-page" className="bg-[#FAF8F5] text-[#0A1929] overflow-x-hidden">
    <Navbar />
    <Hero />
    <Destinations />
    <Activities />
    <HowItWorks />
    <Testimonials />
    <OperatorCTA />
    <Footer />
  </main>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
