const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deletePosts() {
    try {
        const result = await prisma.post.deleteMany();
        console.log(`✅ Deleted ${result.count} posts`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

deletePosts();
