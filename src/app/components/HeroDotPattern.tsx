import { motion } from "motion/react";

// Generate random positions for eye icons
const generateDots = (count: number) => {
  const dots = [];
  for (let i = 0; i < count; i++) {
    dots.push({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 8 + 12, // 12-20px (larger than dots for visibility)
      animationDelay: Math.random() * 10, // 0-10s delay
      shouldAnimate: Math.random() > 0.5, // ~50% of icons animate
      duration: Math.random() * 6 + 6, // 6-12s duration
      moveX: (Math.random() - 0.5) * 20, // random horizontal movement -10 to 10px
      moveY: (Math.random() - 0.5) * 20, // random vertical movement -10 to 10px
    });
  }
  return dots;
};

const dots = generateDots(100);

export function HeroDotPattern() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ 
        opacity: 0.7,
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
      }}
    >
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            filter: 'drop-shadow(0 0 4px rgba(132, 184, 82, 0.6))',
          }}
          initial={{ 
            opacity: 0.2,
            scale: 1,
          }}
          animate={
            dot.shouldAnimate
              ? {
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.3, 1],
                  x: [0, dot.moveX, 0],
                  y: [0, dot.moveY, 0],
                }
              : {
                  opacity: 0.2,
                }
          }
          transition={
            dot.shouldAnimate
              ? {
                  duration: dot.duration,
                  repeat: Infinity,
                  delay: dot.animationDelay,
                  ease: "easeInOut",
                }
              : {}
          }
        >
          <svg
            width={dot.size}
            height={dot.size * (18/28)}
            viewBox="0 0 28 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.8086 0C17.4429 2.68069e-05 20.6112 1.66681 23.04 3.56445C25.4689 5.46224 27.1599 7.59161 27.8389 8.51562C28.0502 8.80353 28.0546 9.1735 27.8496 9.46582C27.1967 10.3967 25.5687 12.53 23.1631 14.4307C20.7575 16.3314 17.5735 18 13.8086 18C10.0273 18.0001 6.90761 16.3173 4.58398 14.4062C2.26061 12.4955 0.732645 10.3563 0.134758 9.44238C-0.0487916 9.16175 -0.0444759 8.81557 0.1455 8.53906C0.769263 7.63184 2.36084 5.49671 4.708 3.58887C7.05509 1.68123 10.1589 0.000120002 13.8086 0ZM14.2598 4.16211C14.1384 3.945 13.7337 3.94748 13.6074 4.16211C13.0457 5.117 11.7828 6.60338 9.28905 6.85742C9.11679 6.87505 8.98125 7.01178 9.00195 7.17383C9.57471 11.6052 12.9406 13.8424 13.6357 14.1699C13.8343 14.2634 14.0329 14.2635 14.2314 14.1699C14.9266 13.8424 18.3071 11.9923 18.8682 7.17285C18.8869 7.01127 18.7521 6.8697 18.5801 6.85742C16.1654 6.6261 14.7937 5.11702 14.2598 4.16211Z" fill="#BADE6C"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}