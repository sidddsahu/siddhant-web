const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: process.env.SMTP_PORT || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async sendContactEmail(contactData) {
        try {
            // Admin email
            const adminMailOptions = {
                from: process.env.EMAIL_FROM || '"Contact Form" <contact@yourdomain.com>',
                to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
                subject: `📧 New Contact: ${contactData.fullName}`,
                html: this.generateAdminEmail(contactData)
            };

            // Auto-reply to user
            const userMailOptions = {
                from: process.env.EMAIL_FROM || '"Your Company" <noreply@yourdomain.com>',
                to: contactData.email,
                subject: '✅ Thank you for contacting us!',
                html: this.generateUserEmail(contactData)
            };

            // Send both emails
            const [adminResult, userResult] = await Promise.all([
                this.transporter.sendMail(adminMailOptions),
                this.transporter.sendMail(userMailOptions)
            ]);

            console.log('Emails sent successfully');
            return {
                success: true,
                adminMessageId: adminResult.messageId,
                userMessageId: userResult.messageId
            };
        } catch (error) {
            console.error('Email sending failed:', error);
            throw error;
        }
    }

    generateAdminEmail(contactData) {
        return `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #4f46e5; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                    <h2 style="margin: 0;">New Contact Form Submission</h2>
                </div>
                <div style="background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px; font-weight: bold; width: 120px;">Full Name:</td>
                            <td style="padding: 10px;">${contactData.fullName}</td>
                        </tr>
                        <tr style="background: #f3f4f6;">
                            <td style="padding: 10px; font-weight: bold;">Email:</td>
                            <td style="padding: 10px;">
                                <a href="mailto:${contactData.email}">${contactData.email}</a>
                            </td>
                        </tr>
                        ${contactData.phone ? `
                        <tr>
                            <td style="padding: 10px; font-weight: bold;">Phone:</td>
                            <td style="padding: 10px;">${contactData.phone}</td>
                        </tr>
                        ` : ''}
                        ${contactData.address ? `
                        <tr style="background: #f3f4f6;">
                            <td style="padding: 10px; font-weight: bold;">Address:</td>
                            <td style="padding: 10px;">${contactData.address}</td>
                        </tr>
                        ` : ''}
                        <tr>
                            <td style="padding: 10px; font-weight: bold; vertical-align: top;">Message:</td>
                            <td style="padding: 10px; white-space: pre-line;">${contactData.message}</td>
                        </tr>
                    </table>

                    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        <small style="color: #6b7280;">
                            IP: ${contactData.ipAddress || 'N/A'} |
                            Time: ${new Date().toLocaleString()} |
                            ${contactData.userAgent ? `Browser: ${contactData.userAgent.substring(0, 50)}...` : ''}
                        </small>
                    </div>
                </div>
                <div style="background: #f3f4f6; padding: 15px; text-align: center; border-radius: 0 0 8px 8px;">
                    <a href="${process.env.ADMIN_URL || 'http://localhost:3000/admin'}/contacts"
                       style="background: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
                        View in Dashboard
                    </a>
                </div>
            </div>
        `;
    }

    generateUserEmail(contactData) {
        return `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #10b981; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                    <h2 style="margin: 0;">Thank You for Contacting Us!</h2>
                </div>
                <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb;">
                    <p style="font-size: 16px;">Dear <strong>${contactData.fullName}</strong>,</p>

                    <p>We've received your message and will get back to you within <strong>24-48 hours</strong>.</p>

                    <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
                        <h3 style="color: #374151; margin-top: 0;">Your Message Summary:</h3>
                        <p><strong>Name:</strong> ${contactData.fullName}</p>
                        <p><strong>Email:</strong> ${contactData.email}</p>
                        ${contactData.phone ? `<p><strong>Phone:</strong> ${contactData.phone}</p>` : ''}
                        <p><strong>Message:</strong></p>
                        <blockquote style="border-left: 4px solid #10b981; padding-left: 15px; margin-left: 0; color: #4b5563;">
                            ${contactData.message}
                        </blockquote>
                    </div>

                    <p>For urgent matters, you can reach us at: <br>
                    📞 ${process.env.CONTACT_PHONE || '+91 1234567890'}</p>

                    <p>Best regards,<br>
                    <strong>The ${process.env.COMPANY_NAME || 'Your Company'} Team</strong></p>
                </div>
                <div style="background: #f3f4f6; padding: 15px; text-align: center; color: #6b7280; font-size: 12px; border-radius: 0 0 8px 8px;">
                    This is an automated response. Please do not reply to this email.
                </div>
            </div>
        `;
    }

    async testConnection() {
        try {
            await this.transporter.verify();
            return {
                success: true,
                message: '✅ SMTP Connection Successful',
                details: {
                    host: process.env.SMTP_HOST,
                    user: process.env.SMTP_USER
                }
            };
        } catch (error) {
            return {
                success: false,
                message: '❌ SMTP Connection Failed',
                error: error.message
            };
        }
    }
}

module.exports = new EmailService();