import { Sparkles } from 'lucide-react';
import { Button } from '@/components/atoms';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Starfield Background */}
      <div className="stars" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-12 h-12 text-accent-purple" />
            <h1 className="text-6xl font-serif font-bold text-white">
              Bobo Astrologer
            </h1>
          </div>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Discover the ancient wisdom of Vedic Astrology. Generate detailed birth charts,
            explore planetary positions, and unlock the secrets of your cosmic blueprint.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <Button
            size="lg"
            onClick={() => navigate('/natal-chart')}
            className="min-w-[200px]"
          >
            Generate Birth Chart
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate('/horary-chart')}
            className="min-w-[200px]"
          >
            Horary Chart
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="glass p-6 rounded-xl text-center animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-purple/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-accent-purple" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Natal Charts
            </h3>
            <p className="text-white/60">
              Complete birth chart with planetary positions, houses, and aspects
            </p>
          </div>

          <div className="glass p-6 rounded-xl text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-blue/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-accent-blue" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Vimshottari Dasa
            </h3>
            <p className="text-white/60">
              Comprehensive dasa periods and timing of events
            </p>
          </div>

          <div className="glass p-6 rounded-xl text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-gold/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-accent-gold" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              KP Horary
            </h3>
            <p className="text-white/60">
              Precise horary calculations using Krishnamurti Paddhati
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-20">
          <p className="text-white/50 text-sm">
            Powered by VedicAstro API
          </p>
        </div>
      </div>
    </div>
  );
};
