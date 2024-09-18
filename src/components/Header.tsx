import  { useState } from 'react';
import { Menu, X, Star } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <Star className="h-8 w-8 text-blue-500 mr-2" />
              <span className="font-bold text-xl">WeatherStar</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white">Home</a>
              <a href="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white">About</a>
              <a href="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white">Contact</a>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white">Home</a>
            <a href="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white">About</a>
            <a href="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white">Contact</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;