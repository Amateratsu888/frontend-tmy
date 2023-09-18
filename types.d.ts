export interface Location {
  latitude: number;
  longitude: number;
  altitude: number;
}

export interface FetchedITmy {
  id: string;
  project_name: string;
  location: {
    latitude: number;
    longitude: number;
    altitude: number;
  };
  pv_system: {
    technology: "pv" | "tracker";
    pv?: {
      description: string;
      tilt: number;
      azimuth: number;
    };
    tracker?: {
      description: string;
      gcr: number;
      axis_azimuth: number;
      max_angle: number;
    };
  };
  analysis: {
    probabilities: {
      P50: boolean;
      P75: boolean;
      P90: boolean;
      P10: boolean;
      P99: boolean;
    };
    meteo_data: {
      ambient_temperature: boolean;
      pm_2_5: boolean;
      pm_10: boolean;
      relative_humidity: boolean;
      precipitable_water: boolean;
      wind_direction: boolean;
    };
    granularity:
      | "5 minutes"
      | "10 minutes"
      | "15 minutes"
      | "30 minutes"
      | "1 hour";
  };
}

export interface FormData {
  projectName: string;
  location: {
    latitude: number;
    longitude: number;
    altitude: number;
  };
  technology: "pv" | "tracker";
  pv?: {
    description: string;
    tilt: number;
    azimuth: number;
  };
  tracker?: {
    description: string;
    gcr: number;
    axisAzimuth: number;
    maxAngle: number;
  };
  requestId: string;
  probabilities: string[];
  meteoData: string[];
  granularity: | "5 minutes"
  | "10 minutes"
  | "15 minutes"
  | "30 minutes"
  | "1 hour";
}
