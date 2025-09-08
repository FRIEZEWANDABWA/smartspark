import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export async function sendNotification(data: {
  type: string
  name: string
  email: string
  message: string
  service?: string
  budget?: string
}) {
  const subject = `New ${data.type} - ${data.name}`
  
  const html = `
    <h2>New ${data.type} Received</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.service ? `<p><strong>Service:</strong> ${data.service}</p>` : ''}
    ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${data.message}</p>
    <hr>
    <p><small>Sent from SmartSpark Services website</small></p>
  `

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'keyasamuel2@gmail.com',
      subject,
      html
    })
    return { success: true }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error }
  }
}