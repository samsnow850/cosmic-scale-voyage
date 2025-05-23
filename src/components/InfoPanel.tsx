
import React from 'react';

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

interface InfoPanelProps {
  activePlanet: string | null;
  planetsData: PlanetData[];
}

const InfoPanel: React.FC<InfoPanelProps> = ({ activePlanet, planetsData }) => {
  const planet = planetsData.find(p => p.name === activePlanet);

  if (!planet) return null;

  return (
    <div className="fixed top-20 right-4 bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg p-4 z-30 max-w-xs">
      <h3 className="text-lg font-semibold text-white mb-2">{planet.name}</h3>
      <div className="text-sm text-gray-300 space-y-1">
        <div>Distance: {planet.distanceAU} AU</div>
        <div>Orbit: {planet.orbitalPeriod} days</div>
        <div>Day: {planet.dayLength}h</div>
        <div>Moons: {planet.moons}</div>
        <div>Travel: {planet.travelTime}</div>
      </div>
    </div>
  );
};

export default InfoPanel;
