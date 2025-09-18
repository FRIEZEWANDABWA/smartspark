# 🚀 VPS Deployment Steps

## ✅ GitHub Push Completed
All changes have been successfully pushed to GitHub repository.

## 🔧 VPS Deployment Options

### Option 1: Manual Deployment
1. **SSH into your VPS:**
   ```bash
   ssh your-username@your-vps-ip
   ```

2. **Navigate to website directory:**
   ```bash
   cd /path/to/your/website
   ```

3. **Pull latest changes:**
   ```bash
   git pull origin master
   ```

4. **Set up data directory:**
   ```bash
   mkdir -p data
   chmod 755 data
   ```

5. **Install dependencies (if using Node.js):**
   ```bash
   npm install --production
   ```

6. **Create environment file:**
   ```bash
   nano .env.local
   ```
   Add:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   NOTIFICATION_EMAIL=your-email@gmail.com
   NODE_ENV=production
   ```

7. **Restart web server:**
   ```bash
   # For Apache:
   sudo systemctl restart apache2
   
   # For Nginx:
   sudo systemctl restart nginx
   
   # For Node.js/PM2:
   pm2 restart all
   ```

### Option 2: Automated Script
1. **Update the deployment script** (`deploy-to-vps.sh`) with your VPS details
2. **Make it executable:**
   ```bash
   chmod +x deploy-to-vps.sh
   ```
3. **Run the script:**
   ```bash
   ./deploy-to-vps.sh
   ```

## 🎯 What's Been Updated

### ✅ Core Changes
- **Phone number**: Changed to `+1(602)886-3530` throughout site
- **WhatsApp links**: Updated to new number
- **Contact forms**: Now capture phone numbers and service types
- **Light mode**: Improved readability and responsiveness
- **Background images**: Enhanced visibility while maintaining text clarity

### ✅ New Features
- **Blog management system**: Full CRUD operations
- **Contact submissions viewer**: Admin panel to view all form submissions
- **Database fallback**: Uses PostgreSQL if available, file database otherwise
- **Email notifications**: Sends emails when forms are submitted
- **N8N integration**: Triggers webhooks for automation

### ✅ Admin Panels
- **Blog Admin**: `/admin/blog` - Create, edit, delete blog posts
- **Contact Admin**: `/admin/contacts` - View all form submissions
- **Password**: `SmartSpark2024!`

## 🔍 Post-Deployment Testing

After deployment, test these features:

1. **Contact Form Submission**
   - Fill out contact form
   - Check if you receive email notification
   - Verify submission appears in `/admin/contacts`

2. **Blog Management**
   - Access `/admin/blog`
   - Create a new blog post
   - Verify it appears on `/blog` page

3. **Phone Number Updates**
   - Check footer shows `+1(602)886-3530`
   - Test WhatsApp links redirect correctly

4. **Light Mode**
   - Switch to light mode
   - Verify text is readable on all pages

5. **Service Pages**
   - Test "Schedule Consultation" buttons
   - Verify they open email with correct subject

## 🛠️ Troubleshooting

### If emails don't work:
- Check SMTP credentials in `.env.local`
- Verify Gmail app password is correct
- Check server firewall allows SMTP ports

### If admin panels don't load:
- Verify all files were uploaded correctly
- Check file permissions on `data/` directory
- Review server error logs

### If database errors occur:
- System will automatically fallback to file database
- Check PostgreSQL connection if using database
- Verify `data/` directory is writable

## 📞 Updated Contact Information

All instances updated to:
- **Phone**: +1(602)886-3530
- **WhatsApp**: +16028863530
- **Email**: contact@smartsparkservices.com

## 🎉 Deployment Complete!

Your SmartSpark website is now ready with all the requested updates and improvements!