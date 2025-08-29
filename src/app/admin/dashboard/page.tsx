"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  author: string;
  publishedAt: string;
  mainImage?: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVolunteer: boolean;
  joinedAt: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalUsers: 0,
    volunteers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Fetching from API routes...');
      
      // Check Sanity connection via API route
      const statusResponse = await fetch('/api/admin/status');
      const statusData = await statusResponse.json();
      
      console.log('Status response:', statusResponse.status, statusData);
      
      if (!statusResponse.ok) {
        setError(statusData.message || 'Failed to connect to Sanity CMS');
        return;
      }

      // Fetch users via API route
      const usersResponse = await fetch('/api/admin/users');
      const usersData = await usersResponse.json();
      
      console.log('Users response:', usersResponse.status, usersData);
      
      if (usersResponse.ok) {
        setUsers(usersData.users || []);
      }

      // Fetch posts via API route
      const postsResponse = await fetch('/api/admin/posts');
      const postsData = await postsResponse.json();
      
      console.log('Posts response:', postsResponse.status, postsData);
      
      if (postsResponse.ok) {
        setPosts(postsData.posts || []);
      }

      // Fetch stats via API route
      const statsResponse = await fetch('/api/admin/stats');
      const statsData = await statsResponse.json();
      
      console.log('Stats response:', statsResponse.status, statsData);
      
      if (statsResponse.ok) {
        setStats(statsData.stats);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Unable to connect to Sanity CMS. Please check your configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to Admin Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your Save Cute Paws website content and blog posts.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Configuration Required</h3>
              <p className="text-red-700 dark:text-red-300 mt-1">{error}</p>
              <div className="mt-3 text-sm text-red-600 dark:text-red-400">
                <p>To set up Sanity CMS:</p>
                <ol className="list-decimal list-inside mt-2 space-y-1">
                  <li>Create a Sanity project at <a href="https://sanity.io" target="_blank" rel="noopener noreferrer" className="underline">sanity.io</a></li>
                  <li>Create a <code className="bg-red-100 dark:bg-red-800 px-1 rounded">.env.local</code> file in your project root</li>
                  <li>Add your Sanity project ID and dataset name to the environment variables</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && !error && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600 dark:text-gray-300">Loading dashboard data...</span>
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      {!error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-blue-500 rounded-lg shadow p-6 text-white">
            <div className="flex items-center">
              <div className="p-3 bg-blue-600 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Total Posts</h3>
                <p className="text-3xl font-bold">{isLoading ? '...' : stats.totalPosts}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-500 rounded-lg shadow p-6 text-white">
            <div className="flex items-center">
              <div className="p-3 bg-green-600 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Published</h3>
                <p className="text-3xl font-bold">{isLoading ? '...' : stats.publishedPosts}</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500 rounded-lg shadow p-6 text-white">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-600 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Drafts</h3>
                <p className="text-3xl font-bold">{isLoading ? '...' : stats.draftPosts}</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-500 rounded-lg shadow p-6 text-white">
            <div className="flex items-center">
              <div className="p-3 bg-purple-600 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Users</h3>
                <p className="text-3xl font-bold">{isLoading ? '...' : stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-500 rounded-lg shadow p-6 text-white">
            <div className="flex items-center">
              <div className="p-3 bg-orange-600 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold">Volunteers</h3>
                <p className="text-3xl font-bold">{isLoading ? '...' : stats.volunteers}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/studio" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-4 text-center transition-colors duration-200">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h4 className="font-semibold">Create New Post</h4>
            <p className="text-sm opacity-90">Write a new blog post</p>
          </Link>

          <Link href="/studio/structure/post" className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-4 text-center transition-colors duration-200">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <h4 className="font-semibold">Manage Posts</h4>
            <p className="text-sm opacity-90">Edit existing posts</p>
          </Link>

          <Link href="/blog" className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg p-4 text-center transition-colors duration-200">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <h4 className="font-semibold">Preview Blog</h4>
            <p className="text-sm opacity-90">View published posts</p>
          </Link>

          <Link href="/" className="bg-gray-500 hover:bg-gray-600 text-white rounded-lg p-4 text-center transition-colors duration-200">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h4 className="font-semibold">View Website</h4>
            <p className="text-sm opacity-90">Go to main site</p>
          </Link>
        </div>
      </div>

      {/* Recent Posts */}
      {!error && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Posts</h3>
            <Link href="/studio/structure/post" className="text-blue-500 hover:text-blue-600 text-sm font-medium">
              View All →
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-300">Loading posts...</span>
            </div>
          ) : posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post._id} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  {post.mainImage && (
                    <img src={post.mainImage} alt={post.title} className="w-16 h-16 object-cover rounded-lg" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{post.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">By {post.author}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/studio/structure/post;${post._id}`} className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors">
                      Edit
                    </Link>
                    {post.slug && (
                      <Link href={`/blog/${post.slug}`} className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors">
                        View
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400">No posts found. Create your first blog post!</p>
              <Link href="/studio" className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                Create Post
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Recent Users */}
      {!error && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Users</h3>
          {users && users.length > 0 ? (
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user._id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{user.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {user.role}
                      </span>
                      {user.isVolunteer && (
                        <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                          Volunteer
                        </span>
                      )}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Joined {new Date(user.joinedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400">No users found yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
