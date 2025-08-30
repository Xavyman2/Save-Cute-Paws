import { blogClient } from "@/sanity/lib/blogClient"
import { groq } from "next-sanity"
import { PortableText } from "@portabletext/react"
import Image from "next/image"
import { notFound } from "next/navigation"

// Force dynamic rendering for fresh content
export const dynamic = 'force-dynamic'
export const revalidate = 0 // Disable static generation caching

export async function generateStaticParams() {
  try {
    const posts = await blogClient.fetch(groq`*[_type == "post" && defined(slug.current)][0...100]{
      "slug": slug.current
    }`)
    
    return posts.map((post: any) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

const BlogPostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  
  try {
    // Use fresh blog client for immediate content
    const post = await blogClient.fetch(groq`*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      "author": author->name,
      "mainImage": mainImage.asset->url,
      body,
      publishedAt
    }`, { slug })

    if (!post) {
      notFound()
    }

    return (
      <div className="container mx-auto px-4 py-16">
        <article className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center mb-8 text-gray-600 dark:text-gray-300">
            <p>By {post.author}</p>
            <span className="mx-2">•</span>
            <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
          </div>
          {post.mainImage && (
            <Image src={post.mainImage} alt={post.title} width={800} height={400} className="w-full h-auto rounded-lg mb-8" />
          )}
          <div className="prose dark:prose-invert max-w-none">
            <PortableText value={post.body} />
          </div>
        </article>
      </div>
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)
    notFound()
  }
}

export default BlogPostPage
