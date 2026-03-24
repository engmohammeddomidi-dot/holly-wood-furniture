import React from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Owner } from '../components/sections/Owner';
import { Services } from '../components/sections/Services';
import { PortfolioSection } from '../components/sections/Portfolio';
import { Process } from '../components/sections/Process';
import { Contact } from '../components/sections/Contact';

export const Home: React.FC = () => (
  <main>
    <Hero />
    <About />
    <Owner />
    <Services />
    <PortfolioSection />
    <Process />
    <Contact />
  </main>
);
