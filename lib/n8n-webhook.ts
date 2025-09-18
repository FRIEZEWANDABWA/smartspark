export async function triggerN8NAutoReply(data: {
  name: string;
  email: string;
  message: string;
  service?: string;
  phone?: string;
  budget?: string;
}) {
  try {
    const response = await fetch('http://45.132.241.208:8080/webhook/contact-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
        service: data.service || 'General Inquiry',
        phone: data.phone || '',
        budget: data.budget || ''
      }),
    });
  } catch (error) {
    console.error('N8N webhook error:', error);
  }
}
