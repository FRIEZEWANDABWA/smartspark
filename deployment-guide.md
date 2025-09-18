# Deployment Guide for Hostinger VPS

## 🚀 Pre-Deployment Checklist

### 1. Environment Variables
Create `.env.local` on your VPS with:
```bash
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NOTIFICATION_EMAIL=your-email@gmail.com

# N8N Webhook (if using)
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/contact

# Database (optional - will use file DB if not provided)
DATABASE_URL=postgresql://user:password@localhost:5432/smartspark
# OR individual settings:
DB_HOST=localhost
DB_PORT=5432
DB_NAME=smartspark
DB_USER=postgres
DB_PASSWORD=your-password

NODE_ENV=production
```

### 2. File Permissions
Ensure the `data` directory is writable:
```bash
mkdir -p data
chmod 755 data
```

### 3. Dependencies
The system will automatically:
- Use PostgreSQL if available
- Fallback to file database if PostgreSQL is not configured
- Send emails if SMTP is configured
- Trigger N8N webhooks if configured

## 📁 Files That Need to be Uploaded

### Core Files (Modified)
- `pages/api/contact.ts` - Enhanced with phone number and notifications
- `pages/index.tsx` - Improved light mode and background images
- `pages/services.tsx` - Updated services and removed consultation button
- `pages/contact.tsx` - Enhanced contact form with phone field
- `pages/blog.tsx` - Functional blog with working links
- `components/Footer.tsx` - Updated phone number

### New Files
- `lib/fileDb.ts` - File-based database system
- `lib/db-fallback.ts` - Database fallback system
- `pages/api/blog-simple.ts` - File-based blog API
- `pages/api/contacts-list.ts` - Contact submissions API
- `pages/admin/blog.tsx` - Blog management interface
- `pages/admin/contacts.tsx` - Contact submissions viewer
- `pages/blog/[slug].tsx` - Individual blog post pages
- `data/` directory - For file database storage

### Images
- All images from `last pics/` folder copied to `public/images/services/` and `public/images/portfolio/`

## 🔧 VPS Setup Commands

```bash
# 1. Navigate to your website directory
cd /path/to/your/website

# 2. Install dependencies (if using Node.js)
npm install

# 3. Create data directory
mkdir -p data
chmod 755 data

# 4. Set up environment variables
nano .env.local
# Add the environment variables from above

# 5. Restart your web server
# For Apache:
sudo systemctl restart apache2
# For Nginx:
sudo systemctl restart nginx
# For Node.js/PM2:
pm2 restart all
```

## 🗄️ Database Setup (Optional)

If you want to use PostgreSQL instead of file database:

```sql
-- Create database
CREATE DATABASE smartspark;

-- Create tables
CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    service VARCHAR(100) DEFAULT 'General Inquiry',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category VARCHAR(100) DEFAULT 'General',
    status VARCHAR(20) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-factor authentication
2. Generate an app password
3. Use the app password in `SMTP_PASS`

### Other Email Providers
Update SMTP settings in `.env.local` accordingly.

## 🔗 Admin Access

After deployment, access admin panels at:
- **Blog Management**: `https://yourdomain.com/admin/blog`
- **Contact Submissions**: `https://yourdomain.com/admin/contacts`
- **Password**: `SmartSpark2024!`

## ✅ Testing After Deployment

1. **Contact Form**: Fill out and submit - check if you receive email
2. **Blog Admin**: Create/edit/delete blog posts
3. **Contact Admin**: View submitted contact forms
4. **Light Mode**: Switch themes and check readability
5. **Phone Numbers**: Verify all show `+1(602)886-3530`
6. **WhatsApp Links**: Test WhatsApp redirects
7. **Service Links**: Test "Schedule Consultation" email links

## 🔄 Backup Strategy

The system automatically creates backups in:
- `data/contacts.json` - All contact submissions
- `data/blog.json` - All blog posts

Regular backup these files to prevent data loss.

## 🚨 Troubleshooting

### If emails don't work:
- Check SMTP credentials in `.env.local`
- Verify firewall allows SMTP ports
- Check server logs for email errors

### If database doesn't work:
- System will automatically use file database
- Check `data/` directory permissions
- Verify PostgreSQL connection if using database

### If admin panels don't load:
- Check file permissions
- Verify all new files are uploaded
- Check server error logs

The system is designed to be resilient and will work even if some services (email, database) are not available.