
import React from 'react';

interface PlanetData {
  name: string;
  distanceInches: number;
}

interface OrbitalPathsProps {
  planetsData: PlanetData[];
  getPosition: (distance: number) => number;
}

const OrbitalPaths: React.FC<OrbitalPathsProps> = ({ planetsData, getPosition }) => {
  return (
    <div className="absolute top-1/2 left-16 transform -translate-y-1/2">
      {planetsData.map((planet) => {
        const radius = getPosition(planet.distanceInches) - 200; // Subtract sun position offset
        
        return (
          <div
            key={planet.name}
            className="absolute border border-gray-700 border-opacity-30 rounded-full"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`,
              left: `-${radius}px`,
              top: `-${radius}px`,
              borderStyle: 'dashed',
            }}
          />
        );
      })}
    </div>
  );
};

export default OrbitalPaths;
