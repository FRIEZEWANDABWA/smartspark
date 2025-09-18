# VPS Sync Guide - SmartSpark Services

This guide helps you maintain compatibility between your local development environment and your Hostinger VPS production setup.

## 🔄 Quick Sync Commands

```bash
# Full sync with VPS
npm run sync:vps

# Setup local environment
npm run setup:local

# Test API endpoints
npm run test:api
```

## 🌐 Environment Configuration

### Local Development (.env.local)
```env
# Database
DATABASE_URL="file:./dev.db"

# Email
GMAIL_USER=keyasamuel2@gmail.com
GMAIL_APP_PASSWORD=peqw ihqo sitj wdyx
NOTIFICATION_EMAIL=keyasamuel2@gmail.com

# Integrations
N8N_WEBHOOK_URL=https://n8n.smartsparkservices.com/webhook/contact-form
GOOGLE_SHEETS_WEBHOOK=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Auth
JWT_SECRET=your-jwt-secret-key-here
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000
```

### Production VPS (.env.production)
```env
# Database (PostgreSQL on VPS)
DATABASE_URL="postgresql://user:password@localhost:5432/smartspark"

# Email (same as local)
GMAIL_USER=keyasamuel2@gmail.com
GMAIL_APP_PASSWORD=peqw ihqo sitj wdyx
NOTIFICATION_EMAIL=keyasamuel2@gmail.com

# Integrations
N8N_WEBHOOK_URL=https://n8n.smartsparkservices.com/webhook/contact-form
GOOGLE_SHEETS_WEBHOOK=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Auth
JWT_SECRET=your-production-jwt-secret
NEXTAUTH_SECRET=your-production-nextauth-secret
NEXTAUTH_URL=https://smartsparkservices.com
```

## 🔗 API Endpoints

All endpoints are compatible between local and production:

- `POST /api/contact` - Full contact form with n8n integration
- `POST /api/simple-contact` - Simple contact form
- `POST /api/quote` - Quote request form
- `GET /api/admin/submissions` - Admin: Get all submissions
- `POST /api/auth/login` - Admin authentication

## 🤖 n8n Integration

### Webhook Format
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "service": "Web Development",
  "budget": "$1000-$5000",
  "message": "Project description",
  "type": "contact|quote",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "source": "website_contact_form",
  "environment": "production|development"
}
```

### n8n Workflow Setup
1. Create HTTP webhook node
2. Set URL: `https://n8n.smartsparkservices.com/webhook/contact-form`
3. Add processing nodes (email, database, etc.)
4. Test with local development

## 🗄️ Database Compatibility

### Local (SQLite)
- Uses Prisma with SQLite for development
- File: `prisma/dev.db`
- Schema: `prisma/schema.prisma`

### Production (PostgreSQL)
- Uses PostgreSQL on Hostinger VPS
- Same Prisma schema
- Automatic migrations

### Sync Database Schema
```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# View database
npx prisma studio
```

## 🚀 Deployment Checklist

### Before Deploying to VPS
- [ ] Test all API endpoints locally
- [ ] Verify n8n webhook connectivity
- [ ] Check email notifications
- [ ] Test contact forms
- [ ] Verify admin dashboard
- [ ] Run `npm run build` successfully

### VPS Deployment Steps
1. **Upload files to VPS**
2. **Install dependencies**: `npm install`
3. **Set environment variables**
4. **Run database migrations**: `npx prisma db push`
5. **Build application**: `npm run build`
6. **Start application**: `npm start` or PM2

### Post-Deployment Verification
- [ ] Test contact forms on live site
- [ ] Verify n8n webhook receives data
- [ ] Check email notifications
- [ ] Test admin login and dashboard
- [ ] Monitor error logs

## 🔧 Troubleshooting

### Common Issues

**1. n8n Webhook Not Working**
```bash
# Test webhook manually
curl -X POST https://n8n.smartsparkservices.com/webhook/contact-form \
  -H "Content-Type: application/json" \
  -d '{"test": true, "timestamp": "2024-01-01T00:00:00.000Z"}'
```

**2. Database Connection Issues**
- Check DATABASE_URL in environment
- Verify Prisma client is generated
- Run `npx prisma db push`

**3. Email Not Sending**
- Verify GMAIL_USER and GMAIL_APP_PASSWORD
- Check Gmail app password is correct
- Test with simple nodemailer script

**4. CORS Issues**
- Check next.config.js headers
- Verify API endpoint CORS settings
- Test with different browsers

### Debug Commands
```bash
# Check environment variables
node -e "console.log(process.env)"

# Test database connection
npx prisma studio

# Check API endpoints
npm run test:api

# View application logs
tail -f logs/application.log
```

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Test with `npm run test:api`
3. Review error logs
4. Contact development team

## 🔄 Regular Maintenance

### Weekly Tasks
- [ ] Sync local with VPS changes
- [ ] Test all integrations
- [ ] Check n8n workflows
- [ ] Review error logs
- [ ] Update dependencies if needed

### Monthly Tasks
- [ ] Database backup
- [ ] Performance review
- [ ] Security updates
- [ ] Integration health check