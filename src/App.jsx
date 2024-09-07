import { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import FileDisplay from "./components/FileDisplay";
import Translation from "./components/Translation";
import Transcribing from "./components/Transcribing";

function App() {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutPut] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAudioAvailable = file || audioStream;

  function resetAudioHandler() {
    setFile(null);
    setAudioStream(null);
  }
  useEffect(() => {
    console.log(audioStream);
  }, [audioStream]);
  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        {output ? (
          <Translation />
        ) : loading ? (
          <Transcribing />
        ) : isAudioAvailable ? (
          <FileDisplay
            resetAudioHandler={resetAudioHandler}
            file={file}
            audioStream={audioStream}
          />
        ) : (
          <HomePage setFile={setFile} setAudioStream={setAudioStream} />
        )}
      </section>
    </div>
  );
}

export default App;
