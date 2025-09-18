import { useState, useEffect } from 'react';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  featured_image: string;
  status: string;
  created_at: string;
  updated_at: string;
  views?: number;
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'Technology',
    featured_image: '',
    status: 'published'
  });

  const categories = ['Technology', 'Web Development', 'Digital Marketing', 'AI & Automation', 'Design', 'Business'];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/blog');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingPost ? 'PUT' : 'POST';
      const body = editingPost ? { ...formData, id: editingPost.id } : formData;

      const response = await fetch('/api/admin/blog', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        fetchPosts();
        resetForm();
      }
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE' });
        fetchPosts();
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: 'Technology',
      featured_image: '',
      status: 'published'
    });
    setEditingPost(null);
    setShowForm(false);
  };

  const startEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      featured_image: post.featured_image,
      status: post.status
    });
    setEditingPost(post);
    setShowForm(true);
  };

  if (loading) return <div className="text-white">Loading blog posts...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">📝 Blog Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {showForm ? 'Cancel' : '+ New Post'}
        </button>
      </div>

      {/* Blog Form */}
      {showForm && (
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
          <h3 className="text-xl font-semibold text-white mb-4">
            {editingPost ? 'Edit Post' : 'Create New Post'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Featured Image URL</label>
              <input
                type="url"
                value={formData.featured_image}
                onChange={(e) => setFormData({...formData, featured_image: e.target.value})}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                rows={3}
                placeholder="Brief description of the post..."
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600"
                rows={10}
                placeholder="Write your blog post content here..."
                required
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                {editingPost ? 'Update Post' : 'Create Post'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts List */}
      <div className="bg-gray-800 rounded-lg border border-gray-600">
        <div className="p-4 border-b border-gray-600">
          <h3 className="text-lg font-semibold text-white">All Posts ({posts.length})</h3>
        </div>
        <div className="divide-y divide-gray-600">
          {posts.map((post) => (
            <div key={post.id} className="p-4 hover:bg-gray-750 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-white font-semibold">{post.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post.status === 'published' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                    }`}>
                      {post.status}
                    </span>
                    <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>Created: {new Date(post.created_at).toLocaleDateString()}</span>
                    {post.views && <span>Views: {post.views}</span>}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => startEdit(post)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              No blog posts yet. Create your first post!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}