// client/src/services/auth.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Auth functions
export const loginWithGoogle = async (credential) => {
  try {
    const response = await fetch(`${API_URL}/auth/google`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ credential }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to authenticate with Google');
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to logout');
    }

    return await response.json();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/status`, {
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 401) {
        return null;
      }
      throw new Error('Failed to check auth status');
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Auth status check error:', error);
    return null;
  }
};

// User profile functions
export const getProfile = async () => {
  try {
    const response = await fetch(`${API_URL}/user/profile`, {
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Get profile error:', error);
    throw error;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await fetch(`${API_URL}/user/profile`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Profile update error:', error);
    throw error;
  }
};

export const deleteProfile = async () => {
  try {
    const response = await fetch(`${API_URL}/user/profile`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Delete profile error:', error);
    throw error;
  }
};