import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogIndex() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        const publishedPosts = data.filter((post: any) => post.published);
        setPosts(publishedPosts);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">← Back to Home</Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SmartSpark Blog</h1>
          <p className="text-xl text-gray-600">Insights on AI, automation, and digital innovation</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon!</h2>
            <p className="text-gray-600">We're working on amazing content for you.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post: any) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>By {post.author} • {new Date(post.created_at).toLocaleDateString()}</span>
                  <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:text-blue-800 font-semibold">
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
