import { ArrowRightCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useState } from "react";
import { FetchedITmy } from "@/types";
import HistoryItem from "../historyItem/HistoryItem";

type Props = {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  tmyList: FetchedITmy[];
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({
  openSidebar,
  setOpenSidebar,
  tmyList,
  setDeleted,
}: Props) => {
  return (
    <>
      {openSidebar ? (
        <div className="relative h-screen overflow-y-scroll w-[400px] bg-white p-4">
          <XCircleIcon
            className="absolute w-6 text-black top-0 md:hidden right-0 m-2 cursor-pointer"
            onClick={() => setOpenSidebar(false)}
          />
          <div className=" bg-gray-200 rounded-xl">
              <span
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <span className="ml-3 text-xs"> Projects List</span>
              </span>
            </div>

          {tmyList.map((tmy, index) => {
            const path = `https://tmy-flask-s3.s3.amazonaws.com/tmy-files/${tmy.project_name}.yml`;
            return (
              <HistoryItem
                setDeleted={setDeleted}
                key={index}
                project_name={tmy.project_name}
                id={tmy.id}
                filePath={path}
              />
            );
          })}
        </div>
      ) : (
        <div className="h-24">
          <ArrowRightCircleIcon
            className="w-10 text-black cursor-pointer"
            onClick={() => setOpenSidebar(true)}
          />
        </div>
      )}
    </>
  );
};

export default Sidebar;
