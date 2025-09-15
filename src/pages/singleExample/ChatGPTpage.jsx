import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../styles/stylesheet.css"; // import the CSS file

// Mock Tweets
const tweetsThem = [
  { id: 1, text: "This is a short tweet." },
  {
    id: 2,
    text: "This is a much longer tweet that might be part of a thread. It should be scrollable when expanded. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque euismod, lorem at bibendum facilisis, nunc ligula tincidunt purus, nec commodo ligula nulla non magna."
  },
  { id: 3, text: "Another short one." }
];

const tweetsUs = [
  { id: 1, text: "Our counterpoint tweet." },
  {
    id: 2,
    text: "Our longer response tweet that explains things more fully. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus, sapien vitae suscipit placerat, lorem erat bibendum nulla, at sollicitudin justo nibh eu velit."
  }
];

// Tweet card component
function TweetCard({ text }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-72 max-h-48 flex flex-col bg-white shadow rounded-2xl p-4 overflow-hidden">
      <div
        className={`transition-all duration-300 ${
          expanded ? "max-h-64 overflow-y-auto" : "max-h-24 overflow-hidden"
        }`}
      >
        {text}
      </div>
      <button
        className="text-blue-500 mt-2 text-sm self-start"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
}

// Carousel component
function TweetCarousel({ tweets }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? tweets.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === tweets.length - 1 ? 0 : i + 1));

  return (
    <div className="flex items-center gap-2">
      <button onClick={prev} className="p-2 bg-gray-200 rounded-full">
        <ChevronLeft size={20} />
      </button>
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
      >
        <TweetCard text={tweets[index].text} />
      </motion.div>
      <button onClick={next} className="p-2 bg-gray-200 rounded-full">
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

// Main Page
export default function App() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <p className="font-bold">Claim:</p>
        <p className="pl-6 text-gray-700">This is the claim text, indented.</p>
      </div>

      <div>
        <p className="font-bold">Example:</p>
        <p className="pl-6 text-gray-700">This is the example text, indented.</p>
      </div>

      <div>
        <p className="font-bold mb-2">Them:</p>
        <TweetCarousel tweets={tweetsThem} />
      </div>

      <div>
        <p className="font-bold mb-2">Us:</p>
        <TweetCarousel tweets={tweetsUs} />
      </div>
    </div>
  );
}
