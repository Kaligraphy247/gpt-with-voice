"use client";

// ? docs
// https://aplayer.js.org/#/home?id=installation
// https://github.com/MoePlayer/react-aplayer#react-aplayer
// https://hiitea.io/react-aplayer/
// https://bestofjs.org/projects/amplitudejs

import ReactAplayer from "react-aplayer";

export default function Player() {
  const props = {
    theme: "#ef8f3a",
    lrcType: 0,
    loop: "none",
    autoplay: false,
    mini: true,
    // fixed: true,
    audio: [
      {
        name: "Audio Playback",
        artist: "Unknown",
        url: "https://storage.googleapis.com/ai-doc-uploads/some_file/test.mp3",
        cover: "",
        // lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.lrc',
        theme: "#ef8f3a",
      },
    ],
  };

  return (
    <div className="border-0 border-red-500">
      <ReactAplayer {...props} />
    </div>
  );
}
