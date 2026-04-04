const axios = require('axios');

exports.sendOtpEmail = async ({ to, subject, otp, type }) => {
    const isReset = type === 'reset';

    const html = `
    <div style="margin:0;padding:0;background-color:#f9fafb;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
            <tr>
                <td align="center">
                    <table width="480" cellpadding="0" cellspacing="0" 
                        style="background:#ffffff;border-radius:12px;padding:32px;
                               box-shadow:0 4px 20px rgba(0,0,0,0.05);">

                        <!-- Header -->
                        <tr>
                            <td align="center" style="padding-bottom:20px;">
                                <h2 style="margin:0;color:#111827;">
                                    ${isReset ? 'Reset Your Password' : 'Verify Your Email'}
                                </h2>
                            </td>
                        </tr>

                        <!-- Message -->
                        <tr>
                            <td style="color:#4b5563;font-size:15px;line-height:1.6;">
                                <p style="margin:0 0 16px;">
                                    ${
                                        isReset
                                            ? 'We received a request to reset your password. Use the verification code below to proceed.'
                                            : 'Welcome! Please confirm your email address using the verification code below.'
                                    }
                                </p>
                            </td>
                        </tr>

                        <!-- OTP Box -->
                        <tr>
                            <td align="center" style="padding:24px 0;">
                                <div style="
                                    display:inline-block;
                                    font-size:32px;
                                    font-weight:bold;
                                    letter-spacing:6px;
                                    color:#4F46E5;
                                    background:#EEF2FF;
                                    padding:14px 28px;
                                    border-radius:10px;
                                ">
                                    ${otp}
                                </div>
                            </td>
                        </tr>

                        <!-- Info -->
                        <tr>
                            <td style="color:#6b7280;font-size:13px;text-align:center;">
                                This code will expire in <strong>5 minutes</strong>.
                                For your security, do not share this code with anyone.
                            </td>
                        </tr>

                        <!-- Divider -->
                        <tr>
                            <td style="padding:24px 0;">
                                <hr style="border:none;border-top:1px solid #e5e7eb;" />
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="text-align:center;color:#9ca3af;font-size:12px;">
                                ${
                                    isReset
                                        ? "If you didn't request a password reset, you can safely ignore this email."
                                        : "If you didn't create an account, no further action is required."
                                }
                                <br/><br/>
                                © ${new Date().getFullYear()} ${process.env.BREVO_FROM_NAME || 'Task Manager'}.
                                All rights reserved.
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </div>
    `;

    const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        {
            sender: {
                name: process.env.BREVO_FROM_NAME || 'Task Manager',
                email: process.env.BREVO_FROM,
            },
            to: [{ email: to }],
            subject,
            htmlContent: html,
        },
        {
            headers: {
                'api-key': process.env.BREVO_API_KEY,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    );

    console.log('Email sent via Brevo, messageId:', response.data.messageId);
    return response.data;
};