
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, Home, Menu, X, Star, BookOpen, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import MobileNavbar from '../components/MobileNavbar';
import MobileFooter from '../components/MobileFooter';

interface PlanetData {
  name: string;
  realDiameter: number;
  scaledSize: number;
  distanceAU: number;
  color: string;
  description: string;
  funFact: string;
  orbitalPeriod: number;
  dayLength: number;
  minTemp: number;
  maxTemp: number;
  moons: number;
}

const Mobile = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  const planetsData: PlanetData[] = [
    {
      name: 'Mercury',
      realDiameter: 4879,
      scaledSize: 0.019,
      distanceAU: 0.39,
      color: 'linear-gradient(45deg, #8C7853 0%, #D4AF37 50%, #8C7853 100%)',
      description: 'The smallest planet in our solar system and nearest to the Sun.',
      funFact: 'A year on Mercury takes only 88 Earth days, but a day lasts 176 Earth days!',
      orbitalPeriod: 88,
      dayLength: 4222.6,
      minTemp: -173,
      maxTemp: 427,
      moons: 0,
    },
    {
      name: 'Venus',
      realDiameter: 12104,
      scaledSize: 0.047,
      distanceAU: 0.72,
      color: 'linear-gradient(45deg, #FFC649 0%, #FF8C00 50%, #FFA500 100%)',
      description: 'Venus is the second planet from the Sun and Earth\'s closest neighbor.',
      funFact: 'Venus rotates backwards and has the hottest surface temperature!',
      orbitalPeriod: 225,
      dayLength: 5832.5,
      minTemp: 462,
      maxTemp: 462,
      moons: 0,
    },
    {
      name: 'Earth',
      realDiameter: 12756,
      scaledSize: 0.050,
      distanceAU: 1.0,
      color: 'linear-gradient(45deg, #6B93D6 0%, #4CAF50 30%, #87CEEB 70%, #4169E1 100%)',
      description: 'Our home planet, the only place we know of that\'s inhabited by living things.',
      funFact: 'Earth is the only planet in our solar system known to harbor life!',
      orbitalPeriod: 365,
      dayLength: 24,
      minTemp: -89,
      maxTemp: 58,
      moons: 1,
    },
    {
      name: 'Mars',
      realDiameter: 6792,
      scaledSize: 0.027,
      distanceAU: 1.52,
      color: 'linear-gradient(45deg, #CD5C5C 0%, #FF4500 50%, #B22222 100%)',
      description: 'Mars is the fourth planet from the Sun – a dusty, cold, desert world.',
      funFact: 'Mars has the largest volcano in the solar system, Olympus Mons!',
      orbitalPeriod: 687,
      dayLength: 24.6,
      minTemp: -87,
      maxTemp: -5,
      moons: 2,
    },
    {
      name: 'Jupiter',
      realDiameter: 142984,
      scaledSize: 0.561,
      distanceAU: 5.2,
      color: 'linear-gradient(45deg, #D2691E 0%, #CD853F 30%, #F4A460 70%, #DEB887 100%)',
      description: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System.',
      funFact: 'Jupiter has more than double the mass of all other planets combined!',
      orbitalPeriod: 4333,
      dayLength: 9.9,
      minTemp: -108,
      maxTemp: -108,
      moons: 95,
    },
    {
      name: 'Saturn',
      realDiameter: 120536,
      scaledSize: 0.473,
      distanceAU: 9.5,
      color: 'linear-gradient(45deg, #FAD5A5 0%, #FFDB58 50%, #F0E68C 100%)',
      description: 'Saturn is the sixth planet from the Sun and the second largest planet.',
      funFact: 'Saturn is less dense than water – it would float in a bathtub!',
      orbitalPeriod: 10759,
      dayLength: 10.7,
      minTemp: -139,
      maxTemp: -139,
      moons: 146,
    },
    {
      name: 'Uranus',
      realDiameter: 51118,
      scaledSize: 0.201,
      distanceAU: 19.2,
      color: 'linear-gradient(45deg, #4FD0E7 0%, #00CED1 50%, #40E0D0 100%)',
      description: 'Uranus is the seventh planet from the Sun with the third-largest radius.',
      funFact: 'Uranus rotates on its side! Its axis is tilted sideways at almost 90 degrees.',
      orbitalPeriod: 30687,
      dayLength: 17.2,
      minTemp: -197,
      maxTemp: -197,
      moons: 27,
    },
    {
      name: 'Neptune',
      realDiameter: 49528,
      scaledSize: 0.194,
      distanceAU: 30.1,
      color: 'linear-gradient(45deg, #4169E1 0%, #0000FF 50%, #191970 100%)',
      description: 'Neptune is the eighth and outermost planet in our solar system.',
      funFact: 'Neptune has the strongest winds, reaching speeds of up to 1,200 mph!',
      orbitalPeriod: 60190,
      dayLength: 16.1,
      minTemp: -201,
      maxTemp: -201,
      moons: 16,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Stars background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(2px 2px at 20px 30px, white, transparent),
            radial-gradient(2px 2px at 40px 70px, white, transparent),
            radial-gradient(1px 1px at 90px 40px, white, transparent),
            radial-gradient(1px 1px at 130px 80px, white, transparent),
            radial-gradient(2px 2px at 160px 30px, white, transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 100px'
        }} />
      </div>

      <MobileNavbar />

      <main className="relative z-10 flex-1 p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Solar System Mobile
          </h1>
          <p className="text-sm text-gray-300 mb-1">Interactive Experience</p>
          <p className="text-xs text-gray-400 mb-4">By Samuel Snow</p>
        </div>

        {/* Controls */}
        <div className="flex justify-center mb-6">
          <Button 
            onClick={() => setIsAnimating(!isAnimating)} 
            className="bg-gray-800 border-gray-600 hover:bg-gray-700 text-white border-2"
            size="sm"
          >
            {isAnimating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isAnimating ? 'Pause' : 'Play'}
          </Button>
        </div>

        {/* Sun */}
        <div className="text-center mb-8">
          <div className="inline-block relative">
            <div 
              className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 shadow-2xl cursor-pointer transition-all duration-300 hover:scale-110 mx-auto mb-2" 
              style={{
                boxShadow: '0 0 40px rgba(255, 165, 0, 0.8)'
              }}
            />
            <p className="text-sm font-bold">Sun</p>
          </div>
        </div>

        {/* Planets Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {planetsData.map((planet) => (
            <Card 
              key={planet.name} 
              className="bg-gray-900 border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors"
              onClick={() => setSelectedPlanet(planet)}
            >
              <CardContent className="p-4 text-center">
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-3 shadow-lg"
                  style={{ background: planet.color }}
                />
                <h3 className="text-sm font-bold text-white mb-1">{planet.name}</h3>
                <p className="text-xs text-gray-400">
                  {planet.distanceAU} AU from Sun
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Link to="/mobile-quiz" className="block">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <BookOpen className="w-4 h-4 mr-2" />
              Take Mobile Quiz
            </Button>
          </Link>
          
          <Link to="/" className="block">
            <Button className="w-full bg-gray-800 border-gray-600 hover:bg-gray-700 text-white border-2">
              <Home className="w-4 h-4 mr-2" />
              Desktop Version
            </Button>
          </Link>
        </div>
      </main>

      {/* Planet Detail Modal */}
      {selectedPlanet && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <Card className="bg-gray-900 border-gray-700 max-w-sm w-full max-h-[80vh] overflow-y-auto">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white text-lg">{selectedPlanet.name}</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedPlanet(null)}
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-4 shadow-lg"
                style={{ background: selectedPlanet.color }}
              />
              
              <p className="text-gray-300 text-sm mb-4">{selectedPlanet.description}</p>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Distance:</span>
                  <span className="text-white">{selectedPlanet.distanceAU} AU</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Moons:</span>
                  <span className="text-white">{selectedPlanet.moons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Year Length:</span>
                  <span className="text-white">{selectedPlanet.orbitalPeriod} days</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                <p className="text-yellow-400 text-xs font-semibold mb-1">Fun Fact:</p>
                <p className="text-gray-300 text-xs">{selectedPlanet.funFact}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <MobileFooter />
    </div>
  );
};

export default Mobile;
