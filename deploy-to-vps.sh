#!/bin/bash

# SmartSpark VPS Deployment Script
echo "🚀 Starting SmartSpark deployment to VPS..."

# VPS Configuration (update these with your VPS details)
VPS_HOST="your-vps-ip-or-domain"
VPS_USER="your-username"
VPS_PATH="/path/to/your/website"

echo "📡 Connecting to VPS and pulling latest changes..."

ssh $VPS_USER@$VPS_HOST << 'EOF'
# Navigate to website directory
cd /path/to/your/website

# Pull latest changes from GitHub
echo "📥 Pulling latest changes from GitHub..."
git pull origin master

# Create data directory if it doesn't exist
echo "📁 Setting up data directory..."
mkdir -p data
chmod 755 data

# Install/update dependencies (if using Node.js)
if [ -f "package.json" ]; then
    echo "📦 Installing Node.js dependencies..."
    npm install --production
fi

# Set up environment variables (create if doesn't exist)
if [ ! -f ".env.local" ]; then
    echo "⚙️ Creating environment file..."
    cat > .env.local << 'ENVEOF'
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NOTIFICATION_EMAIL=your-email@gmail.com

# N8N Webhook (optional)
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/contact

# Database (optional - will use file DB if not provided)
# DATABASE_URL=postgresql://user:password@localhost:5432/smartspark

NODE_ENV=production
ENVEOF
    echo "⚠️  Please update .env.local with your actual credentials"
fi

# Restart web server
echo "🔄 Restarting web server..."

# For Apache
if systemctl is-active --quiet apache2; then
    sudo systemctl restart apache2
    echo "✅ Apache restarted"
fi

# For Nginx
if systemctl is-active --quiet nginx; then
    sudo systemctl restart nginx
    echo "✅ Nginx restarted"
fi

# For Node.js with PM2
if command -v pm2 &> /dev/null; then
    pm2 restart all
    echo "✅ PM2 processes restarted"
fi

echo "🎉 Deployment completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env.local with your email credentials"
echo "2. Test the website functionality"
echo "3. Access admin panels:"
echo "   - Blog: https://yourdomain.com/admin/blog"
echo "   - Contacts: https://yourdomain.com/admin/contacts"
echo "   - Password: SmartSpark2024!"
echo ""
echo "🔗 Updated features:"
echo "✅ Phone number: +1(602)886-3530"
echo "✅ WhatsApp integration"
echo "✅ Blog management system"
echo "✅ Contact form with phone field"
echo "✅ Email notifications"
echo "✅ Light mode improvements"
echo "✅ Background image enhancements"

EOF

echo "🏁 VPS deployment script completed!"