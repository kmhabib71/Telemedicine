import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";// Correct import for jwt-decode
import { getUserProfile } from "../api/userApi"; // Import the correct function
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state to prevent flicker

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         const isTokenValid = decodedToken.exp * 1000 > Date.now();
// console.log("Is Token Valid:", isTokenValid); // Should log `true` if valid.
//         console.log("Decoded Token:", decodedToken);
//         console.log("Token Expiry (timestamp):", decodedToken.exp * 1000);
// console.log("Current Time:", Date.now());
// console.log("Is Token Valid:", decodedToken.exp * 1000 > Date.now());
        

//         if (isTokenValid) {
//           // Fetch the user profile using the `/users/profile` endpoint
//           getUserProfile()
//             .then((userInfo) => {
//               setUser({ ...decodedToken, ...userInfo });
//             })
//             .catch((error) => {
//               console.error("Error fetching user profile:", error);
//               // localStorage.removeItem("authToken");
//             })
//             .finally(() => setLoading(false));
//         } else {
//           // localStorage.removeItem("authToken");
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error("Invalid token:", error);
//         // localStorage.removeItem("authToken");
//         setLoading(false);
//       }
//     } else {
//       setLoading(false);
//     }
//   }, []);
const fetchUserDetails = async (token) => {
  try {
    const response = await axios.get("http://localhost:5000/api/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Expect user details like name, email, profilePicture
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};

useEffect(() => {
  const token = localStorage.getItem("authToken");
  if (token) {
    const decodedToken = jwtDecode(token);
    const isTokenValid = decodedToken.exp * 1000 > Date.now();

    if (isTokenValid) {
      fetchUserDetails(token).then((userInfo) => {
        console.log("User Info:", userInfo);
        if (userInfo) {
          setUser({ ...decodedToken, ...userInfo }); // Merge token data with user info
        
        } else {
          localStorage.removeItem("authToken");
        }
      });
    } else {
      localStorage.removeItem("authToken");
    }
  }
}, []);

  const login = async (token) => {
    try {
      localStorage.setItem("authToken", token);
      const decodedToken = jwtDecode(token);
      const userInfo = await getUserProfile();
      setUser({ ...decodedToken, ...userInfo });
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
