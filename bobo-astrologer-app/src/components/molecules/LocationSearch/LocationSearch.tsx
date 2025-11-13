import { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Input, Label } from '@/components/atoms';
import clsx from 'clsx';

interface LocationSearchProps {
  onLocationSelect: (location: { lat: number; lng: number; name: string }) => void;
  error?: string;
  required?: boolean;
}

export const LocationSearch = ({ onLocationSelect, error, required }: LocationSearchProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        // Using OpenStreetMap Nominatim API (free, no API key required)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`,
          {
            headers: {
              'User-Agent': 'BoboAstrologer/1.0'
            }
          }
        );
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (err) {
        console.error('Error fetching location suggestions:', err);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query]);

  const handleSelectLocation = (location: any) => {
    // Get a shorter, cleaner display name
    const parts = location.display_name.split(',');
    const shortName = parts.length > 2
      ? `${parts[0]}, ${parts[parts.length - 1]}`.trim()
      : location.display_name;

    setSelectedLocation(shortName);
    setQuery(shortName);
    setShowSuggestions(false);
    onLocationSelect({
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lon),
      name: location.display_name
    });
  };

  return (
    <div>
      <div className="relative" style={{ marginBottom: showSuggestions && suggestions.length > 0 ? '18rem' : '0' }}>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-gold" />
          <Input
            id="location-search"
            type="text"
            placeholder="Type to search cities, towns, or places..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="pl-10"
            error={!!error}
            fullWidth
          />
          {isLoading && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent-purple animate-spin" />
          )}
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-[#1a1a1a] border border-[#333333] rounded-lg shadow-2xl max-h-72 overflow-y-auto backdrop-blur-sm">
            {suggestions.map((suggestion, index) => {
              const parts = suggestion.display_name.split(',');
              const mainLocation = parts[0];

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectLocation(suggestion)}
                  className={clsx(
                    'w-full px-4 py-3 text-left transition-all duration-200 bg-[#1a1a1a]',
                    'hover:bg-[#2a2a2a] hover:border-l-4 hover:border-accent-purple',
                    'border-b border-[#333333] last:border-b-0',
                    'focus:outline-none focus:bg-[#2a2a2a]',
                    index === 0 && 'rounded-t-lg',
                    index === suggestions.length - 1 && 'rounded-b-lg'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-accent-gold mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold">
                        {mainLocation}
                      </p>
                      <p className="text-white/60 text-xs mt-0.5 truncate">
                        {parts.slice(1).join(', ')}
                      </p>
                      <p className="text-white/40 text-xs mt-1 font-mono">
                        {parseFloat(suggestion.lat).toFixed(4)}°, {parseFloat(suggestion.lon).toFixed(4)}°
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selectedLocation && (
        <div className="mt-3 px-4 py-2 bg-accent-purple/10 border border-accent-purple/30 rounded-lg animate-fade-in">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent-purple flex-shrink-0" />
            <p className="text-sm text-white/90">
              <span className="text-white/60">Selected:</span> <span className="font-medium">{selectedLocation}</span>
            </p>
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-400 mt-2 animate-fade-in">{error}</p>
      )}
    </div>
  );
};
