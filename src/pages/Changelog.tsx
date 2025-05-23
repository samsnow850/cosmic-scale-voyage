
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Plus, Bug, Zap, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Changelog = () => {
  const changelogEntries = [
    {
      version: '2.1.0',
      date: 'May 23, 2025',
      type: 'major',
      changes: [
        { type: 'feature', text: 'Added interactive Sun with detailed information panel' },
        { type: 'feature', text: 'Implemented secret admin dashboard with authentication' },
        { type: 'feature', text: 'Added changelog system to track project updates' },
        { type: 'improvement', text: 'Enhanced planet click interactions with audio feedback' },
        { type: 'improvement', text: 'Improved visual design with better hover effects' }
      ]
    },
    {
      version: '2.0.1',
      date: 'May 22, 2025',
      type: 'patch',
      changes: [
        { type: 'fix', text: 'Fixed planet comparison panel overflow on mobile devices' },
        { type: 'fix', text: 'Resolved issue with orbital animation stuttering' },
        { type: 'improvement', text: 'Optimized search functionality performance' }
      ]
    },
    {
      version: '2.0.0',
      date: 'May 20, 2025',
      type: 'major',
      changes: [
        { type: 'feature', text: 'Complete redesign with dark space theme' },
        { type: 'feature', text: 'Added planet comparison functionality' },
        { type: 'feature', text: 'Implemented light speed visualization mode' },
        { type: 'feature', text: 'Added quiz mode for educational testing' },
        { type: 'feature', text: 'Interactive asteroid belt visualization' },
        { type: 'improvement', text: 'Responsive design for all screen sizes' }
      ]
    },
    {
      version: '1.5.0',
      date: 'May 18, 2025',
      type: 'minor',
      changes: [
        { type: 'feature', text: 'Added orbital path visualization' },
        { type: 'feature', text: 'Implemented planet search functionality' },
        { type: 'improvement', text: 'Enhanced planet information overlays' }
      ]
    },
    {
      version: '1.0.0',
      date: 'May 15, 2025',
      type: 'major',
      changes: [
        { type: 'feature', text: 'Initial release of Solar System Scale Model' },
        { type: 'feature', text: 'Interactive planet exploration' },
        { type: 'feature', text: 'Accurate scale representation' },
        { type: 'feature', text: 'Educational planet information' }
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <Plus className="w-4 h-4 text-green-400" />;
      case 'fix':
        return <Bug className="w-4 h-4 text-red-400" />;
      case 'improvement':
        return <Zap className="w-4 h-4 text-blue-400" />;
      default:
        return <Star className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getVersionBadgeColor = (type: string) => {
    switch (type) {
      case 'major':
        return 'bg-red-600';
      case 'minor':
        return 'bg-blue-600';
      case 'patch':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
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
          backgroundSize: '600px 200px'
        }} />
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button variant="outline" size="sm" className="bg-gray-800 border-gray-600 hover:bg-gray-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Solar System
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Project Changelog
            </h1>
            <p className="text-xl text-gray-300 mb-2">Track all updates and improvements</p>
            <p className="text-lg text-gray-400">Solar System Scale Model - Samuel Snow</p>
          </div>
        </div>

        {/* Changelog entries */}
        <div className="max-w-4xl mx-auto space-y-6">
          {changelogEntries.map((entry, index) => (
            <Card key={index} className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white flex items-center gap-3">
                      Version {entry.version}
                      <Badge className={`${getVersionBadgeColor(entry.type)} text-white`}>
                        {entry.type}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Calendar className="w-4 h-4" />
                      {entry.date}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {entry.changes.map((change, changeIndex) => (
                    <div key={changeIndex} className="flex items-start gap-3">
                      {getTypeIcon(change.type)}
                      <span className="text-gray-300">{change.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="text-gray-500 text-sm">
            This changelog tracks all major updates, new features, and bug fixes for the Solar System Scale Model project.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Changelog;
