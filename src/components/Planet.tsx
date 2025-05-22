
import React from 'react';

interface PlanetProps {
  name: string;
  realDiameter: number;
  scaledSize: number;
  distanceAU: number;
  distanceInches: number;
  color: string;
  position: number;
  onClick: () => void;
}

const Planet: React.FC<PlanetProps> = ({
  name,
  scaledSize,
  color,
  position,
  onClick,
}) => {
  // Convert scaled size from inches to pixels (1 inch = 24 pixels for better visibility)
  const sizeInPixels = Math.max(scaledSize * 24, 8); // Minimum 8px for visibility

  return (
    <div
      className="absolute flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-125 hover:z-10 group"
      style={{
        left: `${position}px`,
        top: '50%',
        transform: 'translateY(-50%)',
      }}
      onClick={onClick}
    >
      <div
        className="rounded-full shadow-lg transition-all duration-300 group-hover:shadow-2xl"
        style={{
          width: `${sizeInPixels}px`,
          height: `${sizeInPixels}px`,
          background: color,
          boxShadow: `0 0 ${sizeInPixels * 0.5}px ${color}40`,
        }}
      />
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {name}
      </div>
    </div>
  );
};

export default Planet;
