import { motion } from "motion/react";
import { PipelineVisualization } from "./components/PipelineVisualization";
import { PrimaryButton } from "./components/PrimaryButton";
import { HeroDotPattern } from "./components/HeroDotPattern";
import { ScannerCoverage } from "./ScannerCoverage";
import { Eye, Github, BookOpen, Shield, Zap, Lock, Users, GitBranch, Star, GitFork, ExternalLink, Award } from "lucide-react";
import argusLogo from "../assets/Argus_Logo_Tertiary_Horizontal_Color.png";
import argusLogoSmall from "../assets/Argus_Logo_Color.png";
import { useState, useEffect } from "react";

export default function App() {
  const [githubStats, setGithubStats] = useState<{
    stars: number | string | null;
    forks: number | string | null;
    latestRelease: string | null;
    releaseDate: string | null;
    totalReleases: number | null;
    contributors: number | null;
    totalCommits: number | null;
    loading: boolean;
    error: boolean;
  }>({
    stars: null,
    forks: null,
    latestRelease: null,
    releaseDate: null,
    totalReleases: null,
    contributors: null,
    totalCommits: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [repoResponse, releaseResponse, contributorsResponse, commitsResponse] = await Promise.all([
          fetch("https://api.github.com/repos/huntridge-labs/argus"),
          fetch("https://api.github.com/repos/huntridge-labs/argus/releases"),
          fetch("https://api.github.com/repos/huntridge-labs/argus/contributors"),
          fetch("https://api.github.com/repos/huntridge-labs/argus/commits?per_page=1"),
        ]);

        const repoData = await repoResponse.json();
        const releaseData = await releaseResponse.json();
        const contributorsData = await contributorsResponse.json();

        // Parse total commit count from the Link header rel="last" page param
        let totalCommits = null;
        const linkHeader = commitsResponse.headers.get("Link");
        if (linkHeader) {
          const match = linkHeader.match(/[?&]page=(\d+)>;\s*rel="last"/);
          if (match) totalCommits = parseInt(match[1], 10);
        }

        const latestRelease = releaseData[0];

        setGithubStats({
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          latestRelease: latestRelease?.tag_name || "N/A",
          releaseDate: latestRelease?.published_at || null,
          totalReleases: Array.isArray(releaseData) ? releaseData.length : null,
          contributors: Array.isArray(contributorsData) ? contributorsData.length : null,
          totalCommits,
          loading: false,
          error: false,
        });
      } catch (error) {
        console.error("Failed to fetch GitHub data:", error);
        setGithubStats({
          stars: "12.4k",
          forks: "2.1k",
          latestRelease: "v1.2.0",
          releaseDate: null,
          totalReleases: null,
          contributors: null,
          totalCommits: null,
          loading: false,
          error: true,
        });
      }
    };

    fetchGitHubData();
  }, []);

  const formatNumber = (num: number | string | null) => {
    if (typeof num === "string") return num;
    if (num == null) return "0";
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toLocaleString();
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="relative" style={{ backgroundColor: "#0B0F0D", color: "#EAF2EA", minHeight: "100vh", fontFamily: "var(--font-family-body)" }}>
      {/* Atmospheric background gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute"
          style={{
            top: "10%",
            left: "20%",
            width: "800px",
            height: "800px",
            background: "radial-gradient(circle, rgba(64, 175, 118, 0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute"
          style={{
            top: "40%",
            right: "15%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(64, 175, 118, 0.06) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute"
          style={{
            bottom: "20%",
            left: "10%",
            width: "700px",
            height: "700px",
            background: "radial-gradient(circle, rgba(64, 175, 118, 0.05) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute"
          style={{
            top: "60%",
            left: "50%",
            width: "900px",
            height: "900px",
            background: "radial-gradient(circle, rgba(64, 175, 118, 0.04) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ backgroundColor: "rgba(11, 15, 13, 0.8)" }}>
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src={argusLogo} alt="Argus" className="hidden sm:block h-[48px]" />
            <img src={argusLogoSmall} alt="Argus" className="block sm:hidden h-[60px]" />
          </div>
          <div className="flex items-center gap-6">
            {/* GitHub Star Count */}
            <motion.a
              href="https://github.com/huntridge-labs/argus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2"
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "14px",
                fontWeight: 600,
                color: "#EAF2EA",
                backgroundColor: "rgba(132, 184, 82, 0.1)",
                border: "1px solid rgba(132, 184, 82, 0.2)",
                textDecoration: "none",
                borderRadius: "9999px",
              }}
              whileHover={{ 
                backgroundColor: "rgba(132, 184, 82, 0.15)",
                borderColor: "rgba(132, 184, 82, 0.3)",
              }}
              transition={{ duration: 0.2 }}
            >
              <Star size={14} fill="#F8FFA1" color="#F8FFA1" />
              <span>{formatNumber(githubStats.stars)}</span>
            </motion.a>
            
            {/* Primary GitHub Button */}
            <PrimaryButton href="https://github.com/huntridge-labs/argus">
              <Github size={18} />
              Explore on GitHub
            </PrimaryButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ paddingTop: "200px", paddingBottom: "140px" }}>
        <HeroDotPattern />
        <div className="max-w-[1200px] mx-auto px-6 relative">
          <div className="flex flex-col items-center">
            {/* Center content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-[800px]"
            >
              <h1
                style={{
                  fontFamily: "var(--font-family-heading)",
                  fontSize: "72px",
                  lineHeight: "1.1",
                  fontWeight: 400,
                  marginBottom: "48px",
                  textAlign: "center",
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{ color: "#DDE6D4", marginBottom: "16px", fontWeight: 400 }}
                >
                  100 eyes.
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 1 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: [1, 1.15, 1],
                  }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.8,
                    scale: {
                      times: [0, 0.5, 1],
                      duration: 1.2,
                    }
                  }}
                  style={{
                    backgroundImage: "linear-gradient(135deg, #F8FFA1 0%, #DBE64C 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textShadow: "none",
                    filter: "drop-shadow(0 0 30px rgba(132, 184, 82, 0.4))",
                  }}
                >
                  Zero blind spots.
                </motion.div>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.3 }}
                style={{
                  fontFamily: "var(--font-family-body)",
                  fontSize: "20px",
                  lineHeight: "30px",
                  color: "#9FB09F",
                  marginBottom: "24px",
                }}
              >Project Argus is the standard for open-source unified security orchestration in{"\u00A0"}regulated environments.</motion.p>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.6 }}
                style={{
                  fontFamily: "var(--font-family-body)",
                  fontSize: "20px",
                  lineHeight: "30px",
                  color: "#9FB09F",
                  marginBottom: "48px",
                }}
              >Complete codebase visibility. No paywalls.</motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.9 }}
                className="flex gap-4 flex-wrap justify-center" 
                style={{ marginBottom: "80px" }}
              >
                <motion.div
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 3.1 }}
                >
                  <PrimaryButton href="https://github.com/huntridge-labs/argus">
                    <Github size={20} />
                    Explore on GitHub
                  </PrimaryButton>
                </motion.div>
                <motion.a
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 3.2 }}
                  href="https://huntridge-labs.github.io/argus/latest/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-lg flex items-center gap-2"
                  style={{ backgroundColor: "#16211C", color: "#BADE6C", fontFamily: "var(--font-family-h6)", fontWeight: 700, fontSize: "16px", border: "1px solid #BADE6C", boxShadow: "0 0 15px rgba(132, 184, 82, 0.2)" }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(132, 184, 82, 0.4)" }}
                  transition={{ duration: 0.2 }}
                >
                  <BookOpen size={20} />
                  View documentation
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Bottom - Pipeline Visualization */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 3.5 }}
              className="hidden md:block w-full max-w-[900px]"
              style={{ marginBottom: "-140px" }}
            >
              <PipelineVisualization />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scanner Coverage Section */}
      <ScannerCoverage />

      {/* Security is Infrastructure Section */}
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
              Security is not a checkbox. It's infrastructure.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "18px",
                lineHeight: "30px",
                color: "#9FB09F",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              Project Argus is designed for teams operating in highly regulated and security-critical environments that require continuous risk evaluation and automated pipeline hardening.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Lock size={32} />,
                title: "Audit-ready visibility",
                description: "Built for the rigor required for government deployments.",
              },
              {
                icon: <Zap size={32} />,
                title: "Reduced manual review",
                description: "Continuous verification lowers review overhead.",
              },
              {
                icon: <Users size={32} />,
                title: "Enterprise scale",
                description: "Scales from single repositories to mission-critical fleets.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-lg relative group"
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
                <div style={{ color: "#BADE6C", marginBottom: "16px", position: "relative", zIndex: 1 }}>
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-family-heading)",
                    fontSize: "20px",
                    lineHeight: "26px",
                    fontWeight: 400,
                    color: "#EAF2EA",
                    marginBottom: "12px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-family-body)",
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#9FB09F",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open by Design Section */}
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
              Open by design
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
              Project Argus is fully open source — no paywalls, no black boxes — ensuring transparency, extensibility, and community-driven development.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Star size={32} />,
                title: "Community-driven",
                description: (
                  <>
                    Developed by an open community of security engineers and contributors, with long-term stewardship and support from{" "}
                    <a
                      href="https://huntridgelabs.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#BADE6C] hover:text-[#DBE64C]"
                      style={{
                        textDecoration: "underline",
                        transition: "color 0.2s",
                      }}
                    >
                      Huntridge Labs
                    </a>
                    .
                  </>
                ),
              },
              {
                icon: <GitFork size={32} />,
                title: "Extensible",
                description: "Add tools, customize policies, and adapt workflows to match your security architecture.",
              },
              {
                icon: <Users size={32} />,
                title: "Transparent",
                description: "Open source code and documentation provide full visibility into how security operates across your pipeline.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-lg relative group"
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
                <div style={{ color: "#BADE6C", marginBottom: "16px", position: "relative", zIndex: 1 }}>
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-family-heading)",
                    fontSize: "20px",
                    lineHeight: "26px",
                    fontWeight: 400,
                    color: "#EAF2EA",
                    marginBottom: "12px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-family-body)",
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#9FB09F",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Health Section */}
      <section className="relative" style={{ paddingTop: "140px", paddingBottom: "140px", borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: "rgba(255, 255, 255, 0.06)" }}>
        <div className="max-w-[1200px] mx-auto px-6 relative">
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
              Project health
            </h1>
          </motion.div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {[
              { icon: <Award size={24} />, label: "Latest Release", value: githubStats.latestRelease ?? "—" },
              { icon: <GitBranch size={24} />, label: "Total Releases", value: githubStats.totalReleases != null ? String(githubStats.totalReleases) : "—" },
              { icon: <Shield size={24} />, label: "Scanners Supported", value: "11" },
              { icon: <Eye size={24} />, label: "Last Updated", value: formatDate(githubStats.releaseDate) },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                className="p-6 rounded-lg text-center relative group backdrop-blur-md"
                style={{
                  backgroundColor: "rgba(22, 33, 28, 0.5)",
                  border: "1px solid rgba(132, 184, 82, 0.15)",
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Animated border overlay */}
                <svg
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ width: "100%", height: "100%" }}
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
                    animate={{ strokeDashoffset: [0, -800] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </svg>
                <div style={{ color: "#BADE6C", marginBottom: "12px", display: "flex", justifyContent: "center", position: "relative", zIndex: 1 }}>
                  {metric.icon}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-family-heading)",
                    fontSize: "28px",
                    fontWeight: 700,
                    color: "#EAF2EA",
                    marginBottom: "4px",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {metric.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-family-body)",
                    fontSize: "14px",
                    color: "#9FB09F",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Status Pills */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            {[
              { label: "Unit & Integration Tests Passing" },
              { label: "AGPL v3 License" },
              { label: "GHES Compatible" },
              { label: "Codecov Enabled" },
            ].map((pill) => (
              <div
                key={pill.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "rgba(132, 184, 82, 0.08)",
                  border: "1px solid rgba(132, 184, 82, 0.25)",
                }}
              >
                {/* green dot */}
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#BADE6C",
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-family-body)",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#BADE6C",
                  }}
                >
                  {pill.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom sections with animated eyes background */}
      <div className="relative">
        <HeroDotPattern />
        
        {/* Unified CTA Section */}
        <section className="relative overflow-hidden" style={{ paddingTop: "140px", paddingBottom: "140px", borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: "rgba(255, 255, 255, 0.06)" }}>
          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <motion.div
              className="p-16 rounded-lg relative group"
              style={{ 
                backgroundColor: "#16211C", 
                border: "1px solid rgba(132, 184, 82, 0.15)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Animated border overlay */}
              <svg
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              ></svg>
              <div className="grid lg:grid-cols-2 gap-16">
                {/* Left Column - Primary CTA */}
                <div>
                  <h1
                    style={{
                      fontFamily: "var(--font-family-heading)",
                      fontSize: "40px",
                      lineHeight: "52px",
                      fontWeight: 400,
                      color: "#EAF2EA",
                      marginBottom: "24px",
                    }}
                  >
                    Start securing your software today
                  </h1>
                  <p
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "18px",
                      lineHeight: "30px",
                      color: "#9FB09F",
                      marginBottom: "32px",
                    }}
                  >
                    Project Argus is the standard for open-source unified security orchestration in regulated environments.
                  </p>
                  <PrimaryButton href="https://github.com/huntridge-labs/argus">
                    <Github size={20} />
                    Explore on GitHub
                  </PrimaryButton>
                </div>

                {/* Right Column - Supporting Actions */}
                <div className="space-y-12">
                  {/* Enterprise Expansion */}
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-family-heading)",
                        fontSize: "20px",
                        lineHeight: "26px",
                        fontWeight: 400,
                        color: "#EAF2EA",
                        marginBottom: "8px",
                      }}
                    >
                      Enterprise expansion
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-family-body)",
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#BADE6C",
                        marginBottom: "16px",
                      }}
                    >
                      Current development — built for mission-critical infrastructure
                    </p>
                    <ul
                      style={{
                        fontFamily: "var(--font-family-body)",
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#9FB09F",
                        marginBottom: "16px",
                        paddingLeft: "20px",
                      }}
                    >
                      <li style={{ marginBottom: "8px" }}>Advanced RBAC</li>
                      <li style={{ marginBottom: "8px" }}>Cross-cluster orchestration</li>
                      <li style={{ marginBottom: "8px" }}>Dedicated support</li>
                    </ul>
                    <motion.a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfv56o_ATiVWVg16SRfQMiG_G2oLeRaZkQfqp02tKFflcSSBw/viewform?usp=header"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2.5 rounded-lg"
                      style={{
                        fontFamily: "var(--font-family-body)",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#BADE6C",
                        backgroundColor: "#16211C",
                        border: "1px solid #BADE6C",
                        boxShadow: "0 0 15px rgba(132, 184, 82, 0.2)",
                        textDecoration: "none",
                      }}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(132, 184, 82, 0.4)" }}
                      transition={{ duration: 0.2 }}
                    >
                      Join the waitlist
                    </motion.a>
                  </div>

                  {/* Get in Touch */}
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-family-heading)",
                        fontSize: "20px",
                        lineHeight: "26px",
                        fontWeight: 400,
                        color: "#EAF2EA",
                        marginBottom: "8px",
                      }}
                    >
                      Get in touch
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-family-body)",
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#9FB09F",
                        marginBottom: "16px",
                      }}
                    >
                      Have feedback, questions, or ideas? We'd love to hear from you as Argus continues to evolve.
                    </p>
                    <motion.a
                      href="mailto:sales@huntridgelabs.com"
                      className="inline-block px-6 py-2.5 rounded-lg"
                      style={{
                        fontFamily: "var(--font-family-body)",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#BADE6C",
                        backgroundColor: "#16211C",
                        border: "1px solid #BADE6C",
                        boxShadow: "0 0 15px rgba(132, 184, 82, 0.2)",
                        textDecoration: "none",
                      }}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(132, 184, 82, 0.4)" }}
                      transition={{ duration: 0.2 }}
                    >
                      Contact us
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t" style={{ borderColor: "#16211C" }}>
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Logo */}
          <div className="mb-12">
            <img src={argusLogo} alt="Argus" className="h-12" />
          </div>

          {/* 4 Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Column 1: Product */}
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-family-heading)",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#EAF2EA",
                  marginBottom: "16px",
                }}
              >
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://github.com/huntridge-labs/argus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 group"
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "14px",
                      color: "#9FB09F",
                      textDecoration: "none",
                    }}
                  >
                    <span className="group-hover:underline group-hover:text-[#DBE64C]" style={{ transition: "color 0.2s" }}>GitHub Repository</span>
                    <ExternalLink size={12} className="opacity-50" />
                  </a>
                </li>
                <li>
                  <a
                    href="docs/scanners.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "14px",
                      color: "#9FB09F",
                      textDecoration: "none",
                    }}
                  >
                    <span className="group-hover:underline group-hover:text-[#DBE64C]" style={{ transition: "color 0.2s" }}>Scanner Reference</span>
                  </a>
                </li>
                <li>
                  <a
                    href="docs/failure-control.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "14px",
                      color: "#9FB09F",
                      textDecoration: "none",
                    }}
                  >
                    <span className="group-hover:underline group-hover:text-[#DBE64C]" style={{ transition: "color 0.2s" }}>Failure Control</span>
                  </a>
                </li>
                <li>
                  <a
                    href="QUICK-START.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "14px",
                      color: "#9FB09F",
                      textDecoration: "none",
                    }}
                  >
                    <span className="group-hover:underline group-hover:text-[#DBE64C]" style={{ transition: "color 0.2s" }}>Quick Start</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-family-heading)",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#EAF2EA",
                  marginBottom: "16px",
                }}
              >
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="docs/examples/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "14px",
                      color: "#9FB09F",
                      textDecoration: "none",
                    }}
                  >
                    <span className="group-hover:underline group-hover:text-[#DBE64C]" style={{ transition: "color 0.2s" }}>Examples Library</span>
                  </a>
                </li>
                <li>
                  <a
                    href="docs/developer/enhanced-pr-comments.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "14px",
                      color: "#9FB09F",
                      textDecoration: "none",
                    }}
                  >
                    <span className="group-hover:underline group-hover:text-[#DBE64C]" style={{ transition: "color 0.2s" }}>Developer Guide</span>
                  </a>
                </li>
                <li>
                  <a
                    href="CHANGELOG.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "14px",
                      color: "#9FB09F",
                      textDecoration: "none",
                    }}
                  >
                    <span className="group-hover:underline group-hover:text-[#DBE64C]" style={{ transition: "color 0.2s" }}>Changelog</span>
                  </a>
                </li>
                <li>
                  <a
                    href="docs/developer/release-management.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "14px",
                      color: "#9FB09F",
                      textDecoration: "none",
                    }}
                  >
                    <span className="group-hover:underline group-hover:text-[#DBE64C]" style={{ transition: "color 0.2s" }}>Release Process</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Trust */}
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-family-heading)",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#EAF2EA",
                  marginBottom: "16px",
                }}
              >
                Trust
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="SECURITY.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "14px",
                      color: "#9FB09F",
                      textDecoration: "none",
                    }}
                  >
                    <span className="group-hover:underline group-hover:text-[#DBE64C]" style={{ transition: "color 0.2s" }}>Security Policy</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/huntridge-labs/argus/security/advisories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 group"
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "14px",
                      color: "#9FB09F",
                      textDecoration: "none",
                    }}
                  >
                    <span className="group-hover:underline group-hover:text-[#DBE64C]" style={{ transition: "color 0.2s" }}>Report a Vulnerability</span>
                    <ExternalLink size={12} className="opacity-50" />
                  </a>
                </li>
                <li>
                  <a
                    href="docs/scanners.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "14px",
                      color: "#9FB09F",
                      textDecoration: "none",
                    }}
                  >
                    <span className="group-hover:underline group-hover:text-[#DBE64C]" style={{ transition: "color 0.2s" }}>Compliance Logic</span>
                  </a>
                </li>
                <li>
                  <a
                    href="CODE_OF_CONDUCT.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "14px",
                      color: "#9FB09F",
                      textDecoration: "none",
                    }}
                  >
                    <span className="group-hover:underline group-hover:text-[#DBE64C]" style={{ transition: "color 0.2s" }}>Code of Conduct</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Stewardship */}
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-family-heading)",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#EAF2EA",
                  marginBottom: "16px",
                }}
              >
                Stewardship
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://huntridgelabs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 group"
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "14px",
                      color: "#9FB09F",
                      textDecoration: "none",
                    }}
                  >
                    <span className="group-hover:underline group-hover:text-[#DBE64C]" style={{ transition: "color 0.2s" }}>Huntridge Labs</span>
                    <ExternalLink size={12} className="opacity-50" />
                  </a>
                </li>
                <li>
                  <a
                    href="LICENSE.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "14px",
                      color: "#9FB09F",
                      textDecoration: "none",
                    }}
                  >
                    <span className="group-hover:underline group-hover:text-[#DBE64C]" style={{ transition: "color 0.2s" }}>AGPL v3 License</span>
                  </a>
                </li>
                <li>
                  <a
                    href="CONTRIBUTING.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "14px",
                      color: "#9FB09F",
                      textDecoration: "none",
                    }}
                  >
                    <span className="group-hover:underline group-hover:text-[#DBE64C]" style={{ transition: "color 0.2s" }}>Contributing Guide</span>
                  </a>
                </li>
                <li>
                  <a
                    href="AGENTS.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    style={{
                      fontFamily: "var(--font-family-body)",
                      fontSize: "14px",
                      color: "#9FB09F",
                      textDecoration: "none",
                    }}
                  >
                    <span className="group-hover:underline group-hover:text-[#DBE64C]" style={{ transition: "color 0.2s" }}>Project Roadmap</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t" style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}>
            <p
              style={{
                fontFamily: "var(--font-family-body)",
                fontSize: "14px",
                color: "#9FB09F",
                textAlign: "center",
              }}
            >
              © 2026 Project Argus. Open source and community driven.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}