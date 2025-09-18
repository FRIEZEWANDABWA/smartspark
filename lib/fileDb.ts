import fs from 'fs';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'data');
const BLOG_FILE = path.join(DB_DIR, 'blog.json');
const CONTACTS_FILE = path.join(DB_DIR, 'contacts.json');

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize files if they don't exist
if (!fs.existsSync(BLOG_FILE)) {
  fs.writeFileSync(BLOG_FILE, JSON.stringify([]));
}
if (!fs.existsSync(CONTACTS_FILE)) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify([]));
}

export const fileDb = {
  // Blog operations
  getBlogPosts: () => {
    const data = fs.readFileSync(BLOG_FILE, 'utf8');
    return JSON.parse(data);
  },
  
  saveBlogPost: (post: any) => {
    const posts = fileDb.getBlogPosts();
    const newPost = { ...post, id: Date.now(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    posts.push(newPost);
    fs.writeFileSync(BLOG_FILE, JSON.stringify(posts, null, 2));
    return newPost;
  },
  
  updateBlogPost: (id: number, post: any) => {
    const posts = fileDb.getBlogPosts();
    const index = posts.findIndex((p: any) => p.id === id);
    if (index !== -1) {
      posts[index] = { ...posts[index], ...post, updated_at: new Date().toISOString() };
      fs.writeFileSync(BLOG_FILE, JSON.stringify(posts, null, 2));
      return posts[index];
    }
    return null;
  },
  
  deleteBlogPost: (id: number) => {
    const posts = fileDb.getBlogPosts();
    const filtered = posts.filter((p: any) => p.id !== id);
    fs.writeFileSync(BLOG_FILE, JSON.stringify(filtered, null, 2));
    return true;
  },
  
  // Contact operations
  saveContact: (contact: any) => {
    const contacts = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8'));
    const newContact = { ...contact, id: Date.now(), created_at: new Date().toISOString() };
    contacts.push(newContact);
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
    return newContact;
  }
};