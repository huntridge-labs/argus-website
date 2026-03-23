import { motion } from "motion/react";
import { ReactNode } from "react";

interface PrimaryButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export function PrimaryButton({ href, onClick, children, className = "" }: PrimaryButtonProps) {
  const Component = href ? motion.a : motion.button;
  const componentProps = href 
    ? { href, target: "_blank", rel: "noopener noreferrer" } 
    : { onClick, type: "button" as const };

  return (
    <Component
      {...componentProps}
      className={`inline-flex items-center gap-2 ${className}`}
      style={{ 
        backgroundImage: "linear-gradient(135deg, #F8FFA1 0%, #DBE64C 28%, #84B852 63%, #1F87D2 100%)",
        backgroundSize: "200% 100%",
        color: "#1E1E1E", 
        fontFamily: "var(--font-family-eyebrow)", 
        fontWeight: 700, 
        fontSize: "16px",
        borderRadius: "8px",
        padding: "14px 22px",
        boxShadow: "0 0 0px rgba(132, 184, 82, 0)",
      }}
      animate={{
        backgroundPosition: ["0% 0", "20% 0", "0% 0"],
      }}
      transition={{
        backgroundPosition: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        },
        default: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
      }}
      whileHover={{ 
        backgroundPosition: "60% 0",
        scale: 1.05,
        boxShadow: "0 0 24px rgba(132, 184, 82, 0.35), 0 0 12px rgba(219, 230, 76, 0.2)",
      }}
      whileFocus={{ 
        backgroundPosition: "60% 0",
        boxShadow: "0 0 24px rgba(132, 184, 82, 0.35), 0 0 12px rgba(219, 230, 76, 0.2)",
      }}
    >
      {children}
    </Component>
  );
}