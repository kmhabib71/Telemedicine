import React, { useState } from "react";

const FAQSection = () => {
  const faqs = [
    {
      question: "What services does the platform offer?",
      answer:
        "We provide video consultations, medicine delivery, diagnostic tests, and healthcare packages, all at your convenience.",
    },
    {
      question: "How do I book a consultation?",
      answer:
        "You can book a consultation by searching for a doctor by name, code, or department, and scheduling an available time slot.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we prioritize your data privacy and security. All your information is securely encrypted and protected.",
    },
    {
      question: "Can I cancel or reschedule an appointment?",
      answer:
        "Yes, you can easily cancel or reschedule an appointment through the 'My Appointments' section in your account.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Find answers to common questions below. If you have other questions,
          feel free to contact us.
        </p>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full text-left px-6 py-4 focus:outline-none flex justify-between items-center"
              >
                <span className="text-gray-800 font-medium">{faq.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-5 h-5 transform ${
                    openIndex === index ? "rotate-180" : ""
                  } transition-transform duration-200`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 01.7.3l5 5a1 1 0 11-1.4 1.4L10 5.42 5.7 9.7a1 1 0 01-1.4-1.4l5-5A1 1 0 0110 3z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
