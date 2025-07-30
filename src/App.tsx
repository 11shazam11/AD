import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/sections/Hero';
import { Features } from './components/sections/Features';
import { Pricing } from './components/sections/Pricing';
import { Testimonials } from './components/sections/Testimonials';
import { FAQ } from './components/sections/FAQ';
import { Footer } from './components/sections/Footer';
import './styles/animations.css';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;