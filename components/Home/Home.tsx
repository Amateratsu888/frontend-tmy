"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Form from "../Form/Form";
import { fetchTmy } from "@/lib/fetchTmy";
import { FetchedITmy } from "@/types";

type Props = {};

const HomePage = (props: Props) => {
    const [openSidebar, setOpenSidebar] = useState<boolean>(true)
    const [submitted, setSubmitted] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [tmyList, setTmyList] = useState<FetchedITmy[]>([]);
  
  useEffect(() => {
    const res = fetchTmy().then(res => setTmyList(res));
  }, [submitted, deleted]);

  return (
    <>
    <div className="w-full flex">
      <Sidebar setDeleted={setDeleted} tmyList={tmyList} openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}/>
      <Form submitted={submitted} setSubmitted={setSubmitted}/>
    </div>
    </>
  );
};

export default HomePage;
