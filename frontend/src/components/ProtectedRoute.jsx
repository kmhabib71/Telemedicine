import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import LoginModal from "./auth/LoginModal";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get the user from your AuthContext
  const location = useLocation(); // Get the current route

  if (!user) {
    return (
      <LoginModal
        isOpen={!user}
        onClose={() => {}}
        redirectTo={location.pathname} // Pass the attempted route
      />
    );
  }

  return children;
};

export default ProtectedRoute;
