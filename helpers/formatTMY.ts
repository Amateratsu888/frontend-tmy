import { FetchedITmy, FormData } from "@/types";

export function formatTMYObject(input: FormData): FetchedITmy {
    const convertedObject: Partial <FetchedITmy> = {
      project_name: input.projectName,
      location: {
        latitude: input.location.latitude,
        longitude: input.location.longitude,
        altitude: input.location.altitude,
      },
      pv_system: {
        technology: input.technology,
        
      },
      analysis: {
        probabilities: {
          P50: input.probabilities.includes("P50")? true: false,
          P75: input.probabilities.includes("P75")? true: false,
          P90: input.probabilities.includes("P90")? true: false,
          P10: input.probabilities.includes("P10")? true: false,
          P99: input.probabilities.includes("P99")? true: false,
        },
        meteo_data: {
          ambient_temperature: input.meteoData.includes("ambient_temperature")? true: false,
          pm_2_5: input.meteoData.includes("pm_2_5")? true: false,
          pm_10: input.meteoData.includes("pm_10")? true: false,
          relative_humidity:  input.meteoData.includes("relative_humidity")? true: false,
          precipitable_water:  input.meteoData.includes("precipitable_water")? true: false,
          wind_direction:  input.meteoData.includes("wind_direction")? true: false,
        },
        granularity: input.granularity,
      },
    };
    if(input.pv && input.technology === "pv" ){
        convertedObject.pv_system.pv =  {
            description: input.pv.description,
            tilt: input.pv.tilt,
            azimuth: input.pv.azimuth,
          }
    }else if(input.tracker && input.technology === "tracker") {
        convertedObject.pv_system.tracker =  {
            description: input.tracker.description,
            gcr: input.tracker.gcr,
            axis_azimuth: input.tracker.axisAzimuth,
            max_angle: input.tracker.maxAngle,
          }
        }
  
    return convertedObject;
  }
  
  