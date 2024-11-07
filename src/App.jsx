import { useState, useRef, useEffect } from "react";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import FileDisplay from "./components/FileDisplay";
import Information from "./components/Information";
import Transcribing from "./components/Transcribing";
import { MessageTypes } from "./utils/presets";

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(null); // New error state

  const isAudioAvailable = file || audioStream;

  function handleAudioReset() {
    setFile(null);
    setAudioStream(null);
  }

  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("./utils/whisper-worker.js", import.meta.url),
        {
          type: "module",
        }
      );
    }

    const onMessageReceived = async (e) => {
      console.log(e.data.type);
      switch (e.data.type) {
        case "DOWNLOADING":
          setDownloading(true);
          setError(null); // Reset any previous error
          console.log("DOWNLOADING");
          break;
        case "LOADING":
          setLoading(true);
          setError(null); // Reset any previous error
          console.log("LOADING");
          break;
        case "RESULT":
          setOutput(e.data.results);
          console.log(e.data.results);
          break;
        case "INFERENCE_DONE":
          setFinished(true);
          console.log("DONE");
          break;
        case "ERROR":
          setError("Failed to load the model. Please try again.");
          setLoading(false);
          console.log("ERROR: Model couldn't be loaded.");
          break;
        default:
          console.log("The model not able to load properly", f.data.status);
      }
    };

    worker.current.addEventListener("message", onMessageReceived);

    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  async function readAudioFrom(file) {
    const sampling_rate = 16000;
    const audioCTX = new AudioContext({ sampleRate: sampling_rate });
    const response = await file.arrayBuffer();
    const decoded = await audioCTX.decodeAudioData(response);
    const audio = decoded.getChannelData(0);
    return audio;
  }

  async function handleFormSubmission() {
    if (!file && !audioStream) {
      return;
    }

    let audio = await readAudioFrom(file ? file : audioStream);
    const model_name = `openai/whisper-small.en`;

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name,
    });
  }

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        {error ? ( // Show error message if any
          <div className="text-red-500 text-center mt-4">{error}</div>
        ) : output ? (
          <Information output={output} finished={finished} />
        ) : loading ? (
          <Transcribing />
        ) : isAudioAvailable ? (
          <FileDisplay
            handleFormSubmission={handleFormSubmission}
            handleAudioReset={handleAudioReset}
            file={file}
            audioStream={audioStream}
          />
        ) : (
          <HomePage setFile={setFile} setAudioStream={setAudioStream} />
        )}
      </section>
      <footer></footer>
    </div>
  );
}

export default App;
