import React from "react";

const HighlightedFeatureSection = () => {
  const features = [
    {
      title: "Medicine Delivery at Your Doorstep",
      description:
        "Order authentic medicines with discounts and get free home delivery within the city.",
      image: "/path-to-medicine-delivery-image.png", // Replace with actual image path
      buttonText: "Order Now",
    },
    {
      title: "Sample Collection from Home",
      description:
        "Book diagnostic tests easily, and certified professionals will collect samples from your home.",
      image: "/path-to-sample-collection-image.png", // Replace with actual image path
      buttonText: "Book Test",
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Highlighted Features
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Discover our key services designed for your convenience and health.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full md:w-1/2 h-64 object-cover"
              />
              <div className="p-6 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  {feature.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightedFeatureSection;
