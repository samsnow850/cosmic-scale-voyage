
import React from 'react';
import { Star, Smartphone, BookOpen } from 'lucide-react';

const MobileFooter = () => {
  return (
    <footer className="relative z-10 bg-gray-900 border-t border-gray-700 p-4 text-center">
      <div className="flex justify-center items-center space-x-4 mb-2">
        <Star className="w-4 h-4 text-yellow-400" />
        <span className="text-sm text-gray-300">Scale of the Solar System</span>
        <Star className="w-4 h-4 text-yellow-400" />
      </div>
      
      <p className="text-xs text-gray-400 mb-2">
        Chemistry & Earth and Space Science - Project by Samuel Snow
      </p>
      
      <div className="flex justify-center items-center space-x-2 text-xs text-gray-500">
        <Smartphone className="w-3 h-3" />
        <span>Mobile Optimized Experience</span>
        <BookOpen className="w-3 h-3" />
      </div>
    </footer>
  );
};

export default MobileFooter;
