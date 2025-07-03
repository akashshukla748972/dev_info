export const getOtpEmailTemplate = (otp) => `
          <div style="font-family:sans-serif; padding:20px; border:1px solid #ddd;">
          <h2 style="color:#333;">OTP Verification</h2>
          <p>Your One-Time Password (OTP) is:</p>
          <h1 style="color:#2E86C1;">${otp}</h1>
          <p>This OTP is valid for 10 minutes.</p>
        </div>
`;
