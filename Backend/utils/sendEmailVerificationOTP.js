 import transport from "../config/emailConfig.js"
 import EmailVerification from "../models/EmailVerification.js";
 import userModel from "../models/userModel.js";

const sendEmailVerificationOTP = async (_req, user) => {
   
    const otp = Math.floor(1000 + Math.random() * 9000);

    //Save the otp in the database
    await new EmailVerification({ email: userModel.email, otp }).save();

    //OTP Verification link
    const otpVerificationlink =  `${process.env.FRONTEND_HOST}/account/verify-email`;
    console.log(otpVerificationlink);
    await transport.sendMail({
        from: process.env.EMAIL_USER,
        to: userModel.email,
        subject: "Email Verification OTP",
        html: `<h1>Your OTP is ${otp}</h1><br><p>Click <a href=${otpVerificationlink}>here</a> to verify your email enter the otp ${otp}</p>`
    });

}

export default sendEmailVerificationOTP

