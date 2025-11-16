// Define all API request/response interfaces
export interface ChartInput {
  name?: string;
  place_of_birth?: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  utc: string;
  latitude: number;
  longitude: number;
  ayanamsa?: string;
  house_system?: string;
  return_style?: string | null;
}

export interface HoraryChartInput extends ChartInput {
  horary_number: number;
}

export interface PlanetData {
  name: string;
  longitude: number;
  sign: string;
  sign_degree: number;
  house: number;
  retrograde: boolean;
  velocity: number;
  rasi_lord?: string;
  nakshatra?: string;
  nakshatra_lord?: string;
}

export interface HouseData {
  house_number: number;
  cusp_degree: number;
  sign: string;
  planets_on_cusp: string[];
  lord: string;
}

export interface Significator {
  A: string[];
  B: string[];
  C: string[];
  D: string[];
}

export interface PlanetaryAspect {
  planet1: string;
  planet2: string;
  aspect_type: string;
  angle: number;
  orb: number;
}

export interface DasaPeriod {
  planet: string;
  start_date: string;
  end_date: string;
  level: number;
  duration_years?: number;
  sub_periods?: DasaPeriod[];
}

export interface ConsolidatedChartData {
  [key: string]: unknown;
}

export interface ChartResponse {
  planets_data: PlanetData[];
  houses_data: HouseData[];
  planet_significators: Record<string, Significator>;
  house_significators: Record<string, Significator>;
  planetary_aspects: PlanetaryAspect[];
  vimshottari_dasa_table: DasaPeriod[];
  consolidated_chart_data: ConsolidatedChartData;
  matched_time?: string;
}