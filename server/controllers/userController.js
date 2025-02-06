// server/controllers/userController.js
const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-__v -googleId');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { phoneNumber, address, bio } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user profile
    user.additionalInfo = {
      ...user.additionalInfo,
      phoneNumber,
      address,
      bio,
    };

    // Check if profile is complete
    const isProfileComplete = Boolean(
      user.additionalInfo.phoneNumber &&
      user.additionalInfo.address &&
      user.additionalInfo.bio
    );

    user.profileStatus = isProfileComplete ? 'complete' : 'pending';

    await user.save();

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      picture: user.picture,
      profileStatus: user.profileStatus,
      additionalInfo: user.additionalInfo
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.deleteOne();
    res.clearCookie('token');
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Delete profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};