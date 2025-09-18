import { NextApiRequest, NextApiResponse } from 'next';
import { fileDb } from '../../lib/fileDb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const posts = fileDb.getBlogPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch blog posts' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, slug, content, excerpt, category, published } = req.body;
      
      if (!title || !slug || !content) {
        return res.status(400).json({ message: 'Title, slug, and content are required' });
      }

      const post = {
        title,
        slug,
        content,
        excerpt: excerpt || '',
        category: category || 'General',
        status: published ? 'published' : 'draft'
      };

      const newPost = fileDb.saveBlogPost(post);
      res.status(201).json({ message: 'Blog post created successfully', post: newPost });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create blog post' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const { title, slug, content, excerpt, category, published } = req.body;

      const updatedPost = fileDb.updateBlogPost(parseInt(id as string), {
        title,
        slug,
        content,
        excerpt: excerpt || '',
        category: category || 'General',
        status: published ? 'published' : 'draft'
      });

      if (!updatedPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }

      res.status(200).json({ message: 'Blog post updated successfully', post: updatedPost });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update blog post' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      fileDb.deleteBlogPost(parseInt(id as string));
      res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete blog post' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}