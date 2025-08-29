import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Calendar, PawPrint } from 'lucide-react';
import { successStories } from '@/lib/stories-data';

const StoriesPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Rescue Success Stories</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Every animal has a story. Here are some of the heartwarming tales of rescue, recovery, and new beginnings 
          that make our work so meaningful. These stories represent hope, resilience, and the transformative power of love.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {successStories.map((story) => (
          <div key={story.id} className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative h-64">
              <Image 
                src={story.image} 
                alt={story.title} 
                fill
                className="object-cover"
              />
              <div className="absolute top-4 right-4">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  story.status === 'adopted' ? 'bg-green-500 text-white' :
                  story.status === 'fostered' ? 'bg-blue-500 text-white' :
                  'bg-purple-500 text-white'
                }`}>
                  {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
                </div>
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center text-white bg-black/50 px-2 py-1 rounded">
                  <PawPrint className="w-4 h-4 mr-1" />
                  <span className="text-xs capitalize">{story.animalType}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3 text-card-foreground">{story.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {story.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  {story.date}
                </div>
                <Link href={`/stories/${story.slug}`}>
                  <Button variant="outline" size="sm" className="group">
                    Read Full Story
                    <Heart className="w-4 h-4 ml-2 group-hover:text-red-500 transition-colors" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <div className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Share Your Story</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Have you adopted or fostered one of our animals? We'd love to hear about your experience and 
            share your success story to inspire others. Contact us with your story and photos!
          </p>
          <Link href="/contact?subject=Share%20My%20Success%20Story">
            <Button size="lg" className="group">
              Contact Us to Share Your Story
              <Heart className="w-4 h-4 ml-2 group-hover:animate-pulse" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;
