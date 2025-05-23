
import React, { useState, useRef, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Play, Pause, RotateCcw, Zap, Rocket, Eye, EyeOff } from 'lucide-react';
import Planet from '../components/Planet';
import PlanetOverlay from '../components/PlanetOverlay';
import ComparisonPanel from '../components/ComparisonPanel';
import InfoPanel from '../components/InfoPanel';
import AsteroidBelt from '../components/AsteroidBelt';
import OrbitalPaths from '../components/OrbitalPaths';
import { Link } from 'react-router-dom';

interface PlanetData {
  name: string;
  realDiameter: number;
  scaledSize: number;
  distanceAU: number;
  distanceInches: number;
  color: string;
  description: string;
  funFact: string;
  orbitalPeriod: number; // in Earth days
  dayLength: number; // in Earth hours
  minTemp: number; // in Celsius
  maxTemp: number; // in Celsius
  moons: number;
  travelTime: string; // spacecraft travel time
  lightTime: string; // light travel time from Earth
}

const Index = () => {
  // Planet data with all the information
  const planetsData: PlanetData[] = [
    {
      name: 'Mercury',
      realDiameter: 4879,
      scaledSize: 0.019,
      distanceAU: 0.39,
      distanceInches: 39.0,
      color: 'linear-gradient(45deg, #8C7853 0%, #D4AF37 50%, #8C7853 100%)',
      description: 'The smallest planet in our solar system and nearest to the Sun, Mercury is only slightly larger than Earth\'s Moon.',
      funFact: 'A year on Mercury takes only 88 Earth days, but a day on Mercury lasts 176 Earth days!',
      orbitalPeriod: 88,
      dayLength: 4222.6,
      minTemp: -173,
      maxTemp: 427,
      moons: 0,
      travelTime: '6-7 months',
      lightTime: '3.2 minutes'
    },
    {
      name: 'Venus',
      realDiameter: 12104,
      scaledSize: 0.047,
      distanceAU: 0.72,
      distanceInches: 72.0,
      color: 'linear-gradient(45deg, #FFC649 0%, #FF8C00 50%, #FFA500 100%)',
      description: 'Venus is the second planet from the Sun and is Earth\'s closest planetary neighbor.',
      funFact: 'Venus rotates backwards and has the hottest surface temperature of any planet in our solar system!',
      orbitalPeriod: 225,
      dayLength: 5832.5,
      minTemp: 462,
      maxTemp: 462,
      moons: 0,
      travelTime: '9 months',
      lightTime: '6 minutes'
    },
    {
      name: 'Earth',
      realDiameter: 12756,
      scaledSize: 0.050,
      distanceAU: 1.0,
      distanceInches: 100.0,
      color: 'linear-gradient(45deg, #6B93D6 0%, #4CAF50 30%, #87CEEB 70%, #4169E1 100%)',
      description: 'Our home planet is the third planet from the Sun, and the only place we know of so far that\'s inhabited by living things.',
      funFact: 'Earth is the only planet in our solar system known to harbor life!',
      orbitalPeriod: 365,
      dayLength: 24,
      minTemp: -89,
      maxTemp: 58,
      moons: 1,
      travelTime: 'You are here!',
      lightTime: '8.3 minutes from Sun'
    },
    {
      name: 'Mars',
      realDiameter: 6792,
      scaledSize: 0.027,
      distanceAU: 1.52,
      distanceInches: 152.0,
      color: 'linear-gradient(45deg, #CD5C5C 0%, #FF4500 50%, #B22222 100%)',
      description: 'Mars is the fourth planet from the Sun – a dusty, cold, desert world with a very thin atmosphere.',
      funFact: 'Mars has the largest volcano in the solar system, Olympus Mons, which is about 13.6 miles high!',
      orbitalPeriod: 687,
      dayLength: 24.6,
      minTemp: -87,
      maxTemp: -5,
      moons: 2,
      travelTime: '6-9 months',
      lightTime: '12.7 minutes'
    },
    {
      name: 'Jupiter',
      realDiameter: 142984,
      scaledSize: 0.561,
      distanceAU: 5.2,
      distanceInches: 520.0,
      color: 'linear-gradient(45deg, #D2691E 0%, #CD853F 30%, #F4A460 70%, #DEB887 100%)',
      description: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System.',
      funFact: 'Jupiter has more than double the mass of all the other planets combined!',
      orbitalPeriod: 4333,
      dayLength: 9.9,
      minTemp: -108,
      maxTemp: -108,
      moons: 95,
      travelTime: '13 months - 6 years',
      lightTime: '43.3 minutes'
    },
    {
      name: 'Saturn',
      realDiameter: 120536,
      scaledSize: 0.473,
      distanceAU: 9.5,
      distanceInches: 950.0,
      color: 'linear-gradient(45deg, #FAD5A5 0%, #FFDB58 50%, #F0E68C 100%)',
      description: 'Saturn is the sixth planet from the Sun and the second largest planet in our solar system.',
      funFact: 'Saturn is less dense than water – it would float in a bathtub if you could find one big enough!',
      orbitalPeriod: 10759,
      dayLength: 10.7,
      minTemp: -139,
      maxTemp: -139,
      moons: 146,
      travelTime: '6-7 years',
      lightTime: '79.3 minutes'
    },
    {
      name: 'Uranus',
      realDiameter: 51118,
      scaledSize: 0.201,
      distanceAU: 19.2,
      distanceInches: 1920.0,
      color: 'linear-gradient(45deg, #4FD0E7 0%, #00CED1 50%, #40E0D0 100%)',
      description: 'Uranus is the seventh planet from the Sun and has the third-largest planetary radius in our solar system.',
      funFact: 'Uranus rotates on its side! Its axis of rotation is tilted sideways at almost 90 degrees.',
      orbitalPeriod: 30687,
      dayLength: 17.2,
      minTemp: -197,
      maxTemp: -197,
      moons: 27,
      travelTime: '8.5-9.5 years',
      lightTime: '2.7 hours'
    },
    {
      name: 'Neptune',
      realDiameter: 49528,
      scaledSize: 0.194,
      distanceAU: 30.1,
      distanceInches: 3010.0,
      color: 'linear-gradient(45deg, #4169E1 0%, #0000FF 50%, #191970 100%)',
      description: 'Neptune is the eighth and outermost planet in our solar system.',
      funFact: 'Neptune has the strongest winds in the solar system, reaching speeds of up to 1,200 mph!',
      orbitalPeriod: 60190,
      dayLength: 16.1,
      minTemp: -201,
      maxTemp: -201,
      moons: 16,
      travelTime: '12 years',
      lightTime: '4.2 hours'
    }
  ];

  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [scaleMultiplier, setScaleMultiplier] = useState<number>(1);
  const [activePlanet, setActivePlanet] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const [timeSpeed, setTimeSpeed] = useState<number>(1);
  const [comparisonPlanets, setComparisonPlanets] = useState<PlanetData[]>([]);
  const [showOrbitalPaths, setShowOrbitalPaths] = useState<boolean>(true);
  const [showSizeComparison, setShowSizeComparison] = useState<boolean>(false);
  const [showLightVisualization, setShowLightVisualization] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const filteredPlanets = planetsData.filter(planet =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const jumpToPlanet = (planetName: string) => {
    const planet = planetsData.find(p => p.name === planetName);
    if (planet && scrollContainerRef.current) {
      const planetPosition = getPosition(planet.distanceInches);
      scrollContainerRef.current.scrollTo({
        left: planetPosition - window.innerWidth / 2,
        behavior: 'smooth'
      });
    }
  };

  const addToComparison = (planet: PlanetData) => {
    if (comparisonPlanets.length < 2 && !comparisonPlanets.find(p => p.name === planet.name)) {
      setComparisonPlanets([...comparisonPlanets, planet]);
    }
  };

  const removeFromComparison = (planetName: string) => {
    setComparisonPlanets(comparisonPlanets.filter(p => p.name !== planetName));
  };

  const playPlanetSound = (planetName: string) => {
    // Simple audio feedback using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Different frequencies for different planets
    const frequencies: { [key: string]: number } = {
      'Mercury': 523.25, 'Venus': 587.33, 'Earth': 659.25, 'Mars': 698.46,
      'Jupiter': 261.63, 'Saturn': 293.66, 'Uranus': 329.63, 'Neptune': 349.23
    };
    
    oscillator.frequency.setValueAtTime(frequencies[planetName] || 440, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  return (
    <div className="min-h-screen bg-black overflow-auto">
      {/* Enhanced Stars background */}
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
            radial-gradient(2px 2px at 360px 40px, white, transparent),
            radial-gradient(3px 3px at 100px 120px, #FFD700, transparent),
            radial-gradient(2px 2px at 300px 150px, #87CEEB, transparent),
            radial-gradient(1px 1px at 500px 80px, #FFA500, transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '600px 200px'
        }} />
      </div>

      {/* Header with navigation */}
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-center flex-1">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Scale of the Solar System
            </h1>
            <p className="text-xl text-gray-300 mb-1">Interactive Mini-Project</p>
            <p className="text-lg text-gray-400 mb-4">By Samuel Snow • Chemistry & Earth and Space Science - C</p>
          </div>
          <div className="flex gap-2">
            <Link to="/quiz">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                Quiz Mode
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search planets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-600 text-white w-48"
            />
          </div>
          
          <Button
            onClick={() => setIsAnimating(!isAnimating)}
            variant="outline"
            size="sm"
            className="text-white border-white"
          >
            {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          
          <Button
            onClick={() => setShowOrbitalPaths(!showOrbitalPaths)}
            variant="outline"
            size="sm"
            className="text-white border-white"
          >
            {showOrbitalPaths ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            Orbits
          </Button>
          
          <Button
            onClick={() => setShowLightVisualization(!showLightVisualization)}
            variant="outline"
            size="sm"
            className="text-white border-white"
          >
            <Zap className="w-4 h-4" />
            Light Speed
          </Button>
          
          <Button
            onClick={() => setShowSizeComparison(!showSizeComparison)}
            variant="outline"
            size="sm"
            className="text-white border-white"
          >
            Size Mode
          </Button>
        </div>

        {/* Search Results */}
        {searchTerm && (
          <div className="max-w-md mx-auto mb-4">
            <div className="bg-gray-800 rounded-lg p-2">
              {filteredPlanets.map(planet => (
                <button
                  key={planet.name}
                  onClick={() => jumpToPlanet(planet.name)}
                  className="w-full text-left p-2 hover:bg-gray-700 rounded text-white"
                >
                  {planet.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scale Slider */}
        <div className="max-w-md mx-auto mb-6">
          <div className="flex items-center mb-2">
            <span className="text-gray-400 text-sm mr-2">Compress</span>
            <Slider 
              defaultValue={[1]} 
              min={0.1} 
              max={1} 
              step={0.05}
              onValueChange={(value) => setScaleMultiplier(value[0])}
              className="mx-2"
            />
            <span className="text-gray-400 text-sm ml-2">Actual Scale</span>
          </div>
          <p className="text-xs text-center text-gray-500">
            Adjust this slider to visualize compressed distances while preserving relative scales
          </p>
        </div>
      </div>

      {/* Solar System Container */}
      <div ref={scrollContainerRef} className="relative z-10 h-96 overflow-x-auto overflow-y-hidden">
        <div 
          className="relative h-full"
          style={{ width: `${getPosition(3010) + 400}px` }}
        >
          {/* Orbital Paths */}
          {showOrbitalPaths && <OrbitalPaths planetsData={planetsData} getPosition={getPosition} />}

          {/* Sun */}
          <div className="absolute left-16 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
            <div 
              className="w-48 h-48 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 shadow-2xl"
              style={{
                boxShadow: '0 0 80px rgba(255, 165, 0, 0.8)'
              }}
            />
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white text-lg font-bold">
              Sun
            </div>
          </div>

          {/* Asteroid Belt */}
          <AsteroidBelt getPosition={getPosition} scaleMultiplier={scaleMultiplier} />

          {/* Planets */}
          {planetsData.map((planet) => (
            <Planet
              key={planet.name}
              {...planet}
              position={getPosition(planet.distanceInches)}
              onClick={() => {
                setSelectedPlanet(planet);
                playPlanetSound(planet.name);
              }}
              onAddToComparison={() => addToComparison(planet)}
              isAnimating={isAnimating}
              timeSpeed={timeSpeed}
              showSizeComparison={showSizeComparison}
              showLightVisualization={showLightVisualization}
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

      {/* Info Panel */}
      <InfoPanel activePlanet={activePlanet} planetsData={planetsData} />

      {/* Instructions */}
      <div className="relative z-10 p-6 text-center">
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          Scroll horizontally to explore the vast distances between planets. 
          Click planets for details, use search to jump to specific planets, and try the quiz mode!
        </p>
      </div>

      {/* Planet Overlay */}
      <PlanetOverlay 
        planet={selectedPlanet} 
        onClose={() => setSelectedPlanet(null)}
        onAddToComparison={addToComparison}
      />

      {/* Comparison Panel */}
      {comparisonPlanets.length > 0 && (
        <ComparisonPanel
          planets={comparisonPlanets}
          onRemove={removeFromComparison}
          onClose={() => setComparisonPlanets([])}
        />
      )}
    </div>
  );
};

export default Index;
