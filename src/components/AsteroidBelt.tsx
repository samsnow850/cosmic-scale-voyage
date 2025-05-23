
import React from 'react';

interface AsteroidBeltProps {
  getPosition: (distance: number) => number;
  scaleMultiplier: number;
}

const AsteroidBelt: React.FC<AsteroidBeltProps> = ({ getPosition, scaleMultiplier }) => {
  // Asteroid belt is roughly between 2.2 and 3.2 AU (Mars at 1.52, Jupiter at 5.2)
  const startPosition = getPosition(220); // 2.2 AU = 220 inches
  const endPosition = getPosition(320); // 3.2 AU = 320 inches
  const width = endPosition - startPosition;

  // Generate random asteroid positions
  const asteroids = Array.from({ length: Math.max(20, Math.floor(width / 20)) }, (_, i) => ({
    id: i,
    x: startPosition + (Math.random() * width),
    y: Math.random() * 100 - 50, // Random vertical offset
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.5 + 0.3,
  }));

  return (
    <div className="absolute top-1/2 transform -translate-y-1/2">
      {/* Belt background */}
      <div
        className="absolute h-20 bg-gradient-to-r from-transparent via-gray-600 to-transparent opacity-10"
        style={{
          left: `${startPosition}px`,
          width: `${width}px`,
          top: '-10px',
        }}
      />
      
      {/* Individual asteroids */}
      {asteroids.map((asteroid) => (
        <div
          key={asteroid.id}
          className="absolute rounded-full bg-gray-400"
          style={{
            left: `${asteroid.x}px`,
            top: `${asteroid.y}px`,
            width: `${asteroid.size}px`,
            height: `${asteroid.size}px`,
            opacity: asteroid.opacity,
          }}
        />
      ))}
      
      {/* Belt label */}
      <div
        className="absolute text-gray-400 text-xs whitespace-nowrap"
        style={{
          left: `${startPosition + width / 2}px`,
          top: '30px',
          transform: 'translateX(-50%)',
        }}
      >
        Asteroid Belt
      </div>
    </div>
  );
};

export default AsteroidBelt;
