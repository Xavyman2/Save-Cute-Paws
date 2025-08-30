"use client";

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { ModeToggle } from './ModeToggle';
import { Button } from './ui/button';
import { Menu, X, Heart, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Use useSession conditionally
  let session = null;
  let status = 'loading';
  
  try {
    const sessionData = useSession();
    session = sessionData.data;
    status = sessionData.status;
  } catch (error) {
    // If NextAuth fails, fallback to no auth
    status = 'unauthenticated';
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity duration-300">
              <Image
                src="/save-cute-paws-logo2.png"
                alt="Save Cute Paws Logo"
                width={320}
                height={180}
                className="h-14 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/stories" className="text-base font-bold text-blue-600 hover:text-purple-600 dark:text-blue-400 dark:hover:text-purple-400 transition-colors duration-300 hover:scale-105 transform">
              Stories
            </Link>
            <Link href="/blog" className="text-base font-bold text-blue-600 hover:text-purple-600 dark:text-blue-400 dark:hover:text-purple-400 transition-colors duration-300 hover:scale-105 transform">
              Blog
            </Link>
            <Link href="/volunteers" className="text-base font-bold text-blue-600 hover:text-purple-600 dark:text-blue-400 dark:hover:text-purple-400 transition-colors duration-300 hover:scale-105 transform">
              Volunteers
            </Link>
            <Link href="/contact" className="text-base font-bold text-blue-600 hover:text-purple-600 dark:text-blue-400 dark:hover:text-purple-400 transition-colors duration-300 hover:scale-105 transform">
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/donate">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                <Heart className="w-4 h-4 mr-2" />
                Donate Now
              </Button>
            </Link>
            
            {/* Authentication */}
            {status === 'loading' ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{session.user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  {session.user?.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="hover:bg-accent transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 pt-4">
              <Link 
                href="/stories" 
                className="text-base font-bold text-blue-600 hover:text-purple-600 dark:text-blue-400 dark:hover:text-purple-400 transition-all duration-300 py-2 hover:pl-2"
                onClick={closeMenu}
              >
                Stories
              </Link>
              <Link 
                href="/blog" 
                className="text-base font-bold text-blue-600 hover:text-purple-600 dark:text-blue-400 dark:hover:text-purple-400 transition-all duration-300 py-2 hover:pl-2"
                onClick={closeMenu}
              >
                Blog
              </Link>
              <Link 
                href="/volunteers" 
                className="text-base font-bold text-blue-600 hover:text-purple-600 dark:text-blue-400 dark:hover:text-purple-400 transition-all duration-300 py-2 hover:pl-2"
                onClick={closeMenu}
              >
                Volunteers
              </Link>
              <Link 
                href="/contact" 
                className="text-base font-bold text-blue-600 hover:text-purple-600 dark:text-blue-400 dark:hover:text-purple-400 transition-all duration-300 py-2 hover:pl-2"
                onClick={closeMenu}
              >
                Contact
              </Link>
              
              {/* Mobile Authentication */}
              {session ? (
                <div className="pt-4 border-t border-border">
                  <div className="text-sm font-medium text-foreground py-2">
                    Welcome, {session.user?.name}
                  </div>
                  <Link 
                    href="/profile" 
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 py-2 hover:pl-2 block"
                    onClick={closeMenu}
                  >
                    My Profile
                  </Link>
                  {session.user?.role === 'admin' && (
                    <Link 
                      href="/admin/dashboard" 
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 py-2 hover:pl-2 block"
                      onClick={closeMenu}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      signOut()
                      closeMenu()
                    }}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 py-2 w-full justify-start"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t border-border space-y-2">
                  <Link href="/auth/signin" onClick={closeMenu}>
                    <Button variant="ghost" className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup" onClick={closeMenu}>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
              
              <div className="pt-4">
                <Link href="/donate" onClick={closeMenu}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                    <Heart className="w-4 h-4 mr-2" />
                    Donate Now
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
