import React from "react";
export default function FileDisplay(props) {
  const { resetAudioHandler, file, audioStream } = props;
  return (
    <main className="flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 md:gap-5 justify-center pb-20 w-fir max-w-full mx-auto">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
        Your
        <span className="text-purple-400 bold">File</span>
      </h1>
      <div className="mx-auto flex flex-col text-left my-4">
        <h3 className="font-semibold">Name - </h3>

        <p>{file.name}</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <button
          className="text-slate-400 hover:text-purple-600 duration-200"
          onClick={resetAudioHandler}
        >
          Reset
        </button>
        <button className="specialBtn p-2 flex items-center gap-2 font-medium rounded-lg text-purple-400">
          <p>Transcribe</p>
          <i className="fa-solid fa-pencil"></i>
        </button>
      </div>
    </main>
  );
}
