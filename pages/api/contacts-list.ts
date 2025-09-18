import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const contactsFile = path.join(process.cwd(), 'data', 'contacts.json');
    
    if (!fs.existsSync(contactsFile)) {
      return res.status(200).json([]);
    }

    const data = fs.readFileSync(contactsFile, 'utf8');
    const contacts = JSON.parse(data);
    
    // Sort by newest first
    contacts.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
}