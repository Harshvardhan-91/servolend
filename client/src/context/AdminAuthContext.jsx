// src/context/AdminAuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    // Check if admin data exists in localStorage
    const savedAdmin = localStorage.getItem('adminData');
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Update localStorage whenever admin state changes
  useEffect(() => {
    if (admin) {
      localStorage.setItem('adminData', JSON.stringify(admin));
    } else {
      localStorage.removeItem('adminData');
    }
  }, [admin]);

  const handleAdminLogin = async (credentials) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      if (credentials.id === 'test01' && credentials.password === 'test@ccs') {
        const adminData = {
          id: 'test01',
          name: 'Test Officer',
          role: 'loan_officer'
        };
        setAdmin(adminData);
        navigate('/admin/dashboard');
        return true;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogout = () => {
    setAdmin(null);
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  const checkAdminAuthStatus = () => {
    const savedAdmin = localStorage.getItem('adminData');
    if (savedAdmin) {
      setAdmin(JSON.parse(savedAdmin));
      return true;
    }
    return false;
  };

  const value = {
    admin,
    loading,
    error,
    handleAdminLogin,
    handleAdminLogout,
    checkAdminAuthStatus,
    isAdminAuthenticated: !!admin
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};