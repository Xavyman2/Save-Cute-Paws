import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Shield, Users, Award, TrendingUp, Zap, Star } from "lucide-react";
import { CountUp } from "@/components/CountUp";
import { getFeaturedStories } from "@/lib/stories-data";

export default function Home() {
  const featuredStories = getFeaturedStories(6);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50" 
          style={{ backgroundImage: "url('https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg')" }}
        ></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            Saving Lives, One Paw at a Time
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in-delay">
            Join us in our mission to rescue and care for animals in need.
          </p>
          <Link href="/donate">
            <Button 
              size="lg" 
              className="group relative text-lg px-10 py-6 bg-white text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white font-bold rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border-2 border-transparent hover:border-white/30 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center space-x-3">
                <Heart className="w-6 h-6 group-hover:animate-pulse" />
                <span>Donate Now</span>
                <Sparkles className="w-5 h-5 group-hover:animate-spin" />
              </div>
            </Button>
          </Link>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Who We Are
          </h2>
          <div className="max-w-5xl mx-auto">
            <p className="text-2xl md:text-3xl font-bold text-foreground leading-relaxed mb-8">
              Save Cute Paws is a non-profit organization dedicated to rescuing stray and abandoned animals.
            </p>
            <p className="text-xl md:text-2xl font-semibold text-muted-foreground leading-relaxed">
              We provide medical care, shelter, and find loving homes for cats, dogs, horses, and donkeys. 
              Our work is made possible by generous donors and dedicated volunteers.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Stories Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Success Stories</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Heartwarming tales of rescue, recovery, and new beginnings
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {featuredStories.map((story) => (
              <div key={story.id} className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-64 relative">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="bg-green-500 text-xs px-2 py-1 rounded-full font-semibold">
                      Success Story
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-card-foreground">{story.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {story.excerpt}
                  </p>
                  <Link href={`/stories/${story.slug}`} className="text-primary hover:underline font-medium inline-flex items-center">
                    Read More <Heart className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/stories">
              <Button variant="outline" size="lg" className="group hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                View All Stories
                <Star className="w-4 h-4 ml-2 group-hover:animate-pulse" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Our Impact in Numbers</h2>
            <p className="text-xl opacity-90">Making a real difference, one rescue at a time</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <CountUp 
                end={500} 
                suffix="+" 
                duration={2500}
                className="text-4xl font-black mb-2 text-white"
              />
              <div className="text-lg font-semibold opacity-90">Animals Rescued</div>
            </div>
            <div className="text-center group">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <CountUp 
                end={200} 
                suffix="+" 
                duration={2200}
                className="text-4xl font-black mb-2 text-white"
              />
              <div className="text-lg font-semibold opacity-90">Volunteers</div>
            </div>
            <div className="text-center group">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-10 h-10 text-white" />
              </div>
              <CountUp 
                end={450} 
                suffix="+" 
                duration={2800}
                className="text-4xl font-black mb-2 text-white"
              />
              <div className="text-lg font-semibold opacity-90">Successful Adoptions</div>
            </div>
            <div className="text-center group">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <CountUp 
                end={5} 
                suffix="" 
                duration={1500}
                className="text-4xl font-black mb-2 text-white"
              />
              <div className="text-lg font-semibold opacity-90">Years of Service</div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-foreground">How We Make a Difference</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive approach ensures every animal gets the care and love they deserve
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Rescue & Emergency Care</h3>
              <p className="text-muted-foreground leading-relaxed">
                We respond to emergency calls and provide immediate medical attention to animals in critical situations.
              </p>
            </div>
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-purple-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Rehabilitation & Care</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our dedicated team provides ongoing medical care, behavioral training, and lots of love during recovery.
              </p>
            </div>
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Finding Forever Homes</h3>
              <p className="text-muted-foreground leading-relaxed">
                We carefully match each animal with loving families, ensuring they find their perfect forever home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Get Involved</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            There are many ways you can help us save more lives. Whether through donations, volunteering, or spreading awareness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 hover:text-primary font-semibold shadow-lg">
                Make a Donation
              </Button>
            </Link>
            <Link href="/volunteers">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary font-semibold transition-all duration-300">
                Become a Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

