import React from "react";
export default function HomePage(props) {
  const { setFile, setAudioStream } = props;
  return (
    <main className="flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 md:gap-5 justify-center pb-20">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Sound
        <span className="text-purple-400 bold">Scribe</span>
      </h1>
      <h3 className="font-medium md:text-lg">
        Record
        <span className="text-purple-400">&rarr;</span> Transcribe
        <span className="text-purple-400">&rarr;</span> Translate
      </h3>
      <button className="flex specialBtn px-4 items-center text-base justify-between p-2 rounded-lg gap-4 mx-auto w-72 max-w-full my-4">
        <p>Record</p>
        <i className="fa-solid fa-microphone"></i>
      </button>
      <p className="text-base">
        Or&nbsp;
        <label className="text-purple-400 cursor-pointer hover:text-purple-600 duration-200">
          upload{" "}
          <input
            onChange={(e) => {
              const tempFile = e.target.files[0];
              setFile(tempFile);
            }}
            className="hidden"
            type="file"
            accept=".mp3,.wav"
          />
        </label>
        a mp3 file
      </p>
      <p className="italic text-500">
        Made with
        <span>
          <i
            className="fa-solid fa-heart mx-1"
            style={{ color: "#ec0404;" }}
          ></i>
        </span>
        by Abhinav
      </p>
    </main>
  );
}
