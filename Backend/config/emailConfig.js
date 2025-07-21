import dotenv from "dotenv";
dotenv.config({});
import nodemailer from 'nodemailer';

// Create email transporter with optional configuration
const createEmailTransporter = () => {
  const emailHost = process.env.EMAIL_HOST;
  const emailPort = process.env.EMAIL_PORT;
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  // Check if all required email configuration is present
  if (!emailHost || !emailPort || !emailUser || !emailPass) {
    console.log('⚠️ Email configuration incomplete - email service disabled');
    console.log('💡 To enable email service, add EMAIL_HOST, EMAIL_PORT, EMAIL_USER, and EMAIL_PASS to your .env file');
    return null;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: parseInt(emailPort),
      secure: emailPort === '465', // true for 465, false for other ports
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      // Additional security options
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    });

    // Verify connection configuration
    transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email configuration error:', error.message);
        console.log('💡 Please check your email credentials in .env file');
        console.log('   For Gmail, you need to use an App Password, not your regular password');
      } else {
        console.log('✅ Email service configured successfully');
      }
    });

    return transporter;
  } catch (error) {
    console.error('❌ Failed to create email transporter:', error.message);
    return null;
  }
};

// Send email function with error handling
export const sendEmail = async (to, subject, html, text = '') => {
  const transporter = createEmailTransporter();
  
  if (!transporter) {
    console.log('⚠️ Email service not available - skipping email send');
    return { success: false, message: 'Email service not configured' };
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: html,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
    return { success: false, error: error.message };
  }
};

// Send OTP email function
export const sendOTPEmail = async (email, otp) => {
  const subject = 'AyurConnect - Email Verification OTP';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2c3e50; text-align: center;">AyurConnect Email Verification</h2>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="color: #34495e; font-size: 16px;">Your verification code is:</p>
        <h1 style="color: #e74c3c; text-align: center; font-size: 32px; letter-spacing: 5px; margin: 20px 0;">${otp}</h1>
        <p style="color: #7f8c8d; font-size: 14px; text-align: center;">This code will expire in 10 minutes.</p>
      </div>
      <p style="color: #95a5a6; font-size: 12px; text-align: center;">
        If you didn't request this code, please ignore this email.
      </p>
    </div>
  `;
  
  const text = `Your AyurConnect verification code is: ${otp}. This code will expire in 10 minutes.`;

  return await sendEmail(email, subject, html, text);
};

// Check if email service is available
export const isEmailServiceAvailable = () => {
  return !!(process.env.EMAIL_HOST && process.env.EMAIL_PORT && process.env.EMAIL_USER && process.env.EMAIL_PASS);
};

export default { sendEmail, sendOTPEmail, isEmailServiceAvailable };