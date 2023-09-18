"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import MapContainer from "../MapContainer/MapContainer";
import { FormData, Location } from "@/types";
import { formatTMYObject } from "@/helpers/formatTMY";
import { createNewTmy } from "@/lib/createNewTmy";

// Define an interface for the form data

type Props = {
  submitted: boolean;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
};

const Form = ({ submitted, setSubmitted }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    register,
  } = useForm<FormData>(); // Specify the form data interface

  const initialLocation = {
    latitude: 14.758216480168818,
    longitude: -17.439841380863278,
    altitude: 0,
  };

  const [latitude, setLatitude] = useState<number>(initialLocation.latitude);
  const [longitude, setLongitude] = useState<number>(initialLocation.longitude);
  const [altitude, setAltitude] = useState<number>(initialLocation.altitude);
  const [technology, setTechnology] = useState<"pv" | "tracker">("pv");
  const watchTechnology = watch("technology", "pv");

  const onSubmit = (data: FormData) => {
    setSubmitted(true);
    const formattedData = formatTMYObject(data);
    createNewTmy(formattedData).then(() => setSubmitted(false));
  };

  const changeAltitude = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAltitude(parseInt(e.target.value));
  };

  const changeLatitude = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(parseInt(e.target.value));
  };

  const changeLongitude = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongitude(parseInt(e.target.value));
  };

  const changeTechnology = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTechnology(e.target.value as typeof technology);
  };

  return (
    <div className="h-screen overflow-y-auto w-full bg-zinc-200 text-zinc-600">
      <div className="w-full flex justify-center pt-4">
      <span className="text-xl font-semibold text-center">TMY Yaml generator</span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-4 space-y-10"
      >
        <div>
          <h2 className="text-lg font-semibold my-5">Project Details</h2>
          <div className=" w-[80%] md:w-[350px] flex items-center justify-between mb-2">
            <label>Project Name :</label>
            <input
              type="text"
              {...register("projectName", { required: true, maxLength: 50 })}
              className="text-black p-2 rounded-sm"
            />
          </div>
          {errors.projectName && (
            <span className="text-red-500">This field is required.</span>
          )}
        </div>

        <div>
          <h2 className=" text-lg font-semibold">Site Location Details</h2>
          <div className="relative flex flex-col space-y-5">
            <div className="relative h-[400px] m-4">
              <MapContainer
                latitude={latitude}
                setLatitude={setLatitude}
                longitude={longitude}
                setLongitude={setLongitude}
                altitude={altitude}
                setAltitude={setAltitude}
              />
            </div>
            {/* Add inputs for Latitude, Longitude, and Altitude */}
            <div className=" w-[70%] md:w-[300px] flex items-center justify-between mb-2">
              <label>Latitude:</label>
              <input
                type="number"
                {...register("location.latitude", {
                  required: true,
                  min: -90,
                  max: 90,
                  valueAsNumber: true,
                })}
                value={latitude}
                onChange={changeLatitude}
                className="text-gray-500 p-2 rounded-sm"
              />
            </div>
            {errors.location?.latitude && (
              <span className="text-red-500">
                Latitude must be between -90 and 90 degrees.
              </span>
            )}

            <div className=" w-[70%] md:w-[300px] flex items-center justify-between">
              <label>Longitude:</label>
              <input
                type="number"
                {...register("location.longitude", {
                  required: true,
                  min: -180,
                  max: 180,
                  valueAsNumber: true,
                })}
                value={longitude}
                onChange={changeLongitude}
                className="text-gray-500 p-2 rounded-sm"
              />
            </div>
            {errors.location?.longitude && (
              <span className="text-red-500">
                Longitude must be between -180 and 180 degrees.
              </span>
            )}

            <div className=" w-[70%] md:w-[300px] flex items-center justify-between">
              <label>Altitude: </label>
              <input
                type="number"
                {...register("location.altitude", {
                  required: true,
                  min: 0,
                  valueAsNumber: true,
                })}
                value={altitude}
                className="text-gray-500 p-2 rounded-sm"
                onChange={changeAltitude}
              />
            </div>
            {errors.location?.altitude && (
              <span className="text-red-500">
                Altitude must be 0 or greater.
              </span>
            )}
          </div>
        </div>

        <div className="lg:flex lg:justify-between lg:space-x-16 lg:items-center">
          <div>
            <h2 className="text-lg font-semibold my-5">
              PV System Configuration
            </h2>
            <div className=" w-[70%] md:w-[300px] flex items-center justify-between mb-5">
              <label>Technology :</label>
              <select
                {...register("technology", {
                  required: true,
                })}
                className="text-gray-500 p-2 rounded-sm"
              >
                <option>Choose a value</option>
                <option value="pv">PV</option>
                <option value="tracker">Tracker</option>
              </select>
            </div>

            {watch("technology") === "pv" && (
              <div className="flex flex-col space-y-5">
                <div className="w-[80%] md:w-[400px] flex items-center justify-between">
                  <label>Description :</label>
                  <input
                    type="text"
                    {...register("pv.description", { maxLength: 200 })}
                    className="text-gray-500 p-2 rounded-sm"
                  />
                </div>
                {errors.pv?.description && (
                  <span className="text-red-500">
                    Description is limited to 200 characters.
                  </span>
                )}

                <div className="w-[80%] md:w-[400px] flex items-center justify-between">
                  <label>Tilt (degrees) :</label>
                  <input
                    type="number"
                    {...register("pv.tilt", {
                      required: true,
                      min: 0,
                      max: 90,
                      valueAsNumber: true,
                    })}
                    className="text-gray-500 p-2 rounded-sm"
                  />
                </div>
                {errors.pv?.tilt && (
                  <span className="text-red-500">
                    Tilt must be between 0 and 90 degrees.
                  </span>
                )}

                <div className="w-[80%] md:w-[400px] flex items-center justify-between">
                  <label>Azimuth (degrees):</label>
                  <input
                    type="number"
                    {...register("pv.azimuth", {
                      required: true,
                      min: 0,
                      max: 360,
                      valueAsNumber: true,
                    })}
                    className="text-gray-500 p-2 rounded-sm"
                  />
                </div>
                {errors.pv?.azimuth && (
                  <span className="text-red-500">
                    Azimuth must be between 0 and 360 degrees.
                  </span>
                )}
              </div>
            )}

            {watch("technology") === "tracker" && (
              <div>
                <div className="w-[80%] md:w-[400px] flex items-center justify-between">
                  <label>Description :</label>
                  <input
                    type="text"
                    {...register("tracker.description", { maxLength: 200 })}
                    className="text-gray-500 p-2 rounded-sm"
                  />
                </div>
                {errors.tracker?.description && (
                  <span className="text-red-500">
                    Description must be between 0 and 1.
                  </span>
                )}

                <div className="w-[80%] md:w-[400px] flex items-center justify-between">
                  <label>GCR (degrees) :</label>
                  <input
                    type="number"
                    {...register("tracker.gcr", {
                      required: true,
                      min: 0,
                      max: 90,
                      valueAsNumber: true,
                    })}
                    className="text-gray-500 p-2 rounded-sm"
                  />
                </div>
                {errors.tracker?.gcr && (
                  <span className="text-red-500">
                    GCR must be between 0 and 90 degrees.
                  </span>
                )}

                <div className="w-[80%] md:w-[400px] flex items-center justify-between">
                  <label>Axis Azimuth (degrees) :</label>
                  <input
                    type="number"
                    {...register("tracker.axisAzimuth", {
                      required: true,
                      min: 0,
                      max: 360,
                      valueAsNumber: true,
                    })}
                    className="text-gray-500 p-2 rounded-sm"
                  />
                </div>
                {errors.tracker?.axisAzimuth && (
                  <span className="text-red-500">
                    Axis Azimuth must be between 0 and 360 degrees.
                  </span>
                )}

                <div className="w-[80%] md:w-[400px] flex items-center justify-between">
                  <label>Max Angle (degrees) :</label>
                  <input
                    type="number"
                    {...register("tracker.maxAngle", {
                      required: true,
                      min: 0,
                      max: 360,
                      valueAsNumber: true,
                    })}
                    className="text-gray-500 p-2 rounded-sm"
                  />
                </div>
                {errors.tracker?.maxAngle && (
                  <span className="text-red-500">
                    Max Angle must be between 0 and 360 degrees.
                  </span>
                )}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold my-5">Analysis Parameters</h2>

            <div className="mb-4">
              <label>Probabilities :</label>
            </div>
            <div className="flex space-x-6 mb-4">
              <label>
                <input
                  type="checkbox"
                  value="P50"
                  {...register("probabilities")}
                  className="text-gray-500 p-2 rounded-sm"
                />{" "}
                P50
              </label>
              <label>
                <input
                  type="checkbox"
                  value="P75"
                  {...register("probabilities")}
                  className="text-gray-500 p-2 rounded-sm"
                />{" "}
                P75
              </label>
              <label>
                <input
                  type="checkbox"
                  value="P90"
                  {...register("probabilities")}
                  className="text-gray-500 p-2 rounded-sm"
                />{" "}
                P90
              </label>
              <label>
                <input
                  type="checkbox"
                  value="P10"
                  {...register("probabilities")}
                  className="text-gray-500 p-2 rounded-sm"
                />{" "}
                P10
              </label>
              <label>
                <input
                  type="checkbox"
                  value="P99"
                  {...register("probabilities")}
                  className="text-gray-500 p-2 rounded-sm"
                />{" "}
                P99
              </label>
            </div>

            <div className="mb-2">
              <label>Meteo Data :</label>
            </div>
            <div className="flex flex-wrap space-x-4 space-y-2 items-center mb-6">
              <label>
                <input
                  type="checkbox"
                  value="ambient_temperature"
                  {...register("meteoData")}
                  className="text-gray-500 p-2 rounded-sm"
                />{" "}
                Ambient Temperature
              </label>
              <label>
                <input
                  type="checkbox"
                  value="pm_2_5"
                  {...register("meteoData")}
                  className="text-gray-500 p-2 rounded-sm"
                />{" "}
                PM_2_5
              </label>
              <label>
                <input
                  type="checkbox"
                  value="pm_10"
                  {...register("meteoData")}
                  className="text-gray-500 p-2 rounded-sm"
                />{" "}
                PM_10
              </label>
              <label>
                <input
                  type="checkbox"
                  value="relative_humidity"
                  {...register("meteoData")}
                  className="text-gray-500 p-2 rounded-sm"
                />{" "}
                Relative Humidity
              </label>
              <label>
                <input
                  type="checkbox"
                  value="precipitable_water"
                  {...register("meteoData")}
                  className="text-gray-500 p-2 rounded-sm"
                />{" "}
                Precipitable Water
              </label>
              <label>
                <input
                  type="checkbox"
                  value="wind_direction"
                  {...register("meteoData")}
                  className="text-gray-500 p-2 rounded-sm"
                />{" "}
                Wind Direction
              </label>
            </div>

            <div className="w-[60%] md:w-[250px] flex items-center justify-between">
              <label>Granularity :</label>
              <select
                {...register("granularity")}
                className="text-gray-500 p-2 rounded-sm"
              >
                <option value="5 minutes">5 minutes</option>
                <option value="10 minutes">10 minutes</option>
                <option value="15 minutes">15 minutes</option>
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
