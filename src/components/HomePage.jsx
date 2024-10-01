import React, { useState, useEffect, useRef } from "react";
export default function HomePage(props) {
  const { setFile, setAudioStream } = props;
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);
  const mediaRecorder = useRef(null);

  const mimeType = "audio/webm";
  async function startRecording() {
    let tempStream;
    console.log("Start Recording");
    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      tempStream = streamData;
    } catch (err) {
      console.log(err.message);
      return;
    }

    setRecordingStatus("recording");
    console.log(recordingStatus);

    const media = new MediaRecorder(tempStream, { type: mimeType });
    mediaRecorder.current = media;

    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (e) => {
      if (typeof e.data === "undefined") {
        return;
      }
      if (e.data.size === 0) {
        return;
      }
      localAudioChunks.push(e.data);
    };
    setAudioChunks(localAudioChunks);
  }
  async function stopRecording() {
    setRecordingStatus("inactive");
    console.log("Stopped recording");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudioStream(audioBlob);
      setAudioChunks([]);
      setDuration(0);
    };
  }
  useEffect(() => {
    if (recordingStatus === "inactive") {
      return;
    }
    const interval = setInterval(() => {
      setDuration((curr) => curr + 1);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <main className="flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Sound
        <span className="text-purple-400 bold">Scribe</span>
      </h1>
      <h3 className="font-medium md:text-lg">
        Record
        <span className="text-purple-400">&rarr;</span> Transcribe
        <span className="text-purple-400">&rarr;</span> Translate
      </h3>
      <button
        onClick={
          recordingStatus === "recording" ? stopRecording : startRecording
        }
        className="flex specialBtn px-4 px-2 items-center text-base justify-between p-2 rounded-lg gap-4 mx-auto w-72 max-w-full my-4"
      >
        <p>{recordingStatus === "inactive" ? "Record" : "Stop recording"}</p>
        {duration != 0 && <p className="text-sm">{duration}s</p>}
        <i
          className={
            "fa-solid fa-microphone duration-200 " +
            (recordingStatus === "recording" ? "text-rose-300" : "")
          }
        ></i>
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
            accept=".mp3,.wav,.m4a"
          />
        </label>
        a mp3 file
      </p>
      <p className="italic text-slate-300">
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
