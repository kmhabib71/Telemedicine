import React from 'react'
import Header from '../components/common/Header'
import useAuth from '../hooks/useAuth'
function AdminDashboard() {
  const { user } = useAuth();
  // Access the user object from the context
  // If the user is logged in, display their information
  console.log('User Information:', user);
  return (
    <div>
    <Header />
    <div className='pt-[120px]'>
    {user ? (
        <>
          <h1>Welcome, {user.data.name}</h1>
          <p>Email: {user.data.email}</p>
          <img src={user.data.profilePicture} alt="Profile" />
        </>
      ) : (
        <p>Please log in.</p>
      )}
      </div>
    </div>
  )
}

export default AdminDashboard