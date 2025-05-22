
import React from 'react';
import { X } from 'lucide-react';

interface PlanetData {
  name: string;
  realDiameter: number;
  scaledSize: number;
  distanceAU: number;
  distanceInches: number;
  color: string;
  description: string;
}

interface PlanetOverlayProps {
  planet: PlanetData | null;
  onClose: () => void;
}

const PlanetOverlay: React.FC<PlanetOverlayProps> = ({ planet, onClose }) => {
  if (!planet) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full mx-4 relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <X size={24} />
        </button>
        
        <div className="flex items-center mb-4">
          <div
            className="w-16 h-16 rounded-full mr-4 shadow-lg"
            style={{
              background: planet.color,
              boxShadow: `0 0 20px ${planet.color}40`,
            }}
          />
          <h2 className="text-2xl font-bold text-white">{planet.name}</h2>
        </div>

        <div className="space-y-3 text-gray-300">
          <div>
            <span className="font-semibold text-blue-400">Real Diameter:</span>
            <span className="ml-2">{planet.realDiameter.toLocaleString()} km</span>
          </div>
          
          <div>
            <span className="font-semibold text-blue-400">Scaled Diameter:</span>
            <span className="ml-2">{planet.scaledSize}″</span>
          </div>
          
          <div>
            <span className="font-semibold text-blue-400">Distance from Sun:</span>
            <span className="ml-2">{planet.distanceAU} AU ({planet.distanceInches}″)</span>
          </div>

          <div className="pt-3 border-t border-gray-700">
            <p className="text-sm leading-relaxed">{planet.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetOverlay;
