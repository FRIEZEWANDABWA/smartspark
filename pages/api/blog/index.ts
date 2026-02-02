import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        include: { author: true }
      });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch blog posts' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, slug, content, excerpt, published, authorId } = req.body;
      const post = await prisma.post.create({
        data: {
          title,
          slug,
          content,
          excerpt,
          published,
          authorId: authorId || 'default-user-id'
        }
      });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create blog post' });
    }
  }
}
