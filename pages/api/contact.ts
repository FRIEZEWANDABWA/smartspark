import { sendAllNotifications } from '../../lib/notifications';
import { triggerN8NAutoReply } from '../../lib/n8n-webhook';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/db-fallback';
import { sanitizeInput, isValidEmail } from '../../lib/security';

const submissions = new Map();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const now = Date.now();
    const windowMs = 15 * 60 * 1000;
    const maxRequests = 25;

    if (submissions.has(clientIP)) {
      const userSubmissions = submissions.get(clientIP);
      const recentSubmissions = userSubmissions.filter((time: number) => now - time < windowMs);

      if (recentSubmissions.length >= maxRequests) {
        return res.status(429).json({ message: 'Too many submissions. Please try again later.' });
      }

      submissions.set(clientIP, [...recentSubmissions, now]);
    } else {
      submissions.set(clientIP, [now]);
    }

    const { name, email, phone, message, service } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const cleanName = sanitizeInput(name);
    const cleanEmail = sanitizeInput(email);
    const cleanPhone = phone ? sanitizeInput(phone) : '';
    const cleanMessage = sanitizeInput(message);
    const cleanService = service ? sanitizeInput(service) : 'General Inquiry';

    // Save to database (PostgreSQL or file fallback)
    await db.saveContact({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      message: cleanMessage,
      service: cleanService
    });

    // Send notifications
    try {
      await sendAllNotifications({ 
        name: cleanName, 
        email: cleanEmail, 
        phone: cleanPhone,
        message: cleanMessage, 
        service: cleanService 
      }, 'contact');
    } catch (error) {
      console.error('Email notification failed:', error);
    }

    // Trigger n8n webhook
    try {
      await triggerN8NAutoReply({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        message: cleanMessage,
        service: cleanService
      });
    } catch (error) {
      console.error('N8N webhook failed:', error);
    }

    res.status(200).json({ message: 'Contact submitted successfully' });
  } catch (error) {
    console.error('Contact API error:', error);
    res.status(500).json({ message: 'Failed to submit contact' });
  }
}
