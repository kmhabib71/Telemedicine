import React from "react";

const StatisticsSection = () => {
  const stats = [
    {
      icon: "🕒", // Replace with your SVG or image
      value: "10 Minutes",
      description: "Average consultation waiting time",
      color: "text-blue-500",
    },
    {
      icon: "🩺", // Replace with your SVG or image
      value: "4M+",
      description: "People under healthcare coverage",
      color: "text-pink-500",
    },
    {
      icon: "📹", // Replace with your SVG or image
      value: "561K+",
      description: "Video consultation successfully completed",
      color: "text-green-500",
    },
    {
      icon: "⭐", // Replace with your SVG or image
      value: "95%",
      description: "Customers gave 5 star rating",
      color: "text-yellow-500",
    },
    {
      icon: "📲", // Replace with your SVG or image
      value: "1+ Million",
      description: "App download on Playstore",
      color: "text-indigo-500",
    },
  ];

  return (
    <section className="bg-blue-50 py-10 mt-10 mb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`text-5xl mb-4 ${stat.color}`}
                aria-label={stat.description}
              >
                {stat.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
