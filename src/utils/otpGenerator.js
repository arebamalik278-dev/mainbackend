const generateOTP = () => {
  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};

const getOTPExpiry = () => {
  // Return expiry time 5 minutes from now
  return new Date(Date.now() + 5 * 60 * 1000);
};

module.exports = {
  generateOTP,
  getOTPExpiry
};

