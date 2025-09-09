import { NextApiRequest, NextApiResponse } from 'next'
import { addToSheet } from '../../lib/googleSheets'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, message } = req.body
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' })
    }

    // Save to Google Sheets
    try {
      await addToSheet({
        name,
        email,
        message,
        type: 'Quote Request',
        timestamp: new Date().toISOString()
      })
    } catch (sheetError) {
      console.error('Google Sheets error:', sheetError)
    }

    // Send email notification
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      })

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'info@smartspark.com',
        subject: `New Quote Request from ${name}`,
        html: `
          <h2>New Quote Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        `
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
    }
    
    res.status(200).json({ message: 'Contact form submitted successfully' })
  } catch (error) {
    console.error('Contact API error:', error)
    res.status(500).json({ message: 'Failed to submit contact form' })
  }
}