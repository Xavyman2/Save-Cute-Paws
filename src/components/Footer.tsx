import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <footer className="relative border-t border-white/20 backdrop-blur-lg bg-gradient-to-b from-white/10 via-blue-50/30 to-purple-50/20 dark:from-gray-900/40 dark:via-blue-950/30 dark:to-purple-950/20 shadow-2xl">
      {/* Glass effect overlay - enhanced for light mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-purple-400/10 dark:from-blue-400/5 dark:via-transparent dark:to-purple-400/5 backdrop-blur-sm shadow-inner"></div>
      
      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2 backdrop-blur-sm bg-white/10 dark:bg-gray-900/10 rounded-xl p-6 border border-white/20 dark:border-white/10 shadow-xl dark:shadow-lg drop-shadow-lg dark:drop-shadow-none">
            <div className="flex items-center mb-6">
              <Image
                src="/save-cute-paws-logo2.png"
                alt="Save Cute Paws Logo"
                width={280}
                height={157}
                className="drop-shadow-lg"
                priority
              />
            </div>
            <p className="text-lg font-semibold max-w-md leading-relaxed text-gray-800 dark:text-white/90 drop-shadow-sm dark:drop-shadow-none">
              Dedicated to rescuing stray and abandoned animals, providing medical care, 
              shelter, and finding loving homes.
            </p>
          </div>
          <div className="backdrop-blur-sm bg-white/10 dark:bg-gray-900/10 rounded-xl p-6 border border-white/20 dark:border-white/10 shadow-xl dark:shadow-lg drop-shadow-lg dark:drop-shadow-none">
            <h4 className="font-bold text-lg bg-gradient-to-r from-gray-800 via-purple-600 to-gray-800 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent mb-4">Quick Links</h4>
            <div className="space-y-3">
              <Link href="/stories" className="block font-semibold text-gray-700 dark:text-white/80 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 dark:hover:from-purple-400 dark:hover:to-white hover:bg-clip-text hover:text-transparent transition-all duration-300 hover:translate-x-1">
                Stories
              </Link>
              <Link href="/donate" className="block font-semibold text-gray-700 dark:text-white/80 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 dark:hover:from-purple-400 dark:hover:to-white hover:bg-clip-text hover:text-transparent transition-all duration-300 hover:translate-x-1">
                Donate
              </Link>
              <Link href="/volunteers" className="block font-semibold text-gray-700 dark:text-white/80 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 dark:hover:from-purple-400 dark:hover:to-white hover:bg-clip-text hover:text-transparent transition-all duration-300 hover:translate-x-1">
                Volunteers
              </Link>
              <Link href="/contact" className="block font-semibold text-gray-700 dark:text-white/80 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 dark:hover:from-purple-400 dark:hover:to-white hover:bg-clip-text hover:text-transparent transition-all duration-300 hover:translate-x-1">
                Contact
              </Link>
            </div>
          </div>
          <div className="backdrop-blur-sm bg-white/10 dark:bg-gray-900/10 rounded-xl p-6 border border-white/20 dark:border-white/10 shadow-xl dark:shadow-lg drop-shadow-lg dark:drop-shadow-none">
            <h4 className="font-bold text-lg bg-gradient-to-r from-gray-800 via-purple-600 to-gray-800 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent mb-4">Legal</h4>
            <div className="space-y-3">
              <Link href="/terms" className="block font-semibold text-gray-700 dark:text-white/80 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 dark:hover:from-purple-400 dark:hover:to-white hover:bg-clip-text hover:text-transparent transition-all duration-300 hover:translate-x-1">
                Terms of Service
              </Link>
              <Link href="/contact" className="block font-semibold text-gray-700 dark:text-white/80 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 dark:hover:from-purple-400 dark:hover:to-white hover:bg-clip-text hover:text-transparent transition-all duration-300 hover:translate-x-1">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 text-center backdrop-blur-sm bg-white/10 dark:bg-gray-900/10 rounded-xl mx-4 border border-white/20 dark:border-white/10 shadow-xl dark:shadow-lg drop-shadow-lg dark:drop-shadow-none">
          <p className="bg-gradient-to-r from-gray-800 via-purple-600 to-gray-800 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent font-medium drop-shadow-sm dark:drop-shadow-none">
            &copy; {new Date().getFullYear()} Save Cute Paws. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
