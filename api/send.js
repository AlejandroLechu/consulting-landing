const sgMail = require('@sendgrid/mail');

// Set the API key from environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    await sgMail.send({
      to: 'lechuga.alejandro@gmail.com',
      from: process.env.SENDGRID_FROM || 'noreply@example.com',
      replyTo: email,
      subject: `New consulting inquiry from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <p>${message.replace(/\n/g, '<br>')}</p>`
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email' });
  }
}; 