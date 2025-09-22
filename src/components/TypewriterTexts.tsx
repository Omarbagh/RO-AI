"use client";

import { useState, useEffect } from "react";

// Define the properties for the TypewriterTexts component
interface TypewriterTextsProps {
  texts: string[];
  speed?: number;
  delay?: number;
  deleteDelay?: number;
  className?: string;
}

const TypewriterTexts: React.FC<TypewriterTextsProps> = ({
  texts,
  speed = 150, // Speed of typing in milliseconds
  delay = 2200, // Delay after typing a text
  deleteDelay = 80, // Speed of deleting in milliseconds
  className = "",
}) => {
  // State to keep track of the current text index
  const [textIndex, setTextIndex] = useState(0);
  // State to manage the currently displayed text
  const [displayedText, setDisplayedText] = useState("");
  // State to determine if the component is deleting text
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[textIndex];

      // If deleting, remove characters
      if (isDeleting) {
        if (displayedText.length > 0) {
          setDisplayedText((prev) => prev.slice(0, -1));
        } else {
          // Finished deleting, move to the next text
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      } else {
        // If typing, add characters
        if (displayedText.length < currentText.length) {
          setDisplayedText((prev) => currentText.slice(0, prev.length + 1));
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), delay);
        }
      }
    };

    // Determine the timeout delay based on the current action
    const timeout = isDeleting ? deleteDelay : speed;

    const timer = setTimeout(handleTyping, timeout);

    // Cleanup the timer on component unmount or re-render
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, textIndex, texts, speed, delay, deleteDelay]);

  return (
    <span className={`bg-gradient-to-r from-[#4F46E5] to-indigo-400 bg-clip-text text-transparent ${className}`}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypewriterTexts;