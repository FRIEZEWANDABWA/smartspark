import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendEmailNotification(formData: any, type: 'contact' | 'quote') {
  console.log('Email notification attempt:', {
    hasUser: !!process.env.GMAIL_USER,
    hasPassword: !!process.env.GMAIL_APP_PASSWORD,
    user: process.env.GMAIL_USER
  });
  
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) return;
  
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL || process.env.GMAIL_USER,
      subject: `New ${type === 'quote' ? 'Quote Request' : 'Contact'} - ${formData.service}`,
      html: `
        <h2>New ${type === 'quote' ? 'Quote Request' : 'Contact Form'} Submission</h2>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Service:</strong> ${formData.service}</p>
        ${type === 'quote' ? `<p><strong>Budget:</strong> ${formData.budget}</p>` : ''}
        <p><strong>Message:</strong> ${formData.message}</p>
      `,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email notification failed:', error);
  }
}

export async function sendToN8N(formData: any, type: 'contact' | 'quote') {
  if (!process.env.N8N_WEBHOOK_URL) return;
  
  try {
    await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        type,
        timestamp: new Date().toISOString(),
        source: `website_${type}_form`
      }),
    });
  } catch (error) {
    console.error('N8N notification failed:', error);
  }
}

export async function sendToGoogleSheets(formData: any, type: 'contact' | 'quote') {
  if (!process.env.GOOGLE_SHEETS_WEBHOOK) return;
  
  try {
    await fetch(process.env.GOOGLE_SHEETS_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        type,
        timestamp: new Date().toISOString()
      }),
    });
  } catch (error) {
    console.error('Google Sheets notification failed:', error);
  }
}

export async function sendAllNotifications(formData: any, type: 'contact' | 'quote') {
  const notifications = [
    sendEmailNotification(formData, type),
    sendToN8N(formData, type),
    sendToGoogleSheets(formData, type)
  ];
  
  await Promise.allSettled(notifications);
}

