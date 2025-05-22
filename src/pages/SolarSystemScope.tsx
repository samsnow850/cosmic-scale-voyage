
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const SolarSystemScope = () => {
  const navigate = useNavigate();
  
  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <div className="w-full max-w-6xl relative">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
          Interactive 3D Solar System
        </h1>
        
        <Button 
          onClick={handleClose}
          variant="outline" 
          size="icon"
          className="absolute top-0 right-0 bg-black/50 border-gray-700 hover:bg-black/80 text-white"
          aria-label="Close and return to homepage"
        >
          <X />
        </Button>
      </div>
      
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
        
        <Button 
          onClick={handleClose}
          variant="outline" 
          className="mt-4 border-gray-700 hover:bg-black/80 text-white"
        >
          Return to Homepage
        </Button>
      </div>
    </div>
  );
};

export default SolarSystemScope;
