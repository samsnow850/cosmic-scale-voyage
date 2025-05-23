
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, BookOpen, Settings, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="relative z-20 bg-gray-900 border-b border-gray-700 p-4">
        <div className="flex justify-between items-center">
          <Link to="/mobile" className="text-lg font-bold text-white">
            Solar System Mobile
          </Link>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="border-gray-600 text-white hover:bg-gray-700"
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-75 flex items-start justify-end">
          <div className="bg-gray-900 w-64 h-full p-4 border-l border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white font-bold">Menu</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMenuOpen(false)}
                className="border-gray-600 text-white hover:bg-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <Link to="/mobile" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full justify-start bg-gray-800 hover:bg-gray-700 text-white">
                  <Home className="w-4 h-4 mr-3" />
                  Mobile Home
                </Button>
              </Link>
              
              <Link to="/mobile-quiz" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full justify-start bg-gray-800 hover:bg-gray-700 text-white">
                  <BookOpen className="w-4 h-4 mr-3" />
                  Mobile Quiz
                </Button>
              </Link>
              
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full justify-start bg-gray-800 hover:bg-gray-700 text-white">
                  <Smartphone className="w-4 h-4 mr-3" />
                  Desktop Version
                </Button>
              </Link>
              
              <div className="border-t border-gray-700 pt-3 mt-3">
                <p className="text-gray-400 text-xs mb-2">About</p>
                <p className="text-gray-300 text-xs">
                  Interactive Solar System project by Samuel Snow for Chemistry & Earth and Space Science.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavbar;
