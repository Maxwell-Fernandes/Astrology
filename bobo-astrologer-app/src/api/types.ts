// Define all API request/response interfaces
export interface ChartInput {
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
}

export interface HouseData {
  house_number: number;
  cusp_degree: number;
  sign: string;
  planets_on_cusp: string[];
  lord: string;
}

export interface ChartResponse {
  planets_data: PlanetData[];
  houses_data: HouseData[];
  planet_significators: Record<string, any>;
  house_significators: Record<string, any>;
  planetary_aspects: any[];
  vimshottari_dasa_table: any[];
  consolidated_chart_data: any;
  matched_time?: string;
}