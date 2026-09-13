import { useEffect, useRef } from "react";
import introAudio from "@/assets/bamboo-intro.mp3.asset.json";

/**
 * Plays the Aranya bamboo greeting once when the site opens.
 * Browsers block sound until a user gesture, so we try autoplay
 * first and fall back to the first tap/click/keypress.
 */
export function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(introAudio.url);
    audio.volume = 0.6;
    audio.preload = "auto";
    audioRef.current = audio;

    const tryPlay = () => {
      if (playedRef.current) return;
      audio
        .play()
        .then(() => {
          playedRef.current = true;
          removeListeners();
        })
        .catch(() => {
          /* autoplay blocked — wait for first gesture */
        });
    };

    const removeListeners = () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };

    const onGesture = () => tryPlay();

    tryPlay();
    window.addEventListener("pointerdown", onGesture);
    window.addEventListener("keydown", onGesture);

    return () => {
      removeListeners();
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  return null;
}
