import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Calendar, PawPrint, ArrowLeft, Share2 } from 'lucide-react';
import { getStoryBySlug, successStories } from '@/lib/stories-data';
import { notFound } from 'next/navigation';

interface StoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return successStories.map((story) => ({
    slug: story.slug,
  }));
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/stories">
          <Button variant="outline" className="group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to All Stories
          </Button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
        <Image
          src={story.image}
          alt={story.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <div className="flex items-center gap-4 mb-2">
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              story.status === 'adopted' ? 'bg-green-500' :
              story.status === 'fostered' ? 'bg-blue-500' :
              'bg-purple-500'
            }`}>
              {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
            </div>
            <div className="flex items-center bg-black/50 px-2 py-1 rounded">
              <PawPrint className="w-4 h-4 mr-1" />
              <span className="text-xs capitalize">{story.animalType}</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">{story.title}</h1>
          <div className="flex items-center text-white/90">
            <Calendar className="w-4 h-4 mr-2" />
            {story.date}
          </div>
        </div>
      </div>

      {/* Story Content */}
      <article className="prose prose-lg max-w-none dark:prose-invert">
        <div className="bg-muted/30 rounded-lg p-6 mb-8 border-l-4 border-primary">
          <p className="text-lg font-medium text-muted-foreground m-0">
            {story.excerpt}
          </p>
        </div>

        <div className="text-muted-foreground leading-relaxed space-y-6">
          {story.fullStory.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {/* Share Section */}
      <div className="mt-12 pt-8 border-t">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Share this story</h3>
            <p className="text-muted-foreground">
              Help spread awareness about animal rescue and inspire others.
            </p>
          </div>
          <Button className="group">
            <Share2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Share Story
          </Button>
        </div>
      </div>

      {/* Related Stories */}
      <div className="mt-16">
        <h3 className="text-2xl font-semibold mb-8">More Success Stories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {successStories
            .filter(s => s.id !== story.id)
            .slice(0, 2)
            .map((relatedStory) => (
              <Link key={relatedStory.id} href={`/stories/${relatedStory.slug}`}>
                <div className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-48">
                    <Image
                      src={relatedStory.image}
                      alt={relatedStory.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">{relatedStory.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedStory.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-muted-foreground">{relatedStory.date}</span>
                      <span className="text-primary hover:underline text-sm font-medium">
                        Read More →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-semibold mb-4">Inspired by {story.title.split("'s")[0]}?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Every animal deserves a second chance. Your support helps us continue rescuing, 
          rehabilitating, and finding loving homes for animals in need.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/donate">
            <Button size="lg" className="group">
              <Heart className="w-4 h-4 mr-2 group-hover:animate-pulse" />
              Make a Donation
            </Button>
          </Link>
          <Link href="/volunteers">
            <Button variant="outline" size="lg">
              Become a Volunteer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
