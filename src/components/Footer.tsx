import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="relative border-t border-white/20 backdrop-blur-lg bg-gradient-to-b from-white/10 via-blue-50/30 to-purple-50/20 dark:from-gray-900/40 dark:via-blue-950/30 dark:to-purple-950/20 shadow-2xl">
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5 backdrop-blur-sm"></div>
      
      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2 backdrop-blur-sm bg-white/5 dark:bg-gray-900/10 rounded-xl p-6 border border-white/10 shadow-lg">
            <h3 className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Save Cute Paws
            </h3>
            <p className="text-lg font-semibold max-w-md leading-relaxed bg-gradient-to-r from-blue-700 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Dedicated to rescuing stray and abandoned animals, providing medical care, 
              shelter, and finding loving homes.
            </p>
          </div>
          <div className="backdrop-blur-sm bg-white/5 dark:bg-gray-900/10 rounded-xl p-6 border border-white/10 shadow-lg">
            <h4 className="font-bold text-lg text-blue-700 dark:text-blue-400 mb-4">Quick Links</h4>
            <div className="space-y-3">
              <Link href="/stories" className="block font-semibold text-purple-600 hover:text-blue-600 transition-all duration-300 hover:translate-x-1">
                Stories
              </Link>
              <Link href="/donate" className="block font-semibold text-purple-600 hover:text-blue-600 transition-all duration-300 hover:translate-x-1">
                Donate
              </Link>
              <Link href="/volunteers" className="block font-semibold text-purple-600 hover:text-blue-600 transition-all duration-300 hover:translate-x-1">
                Volunteers
              </Link>
              <Link href="/contact" className="block font-semibold text-purple-600 hover:text-blue-600 transition-all duration-300 hover:translate-x-1">
                Contact
              </Link>
            </div>
          </div>
          <div className="backdrop-blur-sm bg-white/5 dark:bg-gray-900/10 rounded-xl p-6 border border-white/10 shadow-lg">
            <h4 className="font-bold text-lg text-blue-700 dark:text-blue-400 mb-4">Legal</h4>
            <div className="space-y-3">
              <Link href="/terms" className="block font-semibold text-purple-600 hover:text-blue-600 transition-all duration-300 hover:translate-x-1">
                Terms of Service
              </Link>
              <Link href="/contact" className="block font-semibold text-purple-600 hover:text-blue-600 transition-all duration-300 hover:translate-x-1">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 text-center backdrop-blur-sm bg-white/5 dark:bg-gray-900/10 rounded-xl mx-4 border border-white/10 shadow-lg">
          <p className="text-muted-foreground font-medium">
            &copy; {new Date().getFullYear()} Save Cute Paws. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
