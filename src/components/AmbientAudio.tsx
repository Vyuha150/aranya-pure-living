import { useEffect, useRef } from "react";
import introAudioUrl from "@/assets/bamboo-intro.mp3";

/**
 * Plays the Aranya bamboo greeting once when the site opens.
 * Browsers block sound until a user gesture, so we try autoplay
 * first and fall back to the first tap/click/keypress.
 */
export function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.6;

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
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={introAudioUrl}
      preload="auto"
      aria-hidden="true"
      className="hidden"
    />
  );
}
