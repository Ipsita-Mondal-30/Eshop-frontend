'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCart } from '@/services/cartService';
import { getSessionId } from '@/utils/sessionId';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { useAuth } from '../app/context/authContext'; // path fix
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, logout, username } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
  };

  useEffect(() => {
    const fetchCartItemsCount = async () => {
      try {
        const sessionId = getSessionId();
        if (sessionId) {
          const cart = await getCart(sessionId);
          setCartItemsCount(cart.items ? cart.items.length : 0);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCartItemsCount();

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Deals', path: '/deals' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition duration-300 ${scrolled ? 'shadow-md' : ''}`}>
        {/* Announcement Bar */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white text-center text-sm py-2">
          Free shipping on orders over $50! Use code FREESHIP at checkout.
        </div>

        {/* Main Navbar */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              
  
              <div className="flex items-center gap-2">
  <img 
    src="/logo.png" 
    alt="Eshop Logo" 
    className="h-16 w-auto"
  />
</div>

            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.path}
                  className={`text-gray-600 hover:text-gray-500 transition-colors relative ${
                    pathname === link.path ? 'font-medium text-gray-500' : ''
                  }`}
                >
                  {link.name}
                  {pathname === link.path && (
                    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gray-500 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button
                onClick={toggleSearch}
                className="text-gray-600 hover:text-teal-500 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Account */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700 hidden sm:inline">Hello, {username} 👋</span>
                  <button onClick={handleLogout} className="text-red-500 hover:text-red-600 text-sm">
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-teal-500 text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="text-gray-600 hover:text-teal-500 text-sm font-medium"
                  >
                    Signup
                  </Link>
                </>
              )}

              {/* Cart */}
              <Link 
                href={isAuthenticated ? "/cart" : "/login"} 
                className="text-gray-600 hover:text-teal-500 transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-gray-600 focus:outline-none"
                onClick={toggleMenu}
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="py-4 border-b border-gray-100">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2 focus:outline-none"
                  autoFocus
                />
                <button className="bg-teal-500 text-white px-4 py-2">
                  <Search size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-b border-gray-100">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.path}
                  className={`block py-2 text-gray-600 ${
                    pathname === link.path ? 'font-medium text-teal-500' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <button onClick={handleLogout} className="block py-2 text-gray-600">
                  Logout
                </button>
              ) : (
                <>
                  <Link 
                    href="/login"
                    className="block py-2 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/signup"
                    className="block py-2 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-24"></div>
    </>
  );
};

export default Navbar;
