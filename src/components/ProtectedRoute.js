import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check both localStorage and sessionStorage for access token
  const accessToken = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  const user = localStorage.getItem('user');

  if (!accessToken || !refreshToken || !user) {
    // Clear any existing tokens when redirecting to login
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    
    // Redirect to login if not authenticated
    return <Navigate to="/user/login" replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute; 