import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
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
    <div className="min-h-screen relative overflow-hidden">
      <div className="stars" />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-8">
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
            Generate Natal Chart
          </h1>
          <p className="text-lg text-white/60">
            Enter your birth details to generate a complete Vedic astrology chart
          </p>
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="glass-strong p-8 rounded-2xl space-y-8">
            {/* Personal Information Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-accent-purple" />
                <h3 className="text-xl font-semibold text-white">Personal Information</h3>
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
                <Calendar className="w-5 h-5 text-accent-purple" />
                <h3 className="text-xl font-semibold text-white">Birth Date</h3>
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
                <Clock className="w-5 h-5 text-accent-blue" />
                <h3 className="text-xl font-semibold text-white">Birth Time</h3>
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
                  <p className="text-sm text-red-400 animate-fade-in">{errors.utc.message}</p>
                )}
              </div>
            </div>

            {/* Location Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-accent-gold" />
                <h3 className="text-xl font-semibold text-white">Place of Birth</h3>
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
                <Settings className="w-5 h-5 text-white/70" />
                <h3 className="text-xl font-semibold text-white">Calculation Settings</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 animate-fade-in">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
