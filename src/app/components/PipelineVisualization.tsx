import { motion, useAnimation } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { Rocket, GitCommit, Hammer, Scan, Zap, ShieldCheck } from "lucide-react";

const STAGE_DURATION = 2500; // ms per normal stage
const DEPLOY_HOLD    = 1500; // extra ms held on Deploy before reset sequence

const stages = [
  { name: "Deploy",    subtext: "shipped",         icon: Rocket      },
  { name: "Commit",    subtext: "push to main",    icon: GitCommit   },
  { name: "Build",     subtext: "compiling...",    icon: Hammer      },
  { name: "Scan",      subtext: "11 scanners",     icon: Scan        },
  { name: "Correlate", subtext: "findings ranked", icon: Zap         },
  { name: "Gate",      subtext: "severity: high",  icon: ShieldCheck },
];

const DEPLOY_INDEX = 0;

export function PipelineVisualization() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [resetting,   setResetting]   = useState(false);
  const ringControls = useAnimation();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const schedule = (fn: () => void, delay: number) => {
    timerRef.current = setTimeout(fn, delay);
  };

  useEffect(() => {
    // Fade the ring in on mount via ringControls
    ringControls.start({
      opacity: 1,
      stroke: "rgba(132, 184, 82, 0.15)",
      transition: { duration: 1, delay: 0.5 },
    });

    const run = (currentIndex: number) => {
      const isOnDeploy = currentIndex === DEPLOY_INDEX;
      const holdTime   = isOnDeploy ? STAGE_DURATION + DEPLOY_HOLD : STAGE_DURATION;

      timerRef.current = setTimeout(() => {
        if (isOnDeploy) {
          // 1. Fade everything out
          setResetting(true);
          ringControls.start({
            opacity: 0.1,
            stroke: "rgba(132, 184, 82, 0.03)",
            transition: { duration: 0.5 },
          });

          schedule(() => {
            // 2. Silently snap to Commit while invisible
            const nextIndex = (DEPLOY_INDEX + 1) % stages.length;
            setActiveIndex(nextIndex);

            schedule(() => {
              // 3. Fade back in with Commit active
              setResetting(false);
              ringControls.start({
                opacity: 1,
                stroke: "rgba(132, 184, 82, 0.15)",
                transition: { duration: 0.6 },
              });
              run(nextIndex);
            }, 150);
          }, 550);

        } else {
          const nextIndex = (currentIndex + 1) % stages.length;
          setActiveIndex(nextIndex);
          run(nextIndex);
        }
      }, holdTime);
    };

    run(0);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNodePosition = (index: number, activeIdx: number) => {
    const totalStages  = stages.length;
    const angleSpread  = Math.PI * 2;
    const baseAngle    = (angleSpread * index) / totalStages;
    const activeOffset = (angleSpread * activeIdx) / totalStages;
    const angle        = baseAngle - activeOffset - Math.PI / 2;

    const radius  = 250;
    const centerX = 400;
    const centerY = 405;

    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      angle,
    };
  };

  const getNodeOpacity = (y: number, isActive: boolean) => {
    const threshold = 405;
    const base      = isActive ? 1 : 0.6;
    const dimmed    = resetting ? 0 : base;

    if (y < threshold) return dimmed;

    const fadeProgress = Math.min((y - threshold) / 80, 1);
    return Math.max(dimmed * (1 - fadeProgress), 0);
  };

  return (
    <div className="relative w-full h-[380px] overflow-hidden">
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        viewBox="0 0 800 380"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Guide ring — controlled entirely by ringControls */}
        <motion.circle
          cx="400"
          cy="405"
          r="250"
          fill="none"
          stroke="rgba(132, 184, 82, 0.15)"
          strokeWidth="2"
          strokeDasharray="8 4"
          initial={{ opacity: 0 }}
          animate={ringControls}
        />

        {/* Pipeline nodes */}
        {stages.map((stage, index) => {
          const position    = getNodePosition(index, activeIndex);
          const isActive    = index === activeIndex;
          const nodeOpacity = getNodeOpacity(position.y, isActive);
          const Icon        = stage.icon;

          return (
            <motion.g
              key={stage.name}
              initial={{ x: position.x, y: position.y }}
              animate={{ x: position.x, y: position.y }}
              transition={{
                x: { duration: resetting ? 0 : 0.8, ease: "easeInOut" },
                y: { duration: resetting ? 0 : 0.8, ease: "easeInOut" },
              }}
            >
              <foreignObject
                x={-70}
                y={-80}
                width="140"
                height="160"
                style={{ overflow: "visible" }}
              >
                <motion.div
                  className="flex flex-col items-center gap-3 pt-4"
                  style={{ width: "140px", height: "160px" }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: nodeOpacity,
                    scale: isActive ? 1.25 : 1,
                  }}
                  transition={{
                    opacity: { duration: resetting ? 0.4 : 0.5 },
                    scale:   { duration: 0.5 },
                  }}
                >
                  {/* Node circle */}
                  <div className="relative flex justify-center">
                    <motion.div
                      className="rounded-full border-2 flex items-center justify-center"
                      animate={{
                        width:           isActive ? "72px" : "56px",
                        height:          isActive ? "72px" : "56px",
                        borderColor:     isActive ? "#84B852" : "rgba(132, 184, 82, 0.3)",
                        backgroundColor: isActive ? "rgba(132, 184, 82, 0.15)" : "rgba(22, 33, 28, 0.6)",
                        boxShadow:       isActive ? "0 0 30px rgba(132, 184, 82, 0.5)" : "none",
                        scale:           isActive ? [1, 1.05, 1] : 1,
                      }}
                      transition={{
                        width:           { duration: 0.5 },
                        height:          { duration: 0.5 },
                        borderColor:     { duration: 0.5 },
                        backgroundColor: { duration: 0.5 },
                        boxShadow:       { duration: 0.5 },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      }}
                    >
                      <motion.div
                        animate={{ scale: isActive ? 1 : 0.85 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon
                          size={isActive ? 28 : 22}
                          style={{ color: isActive ? "#84B852" : "#9FB09F" }}
                        />
                      </motion.div>
                    </motion.div>

                    {/* Single-fire pulse ring on activation */}
                    {isActive && !resetting && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          border: "2px solid #84B852",
                          width:  "72px",
                          height: "72px",
                        }}
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    )}
                  </div>

                  {/* Stage label */}
                  <motion.div
                    className="text-sm font-semibold whitespace-nowrap text-center"
                    animate={{
                      color:      isActive ? "#EAF2EA" : "#9FB09F",
                      textShadow: isActive ? "0 0 10px rgba(132, 184, 82, 0.3)" : "none",
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ fontFamily: "var(--font-family-body)" }}
                  >
                    {stage.name}
                  </motion.div>

                  {/* Stage subtext — visible only when active */}
                  <motion.div
                    className="whitespace-nowrap text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive && !resetting ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      fontFamily:    "var(--font-family-body)",
                      fontSize:      "11px",
                      color:         "#84B852",
                      marginTop:     "-8px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {stage.subtext}
                  </motion.div>
                </motion.div>
              </foreignObject>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
