import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../styles/stylesheet.css"; // import the CSS file


import TweetCard from "./TweetCard.jsx";

// Carousel component
export default function TweetCarousel({ tweets, displayedDate, currentIndex }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? tweets.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === tweets.length - 1 ? 0 : i + 1));

  return (
    <div className="flex items-center gap-2">
      <button onClick={prev} className="p-2 bg-gray-200 rounded-full">
        <ChevronLeft size={20} />
      </button>
      <motion.div
        key={displayedDate + currentIndex + index}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
      >
        <TweetCard tweetId={ tweets[index].id } />
      </motion.div>
      <button onClick={next} className="p-2 bg-gray-200 rounded-full">
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
