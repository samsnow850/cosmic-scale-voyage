
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

interface ComparisonPanelProps {
  planets: PlanetData[];
  onRemove: (planetName: string) => void;
  onClose: () => void;
}

const ComparisonPanel: React.FC<ComparisonPanelProps> = ({ planets, onRemove, onClose }) => {
  if (planets.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-gray-900 border border-gray-700 rounded-xl p-4 z-40 max-h-64 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Planet Comparison</h3>
        <Button onClick={onClose} size="sm" variant="ghost" className="text-gray-400 hover:text-white">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {planets.map((planet) => (
          <div key={planet.name} className="bg-gray-800 rounded-lg p-3 relative">
            <button
              onClick={() => onRemove(planet.name)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>

            <div className="flex items-center mb-3">
              <div
                className="w-8 h-8 rounded-full mr-2"
                style={{ background: planet.color }}
              />
              <h4 className="font-semibold text-white">{planet.name}</h4>
            </div>

            <div className="text-xs text-gray-300 space-y-1">
              <div>Diameter: {planet.realDiameter.toLocaleString()} km</div>
              <div>Distance: {planet.distanceAU} AU</div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Orbit: {planet.orbitalPeriod} days
              </div>
              <div className="flex items-center">
                <Thermometer className="w-3 h-3 mr-1" />
                {planet.minTemp}°C to {planet.maxTemp}°C
              </div>
              <div className="flex items-center">
                <Moon className="w-3 h-3 mr-1" />
                {planet.moons} moons
              </div>
              <div className="flex items-center">
                <Rocket className="w-3 h-3 mr-1" />
                {planet.travelTime}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonPanel;
