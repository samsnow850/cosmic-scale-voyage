
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Music, VolumeX } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type BackgroundMusicProps = {
  className?: string;
};

const BackgroundMusic = ({ className = "" }: BackgroundMusicProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("https://dl.dropboxusercontent.com/scl/fi/1pw3yipgdncw4b0oszkrn/ambient-space.mp3?rlkey=9bn4f1pc9x8qksb09qzv2hu8w&dl=0");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        toast({
          title: "Music paused",
          description: "Background music has been turned off",
          duration: 2000,
        });
      } else {
        // Try-catch to handle autoplay restrictions
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              toast({
                title: "Music playing",
                description: "Space ambient music is now playing",
                duration: 2000,
              });
            })
            .catch(error => {
              console.error("Autoplay prevented:", error);
              toast({
                title: "Couldn't play music",
                description: "Please interact with the page first",
                variant: "destructive",
              });
              setIsPlaying(false);
            });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Button
      onClick={toggleMusic}
      variant="outline"
      size="icon"
      className={`bg-black/50 border-gray-700 hover:bg-black/80 text-white ${className}`}
      aria-label={isPlaying ? "Turn music off" : "Turn music on"}
      title={isPlaying ? "Turn music off" : "Turn music on"}
    >
      {isPlaying ? <Music /> : <VolumeX />}
    </Button>
  );
};

export default BackgroundMusic;
