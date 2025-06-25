import React from 'react';
import { Home, Zap, Sparkles } from 'lucide-react';
import { Github, Star } from 'lucide-react';



const Header = ({ title = 'Lazy Prompter' }) => {
  const navItems = [
    { 
      icon: <Home className="w-5 h-5 transition-transform group-hover:scale-110" />, 
      label: 'Home', 
      href: '/',
      className: 'hover:bg-indigo-600'
    }
  ];

  return (
    <header className="bg-gradient-to-r from-indigo-800 via-purple-700 to-indigo-800 text-white shadow-xl sticky top-0 z-50 border-b border-white/10 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-pink-500 shadow-md">
              <Zap className="w-6 h-6 text-white" fill="currentColor" />
            </div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
              {title}
              <span className="ml-1.5">
                <Sparkles className="w-4 h-4 inline-block text-yellow-300 -translate-y-1.5" />
              </span>
            </h1>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`group flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${item.className || 'hover:bg-white/10'}`}
              >
                <span className="text-yellow-300 group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="hidden sm:inline-block text-sm font-medium">
                  {item.label}
                </span>
              </a>
            ))}
            
            {/* GitHub Star Button */}
            <a
              href="https://github.com/Ravsalt/Lazy_prompter"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 hover:bg-white/5 border border-white/10 hover:border-white/20 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm"
            >
              <Github className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
              <span className="hidden sm:inline text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                Star on GitHub
              </span>
              <span className="flex items-center text-xs px-2 py-0.5 rounded-full ml-1 bg-yellow-500/10 text-yellow-300 border border-yellow-500/20 group-hover:bg-yellow-500/20 transition-colors">
                <Star className="w-3 h-3 mr-1 fill-yellow-300" />
                <span className="font-medium">0</span>
              </span>
            </a>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
