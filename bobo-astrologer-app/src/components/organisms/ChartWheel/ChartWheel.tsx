interface Planet {
  name: string;
  sign: string;
  sign_degree: number;
  house: number;
  retrograde: boolean;
}

interface ChartWheelProps {
  planets: Planet[];
  houses: any[];
}

export const ChartWheel = ({ planets, houses }: ChartWheelProps) => {
  // Group planets by house
  const planetsByHouse: Record<number, Planet[]> = {};
  planets.forEach((planet) => {
    if (!planetsByHouse[planet.house]) {
      planetsByHouse[planet.house] = [];
    }
    planetsByHouse[planet.house].push(planet);
  });

  // Group planets by sign for South Indian chart
  const planetsBySign: Record<string, Planet[]> = {};
  planets.forEach((planet) => {
    if (!planetsBySign[planet.sign]) {
      planetsBySign[planet.sign] = [];
    }
    planetsBySign[planet.sign].push(planet);
  });

  // North Indian style chart layout (diamond shaped, rotated 45 degrees)
  // Layout in 4x4 grid forming a diamond
  const northIndianPositions = [
    { house: 12, row: 0, col: 1, span: 1 },  // Top left
    { house: 1, row: 0, col: 2, span: 1 },   // Top right
    { house: 11, row: 1, col: 0, span: 1 },  // Left top
    { house: 2, row: 1, col: 3, span: 1 },   // Right top
    { house: 10, row: 2, col: 0, span: 1 },  // Left bottom
    { house: 3, row: 2, col: 3, span: 1 },   // Right bottom
    { house: 9, row: 3, col: 1, span: 1 },   // Bottom left
    { house: 4, row: 3, col: 2, span: 1 },   // Bottom right
    { house: 8, row: 1, col: 1, span: 1 },   // Center top-left
    { house: 5, row: 1, col: 2, span: 1 },   // Center top-right
    { house: 7, row: 2, col: 1, span: 1 },   // Center bottom-left
    { house: 6, row: 2, col: 2, span: 1 },   // Center bottom-right
  ];

  // South Indian style chart layout (signs fixed in position)
  // Signs are fixed: Aries top-left, going clockwise
  const southIndianPositions = [
    { sign: 'Aries', row: 0, col: 1 },
    { sign: 'Taurus', row: 0, col: 2 },
    { sign: 'Gemini', row: 0, col: 3 },
    { sign: 'Cancer', row: 1, col: 3 },
    { sign: 'Leo', row: 2, col: 3 },
    { sign: 'Virgo', row: 3, col: 3 },
    { sign: 'Libra', row: 3, col: 2 },
    { sign: 'Scorpio', row: 3, col: 1 },
    { sign: 'Sagittarius', row: 3, col: 0 },
    { sign: 'Capricorn', row: 2, col: 0 },
    { sign: 'Aquarius', row: 1, col: 0 },
    { sign: 'Pisces', row: 0, col: 0 },
  ];

  const getHouseSign = (houseNum: number) => {
    const house = houses.find((h) => h.house_number === houseNum);
    return house?.sign || '';
  };

  const getHouseNumberForSign = (signName: string) => {
    const house = houses.find((h) => h.sign === signName);
    return house?.house_number || null;
  };

  const getPlanetColor = (planetName: string) => {
    switch (planetName) {
      case 'Sun': return 'text-orange-400';
      case 'Moon': return 'text-blue-300';
      case 'Mars': return 'text-red-400';
      case 'Mercury': return 'text-green-400';
      case 'Jupiter': return 'text-yellow-400';
      case 'Venus': return 'text-pink-400';
      case 'Saturn': return 'text-gray-400';
      case 'Asc': return 'text-accent-purple';
      default: return 'text-white';
    }
  };

  const getPlanetAbbreviation = (planetName: string) => {
    if (planetName === 'Asc') return 'As';
    if (planetName === 'Mercury') return 'Me';
    if (planetName === 'Jupiter') return 'Ju';
    if (planetName === 'Saturn') return 'Sa';
    return planetName.substring(0, 2);
  };

  return (
    <div className="space-y-12">
      {/* North Indian Chart */}
      <div className="w-full max-w-3xl mx-auto">
        <h3 className="text-xl font-serif font-semibold text-white mb-4 text-center">
          North Indian Style
        </h3>
        <div className="relative w-full max-w-[600px] mx-auto" style={{ paddingBottom: '100%' }}>
          {/* Background Image */}
          <img
            src="/northIndian.svg"
            alt="North Indian Chart"
            className="absolute inset-0 w-full h-full object-contain"
          />

          {/* House 12 - Top Left Triangle */}
          <div className="absolute" style={{ top: '14%', left: '30%', width: '12%', textAlign: 'center' }}>
            <div className="text-sm text-gray-900 font-bold mb-1">12</div>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(12).substring(0, 3)}</div>
            {planetsByHouse[12]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 1 - Top Right Triangle */}
          <div className="absolute" style={{ top: '14%', right: '30%', width: '12%', textAlign: 'center' }}>
            <div className="text-sm text-gray-900 font-bold mb-1">1</div>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(1).substring(0, 3)}</div>
            {planetsByHouse[1]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 11 - Left Upper Triangle */}
          <div className="absolute" style={{ top: '26%', left: '16%', width: '12%', textAlign: 'center' }}>
            <div className="text-sm text-gray-900 font-bold mb-1">11</div>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(11).substring(0, 3)}</div>
            {planetsByHouse[11]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 2 - Right Upper Triangle */}
          <div className="absolute" style={{ top: '26%', right: '16%', width: '12%', textAlign: 'center' }}>
            <div className="text-sm text-gray-900 font-bold mb-1">2</div>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(2).substring(0, 3)}</div>
            {planetsByHouse[2]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 10 - Left Center Triangle */}
          <div className="absolute" style={{ top: '44%', left: '16%', width: '12%', textAlign: 'center' }}>
            <div className="text-sm text-gray-900 font-bold mb-1">10</div>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(10).substring(0, 3)}</div>
            {planetsByHouse[10]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 3 - Right Center Triangle */}
          <div className="absolute" style={{ top: '44%', right: '16%', width: '12%', textAlign: 'center' }}>
            <div className="text-sm text-gray-900 font-bold mb-1">3</div>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(3).substring(0, 3)}</div>
            {planetsByHouse[3]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 9 - Left Lower Triangle */}
          <div className="absolute" style={{ top: '62%', left: '16%', width: '12%', textAlign: 'center' }}>
            <div className="text-sm text-gray-900 font-bold mb-1">9</div>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(9).substring(0, 3)}</div>
            {planetsByHouse[9]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 4 - Right Lower Triangle */}
          <div className="absolute" style={{ top: '62%', right: '16%', width: '12%', textAlign: 'center' }}>
            <div className="text-sm text-gray-900 font-bold mb-1">4</div>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(4).substring(0, 3)}</div>
            {planetsByHouse[4]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 8 - Bottom Left Triangle */}
          <div className="absolute" style={{ bottom: '14%', left: '30%', width: '12%', textAlign: 'center' }}>
            <div className="text-sm text-gray-900 font-bold mb-1">8</div>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(8).substring(0, 3)}</div>
            {planetsByHouse[8]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 5 - Bottom Right Triangle */}
          <div className="absolute" style={{ bottom: '14%', right: '30%', width: '12%', textAlign: 'center' }}>
            <div className="text-sm text-gray-900 font-bold mb-1">5</div>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(5).substring(0, 3)}</div>
            {planetsByHouse[5]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 7 - Center Left Square */}
          <div className="absolute" style={{ top: '44%', left: '33%', width: '12%', textAlign: 'center' }}>
            <div className="text-sm text-gray-900 font-bold mb-1">7</div>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(7).substring(0, 3)}</div>
            {planetsByHouse[7]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 6 - Center Right Square */}
          <div className="absolute" style={{ top: '44%', right: '33%', width: '12%', textAlign: 'center' }}>
            <div className="text-sm text-gray-900 font-bold mb-1">6</div>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(6).substring(0, 3)}</div>
            {planetsByHouse[6]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* South Indian Chart */}
      <div className="w-full max-w-3xl mx-auto">
        <h3 className="text-xl font-serif font-semibold text-white mb-4 text-center">
          South Indian Style
        </h3>
        <div className="relative w-full max-w-[600px] mx-auto" style={{ paddingBottom: '100%' }}>
          {/* Background Image */}
          <img
            src="/southIndian.svg"
            alt="South Indian Chart"
            className="absolute inset-0 w-full h-full object-contain"
          />

          {/* House 12 - Top Left */}
          <div className="absolute" style={{ top: '4%', left: '4%', width: '23%', height: '23%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '8px' }}>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(12).substring(0, 3)}</div>
            {planetsByHouse[12]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 1 - Top Center-Left */}
          <div className="absolute" style={{ top: '4%', left: '27%', width: '23%', height: '23%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '8px' }}>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(1).substring(0, 3)}</div>
            {planetsByHouse[1]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 2 - Top Center-Right */}
          <div className="absolute" style={{ top: '4%', left: '50%', width: '23%', height: '23%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '8px' }}>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(2).substring(0, 3)}</div>
            {planetsByHouse[2]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 3 - Top Right */}
          <div className="absolute" style={{ top: '4%', left: '73%', width: '23%', height: '23%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '8px' }}>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(3).substring(0, 3)}</div>
            {planetsByHouse[3]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 11 - Middle Left */}
          <div className="absolute" style={{ top: '27%', left: '4%', width: '23%', height: '23%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(11).substring(0, 3)}</div>
            {planetsByHouse[11]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 4 - Middle Right */}
          <div className="absolute" style={{ top: '27%', left: '73%', width: '23%', height: '23%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(4).substring(0, 3)}</div>
            {planetsByHouse[4]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 10 - Lower Middle Left */}
          <div className="absolute" style={{ top: '50%', left: '4%', width: '23%', height: '23%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(10).substring(0, 3)}</div>
            {planetsByHouse[10]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 5 - Lower Middle Right */}
          <div className="absolute" style={{ top: '50%', left: '73%', width: '23%', height: '23%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(5).substring(0, 3)}</div>
            {planetsByHouse[5]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 9 - Bottom Left */}
          <div className="absolute" style={{ top: '73%', left: '4%', width: '23%', height: '23%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '8px' }}>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(9).substring(0, 3)}</div>
            {planetsByHouse[9]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 8 - Bottom Center-Left */}
          <div className="absolute" style={{ top: '73%', left: '27%', width: '23%', height: '23%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '8px' }}>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(8).substring(0, 3)}</div>
            {planetsByHouse[8]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 7 - Bottom Center-Right */}
          <div className="absolute" style={{ top: '73%', left: '50%', width: '23%', height: '23%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '8px' }}>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(7).substring(0, 3)}</div>
            {planetsByHouse[7]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>

          {/* House 6 - Bottom Right */}
          <div className="absolute" style={{ top: '73%', left: '73%', width: '23%', height: '23%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '8px' }}>
            <div className="text-xs text-red-700 font-semibold mb-1">{getHouseSign(6).substring(0, 3)}</div>
            {planetsByHouse[6]?.map((p, i) => (
              <div key={i} className="text-sm font-bold text-gray-900 leading-tight">
                {getPlanetAbbreviation(p.name)}{p.retrograde && 'ℛ'}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
