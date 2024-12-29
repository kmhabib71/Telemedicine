import React from "react";

const WhyChooseUsSection = () => {
  const benefits = [
    {
      title: "Access GP & Specialist Doctors",
      description: "Get the care you need from certified doctors anytime, anywhere.",
    },
    {
      title: "Online Prescriptions & Medicine Delivery",
      description: "Receive prescriptions online and order medicines easily.",
    },
    {
      title: "Affordable Subscription Plans",
      description: "Protect your health with cost-effective subscription packages.",
    },
    {
      title: "Convenient Home Diagnostics",
      description: "Get diagnostic tests done at your convenience from home.",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Why Choose Us?
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Experience seamless healthcare services tailored for your convenience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg
                  className="w-6 h-6 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
