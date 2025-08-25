import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Music, Pause, VolumeX } from "lucide-react";
import musicFile from "../assets/MUSIC.mp3";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {
        console.log("Autoplay blocked — waiting for user interaction.");
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      <audio ref={audioRef} autoPlay loop muted>
        <source src={musicFile} type="audio/mpeg" />
      </audio>

      <button
        aria-label={isMuted ? "Unmute music" : isPlaying ? "Pause music" : "Play music"}
        onClick={() => setIsPlaying((p) => !p)}
        className="fixed z-50 p-3 sm:p-4 rounded-full 
                   bg-gradient-to-r from-purple-600 to-pink-500 
                   text-white hover:brightness-110 transition shadow-lg
                   top-4 right-4 sm:top-6 sm:right-6"
        style={{
          right: "calc(env(safe-area-inset-right, 0px) + 16px)",
          top: "calc(env(safe-area-inset-top, 0px) + 16px)",
          maxWidth: "100vw",
        }}
      >
        {isMuted ? <VolumeX size={20} /> : isPlaying ? <Pause size={20} /> : <Music size={20} />}
      </button>
    </>,
    document.body
  );
}
