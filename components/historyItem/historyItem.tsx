"use client";
import Link from "next/link";
import React from "react";
import { saveAs } from "file-saver";
import { deleteTmy } from "@/lib/deleteTmy";

type Props = {
  project_name: string;
  id: string;
  filePath: string;
  setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
};

function HistoryItem({ project_name, id, filePath, setDeleted }: Props) {
  const deleteTmyItem = () => {
    console.log("🚀 ~ file: historyItem.tsx:14 ~ HistoryItem ~ id:", id);

    deleteTmy(id).then((res) => {
      console.log(res)
      setDeleted(prev => !prev)
    });
  };
  return (
    <li>
      <div className="flex items-center justify-between gap-1 p-2 text-gray-900 text-sm rounded-lg dark:text-white hover:bg-gray-100 hover:border-2 hover:border-gray-700 dark:hover:bg-gray-700 group">
        <div className=" w-2/3">
          <span className="ml-3 overflow-ellipsis">{project_name}</span>
        </div>
        <div className="flex gap-2 w-1/3">
          <a href={filePath}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="cursor-pointer w-5 h-5 hover:bg-gray-300 text-gray-600 hover:text-black rounded-sm"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
          </a>
          <svg
            onClick={deleteTmyItem}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="cursor-pointer w-5 h-5 hover:bg-gray-300 text-gray-600 hover:text-black rounded-sm"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </div>
      </div>
    </li>
  );
}

export default HistoryItem;
