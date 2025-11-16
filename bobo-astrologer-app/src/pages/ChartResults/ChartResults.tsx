import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download } from 'lucide-react';
import { Button, Card, Spinner } from '@/components/atoms';
import { ChartWheel } from '@/components/organisms/ChartWheel';
import { useChartStore } from '@/store/chartStore';
import { formatDegree } from '@/utils/formatters';

export const ChartResults = () => {
  const navigate = useNavigate();
  const currentChart = useChartStore((state) => state.currentChart);
  const isLoading = useChartStore((state) => state.isLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="text-gray-600 mt-4">Generating your chart...</p>
        </div>
      </div>
    );
  }

  if (!currentChart) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-4">No Chart Data</h2>
          <p className="text-gray-600 mb-6">Generate a chart to see results here</p>
          <Button onClick={() => navigate('/natal-chart')}>
            Generate Chart
          </Button>
        </div>
      </div>
    );
  }

  const { data } = currentChart;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
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
            <h1 className="text-3xl sm:text-4xl text-gray-900 mb-2">
              Chart Results
            </h1>
            <p className="text-lg text-gray-600">
              {currentChart.type === 'natal' ? 'Natal Chart' : 'Horary Chart'}
            </p>
          </div>
          <Button variant="secondary">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </motion.div>

        {/* Chart Wheel */}
<<<<<<< HEAD
        <Card className="mb-8">
          <h2 className="text-2xl font-serif font-semibold text-white mb-6">
            Birth Chart
          </h2>
          <ChartWheel planets={data.planets_data} houses={data.houses_data} />
        </Card>
=======
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="mb-8 chart-wheel-container">
            <h2 className="text-2xl text-gray-900 mb-6">
              Birth Chart
            </h2>
            <ChartWheel planets={data.planets_data} houses={data.houses_data} />
          </Card>
        </motion.div>
>>>>>>> 16976e908eb28ab3bdca724c24c827e20b6db851

        {/* Planets Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="mb-8">
            <h2 className="text-2xl text-gray-900 mb-6">
              Planetary Positions
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b-2 border-gray-200 bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-4 sm:px-6 text-sm font-medium text-gray-900 uppercase tracking-wider">
                      Planet
                    </th>
                    <th className="text-left py-4 px-4 sm:px-6 text-sm font-medium text-gray-900 uppercase tracking-wider">
                      Sign
                    </th>
                    <th className="text-left py-4 px-4 sm:px-6 text-sm font-medium text-gray-900 uppercase tracking-wider">
                      Sign Lord
                    </th>
                    <th className="text-left py-4 px-4 sm:px-6 text-sm font-medium text-gray-900 uppercase tracking-wider">
                      Degree
                    </th>
                    <th className="text-left py-4 px-4 sm:px-6 text-sm font-medium text-gray-900 uppercase tracking-wider">
                      Nakshatra
                    </th>
                    <th className="text-left py-4 px-4 sm:px-6 text-sm font-medium text-gray-900 uppercase tracking-wider">
                      Nakshatra Lord
                    </th>
                    <th className="text-left py-4 px-4 sm:px-6 text-sm font-medium text-gray-900 uppercase tracking-wider">
                      House
                    </th>
                    <th className="text-left py-4 px-4 sm:px-6 text-sm font-medium text-gray-900 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.planets_data.map((planet: any, index: number) => (
                    <motion.tr
                      key={planet.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 sm:px-6 text-gray-900 font-medium">
                        {planet.name}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-gray-600">{planet.sign}</td>
                      <td className="py-4 px-4 sm:px-6 text-[#FFD700]">{planet.rasi_lord}</td>
                      <td className="py-4 px-4 sm:px-6 text-gray-600 font-mono text-sm">
                        {formatDegree(planet.sign_degree)}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-gray-600">{planet.nakshatra}</td>
                      <td className="py-4 px-4 sm:px-6 text-[#FFD700]">{planet.nakshatra_lord}</td>
                      <td className="py-4 px-4 sm:px-6 text-gray-600">{planet.house}</td>
                      <td className="py-4 px-4 sm:px-6">
                        {planet.retrograde ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-600 border border-orange-200">
                            Retrograde
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600 border border-green-200">
                            Direct
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Houses Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="mb-8">
            <h2 className="text-2xl text-gray-900 mb-6">
              House Cusps
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b-2 border-gray-200 bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-4 sm:px-6 text-sm font-medium text-gray-900 uppercase tracking-wider">
                      House
                    </th>
                    <th className="text-left py-4 px-4 sm:px-6 text-sm font-medium text-gray-900 uppercase tracking-wider">
                      Sign
                    </th>
                    <th className="text-left py-4 px-4 sm:px-6 text-sm font-medium text-gray-900 uppercase tracking-wider">
                      Cusp Degree
                    </th>
                    <th className="text-left py-4 px-4 sm:px-6 text-sm font-medium text-gray-900 uppercase tracking-wider">
                      Lord
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.houses_data.map((house: any, index: number) => (
                    <motion.tr
                      key={house.house_number}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4 sm:px-6 text-gray-900 font-medium">
                        {house.house_number}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-gray-600">{house.sign}</td>
                      <td className="py-4 px-4 sm:px-6 text-gray-600 font-mono text-sm">
                        {formatDegree(house.cusp_degree)}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-gray-600">{house.lord}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Vimshottari Dasa Table */}
        {data.vimshottari_dasa_table && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="mb-8">
              <h2 className="text-2xl text-gray-900 mb-2">
                Vimshottari Dasa Periods
              </h2>
              <p className="text-gray-600 mb-6 text-sm">
                Planetary periods showing when each planet's influence is most active in your life
              </p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b-2 border-gray-200 bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-4 sm:px-6 text-sm font-medium text-gray-900 uppercase tracking-wider">
                        Planet
                      </th>
                      <th className="text-left py-4 px-4 sm:px-6 text-sm font-medium text-gray-900 uppercase tracking-wider">
                        Start Date
                      </th>
                      <th className="text-left py-4 px-4 sm:px-6 text-sm font-medium text-gray-900 uppercase tracking-wider">
                        End Date
                      </th>
                      <th className="text-left py-4 px-4 sm:px-6 text-sm font-medium text-gray-900 uppercase tracking-wider">
                        Duration (Years)
                      </th>
                    </tr>
<<<<<<< HEAD
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
                      <td className="py-3 px-4 text-white/70">
                        {Array.isArray(planets) ? planets.join(', ') : String(planets)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
=======
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.vimshottari_dasa_table.map((dasa: any, index: number) => (
                      <motion.tr
                        key={`${dasa.planet}-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4 sm:px-6 text-gray-900 font-medium">
                          {dasa.planet}
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-gray-600">{dasa.start_date}</td>
                        <td className="py-4 px-4 sm:px-6 text-gray-600">{dasa.end_date}</td>
                        <td className="py-4 px-4 sm:px-6 text-gray-600">{dasa.duration_years}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
>>>>>>> 16976e908eb28ab3bdca724c24c827e20b6db851
        )}
      </div>
    </div>
  );
};
