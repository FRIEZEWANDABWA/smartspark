export function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .substring(0, 1000)
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

export function validateInput(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!data.name || data.name.length < 2 || data.name.length > 50) {
    errors.push('Name must be 2-50 characters')
  }
  
  if (!validateEmail(data.email)) {
    errors.push('Invalid email format')
  }
  
  if (!data.message || data.message.length < 10 || data.message.length > 1000) {
    errors.push('Message must be 10-1000 characters')
  }
  
  return { isValid: errors.length === 0, errors }
}