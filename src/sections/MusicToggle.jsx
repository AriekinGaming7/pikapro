import { useState, useRef, useEffect } from "react";
import { Music, Pause, VolumeX } from "lucide-react";
import musicFile from "../assets/MUSIC.mp3"; // ✅ adjust path if needed

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(true);   // autoplay on
  const [isMuted, setIsMuted] = useState(true);       // start muted
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

  return (
    <>
      <audio ref={audioRef} autoPlay loop muted>
        <source src={musicFile} type="audio/mpeg" />
      </audio>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 
                   p-3 sm:p-4 rounded-full 
                   bg-gradient-to-r from-purple-600 to-pink-500 
                   text-white hover:brightness-110 transition shadow-lg"
      >
        {isMuted ? (
          <VolumeX size={20} />
        ) : isPlaying ? (
          <Pause size={20} />
        ) : (
          <Music size={20} />
        )}
      </button>
    </>
  );
}
