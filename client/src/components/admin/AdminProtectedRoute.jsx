// src/components/admin/AdminProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminProtectedRoute = ({ children }) => {
  const { isAdminAuthenticated, loading, checkAdminAuthStatus } = useAdminAuth();
  const location = useLocation();

  // Check for saved admin session
  if (!isAdminAuthenticated && !loading) {
    const hasSession = checkAdminAuthStatus();
    if (!hasSession) {
      // Redirect to admin login with return path
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return children;
};

export default AdminProtectedRoute;