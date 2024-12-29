import React from "react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Mohita Mallik",
      feedback:
        "We were able to reduce employee sick call rates using this platform. The services are reliable and very convenient.",
      image: "/path-to-user1-image.png", // Replace with actual image path
      rating: 5,
    },
    {
      name: "Rahim Khan",
      feedback:
        "The video consultation feature is excellent. I was able to consult a doctor quickly without leaving home.",
      image: "/path-to-user2-image.png", // Replace with actual image path
      rating: 4,
    },
    {
      name: "Aisha Begum",
      feedback:
        "The platform made it easy for me to book tests and get the results delivered on time.",
      image: "/path-to-user3-image.png", // Replace with actual image path
      rating: 5,
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          What Our Users Say
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Hear from our satisfied users about their experiences.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {testimonial.name}
              </h3>
              <p className="text-gray-600 text-center my-3">
                {testimonial.feedback}
              </p>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={i < testimonial.rating ? "gold" : "gray"}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.18 6.736a1 1 0 00.95.691h7.065c.967 0 1.37 1.24.588 1.81l-5.711 4.147a1 1 0 00-.364 1.118l2.18 6.736c.3.921-.755 1.688-1.538 1.118l-5.711-4.147a1 1 0 00-1.176 0l-5.711 4.147c-.783.57-1.838-.197-1.538-1.118l2.18-6.736a1 1 0 00-.364-1.118L2.14 11.164c-.782-.57-.379-1.81.588-1.81h7.065a1 1 0 00.95-.691l2.18-6.736z"
                    />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
