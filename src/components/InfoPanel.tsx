
import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
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

interface InfoPanelProps {
  activePlanet: string | null;
  planetsData: PlanetData[];
}

const InfoPanel: React.FC<InfoPanelProps> = ({ activePlanet, planetsData }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  const planet = planetsData.find(p => p.name === activePlanet);

  useEffect(() => {
    if (activePlanet) {
      setIsVisible(true);
    }
  }, [activePlanet]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('drag-handle')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  if (!planet || !isVisible) return null;

  return (
    <div 
      ref={panelRef}
      className="fixed bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg p-4 z-30 max-w-xs cursor-move select-none"
      style={{
        right: position.x === 0 ? '16px' : 'auto',
        left: position.x !== 0 ? `${position.x}px` : 'auto',
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-white drag-handle">{planet.name}</h3>
        <Button
          onClick={() => setIsVisible(false)}
          size="sm"
          className="bg-gray-800 border-gray-600 hover:bg-gray-700 text-white border-2 p-1 h-6 w-6"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
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
