import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
      <div className="container mx-auto px-4 py-4">
        <p className="text-sm" style={{ color: 'rgba(225, 225, 225, 0.8)' }}>
          &copy; {currentYear} Lazy Prompter. All rights reserved.
        </p>
        <p className="text-xs mt-2" style={{ color: 'rgba(225, 225, 225, 0.6)' }}>
          Made with <span style={{ color: '#22c55e' }}>♥</span> by Raven
        </p>
        </div>
    </footer>
  );
};

export default Footer;