"use client";

import { motion, type Variants } from "framer-motion";

interface RevealTextProps {
  text: string;
  /** Balise englobante (span par défaut pour composer des titres mixtes). */
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** Délai avant la première lettre, en secondes. */
  delay?: number;
  /** Interval entre chaque lettre, en secondes. */
  stagger?: number;
}

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "0.55em",
    rotateX: -55,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Reveal typographique lettre à lettre — chaque caractère se "tisse" en
 * place comme un fil tendu : légère bascule 3D, montée et mise au point.
 * Le découpage mot par mot préserve les retours à la ligne naturels.
 */
export default function RevealText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.028,
}: RevealTextProps) {
  const words = text.split(" ");
  let letterIndex = 0;

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        style={{ display: "inline-block", perspective: "600px" }}
      >
        {words.map((word, wordIdx) => (
          <span key={wordIdx} style={{ display: "inline-block", whiteSpace: "pre" }}>
            {Array.from(word).map((letter, i) => {
              letterIndex += 1;
              return (
                <motion.span
                  key={`${wordIdx}-${i}-${letterIndex}`}
                  variants={letterVariants}
                  style={{
                    display: "inline-block",
                    transformOrigin: "bottom center",
                    willChange: "transform, opacity, filter",
                  }}
                >
                  {letter}
                </motion.span>
              );
            })}
            {wordIdx < words.length - 1 ? " " : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
