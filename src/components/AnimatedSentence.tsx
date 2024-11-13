import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

// Register the TextPlugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

type Props = {
  sentences?: string[];
};

const TypewriterAnimation = ({
  sentences = [
    "Enter a location below. ",
    "Enter a location below. ",
    "Enter a location below. ",
  ],
}) => {
  const elementRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !elementRef.current || !cursorRef.current) return;

    // Cursor blinking animation
    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    // Text animation timeline
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
    });

    sentences.forEach((sentence) => {
      // Type each letter
      tl.to(elementRef.current, {
        duration: sentence.length * 0.1,
        text: {
          value: sentence,
          delimiter: "",
        },
        ease: "none",
      })
        // Hold the complete sentence
        .to({}, { duration: 1.5 })
        // Delete the sentence
        .to(elementRef.current, {
          duration: sentence.length * 0.05,
          text: {
            value: "",
            delimiter: "",
          },
          ease: "none",
        })
        // Pause before next sentence
        .to({}, { duration: 0.5 });
    });

    return () => {
      tl.kill();
    };
  }, [sentences, mounted]);

  return (
    <>
      <span ref={elementRef} className="mr-1"></span>
      <span ref={cursorRef} className=""></span>
    </>
  );
};

export default TypewriterAnimation;
