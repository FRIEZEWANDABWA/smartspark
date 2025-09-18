import { useState, useEffect } from 'react';

export default function BlogAdmin() {
  const [posts, setPosts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    title: '', slug: '', content: '', excerpt: '', published: false
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'SmartSpark2024!') {
      setAuthenticated(true);
      // Set auth cookie for middleware
      document.cookie = "auth-token=valid; path=/; secure; samesite=strict";
    } else {
      alert('Wrong password');
    }
  };

  const fetchPosts = async () => {
    const response = await fetch('/api/blog-simple');
    const data = await response.json();
    setPosts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingPost ? 'PUT' : 'POST';
    const url = editingPost ? `/api/blog-simple?id=${editingPost.id}` : '/api/blog-simple';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    setShowForm(false);
    setEditingPost(null);
    setFormData({ title: '', slug: '', content: '', excerpt: '', published: false });
    fetchPosts();
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || '',
      published: post.published
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this post?')) {
      await fetch(`/api/blog-simple?id=${id}`, { method: 'DELETE' });
      fetchPosts();
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchPosts();
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1f2937'}}>
        <form onSubmit={handleLogin} style={{backgroundColor: '#374151', padding: '40px', borderRadius: '8px', minWidth: '300px'}}>
          <h2 style={{color: 'white', fontSize: '20px', marginBottom: '20px', textAlign: 'center'}}>🔐 Blog Admin Access</h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{width: '100%', padding: '12px', borderRadius: '4px', border: 'none', marginBottom: '15px'}}
            required
          />
          <button 
            type="submit" 
            style={{width: '100%', backgroundColor: '#3b82f6', color: 'white', padding: '12px', borderRadius: '4px', border: 'none', cursor: 'pointer'}}
          >
            Access Blog Admin
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{padding: '20px', backgroundColor: 'white', minHeight: '100vh', color: 'black'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <h1 style={{fontSize: '24px', fontWeight: 'bold'}}>🔐 Blog Management</h1>
        <a 
          href="/admin-secure" 
          style={{backgroundColor: '#6b7280', color: 'white', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none'}}
        >
          ← Back to Admin
        </a>
      </div>
      
      <button 
        onClick={() => {
          setShowForm(true);
          setEditingPost(null);
          setFormData({ title: '', slug: '', content: '', excerpt: '', published: false });
        }}
        style={{backgroundColor: '#3b82f6', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', marginBottom: '20px', cursor: 'pointer'}}
      >
        Add New Post
      </button>

      {showForm && (
        <div style={{backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '8px', marginBottom: '20px'}}>
          <h2 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '15px'}}>
            {editingPost ? 'Edit Post' : 'Create New Post'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px'}}>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white', color: 'black'}}
                required
              />
            </div>
            
            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px'}}>Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white', color: 'black'}}
                required
              />
            </div>

            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px'}}>Excerpt</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white', color: 'black', height: '60px'}}
              />
            </div>
            
            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px'}}>Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: 'white', color: 'black', height: '200px'}}
                required
              />
            </div>

            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'flex', alignItems: 'center'}}>
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({...formData, published: e.target.checked})}
                  style={{marginRight: '8px'}}
                />
                Publish immediately
              </label>
            </div>

            <div>
              <button 
                type="submit" 
                style={{backgroundColor: '#10b981', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', marginRight: '10px', cursor: 'pointer'}}
              >
                {editingPost ? 'Update Post' : 'Create Post'}
              </button>
              <button 
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingPost(null);
                }}
                style={{backgroundColor: '#6b7280', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer'}}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{backgroundColor: '#f9fafb', borderRadius: '8px', padding: '20px'}}>
        <h2 style={{fontSize: '18px', fontWeight: 'bold', marginBottom: '15px'}}>All Posts ({posts.length})</h2>
        
        {posts.map((post: any) => (
          <div key={post.id} style={{backgroundColor: 'white', padding: '15px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #e5e7eb'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
              <div style={{flex: 1}}>
                <h3 style={{fontSize: '16px', fontWeight: 'bold', marginBottom: '5px'}}>{post.title}</h3>
                <p style={{color: '#6b7280', marginBottom: '5px'}}>{post.excerpt}</p>
                <div style={{fontSize: '12px', color: '#9ca3af'}}>
                  <span>📅 {new Date(post.created_at).toLocaleDateString()}</span>
                  <span style={{marginLeft: '15px', padding: '2px 8px', borderRadius: '12px', backgroundColor: post.published ? '#dcfce7' : '#fef3c7', color: post.published ? '#166534' : '#92400e'}}>
                    {post.published ? '✅ Published' : '📝 Draft'}
                  </span>
                </div>
              </div>
              
              <div style={{display: 'flex', gap: '8px', marginLeft: '15px'}}>
                <button
                  onClick={() => handleEdit(post)}
                  style={{backgroundColor: '#3b82f6', color: 'white', padding: '5px 10px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '12px'}}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  style={{backgroundColor: '#ef4444', color: 'white', padding: '5px 10px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontSize: '12px'}}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {posts.length === 0 && (
          <div style={{textAlign: 'center', padding: '40px', color: '#6b7280'}}>
            <p>No blog posts yet. Click "Add New Post" to create your first blog post!</p>
          </div>
        )}
      </div>
    </div>
  );
}
