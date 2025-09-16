import rateLimit from 'express-rate-limit';

// Rate limiting - max 5 submissions per 15 minutes per IP
export const createRateLimit = () => rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many form submissions, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
    .replace(/[<>]/g, '') // Remove HTML tags
    .trim()
    .substring(0, 1000); // Limit length
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
