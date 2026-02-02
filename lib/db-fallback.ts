import { prisma } from './prisma';
import { fileDb } from './fileDb';

export const db = {
  // Blog operations
  async getBlogPosts() {
    try {
      const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        include: { author: true }
      });
      return posts;
    } catch (error) {
      console.log('Prisma error, falling back to file DB:', error);
      return fileDb.getBlogPosts().filter((post: any) => post.status === 'published');
    }
  },

  async saveBlogPost(post: any) {
    try {
      const result = await prisma.post.create({
        data: {
          title: post.title,
          slug: post.slug,
          content: post.content,
          excerpt: post.excerpt,
          published: post.status === 'published',
          authorId: post.authorId || 'default-user-id'
        }
      });
      return result;
    } catch (error) {
      console.log('Prisma error, falling back to file DB:', error);
      return fileDb.saveBlogPost(post);
    }
  },

  async saveContact(contact: any) {
    try {
      const result = await prisma.contact.create({
        data: {
          name: contact.name,
          email: contact.email,
          message: contact.message
        }
      });
      return result;
    } catch (error) {
      console.log('Prisma error, falling back to file DB:', error);
      return fileDb.saveContact(contact);
    }
  }
};