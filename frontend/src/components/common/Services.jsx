const Services = () => (
    <section id="services" className="py-24 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {[
          { title: "Video Consultation", icon: "/icons/consultation.png", description: "Talk to doctors instantly." },
          { title: "Order Medicine", icon: "/icons/medicine.png", description: "Order and get delivery at home." },
          { title: "Diagnostic Tests", icon: "/icons/diagnostic.png", description: "Book home test collection." },
        ].map((service, idx) => (
          <div
            key={idx}
            className="text-center p-6 bg-blue-50 border border-gray-200 rounded-lg shadow-md"
          >
            <img src={service.icon} alt={service.title} className="h-16 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
  
  export default Services;
  