// server/middleware/validation.js
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.validateGoogleToken = async (req, res, next) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ error: 'Google credential is required' });
    }

    console.log('Validating Google credential in middleware...');
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    req.googleUser = {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      email_verified: payload.email_verified
    };

    console.log('Google credential validated successfully');
    next();
  } catch (error) {
    console.error('Google token validation error:', {
      message: error.message,
      stack: error.stack
    });
    res.status(401).json({ error: 'Invalid credential', details: error.message });
  }
};

exports.validateProfileUpdate = (req, res, next) => {
  const { phoneNumber, address, bio } = req.body;
  const errors = {};

  // Validate phone number
  if (!phoneNumber) {
    errors.phoneNumber = 'Phone number is required';
  } else if (!/^\+?[\d\s-]{10,}$/.test(phoneNumber)) {
    errors.phoneNumber = 'Invalid phone number format';
  }

  // Validate address
  if (!address) {
    errors.address = 'Address is required';
  } else if (address.length < 5) {
    errors.address = 'Address is too short';
  }

  // Validate bio
  if (!bio) {
    errors.bio = 'Bio is required';
  } else if (bio.length > 500) {
    errors.bio = 'Bio must be less than 500 characters';
  }

  // If there are validation errors, return them
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};