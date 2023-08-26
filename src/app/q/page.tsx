"use client";
import React from "react";
import Player from "@/app/components/player";

// @ts-ignore
import ReactAplayer from "react-aplayer";
import { useContext } from "react";
import { UserContext, User } from "@/app/components/UserContext";

export default function Q() {
  const { ...data } = useContext(UserContext);
  // console.log("Data: ", data)
  return (
    <div>
      <p>Q</p>
      {/* <p>Email: {data.user.email}</p>
      <button onClick={() => data.setUser({email: "test@mail.com", token: data.user.token})}>Set Email</button>
      <p>Token: {data.user.token}</p>
      <button onClick={() => data.setUser({email: data.user.token, token: "test@mail.com"})}>Swap</button> */}
      {/* <Player /> */}
    </div>
  );
}
