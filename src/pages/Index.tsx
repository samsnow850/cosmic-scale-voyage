
import React, { useState, useRef, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import Planet from '../components/Planet';
import PlanetOverlay from '../components/PlanetOverlay';

interface PlanetData {
  name: string;
  realDiameter: number;
  scaledSize: number;
  distanceAU: number;
  distanceInches: number;
  color: string;
  description: string;
  funFact: string;
}

const Index = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [scaleMultiplier, setScaleMultiplier] = useState<number>(1);
  const [activePlanet, setActivePlanet] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const planetsData: PlanetData[] = [
    {
      name: 'Mercury',
      realDiameter: 4879,
      scaledSize: 0.2,
      distanceAU: 3.9,
      distanceInches: 39,
      color: 'linear-gradient(135deg, #8C7853 0%, #FAD643 100%)',
      description: 'The smallest planet and closest to the Sun. Mercury has extreme temperature variations and no atmosphere.',
      funFact: 'A day on Mercury lasts 176 Earth days!'
    },
    {
      name: 'Venus',
      realDiameter: 12104,
      scaledSize: 0.5,
      distanceAU: 7.2,
      distanceInches: 72,
      color: 'linear-gradient(135deg, #FFC649 0%, #FFB347 100%)',
      description: 'The hottest planet in our solar system with a thick, toxic atmosphere of carbon dioxide.',
      funFact: 'Venus spins in the opposite direction of most planets.'
    },
    {
      name: 'Earth',
      realDiameter: 12742,
      scaledSize: 0.5,
      distanceAU: 10,
      distanceInches: 100,
      color: 'linear-gradient(135deg, #6B93D6 0%, #4D79A4 100%)',
      description: 'Our home planet, the only known planet to harbor life. Earth has liquid water and a protective atmosphere.',
      funFact: 'Earth is the only planet not named after a god.'
    },
    {
      name: 'Mars',
      realDiameter: 6779,
      scaledSize: 0.3,
      distanceAU: 15.2,
      distanceInches: 152,
      color: 'linear-gradient(135deg, #CD5C5C 0%, #A0522D 100%)',
      description: 'The "Red Planet" with the largest volcano and canyon in the solar system. Mars may have had liquid water in the past.',
      funFact: 'Mars has the largest dust storms in the solar system.'
    },
    {
      name: 'Jupiter',
      realDiameter: 139820,
      scaledSize: 5.5,
      distanceAU: 52,
      distanceInches: 520,
      color: 'linear-gradient(135deg, #D8CA9D 0%, #FAD5A5 50%, #8B4513 100%)',
      description: 'The largest planet in our solar system. Jupiter is a gas giant with over 80 moons and a Great Red Spot storm.',
      funFact: 'Jupiter\'s Great Red Spot has been raging for over 400 years!'
    },
    {
      name: 'Saturn',
      realDiameter: 116460,
      scaledSize: 4.6,
      distanceAU: 95,
      distanceInches: 950,
      color: 'linear-gradient(135deg, #FAD5A5 0%, #D2B48C 100%)',
      description: 'Famous for its beautiful ring system. Saturn is a gas giant that could float in water due to its low density.',
      funFact: 'Saturn\'s rings are made of billions of ice particles.'
    },
    {
      name: 'Uranus',
      realDiameter: 50724,
      scaledSize: 2.0,
      distanceAU: 192,
      distanceInches: 1920,
      color: 'linear-gradient(135deg, #4FD0E7 0%, #3F8FBF 100%)',
      description: 'An ice giant that rotates on its side. Uranus has a faint ring system and 27 known moons.',
      funFact: 'Uranus rotates on its side like a rolling ball.'
    },
    {
      name: 'Neptune',
      realDiameter: 49244,
      scaledSize: 2.0,
      distanceAU: 301,
      distanceInches: 3010,
      color: 'linear-gradient(135deg, #4B70DD 0%, #1E3A8A 100%)',
      description: 'The windiest planet with speeds up to 2,100 km/h. Neptune is the furthest planet from the Sun.',
      funFact: 'Neptune was discovered by mathematical predictions!'
    }
  ];

  // Detect which planet is in view
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollPos = scrollContainerRef.current.scrollLeft;
        const viewportWidth = scrollContainerRef.current.clientWidth;
        const centerPos = scrollPos + (viewportWidth / 2);
        
        // Find the planet closest to the center
        let closestPlanet = null;
        let minDistance = Infinity;
        
        planetsData.forEach(planet => {
          const planetPos = getPosition(planet.distanceInches) * scaleMultiplier;
          const distance = Math.abs(planetPos - centerPos);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestPlanet = planet.name;
          }
        });
        
        setActivePlanet(closestPlanet);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [planetsData, scaleMultiplier]);

  // Convert inches to pixels for positioning (1 inch = 4 pixels for horizontal scrolling)
  const getPosition = (distanceInches: number) => {
    return 200 + (distanceInches * 4 * scaleMultiplier); // Start 200px from left, then scale distances
  };

  const totalWidth = getPosition(3010) + 400; // Neptune's position + extra space

  // Handle scale slider change
  const handleScaleChange = (value: number[]) => {
    setScaleMultiplier(value[0]);
  };

  return (
    <div className="min-h-screen bg-black overflow-auto">
      {/* Stars background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(2px 2px at 20px 30px, white, transparent),
            radial-gradient(2px 2px at 40px 70px, white, transparent),
            radial-gradient(1px 1px at 90px 40px, white, transparent),
            radial-gradient(1px 1px at 130px 80px, white, transparent),
            radial-gradient(2px 2px at 160px 30px, white, transparent),
            radial-gradient(1px 1px at 200px 60px, white, transparent),
            radial-gradient(2px 2px at 240px 90px, white, transparent),
            radial-gradient(1px 1px at 280px 20px, white, transparent),
            radial-gradient(1px 1px at 320px 70px, white, transparent),
            radial-gradient(2px 2px at 360px 40px, white, transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 100px'
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 p-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Scale of the Solar System
        </h1>
        <p className="text-xl text-gray-300 mb-1">Interactive Mini-Project</p>
        <p className="text-lg text-gray-400 mb-4">By Samuel Snow • Chemistry & Earth and Space Science - C</p>
        <p className="text-sm text-gray-500 mb-6">Click on any planet to explore its details • 1 AU = 10 inches</p>
      </div>

      {/* Scale Slider */}
      <div className="relative z-10 max-w-md mx-auto mb-6 px-6">
        <div className="flex items-center mb-2">
          <span className="text-gray-400 text-sm mr-2">Compress</span>
          <Slider 
            defaultValue={[1]} 
            min={0.1} 
            max={1} 
            step={0.05}
            onValueChange={handleScaleChange}
            className="mx-2"
          />
          <span className="text-gray-400 text-sm ml-2">Actual Scale</span>
        </div>
        <p className="text-xs text-center text-gray-500">
          Adjust this slider to visualize compressed distances while preserving relative scales
        </p>
      </div>

      {/* Solar System Container */}
      <div ref={scrollContainerRef} className="relative z-10 h-96 overflow-x-auto overflow-y-hidden">
        <div 
          className="relative h-full"
          style={{ width: `${totalWidth}px` }}
        >
          {/* Sun */}
          <div className="absolute left-16 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
            <div 
              className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 shadow-2xl animate-pulse"
              style={{
                boxShadow: '0 0 60px rgba(255, 165, 0, 0.8)'
              }}
            />
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-white text-lg font-bold">
              Sun
            </div>
          </div>

          {/* Planets */}
          {planetsData.map((planet) => (
            <Planet
              key={planet.name}
              name={planet.name}
              realDiameter={planet.realDiameter}
              scaledSize={planet.scaledSize}
              distanceAU={planet.distanceAU}
              distanceInches={planet.distanceInches}
              color={planet.color}
              position={getPosition(planet.distanceInches)}
              onClick={() => setSelectedPlanet(planet)}
              funFact={planet.funFact}
            />
          ))}

          {/* Distance markers */}
          <div className="absolute bottom-4 left-0 right-0 flex items-center text-gray-500 text-xs">
            {[100, 500, 1000, 2000, 3000].map((distance) => (
              <div
                key={distance}
                className="absolute transform -translate-x-1/2"
                style={{ left: `${getPosition(distance)}px` }}
              >
                <div className="w-px h-4 bg-gray-600 mb-1" />
                <span>{distance}″</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mini-map */}
      <div className="fixed bottom-4 right-4 z-20 bg-gray-900 bg-opacity-80 border border-gray-700 rounded-lg p-3 w-64">
        <h3 className="text-white text-sm font-semibold mb-2">Solar System Overview</h3>
        <div className="relative h-8 bg-gray-800 rounded overflow-hidden">
          {planetsData.map(planet => (
            <div 
              key={planet.name}
              className={`absolute h-full w-1 transition-all duration-300 ${planet.name === activePlanet ? 'bg-blue-500' : 'bg-gray-600'}`}
              style={{ 
                left: `${(planet.distanceInches / 3010) * 100}%`,
                transform: 'translateX(-50%)'
              }}
              title={planet.name}
            />
          ))}
          <div 
            className="absolute top-full left-0 h-1 bg-white"
            style={{ 
              width: '100%',
              transform: `scaleX(${scrollContainerRef.current ? scrollContainerRef.current.scrollLeft / totalWidth : 0})`
            }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-400">
          <span>Sun</span>
          <span>Neptune (3010″)</span>
        </div>
        <div className="text-center text-xs text-blue-400 mt-1">
          {activePlanet && `Viewing: ${activePlanet}`}
        </div>
      </div>

      {/* Instructions */}
      <div className="relative z-10 p-6 text-center">
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          Scroll horizontally to explore the vast distances between planets. 
          This model demonstrates the true scale of our solar system - notice how much empty space exists between the planets!
        </p>
      </div>

      {/* Planet Overlay */}
      <PlanetOverlay 
        planet={selectedPlanet} 
        onClose={() => setSelectedPlanet(null)} 
      />
    </div>
  );
};

export default Index;
