import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { Button, Card, Spinner } from '@/components/atoms';
import { ChartWheel } from '@/components/organisms/ChartWheel';
import { useChartStore } from '@/store/chartStore';
import { formatDegree } from '@/utils/formatters';
import { exportChartToPDF } from '@/utils/pdfExport';
import toast from 'react-hot-toast';

export const ChartResults = () => {
  const navigate = useNavigate();
  const currentChart = useChartStore((state) => state.currentChart);
  const isLoading = useChartStore((state) => state.isLoading);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!currentChart) return;

    setIsExporting(true);
    toast.loading('Generating PDF...', { id: 'pdf-export' });

    try {
      const result = await exportChartToPDF(currentChart);

      if (result.success) {
        toast.success(`PDF exported successfully: ${result.fileName}`, { id: 'pdf-export' });
      } else {
        toast.error('Failed to export PDF', { id: 'pdf-export' });
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.error('An error occurred while exporting PDF', { id: 'pdf-export' });
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="text-white/70 mt-4">Generating your chart...</p>
        </div>
      </div>
    );
  }

  if (!currentChart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-white mb-4">No Chart Data</h2>
          <p className="text-white/70 mb-6">Generate a chart to see results here</p>
          <Button onClick={() => navigate('/natal-chart')}>
            Generate Chart
          </Button>
        </div>
      </div>
    );
  }

  const { data } = currentChart;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="stars" />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-3">
              Chart Results
            </h1>
            <p className="text-lg text-white/60">
              {currentChart.type === 'natal' ? 'Natal Chart' : 'Horary Chart'}
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={handleExport}
            disabled={isExporting}
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </Button>
        </div>

        {/* Chart Wheel */}
        <Card className="mb-8 chart-wheel-container">
          <h2 className="text-2xl font-serif font-semibold text-white mb-6">
            Birth Chart
          </h2>
          <ChartWheel planets={data.planets_data} houses={data.houses_data} />
        </Card>

        {/* Planets Table */}
        <Card className="mb-8">
          <h2 className="text-2xl font-serif font-semibold text-white mb-6">
            Planetary Positions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border-subtle">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                    Planet
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                    Sign
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                    Sign Lord
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                    Degree
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                    Nakshatra
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                    Nakshatra Lord
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                    House
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {data.planets_data.map((planet) => (
                  <tr
                    key={planet.name}
                    className="hover:bg-surface-hover transition-colors"
                  >
                    <td className="py-3 px-4 text-white font-medium">
                      {planet.name}
                    </td>
                    <td className="py-3 px-4 text-white/70">{planet.sign}</td>
                    <td className="py-3 px-4 text-accent-gold">{planet.rasi_lord}</td>
                    <td className="py-3 px-4 text-white/70 font-mono">
                      {formatDegree(planet.sign_degree)}
                    </td>
                    <td className="py-3 px-4 text-white/70">{planet.nakshatra}</td>
                    <td className="py-3 px-4 text-accent-gold">{planet.nakshatra_lord}</td>
                    <td className="py-3 px-4 text-white/70">{planet.house}</td>
                    <td className="py-3 px-4">
                      {planet.retrograde ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30">
                          Retrograde
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                          Direct
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Houses Table */}
        <Card className="mb-8">
          <h2 className="text-2xl font-serif font-semibold text-white mb-6">
            House Cusps
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border-subtle">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                    House
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                    Sign
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                    Cusp Degree
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                    Lord
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {data.houses_data.map((house) => (
                  <tr
                    key={house.house_number}
                    className="hover:bg-surface-hover transition-colors"
                  >
                    <td className="py-3 px-4 text-white font-medium">
                      {house.house_number}
                    </td>
                    <td className="py-3 px-4 text-white/70">{house.sign}</td>
                    <td className="py-3 px-4 text-white/70 font-mono">
                      {formatDegree(house.cusp_degree)}
                    </td>
                    <td className="py-3 px-4 text-white/70">{house.lord}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Vimshottari Dasa Table */}
        {data.vimshottari_dasa_table && (
          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-white mb-6">
              Vimshottari Dasa Periods
            </h2>
            <p className="text-white/60 mb-4 text-sm">
              Planetary periods showing when each planet's influence is most active in your life
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border-subtle">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                      Planet
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                      Duration (Years)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {Object.entries(data.vimshottari_dasa_table).map(([planet, period]: [string, any]) => (
                    <tr
                      key={planet}
                      className="hover:bg-surface-hover transition-colors"
                    >
                      <td className="py-3 px-4 text-white font-medium">
                        {planet}
                      </td>
                      <td className="py-3 px-4 text-white/70">
                        {period.start_date || 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-white/70">
                        {period.end_date || 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-white/70">
                        {period.duration || period.years || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Planetary Aspects */}
        {data.planetary_aspects && (
          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-white mb-6">
              Planetary Aspects
            </h2>
            <p className="text-white/60 mb-4 text-sm">
              Relationships and aspects between planets in your chart
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border-subtle">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                      Planet 1
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                      Aspect Type
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                      Planet 2
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                      Orb
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {Array.isArray(data.planetary_aspects) && data.planetary_aspects.length > 0 ? (
                    data.planetary_aspects.map((aspect: any, idx: number) => (
                      <tr
                        key={idx}
                        className="hover:bg-surface-hover transition-colors"
                      >
                        <td className="py-3 px-4 text-white font-medium">
                          {aspect.P1 || aspect.planet1 || aspect.from_planet}
                        </td>
                        <td className="py-3 px-4 text-accent-gold">
                          {aspect.AspectType || aspect.aspect_type || aspect.aspect}
                        </td>
                        <td className="py-3 px-4 text-white font-medium">
                          {aspect.P2 || aspect.planet2 || aspect.to_planet}
                        </td>
                        <td className="py-3 px-4 text-white/70">
                          {aspect.AspectOrb ? `${Number(aspect.AspectOrb).toFixed(2)}°` :
                           aspect.orb ? `${Number(aspect.orb).toFixed(2)}°` : 'N/A'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-3 px-4 text-white/60 text-center">
                        No aspects found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Planet Significators (KP Astrology) */}
        {data.planet_significators && (
          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-white mb-6">
              Planet Significators (KP System)
            </h2>
            <p className="text-white/60 mb-4 text-sm">
              Houses signified by each planet according to Krishnamurti Paddhati
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border-subtle">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                      Planet
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                      Signifies Houses
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {Object.entries(data.planet_significators).map(([planet, houses]: [string, any]) => (
                    <tr
                      key={planet}
                      className="hover:bg-surface-hover transition-colors"
                    >
                      <td className="py-3 px-4 text-white font-medium">
                        {planet}
                      </td>
                      <td className="py-3 px-4 text-white/70">
                        {Array.isArray(houses) ? houses.join(', ') : String(houses)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* House Significators (KP Astrology) */}
        {data.house_significators && (
          <Card className="mb-8">
            <h2 className="text-2xl font-serif font-semibold text-white mb-6">
              House Significators (KP System)
            </h2>
            <p className="text-white/60 mb-4 text-sm">
              Planets signifying each house according to Krishnamurti Paddhati
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border-subtle">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                      House
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-white/90 uppercase tracking-wider">
                      Significator Planets
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {Object.entries(data.house_significators).map(([house, planets]: [string, any]) => (
                    <tr
                      key={house}
                      className="hover:bg-surface-hover transition-colors"
                    >
                      <td className="py-3 px-4 text-white font-medium">
                        House {house}
                      </td>
                      <td className="py-3 px-4 text-white/70">
                        {Array.isArray(planets) ? planets.join(', ') : String(planets)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
