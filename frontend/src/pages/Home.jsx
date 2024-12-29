// pages/Home.jsx
import React from "react";
import Header from "../components/common/Header";
import Hero from "../components/common/Hero";
import Services from "../components/common/Services";

import Footer from "../components/common/Footer";
import StatisticsSection from "../components/common/StatisticsSection";
import WhyChooseUsSection from "../components/common/WhyChooseUsSection";
import HighlightedFeatureSection from "../components/common/HighlightedFeatureSection";
import TestimonialsSection from "../components/common/TestimonialsSection";
import FAQSection from "../components/common/FAQSection";

const Home = () => {
  return (
    <>
      <Header />
      <main className="pt-[150px]">
        {/* Main sections of the Home page */}
        <Hero />
        <section className=" mx-auto ">
          <Services />
         <StatisticsSection />
          <WhyChooseUsSection />
          <HighlightedFeatureSection />
          <TestimonialsSection />
         <FAQSection />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
