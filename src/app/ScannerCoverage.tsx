import { motion } from "motion/react";
import { Shield, Package, ServerCog, Search } from "lucide-react";

export function ScannerCoverage() {
  const scanners = [
    {
      icon: <Shield size={32} />,
      category: "SAST",
      count: "4",
      scanners: ["CodeQL", "Gitleaks", "Bandit", "OpenGrep"],
    },
    {
      icon: <Package size={32} />,
      category: "Container",
      count: "3",
      scanners: ["Trivy", "Grype", "Syft"],
    },
    {
      icon: <ServerCog size={32} />,
      category: "Infrastructure",
      count: "2",
      scanners: ["Trivy IaC", "Checkov"],
    },
    {
      icon: <Search size={32} />,
      category: "DAST + Malware",
      count: "2",
      scanners: ["ZAP", "ClamAV"],
    },
  ];

  return (
    <section style={{ paddingTop: "140px", paddingBottom: "140px", borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: "rgba(255, 255, 255, 0.06)" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1
            style={{
              fontFamily: "var(--font-family-heading)",
              fontSize: "40px",
              lineHeight: "52px",
              fontWeight: 400,
              color: "#EAF2EA",
              marginBottom: "16px",
            }}
          >
            Enterprise-grade scanner coverage
          </h1>
          <p
            style={{
              fontFamily: "var(--font-family-body)",
              fontSize: "18px",
              lineHeight: "30px",
              color: "#9FB09F",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Comprehensive security scanning across every layer of your application stack.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {scanners.map((scanner, index) => (
            <motion.div
              key={scanner.category}
              className="p-8 rounded-lg relative group"
              style={{ 
                backgroundColor: "#16211C", 
                border: "1px solid rgba(132, 184, 82, 0.15)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Animated border overlay */}
              <svg
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <motion.rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  rx="8"
                  fill="none"
                  stroke="rgba(132, 184, 82, 0.8)"
                  strokeWidth="2"
                  strokeDasharray="400"
                  animate={{
                    strokeDashoffset: [0, -800],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </svg>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ color: "#BADE6C", marginBottom: "16px" }}>
                  {scanner.icon}
                </div>
                <div className="flex flex-col gap-1 mb-4">
                  <h3
                    style={{
                      fontFamily: "var(--font-family-heading)",
                      fontSize: "24px",
                      lineHeight: "30px",
                      fontWeight: 400,
                      color: "#EAF2EA",
                    }}
                  >
                    {scanner.category}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "14px",
                      color: "#BADE6C",
                      fontWeight: 600,
                    }}
                  >
                    {scanner.count}+ scanners
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {scanner.scanners.map((tool) => (
                    <span
                      key={tool}
                      style={{
                        fontFamily: "var(--font-family-body)",
                        fontSize: "14px",
                        color: "#EAF2EA",
                        backgroundColor: "rgba(132, 184, 82, 0.1)",
                        border: "1px solid rgba(132, 184, 82, 0.2)",
                        padding: "6px 12px",
                        borderRadius: "6px",
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}