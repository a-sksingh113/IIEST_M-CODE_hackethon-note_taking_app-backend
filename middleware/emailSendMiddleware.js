const { transporter } = require("../middleware/emailConfigMiddleware");

// Send Forget Password URL Email
const sendForgetPasswordURL = async (email, resetURL) => {
    try {
        const response = await transporter.sendMail({
            from: '"MemoMinds Support" <i.sksingh113@gmail.com>',
            to: email,
            subject: "Password Reset Request", 
            text: "Please click the link below to reset your password.", 
            html: `
                <h2>Password Reset Request</h2>
                <p>We received a request to reset your password. Click the link below to reset it:</p>
                <p><a href="${resetURL}">Reset Password</a></p>
                <p><strong>Note:</strong> This link expires in 1 hour.</p>
                <p>If you did not request this, please ignore this email.</p>
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
            from: '"MemoMinds Team" <i.sksingh113@gmail.com>',
            to: email,
            subject: "Welcome to MemoMinds!", 
            text: `Welcome, ${name}! We are thrilled to have you on board.`, 
            html: `
                <h2>Welcome to MemoMinds, ${name}!</h2>
                <p>We are excited to have you join our community. Get started by exploring your new note-taking space.</p>
                <p>Happy organizing!</p>
                <p>Best Regards,<br>MemoMinds Team</p>
            `,
        });
        console.log('Welcome email sent successfully:', response);
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};

module.exports = { sendForgetPasswordURL, sendWellcomeEmail };
