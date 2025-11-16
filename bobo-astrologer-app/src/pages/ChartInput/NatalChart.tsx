import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, Settings, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button, Select, Label } from '@/components/atoms';
import { FormField } from '@/components/molecules/FormField';
import { LocationSearch } from '@/components/molecules/LocationSearch';
import { useChartStore } from '@/store/chartStore';
import { usePreferencesStore } from '@/store/preferencesStore';
import { chartInputSchema, type ChartInputFormData } from '@/utils/validation';
import { AYANAMSA_OPTIONS, HOUSE_SYSTEM_OPTIONS } from '@/utils/constants';
import { TIMEZONES } from '@/utils/timezones';

export const NatalChart = () => {
  const navigate = useNavigate();
  const generateNatalChart = useChartStore((state) => state.generateNatalChart);
  const isLoading = useChartStore((state) => state.isLoading);
  const error = useChartStore((state) => state.error);
  const defaultAyanamsa = usePreferencesStore((state) => state.defaultAyanamsa);
  const defaultHouseSystem = usePreferencesStore((state) => state.defaultHouseSystem);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ChartInputFormData>({
    resolver: zodResolver(chartInputSchema),
    defaultValues: {
      ayanamsa: defaultAyanamsa,
      house_system: defaultHouseSystem,
      utc: '+05:30',
    },
  });

  const handleLocationSelect = (location: { lat: number; lng: number; name: string }) => {
    setValue('latitude', location.lat);
    setValue('longitude', location.lng);
    setValue('place_of_birth', location.name);
  };

  const onSubmit = async (data: ChartInputFormData) => {
    try {
      await generateNatalChart(data);
      if (!error) {
        toast.success('Chart generated successfully!');
        navigate('/chart/results');
      }
    } catch (err) {
      toast.error('Failed to generate chart. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl sm:text-4xl text-gray-900 mb-3">
            Generate Natal Chart
          </h1>
          <p className="text-lg text-gray-600">
            Enter your birth details to generate a complete Vedic astrology chart
          </p>
        </motion.div>

        {/* Form */}
        <div className="max-w-3xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-[20px] p-6 sm:p-8 border border-gray-200 shadow-sm space-y-8"
          >
            {/* Personal Information Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-red-400 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-gray-900">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  error={errors.name?.message}
                  register={register('name')}
                  required
                />
              </div>
            </div>

            {/* Date Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-gray-900">Birth Date</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  label="Year"
                  name="year"
                  type="number"
                  placeholder="1990"
                  error={errors.year?.message}
                  register={register('year', { valueAsNumber: true })}
                  required
                />
                <FormField
                  label="Month"
                  name="month"
                  type="number"
                  placeholder="5"
                  error={errors.month?.message}
                  register={register('month', { valueAsNumber: true })}
                  required
                />
                <FormField
                  label="Day"
                  name="day"
                  type="number"
                  placeholder="15"
                  error={errors.day?.message}
                  register={register('day', { valueAsNumber: true })}
                  required
                />
              </div>
            </div>

            {/* Time Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-violet-400 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-gray-900">Birth Time</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <FormField
                  label="Hour"
                  name="hour"
                  type="number"
                  placeholder="06"
                  error={errors.hour?.message}
                  register={register('hour', { valueAsNumber: true })}
                  required
                />
                <FormField
                  label="Minute"
                  name="minute"
                  type="number"
                  placeholder="30"
                  error={errors.minute?.message}
                  register={register('minute', { valueAsNumber: true })}
                  required
                />
                <FormField
                  label="Second"
                  name="second"
                  type="number"
                  placeholder="00"
                  error={errors.second?.message}
                  register={register('second', { valueAsNumber: true })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="utc" required>
                  Timezone (UTC Offset)
                </Label>
                <Select id="utc" fullWidth {...register('utc')}>
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </Select>
                {errors.utc && (
                  <p className="text-sm text-red-600 animate-fade-in">{errors.utc.message}</p>
                )}
              </div>
            </div>

            {/* Location Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-gray-900">Place of Birth</h3>
              </div>
              <LocationSearch
                onLocationSelect={handleLocationSelect}
                error={errors.latitude?.message || errors.longitude?.message}
                required
              />
            </div>

            {/* Settings Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                  <Settings className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-gray-900">Calculation Settings</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Ayanamsa"
                  name="ayanamsa"
                  error={errors.ayanamsa?.message}
                  register={register('ayanamsa')}
                >
                  <Select fullWidth {...register('ayanamsa')}>
                    {AYANAMSA_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </FormField>

                <FormField
                  label="House System"
                  name="house_system"
                  error={errors.house_system?.message}
                  register={register('house_system')}
                >
                  <Select fullWidth {...register('house_system')}>
                    {HOUSE_SYSTEM_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </FormField>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                fullWidth
                isLoading={isLoading}
                disabled={isLoading}
              >
                Generate Chart
              </Button>
            </div>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-[20px] p-4"
              >
                <p className="text-red-600 text-sm">{error}</p>
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </div>
  );
};
