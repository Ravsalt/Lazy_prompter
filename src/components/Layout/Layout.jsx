import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Star } from 'lucide-react';


const Layout = ({ 
  children, 
  title = 'Lazy Prompter',
  description = 'Generate AI prompts with ease',
  className = '' 
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      
      
      <Header title={title} />
      
      <main className={`flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
      <Footer />
      
      {/* Scroll to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor: '#3b82f6',
          color: '#e1e1e1'
        }}
        aria-label="Scroll to top"
      >
        <Star className="h-6 w-6" fill="yellow" />
      </button>
    </div>
  );
};

export default Layout;
