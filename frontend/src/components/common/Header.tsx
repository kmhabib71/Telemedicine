import React, { useState } from "react";
import LoginModal from "../auth/LoginModal";
import DoctorLoginModal from "../auth/DoctorLoginModal";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // Import your custom hook

const Header = ({hideSearch}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const { user, logout } = useAuth(); // Get the user and logout function from the context

  return (
    <>
      <header className="bg-white shadow-md fixed top-0 w-full z-50">
        <div className="container mx-auto px-8 py-3 flex justify-between items-center">
          <Link to={"/"} className="flex items-center">
            <img src="/path-to-logo.png" alt="Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold ml-2">DocTime</h1>
          </Link>
          <nav className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-blue-500">
              Consultation
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              Order Medicine
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              Home Diagnostic
            </a>
          </nav>
          <div className="flex space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="bg-blue-500 text-white px-4 py-2 rounded transform transition-transform duration-150 active:scale-90"
                >
                  Profile
                </Link>
                <div
                  onClick={logout}
                  className=" cursor-pointer"
                >
                  <svg className="h-10" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clipPath="url(#clip0_14_1899)"> <path d="M29.666 27.032L34.999 32.335L29.666 37.698" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M34.999 32.335H13.667" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M32.333 53.666C44.1149 53.666 53.666 44.1149 53.666 32.333C53.666 20.5511 44.1149 11 32.333 11C20.5511 11 11 20.5511 11 32.333C11 44.1149 20.5511 53.666 32.333 53.666Z" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> </g> <defs> <clipPath id="clip0_14_1899"> <rect width="46.666" height="46.666" fill="white" transform="translate(9 9)"></rect> </clipPath> </defs> </g></svg>
                </div>
                
              </div>
            ) : (
              <>
                <button
                  onClick={() => setIsDoctorModalOpen(true)}
                  className="bg-white-500 mr-2 text-blue-800 px-4 py-[0.46rem] border border-blue-800 rounded transform transition-transform duration-150 active:scale-90"
                >
                  Login as Doctor
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded transform transition-transform duration-150 active:scale-90"
                >
                  Log in
                </button>
              </>
            )}
          </div>
        </div>
        {/* Search box */}
        {!hideSearch && (
          <div className="bg-gray-100 px-8 py-4">
            <input
              type="text"
              placeholder="Search by doctor name/code or department"
              className="w-full p-3 border rounded-md text-gray-700 shadow-sm"
            />
          </div>
        )}
       
      </header>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <DoctorLoginModal
        isOpen={isDoctorModalOpen}
        onClose={() => setIsDoctorModalOpen(false)}
      />
    </>
  );
};

export default Header;
