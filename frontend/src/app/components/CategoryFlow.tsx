"use client";

import { motion, useReducedMotion } from "framer-motion";

const serviceItems = [
  "RESIDENTIAL",
  "COMMERCIAL",
  "HEALTHCARE",
  "LANDSCAPE",
  "INSTITUTIONAL",
  "HOSPITALITY",
  "DEVELOPMENT",
  "CULINARY",
  "CORPORATE",
  "VALUATION",
  "ESTIMATION",
  "DRAFTING",
];

export function CategoryFlow() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="category-flow" aria-label="Service list">
      <div className="category-flow-anchor">
        <span className="eyebrow !text-[var(--lime)]">Service list</span>
        <strong>Built for every project.</strong>
      </div>
      <div className="category-flow-items">
        <motion.div
          className="category-flow-list"
          animate={reducedMotion ? { y: 0 } : { y: ["-15.5rem", 0] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: reducedMotion ? 0 : Infinity }}
        >
          {serviceItems.slice(0, 10).map(item => <span key={item} className="category-flow-item">{item}</span>)}
        </motion.div>
      </div>
    </div>
  );
}
