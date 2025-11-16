import { motion } from 'framer-motion';
import { Sparkles, Star, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/atoms';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl text-gray-900">
                Bobo Astrologer
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
              Discover the ancient wisdom of Vedic Astrology. Generate detailed birth charts,
              explore planetary positions, and unlock the secrets of your cosmic blueprint.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Button
                size="lg"
                onClick={() => navigate('/natal-chart')}
                className="min-w-[200px]"
              >
                <Star className="w-5 h-5" fill="white" />
                Generate Birth Chart
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/horary-chart')}
                className="min-w-[200px]"
              >
                <Moon className="w-5 h-5" />
                Horary Chart
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl text-gray-900 mb-4">
              Comprehensive Astrological Insights
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform combines traditional Vedic astrology with modern technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[20px] p-6 sm:p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-red-400 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sun className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">
                Natal Charts
              </h3>
              <p className="text-gray-600">
                Complete birth chart with planetary positions, houses, and aspects
              </p>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[20px] p-6 sm:p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Star className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">
                Vimshottari Dasa
              </h3>
              <p className="text-gray-600">
                Comprehensive dasa periods and timing of events
              </p>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-[20px] p-6 sm:p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Moon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">
                KP Horary
              </h3>
              <p className="text-gray-600">
                Precise horary calculations using Krishnamurti Paddhati
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl text-gray-900 mb-6">
              Ancient Wisdom, Modern Technology
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Experience the profound insights of Vedic Astrology through our advanced calculation
              engine. We provide accurate planetary positions, comprehensive house systems, and
              detailed interpretations to help you understand your cosmic journey.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFF7CC] to-[#FFE066] text-gray-800 rounded-full border-2 border-[#FFD700] shadow-md">
              <Sparkles className="w-5 h-5 text-[#FFD700]" />
              <span className="font-medium">Powered by VedicAstro API</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
