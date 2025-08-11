import React from 'react';
import Header from '../components/common/Header.jsx';
import Hero from '../components/Hero.jsx';
import Features from '../components/Features.jsx';
import Limitations from '../components/Limitations.jsx';
import Footer from '../components/common/Footer.jsx';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <Features />
      <Limitations />
      <Footer />
    </div>
  );
};

export default HomePage;
