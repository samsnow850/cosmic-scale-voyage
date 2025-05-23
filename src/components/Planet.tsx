
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface PlanetProps {
  name: string;
  realDiameter: number;
  scaledSize: number;
  distanceAU: number;
  distanceInches: number;
  color: string;
  position: number;
  onClick: () => void;
  onAddToComparison: () => void;
  funFact: string;
  orbitalPeriod: number;
  dayLength: number;
  minTemp: number;
  maxTemp: number;
  moons: number;
  travelTime: string;
  lightTime: string;
  isAnimating: boolean;
  timeSpeed: number;
  showSizeComparison: boolean;
  showLightVisualization: boolean;
}

const Planet: React.FC<PlanetProps> = ({
  name,
  scaledSize,
  color,
  position,
  onClick,
  onAddToComparison,
  funFact,
  orbitalPeriod,
  dayLength,
  minTemp,
  maxTemp,
  moons,
  travelTime,
  lightTime,
  isAnimating,
  timeSpeed,
  showSizeComparison,
  showLightVisualization,
}) => {
  // Convert scaled size from inches to pixels
  const sizeInPixels = Math.max(showSizeComparison ? scaledSize * 48 : scaledSize * 24, 8);
  
  // Calculate rotation speed based on day length (slower = longer day)
  const rotationDuration = isAnimating ? Math.max(dayLength / 10, 2) / timeSpeed : 0;

  return (
    <div
      className="absolute flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-125 hover:z-10 group"
      style={{
        left: `${position}px`,
        top: '50%',
        transform: 'translateY(-50%)'
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="rounded-full shadow-lg transition-all duration-300 group-hover:shadow-2xl relative overflow-hidden"
            style={{
              width: `${sizeInPixels}px`,
              height: `${sizeInPixels}px`,
              background: color,
              boxShadow: `0 0 ${sizeInPixels * 0.5}px ${color}40`,
              animation: rotationDuration ? `spin ${rotationDuration}s linear infinite` : 'none'
            }}
            onClick={onClick}
          >
            {/* Light visualization */}
            {showLightVisualization && (
              <div 
                className="absolute inset-0 rounded-full opacity-30"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
                  animation: 'pulse 2s ease-in-out infinite'
                }}
              />
            )}
            
            {/* Planet surface texture */}
            <div 
              className="absolute inset-0 rounded-full opacity-20"
              style={{
                background: `radial-gradient(ellipse at 30% 30%, transparent 30%, rgba(0,0,0,0.3) 70%)`,
              }}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-gray-900 border-gray-700 text-white max-w-xs">
          <div className="space-y-1 text-xs">
            <p className="font-bold">{name}</p>
            <p>Orbital Period: {orbitalPeriod} days</p>
            <p>Day Length: {dayLength} hours</p>
            <p>Temperature: {minTemp}°C to {maxTemp}°C</p>
            <p>Moons: {moons}</p>
            <p>Travel Time: {travelTime}</p>
            <p>Light Time: {lightTime}</p>
            <p className="italic">{funFact}</p>
          </div>
        </TooltipContent>
      </Tooltip>
      
      {/* Planet name and comparison button */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        <div className="text-white text-sm font-medium mb-2 text-center">{name}</div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAddToComparison();
          }}
          size="sm"
          variant="outline"
          className="text-white border-white hover:bg-white hover:text-black"
        >
          <Plus className="w-3 h-3 mr-1" />
          Compare
        </Button>
      </div>
    </div>
  );
};

export default Planet;
