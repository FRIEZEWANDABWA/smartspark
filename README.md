# SmartSpark Services - Enhanced Version

## Features Added

### Backend & Database
- **Prisma ORM** with SQLite database
- **Authentication system** with JWT tokens
- **Contact form** saves to database + WhatsApp
- **Project management** API
- **Admin dashboard** for content management

### Admin Panel
- Dashboard with statistics
- Contact message management
- Project portfolio management
- User authentication

## Setup Instructions

1. **Install dependencies:**
```bash
npm install
```

2. **Setup database:**
```bash
npm run db:generate
npm run db:push
```

3. **Create admin user (run once):**
```bash
node scripts/create-admin.js
```

4. **Start development server:**
```bash
npm run dev
```

5. **Access admin panel:**
- Go to `/admin` 
- Login with admin credentials

## API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project (admin)
- `POST /api/auth/login` - Admin login

## Database Management

- `npm run db:studio` - Open Prisma Studio
- `npm run db:push` - Push schema changes
- `npm run db:generate` - Generate Prisma client

## Deployment to Hostinger

1. Build the project: `npm run build`
2. Upload files to Hostinger
3. Set environment variables in hosting panel
4. Run database migrations

## Environment Variables

Create `.env.local` with:
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="https://yourdomain.com"
```