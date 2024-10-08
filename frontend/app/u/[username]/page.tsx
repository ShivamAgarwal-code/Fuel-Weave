"use client";

import React, { useState, useEffect } from "react";
import Right from "@/components/Right";
import ProfileCover from "@/components/ProfileCover";
import Left from "@/components/Left";
import ButtonForProfile from "@/components/ButtonForProfile";
import { config } from "@/config";

export default function Page({ params }: any) {
  const { username } = params;
  const [data, setData] = useState();

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const fetchProfileDetails = async () => {
    try {
      let handle = username;
      while (handle.length < 15) {
        handle = handle + " ";
      }
      const response = await fetch(`${config.baseUrl}/profile/details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ handle: handle }),
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="coverPage">
        <ProfileCover />
      </div>
      <div className="flex flex-col md:flex-row mt-[2rem] container mx-auto max-w-screen-xl space-y-6">
        <div className="left items-center md:w-1/3">
          <Left data={data} />
        </div>
        <div className="right w-full space-y-3 md:w-2/3 ">
          <ButtonForProfile />
          <Right profiledetails={data} />
        </div>
      </div>
    </div>
  );
}
