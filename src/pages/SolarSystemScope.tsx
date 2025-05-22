
import React from 'react';

const SolarSystemScope = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
        Interactive 3D Solar System
      </h1>
      
      <div className="w-full max-w-6xl aspect-video">
        <iframe 
          src="https://www.solarsystemscope.com/iframe" 
          className="w-full h-full min-h-[400px] border-2 border-[#0f5c6e] rounded-lg"
          title="Solar System Scope"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-gray-400 max-w-xl mx-auto">
          Explore our solar system in interactive 3D, courtesy of SolarSystemScope.com
        </p>
      </div>
    </div>
  );
};

export default SolarSystemScope;
