import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
        include: { author: { select: { name: true, email: true } } }
      })
      res.status(200).json(projects)
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch projects' })
    }
  } else if (req.method === 'POST') {
    const { title, description, image, category, client, feedback, authorId } = req.body

    try {
      const project = await prisma.project.create({
        data: { title, description, image, category, client, feedback, authorId }
      })
      res.status(201).json(project)
    } catch (error) {
      res.status(500).json({ message: 'Failed to create project' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}