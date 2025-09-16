const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@smartspark.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN'
      }
    })
    
    console.log('Admin user created successfully!')
    console.log('Email: admin@smartspark.com')
    console.log('Password: admin123')
    console.log('Please change the password after first login.')
    
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('Admin user already exists!')
    } else {
      console.error('Error creating admin user:', error)
    }
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()