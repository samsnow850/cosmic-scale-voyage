import React from 'react';
import { X, Thermometer, Moon, Clock, Rocket, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface PlanetData {
  name: string;
  realDiameter: number;
  scaledSize: number;
  distanceAU: number;
  distanceInches: number;
  color: string;
  description: string;
  funFact: string;
  orbitalPeriod: number;
  dayLength: number;
  minTemp: number;
  maxTemp: number;
  moons: number;
  travelTime: string;
  lightTime: string;
}
interface PlanetOverlayProps {
  planet: PlanetData | null;
  onClose: () => void;
  onAddToComparison: (planet: PlanetData) => void;
}
const PlanetOverlay: React.FC<PlanetOverlayProps> = ({
  planet,
  onClose,
  onAddToComparison
}) => {
  if (!planet) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-2xl w-full mx-4 relative animate-scale-in max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200">
          <X size={24} />
        </button>
        
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 rounded-full mr-4 shadow-lg" style={{
          background: planet.color,
          boxShadow: `0 0 20px ${planet.color}40`
        }} />
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{planet.name}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-400 mb-3">Basic Information</h3>
            
            <div className="space-y-2 text-gray-300">
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

              <div className="flex items-center">
                <Moon className="w-4 h-4 text-blue-400 mr-2" />
                <span className="font-semibold text-blue-400">Moons:</span>
                <span className="ml-2">{planet.moons}</span>
              </div>
            </div>
          </div>

          {/* Time and Motion */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-400 mb-3">Time & Motion</h3>
            
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-green-400 mr-2" />
                <span className="font-semibold text-green-400">Orbital Period:</span>
                <span className="ml-2">{planet.orbitalPeriod.toLocaleString()} Earth days</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-green-400 mr-2" />
                <span className="font-semibold text-green-400">Day Length:</span>
                <span className="ml-2">{planet.dayLength} Earth hours</span>
              </div>
            </div>
          </div>

          {/* Temperature */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-red-400 mb-3">Climate</h3>
            
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center">
                <Thermometer className="w-4 h-4 text-red-400 mr-2" />
                <span className="font-semibold text-red-400">Temperature Range:</span>
              </div>
              <div className="ml-6 space-y-1">
                <div>Min: {planet.minTemp}°C</div>
                <div>Max: {planet.maxTemp}°C</div>
              </div>
            </div>
          </div>

          {/* Travel Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-400 mb-3">Space Travel</h3>
            
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center">
                <Rocket className="w-4 h-4 text-purple-400 mr-2" />
                <span className="font-semibold text-purple-400">Spacecraft Travel Time:</span>
                <span className="ml-2">{planet.travelTime}</span>
              </div>
              
              <div className="flex items-center">
                <Zap className="w-4 h-4 text-purple-400 mr-2" />
                <span className="font-semibold text-purple-400">Light Travel Time:</span>
                <span className="ml-2">{planet.lightTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description and Fun Fact */}
        <div className="mt-6 pt-6 border-t border-gray-700 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{planet.description}</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">Fun Fact</h3>
            <p className="text-gray-300 text-sm leading-relaxed italic">{planet.funFact}</p>
          </div>
        </div>
      </div>
    </div>;
};
export default PlanetOverlay;
