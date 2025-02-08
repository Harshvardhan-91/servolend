import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Camera,
  Edit2,
  Mail,
  Phone,
  MapPin,
  Shield,
  Key,
  Bell,
  ChevronRight,
  Lock,
  User,
  CreditCard,
  FileText,
  AlertCircle,
  UploadCloud,
  Building,
  DollarSign,
  X,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  getProfile,
  updateProfile,
  updateDocument,
  uploadDocument as uploadDocumentApi,
  updateCommunicationPreferences,
} from '../../services/auth';

// Custom Alert Component
const Alert = ({ variant = 'success', message, onClose }) => {
  const colors = {
    success: 'bg-green-50 border-green-200 text-green-700',
    error: 'bg-red-50 border-red-200 text-red-700',
  };

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-lg border ${colors[variant]}`}
    >
      <div className="flex items-center">
        {variant === 'success' ? (
          <CheckCircle className="h-5 w-5 mr-2" />
        ) : (
          <AlertCircle className="h-5 w-5 mr-2" />
        )}
        <p>{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="ml-4">
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

// Main UserProfile Component
const UserProfile = () => {
  const { handleLogout } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();
      setProfile(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch profile');
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    if (e) e.preventDefault();

    try {
      setSaveLoading(true);
      setError(null);

      const updatedData = {
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
        occupation: profile.occupation,
        employerName: profile.employerName,
        monthlyIncome: profile.monthlyIncome,
        preferredLanguage: profile.preferredLanguage,
        communicationPreferences: profile.communicationPreferences,
      };

      const response = await updateProfile(updatedData);
      setProfile(response);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
      console.error('Profile update error:', err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCommunicationPreferenceChange = (preference) => {
    setProfile((prev) => {
      const currentPrefs = prev.communicationPreferences || [];
      const updatedPrefs = currentPrefs.includes(preference)
        ? currentPrefs.filter((p) => p !== preference)
        : [...currentPrefs, preference];

      return {
        ...prev,
        communicationPreferences: updatedPrefs,
      };
    });
  };

  const handleDocumentUpload = async (file, documentType) => {
    try {
      setError(null);
      const response = await uploadDocumentApi(file, documentType);
      setProfile(response);
      setSuccessMessage('Document uploaded successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to upload document');
      console.error('Document upload error:', err);
    }
  };

  const handleTabChange = (tabId) => {
    if (isEditing) {
      if (window.confirm('You have unsaved changes. Are you sure you want to switch tabs?')) {
        setIsEditing(false);
        setActiveTab(tabId);
      }
    } else {
      setActiveTab(tabId);
    }
  };

  // ProfileHeader Component
  const ProfileHeader = ({ profile, handleLogout }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 mb-8 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <svg viewBox="0 0 100 100" className="h-full">
            <pattern
              id="pattern-circles"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="2" fill="currentColor"></circle>
            </pattern>
            <rect x="0" y="0" width="100" height="100" fill="url(#pattern-circles)"></rect>
          </svg>
        </div>

        <div className="flex items-center space-x-8">
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 rounded-2xl bg-white/20 flex items-center justify-center overflow-hidden border-4 border-white/30"
            >
              {profile.picture ? (
                <img src={profile.picture} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="h-12 w-12 text-white" />
              )}
            </motion.div>
            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full text-blue-600 shadow-lg hover:bg-blue-50">
              <Camera className="h-4 w-4" />
            </button>
          </div>

          <div>
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-blue-100 mt-1">{profile.email}</p>
            <div className="flex items-center mt-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
                  profile.kycStatus === 'verified'
                    ? 'bg-green-500 text-white'
                    : 'bg-yellow-500 text-white'
                }`}
              >
                <Shield className="h-4 w-4 mr-1" />
                {profile.kycStatus === 'verified' ? 'KYC Verified' : 'KYC Pending'}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="ml-auto px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </motion.div>
    );
  };

  // PersonalInfoSection Component
  const PersonalInfoSection = () => {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <button
            onClick={() => (isEditing ? handleProfileUpdate() : setIsEditing(true))}
            disabled={saveLoading}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              saveLoading
                ? 'bg-gray-100 text-gray-400'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
          >
            {saveLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2" />
            ) : (
              <Edit2 className="h-4 w-4 mr-2" />
            )}
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={profile.email || ''}
              disabled
              className="w-full p-3 border rounded-lg bg-gray-50 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={profile.phone || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={profile.address || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
            <input
              type="text"
              name="occupation"
              value={profile.occupation || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Employer Name</label>
            <input
              type="text"
              name="employerName"
              value={profile.employerName || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income</label>
            <input
              type="text"
              name="monthlyIncome"
              value={profile.monthlyIncome || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
        </div>
      </div>
    );
  };

  // DocumentsSection Component
  const DocumentsSection = () => {
    const documents = [
      {
        name: 'PAN Card',
        status: profile.documents?.find((d) => d.name === 'PAN Card')?.status || 'required',
      },
      {
        name: 'Aadhar Card',
        status: profile.documents?.find((d) => d.name === 'Aadhar Card')?.status || 'required',
      },
      {
        name: 'Income Proof',
        status: profile.documents?.find((d) => d.name === 'Income Proof')?.status || 'required',
      },
      {
        name: 'Bank Statement',
        status: profile.documents?.find((d) => d.name === 'Bank Statement')?.status || 'required',
      },
    ];

    const handleFileUpload = async (event, documentType) => {
      const file = event.target.files[0];
      if (file) {
        await handleDocumentUpload(file, documentType);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Document Verification</h2>
        </div>

        <div className="space-y-4">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{doc.name}</p>
                  <p className="text-sm text-gray-500">
                    {doc.uploadDate
                      ? new Date(doc.uploadDate).toLocaleDateString()
                      : 'Not uploaded'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    doc.status === 'verified'
                      ? 'bg-green-100 text-green-600'
                      : doc.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-600'
                      : doc.status === 'rejected'
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                </span>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, doc.name)}
                  />
                  <div className="p-2 bg-blue-50 rounded-lg hover:bg-blue-100">
                    <UploadCloud className="h-5 w-5 text-blue-600" />
                  </div>
                </label>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  // PreferencesSection Component
  const PreferencesSection = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-6">Communication Preferences</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Language
            </label>
            <select
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={profile.preferredLanguage}
              onChange={(e) =>
                handleInputChange({
                  target: { name: 'preferredLanguage', value: e.target.value },
                })
              }
              disabled={!isEditing}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Gujarati">Gujarati</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Notification Settings
            </label>
            <div className="space-y-4">
              {[
                { id: 'email', label: 'Email Notifications' },
                { id: 'sms', label: 'SMS Notifications' },
                { id: 'push', label: 'Push Notifications' },
              ].map((item) => (
                <label key={item.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={profile.communicationPreferences?.includes(item.id)}
                    onChange={() => handleCommunicationPreferenceChange(item.id)}
                    disabled={!isEditing}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // SecuritySection Component
  const SecuritySection = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-6">Security Settings</h2>

        <div className="space-y-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Key className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Change Password</p>
                <p className="text-sm text-gray-500">Update your account password</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Lock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add extra security to your account</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // SidePanel Component
  const SidePanel = () => {
    return (
      <div className="space-y-6">
        {/* Account Status */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Member Since</span>
              <span className="font-medium">{profile.memberSinceFormatted}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">KYC Status</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  profile.kycStatus === 'verified'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}
              >
                {profile.kycStatus === 'verified' ? 'Verified' : 'Pending'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Profile Status</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  profile.profileStatus === 'complete'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}
              >
                {profile.profileStatus === 'complete' ? 'Complete' : 'Incomplete'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { icon: CreditCard, label: 'Update Bank Details' },
              { icon: FileText, label: 'Download Statements' },
              { icon: AlertCircle, label: 'Report an Issue' },
            ].map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between w-full p-3 text-left bg-gray-50 rounded-xl hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <action.icon className="h-5 w-5 text-blue-600 mr-3" />
                  <span>{action.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Bell },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8">
      {error && (
        <div className="mb-4">
          <Alert variant="error" message={error} onClose={() => setError(null)} />
        </div>
      )}

      {successMessage && (
        <div className="mb-4">
          <Alert variant="success" message={successMessage} onClose={() => setSuccessMessage('')} />
        </div>
      )}

      <ProfileHeader profile={profile} handleLogout={handleLogout} />

      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center px-6 py-3 rounded-xl transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="h-5 w-5 mr-2" />
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'personal' && <PersonalInfoSection />}
          {activeTab === 'documents' && <DocumentsSection />}
          {activeTab === 'security' && <SecuritySection />}
          {activeTab === 'preferences' && <PreferencesSection />}
        </div>

        {/* Side Panel */}
        <div className="lg:col-span-1">
          <SidePanel />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
