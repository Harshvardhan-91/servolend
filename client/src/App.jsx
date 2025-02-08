import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './components/layout/Layout.jsx';
import UserDashboard from './pages/user/UserDashboard';
import LoanApplication from './pages/user/LoanApplication';
import LoanRepayment from './pages/user/LoanRepayment';
import TransactionHistory from './pages/user/TransactionHistory';
import UserProfile from './pages/user/UserProfile';
import Settings from './pages/user/UserSettings.jsx';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserProfile />} />
            <Route path="applications" element={<LoanApplication />} />
            <Route path="repayments" element={<LoanRepayment />} />
            <Route path="transactions" element={<TransactionHistory />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
