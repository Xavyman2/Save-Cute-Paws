import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from "lucide-react"

export const revalidate = 30 // revalidate this page every 30 seconds

const BlogPage = async () => {
  const posts = await client.fetch(groq`*[_type == "post" && defined(publishedAt)]{
    _id,
    title,
    "slug": slug.current,
    "author": author->name,
    "mainImage": mainImage.asset->url,
    "mainImageAlt": mainImage.alt,
    publishedAt,
    "excerpt": pt::text(body[0...3])
  } | order(publishedAt desc)`)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stay updated with our latest rescue stories, animal care tips, and important updates from Save Cute Paws.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <article key={post._id} className="group bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  {post.mainImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.mainImage} 
                        alt={post.mainImageAlt || post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    {post.excerpt && (
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt.substring(0, 150)}...
                      </p>
                    )}
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-4 space-x-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <Link href={`/blog/${post.slug}`}>
                      <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-muted/50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">No Blog Posts Yet</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We're working on bringing you amazing content. Check back soon for updates from Save Cute Paws!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Share Your Story?</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Have an amazing rescue story or want to contribute to our blog? We'd love to hear from you!
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
