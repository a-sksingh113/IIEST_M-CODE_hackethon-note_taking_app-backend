const { transporter } = require("../middleware/emailConfigMiddleware");

// Send Forget Password URL Email
const sendForgetPasswordURL = async (email, resetURL) => {
    try {
        const response = await transporter.sendMail({
            from: '"knightNote Support" <i.sksingh113@gmail.com>',
            to: email,
            subject: "Password Reset Request", 
            text: "Please click the link below to reset your password.", 
            html: `
               <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f4f4f9; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
    <div style="text-align: center; padding: 10px 0;">
        <img src="default.png" alt="Logo" style="max-width: 150px;">
    </div>
    <div style="background-color: #fff; padding: 20px; border-radius: 10px;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p style="color: #555; line-height: 1.6;">
            We received a request to reset your password. Click the button below to reset it:
        </p>
        <div style="text-align: center; margin: 20px 0;">
            <a href="${resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">Reset Password</a>
        </div>
        <p style="color: #999; font-size: 14px;">
            <strong>Note:</strong> This link expires in 1 hour.
        </p>
        <p style="color: #555; line-height: 1.6;">
            If you did not request this, please ignore this email or contact support if you have concerns.
        </p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #aaa; font-size: 12px;">
        © 2025 knightNote. All rights reserved.
    </div>
</div>

            `,
        });
        console.log('Password reset email sent successfully:', response);
    } catch (error) {
        console.error('Error sending password reset email:', error);
    }
};

// Send Welcome Email
const sendWellcomeEmail = async (email, name) => {
    try {
        const response = await transporter.sendMail({
            from: '"knightNote Team" <i.sksingh113@gmail.com>',
            to: email,
            subject: "Welcome to knightNote!", 
            text: `Welcome, ${name}! We are thrilled to have you on board.`, 
            html: `
               <div style="max-width: 600px; background-color: #ffffff; margin: 0 auto; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif;">
    <h2 style="color: #3de84e; font-size: 28px; margin-bottom: 10px; text-align: center;">
      Welcome to knightNote, ${name}!
    </h2>
    <p style="color: #555555; font-size: 18px; line-height: 1.6; text-align: center; margin-bottom: 20px;">
      We are excited to have you join our community. Get started by exploring your new note-taking space.
    </p>
    <p style="color: #555555; font-size: 18px; line-height: 1.6; text-align: center; margin-bottom: 20px;">
      Happy organizing!
    </p>
    <p style="color: #555555; font-size: 18px; line-height: 1.6; text-align: center;">
      Best Regards,<br>
      <strong style="color: #0fe456;">knightNote Team</strong>
    </p>
  </div>
  
            `,
        });
        console.log('Welcome email sent successfully:', response);
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};

module.exports = { sendForgetPasswordURL, sendWellcomeEmail };
