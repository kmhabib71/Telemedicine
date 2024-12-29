// components/common/BottomNavigation.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BottomNavigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 w-full bg-white shadow-md border-t z-50 flex justify-around items-center">
      <button onClick={() => navigate('/')} className="flex flex-col items-center">
        <span className="text-blue-500 text-xl">🏠</span>
        <span className="text-sm">Home</span>
      </button>
      <button onClick={() => navigate('/medicine')} className="flex flex-col items-center">
        <span className="text-blue-500 text-xl">💊</span>
        <span className="text-sm">Medicine</span>
      </button>
      <button onClick={() => navigate('/doctor')} className="flex flex-col items-center">
        <span className="text-blue-500 text-xl">👨‍⚕️</span>
        <span className="text-sm">Doctor</span>
      </button>
      <button onClick={() => navigate('/diagnostic')} className="flex flex-col items-center">
        <span className="text-blue-500 text-xl">🩺</span>
        <span className="text-sm">Diagnostic</span>
      </button>
    </nav>
  );
};

export default BottomNavigation;
