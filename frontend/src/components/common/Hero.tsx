// components/common/Hero.jsx
import React from "react";

const Hero = () => {
  return (
    <section className="bg-blue-50 py-20 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-600">
          No. 1 Healthcare App in Bangladesh
        </h1>
        <p className="text-gray-600 mt-4">
          Based on ratings, downloads, and user satisfaction.
        </p>
        <img
          src="/path-to-hero-image.png"
          alt="Healthcare App"
          className="mx-auto mt-6 w-3/4 md:w-1/2"
        />
        <div className="mt-6 space-x-4">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600">
            Get Started
          </button>
          <button className="bg-white text-blue-500 px-6 py-3 rounded-lg shadow border hover:bg-gray-100">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
