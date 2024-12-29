import React from "react";

const Testimonials = () => (
  <section className="p-8 bg-white">
    <h2 className="text-3xl font-bold text-center mb-6">What Our Users Say</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-4 bg-gray-100 rounded">
        <p className="text-gray-700">
          "This platform has made healthcare so much more accessible. Highly recommend!"
        </p>
        <p className="text-right mt-4 font-bold">- John Doe</p>
      </div>
      <div className="p-4 bg-gray-100 rounded">
        <p className="text-gray-700">
          "Scheduling appointments has never been easier. Love this service!"
        </p>
        <p className="text-right mt-4 font-bold">- Jane Smith</p>
      </div>
    </div>
  </section>
);

export default Testimonials;
