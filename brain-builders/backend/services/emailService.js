const nodemailer = require('nodemailer');

// Create email transporter (using Gmail or your email service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send email to admin when new contact is submitted
async function sendContactNotification(contactData) {
  try {
    const { name, class: className, phone } = contactData;
    
    console.log(`📧 Sending email notification for: ${name}`);
    console.log(`   To: ${process.env.ADMIN_EMAIL}`);
    console.log(`   From: ${process.env.EMAIL_USER}`);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `🎓 New Application Received - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px;">
              📋 New Student Application
            </h2>
            
            <div style="margin-top: 20px;">
              <p style="margin: 10px 0;"><strong>Student Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Class:</strong> ${className}</p>
              <p style="margin: 10px 0;"><strong>Phone Number:</strong> <a href="tel:${phone}" style="color: #3498db; text-decoration: none;">${phone}</a></p>
              <p style="margin: 10px 0;"><strong>Submitted At:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ecf0f1;">
              <p style="color: #7f8c8d; font-size: 12px;">
                💡 <strong>Next Steps:</strong> Contact the student via WhatsApp or phone to discuss enrollment.
              </p>
            </div>
          </div>
          
          <footer style="margin-top: 20px; text-align: center; color: #7f8c8d; font-size: 12px;">
            <p>Brain Builders - CBSE Tuition Center</p>
            <p>Automated notification system</p>
          </footer>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully! Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    console.error('   Full error:', error);
    return false;
  }
}

module.exports = {
  sendContactNotification
};
