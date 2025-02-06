// client/src/pages/Signup.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleAuthButton from '../components/auth/GoogleAuthButton';
import RegistrationForm from '../components/auth/RegistrationForm';

const Signup = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.profileStatus === 'complete') {
      navigate('/user');
    } else if (isAuthenticated && user?.profileStatus === 'pending') {
      setShowRegistrationForm(true);
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {!showRegistrationForm ? (
          <>
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  sign in if you already have an account
                </Link>
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <GoogleAuthButton />

              <div className="flex items-center justify-center">
                <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
                  Return to Home
                </Link>
              </div>
            </div>
          </>
        ) : (
          <RegistrationForm />
        )}
      </div>
    </div>
  );
};

export default Signup;
