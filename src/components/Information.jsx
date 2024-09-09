import React, { useState } from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";

export default function Information() {
  const [tab, setTab] = useState("transcription");
  return (
    <main className="flex-1 p-4 flex flex-col gap-3 text-center sm:w-96 sm:gap-4 md:gap-5 justify-center pb-20 w-full max-w-prose mx-auto">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap">
        Your
        <span className="text-purple-400 bold"> Transcription</span>
      </h1>
      <div className="grid grid-cols-2 sm:mx-auto bg-white  rounded overflow-hidden items-center p-1 purpleShadow border-[2px] border-solid border-purple-300">
        <button
          onClick={() => setTab("transcription")}
          className={
            "px-4 rounded duration-200 py-1 " +
            (tab === "transcription"
              ? " bg-purple-400 text-white"
              : " text-purple-400 hover:text-purple-600")
          }
        >
          Transcription
        </button>
        <button
          onClick={() => setTab("translation")}
          className={
            "px-4 rounded duration-200 py-1  " +
            (tab === "translation"
              ? " bg-purple-400 text-white"
              : " text-purple-400 hover:text-purple-600")
          }
        >
          Translation
        </button>
      </div>
      {tab === "transcription" ? <Transcription /> : <Translation />}
    </main>
  );
}
