"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  author: string;
  publishedAt: string;
  mainImage?: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
  });

  useEffect(() => {
    fetchPosts();
    fetchStats();
  }, []);

  const fetchPosts = async () => {
    try {
      const postsData = await client.fetch(groq`*[_type == "post"]{
        _id,
        title,
        "slug": slug.current,
        "author": author->name,
        "mainImage": mainImage.asset->url,
        publishedAt
      } | order(publishedAt desc)[0...5]`);
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const totalPosts = await client.fetch(groq`count(*[_type == "post"])`);
      const publishedPosts = await client.fetch(groq`count(*[_type == "post" && defined(publishedAt)])`);
      const draftPosts = await client.fetch(groq`count(*[_type == "post" && !defined(publishedAt)])`);
      
      setStats({
        totalPosts,
        publishedPosts,
        draftPosts,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
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

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-500 rounded-lg shadow p-6 text-white">
          <div className="flex items-center">
            <div className="p-3 bg-blue-600 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Total Posts</h3>
              <p className="text-3xl font-bold">{stats.totalPosts}</p>
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
              <p className="text-3xl font-bold">{stats.publishedPosts}</p>
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
              <p className="text-3xl font-bold">{stats.draftPosts}</p>
            </div>
          </div>
        </div>
      </div>

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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Posts</h3>
          <Link href="/studio/structure/post" className="text-blue-500 hover:text-blue-600 text-sm font-medium">
            View All →
          </Link>
        </div>
        
        {posts.length > 0 ? (
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
    </div>
  );
}
