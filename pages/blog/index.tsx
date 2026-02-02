import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function BlogIndex() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setPosts([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900">
      <Header />
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">SmartSpark Blog</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">Insights on AI, automation, and digital innovation</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-2xl text-gray-600 dark:text-gray-300">Loading...</div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-primary-800 rounded-lg">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Coming Soon!</h2>
              <p className="text-gray-600 dark:text-gray-300">We're working on amazing content for you.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post: any) => (
                <article key={post.id} className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    <Link href={`/blog/${post.slug}`} className="hover:text-accent-500">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>By {post.author?.name || 'SmartSpark Team'} • {new Date(post.createdAt).toLocaleDateString()}</span>
                    <Link href={`/blog/${post.slug}`} className="text-accent-500 hover:text-accent-600 font-semibold">
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
