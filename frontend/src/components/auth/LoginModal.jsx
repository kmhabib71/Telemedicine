import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser, registerUser } from "../../api/authApi";
import useAuth from "../../hooks/useAuth";
const LoginModal = ({ isOpen, onClose, redirectTo }) => {
  const { login } = useAuth(); // Access the login function from context
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({ role: "patient", email: "", password: "", name: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const benefits = [
    {
      image: "/path-to-benefits-image1.png",
      description: "24/7 Unlimited Video Consultations with Qualified Doctors",
    },
    {
      image: "/path-to-benefits-image2.png",
      description: "Instant Electronic Prescriptions",
    },
    {
      image: "/path-to-benefits-image3.png",
      description: "Access to Specialists Anytime, Anywhere",
    },
  ];

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (isLoginView) {
        if (!formData.email || !formData.password) {
          setErrorMessage("Please fill out all fields.");
          return;
        }
        const response = await loginUser({ email: formData.email, password: formData.password });
        login(response.token); // Store the token and set the user
        onClose(); // Close the modal
        // localStorage.setItem("authToken", response.token);
        window.location.href = redirectTo || "/dashboard"; 
      } else {
        if (!formData.name || !formData.email || !formData.password) {
          setErrorMessage("Please fill out all fields.");
          return;
        }
        await registerUser(formData);
        alert("Registration successful! Please login.");
        setIsLoginView(true);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={(e) => e.target.id === "backdrop" && onClose()}
          id="backdrop"
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-1/2"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b px-8 py-6">
              <h2 className="text-xl font-semibold">Benefits at DocTime</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col md:flex-row">
              {/* Left Section */}
              <div className="w-full md:w-1/2 p-8 bg-gray-50">
                <h3 className="text-lg font-semibold mb-4">Why DocTime?</h3>
                <p className="text-sm mb-6">
                  You will always have the best healthcare from us.
                </p>
                <div className="flex flex-col items-center">
                  <AnimatePresence initial={false} custom={currentSlide}>
                    <motion.div
                      key={currentSlide}
                      custom={currentSlide}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center"
                    >
                      <img
                        src={benefits[currentSlide].image}
                        alt="Benefits"
                        className="mb-6 w-3/4"
                      />
                      <p className="text-sm text-center">
                        {benefits[currentSlide].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                  <div className="flex space-x-2 mt-6">
                    {benefits.map((_, index) => (
                      <span
                        key={index}
                        className={`h-3 w-3 rounded-full cursor-pointer ${
                          index === currentSlide ? "bg-blue-500" : "bg-gray-300"
                        }`}
                        onClick={() => handleSlideChange(index)}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="w-full md:w-1/2 p-8">
                <p className="text-lg font-bold text-gray-700 mb-6">
                  {isLoginView
                    ? "Enter the account credentials associated with your profile."
                    : "Register for a new account."}
                </p>
                {errorMessage && (
                  <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                )}
                <form onSubmit={handleFormSubmit}>
                  {!isLoginView && (
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      className="w-full mb-6 p-3 border rounded-md shadow-sm"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  )}
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email or phone number"
                    className="w-full mb-6 p-3 border rounded-md shadow-sm"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <div className="relative mb-6">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
                      className="w-full p-3 border rounded-md shadow-sm"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <span
                      className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-md"
                  >
                    {isLoginView ? "Login" : "Register"}
                  </button>
                </form>
                <p className="text-sm mt-6">
                  {isLoginView ? (
                    <>
                      Don't have an account?{" "}
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setIsLoginView(false)}
                      >
                        Register
                      </span>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setIsLoginView(true)}
                      >
                        Login
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
