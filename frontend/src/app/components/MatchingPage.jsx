import { useState } from "react";
import {
  MapPin,
  Briefcase,
  DollarSign,
  ArrowRight,
  Check,
  Sparkles,
  AlertTriangle,
  ShieldAlert,
  Heart,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { motion, AnimatePresence } from "motion/react";

export function MatchingPage() {
  const [activeTab, setActiveTab] = useState("ethical");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationText, setApplicationText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const ethicalJobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "Remote",
      salary: "$120k - $160k",
      matchScore: 95,
      reasons: ["Strong technical skills", "Communication abilities", "Team collaboration experience"],
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Innovation Labs",
      location: "New York, NY",
      salary: "$100k - $140k",
      matchScore: 88,
      reasons: ["Relevant experience", "Technical expertise", "Cultural fit"],
    },
  ];

  const flaggedJobs = [
    {
      id: 101,
      title: "Sales Girl – Under 25 Only",
      company: "Fast Marketing",
      location: "Casablanca",
      risk: "High",
      categories: ["Gender Discrimination", "Age Discrimination"],
      excerpt: "Looking for a young pretty girl under 25 to work in sales.",
      explanation:
        "This job excludes candidates based on gender and age, which violates equal opportunity principles and promotes harmful stereotypes.",
    },
    {
      id: 102,
      title: "Aggressive Call Center Agents Needed",
      company: "Power Call",
      location: "Rabat",
      risk: "Medium",
      categories: ["Offensive Tone", "Psychological Pressure"],
      excerpt: "We want aggressive people who can pressure clients until they buy.",
      explanation:
        "The language encourages unethical behavior and emotional manipulation, which can harm both workers and clients.",
    },
    {
      id: 103,
      title: "Only Single Girls for Reception",
      company: "Luxury Office",
      location: "Marrakech",
      risk: "High",
      categories: ["Gender Discrimination", "Personal Status Discrimination"],
      excerpt: "Only single girls with good appearance are accepted.",
      explanation:
        "This offer discriminates based on gender and marital status, which is unethical and illegal in many contexts.",
    },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setShowModal(false);
      setIsSuccess(false);
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 50) return "text-amber-500";
    return "text-red-500";
  };

  const handleGenerateApplication = (job) => {
    setSelectedJob(job);
    setApplicationText(
      `Dear Hiring Manager,\n\nI am writing to express my interest in the ${job.title} position at ${job.company}. I believe my skills and values align strongly with your mission, and I am excited about the opportunity to contribute positively to your team.\n\nThank you for your time and consideration.\n\nBest regards`
    );
    setShowModal(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto py-8 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Decorative Blob */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-50/20 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <motion.div className="mb-10" variants={itemVariants}>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 font-display tracking-tight">Marketplace</h2>
        </div>
        <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
          Premium matched opportunities and AI-vetted job offers to protect your career journey.
        </p>
      </motion.div>

      {/* Modern Tab Switcher */}
      <motion.div className="flex p-1 bg-gray-100/50 backdrop-blur-sm rounded-2xl w-fit mb-10 border border-white/50" variants={itemVariants}>
        <button
          onClick={() => setActiveTab("ethical")}
          className={`relative px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-500 flex items-center gap-2 ${activeTab === "ethical" ? "text-white" : "text-gray-500 hover:text-gray-800"
            }`}
        >
          {activeTab === "ethical" && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gray-900 rounded-xl shadow-lg shadow-gray-200"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <Check className={`w-3.5 h-3.5 ${activeTab === "ethical" ? "text-blue-400" : "text-gray-400"}`} />
            Matched
          </span>
        </button>

        <button
          onClick={() => setActiveTab("flagged")}
          className={`relative px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-500 flex items-center gap-2 ${activeTab === "flagged" ? "text-white" : "text-gray-500 hover:text-gray-800"
            }`}
        >
          {activeTab === "flagged" && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-red-600 rounded-xl shadow-lg shadow-red-100"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <ShieldAlert className={`w-3.5 h-3.5 ${activeTab === "flagged" ? "text-white" : "text-red-400"}`} />
            Alerts
            <span className={`px-1.5 py-0.5 rounded-full text-[9px] ml-1 ${activeTab === "flagged" ? "bg-white/20 text-white" : "bg-red-50 text-red-600"}`}>
              {flaggedJobs.length}
            </span>
          </span>
        </button>
      </motion.div>

      {/* Content Section */}
      <AnimatePresence mode="wait">
        {activeTab === "ethical" ? (
          <motion.div
            key="ethical"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {ethicalJobs.map((job) => (
              <motion.div
                key={job.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white/70 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-blue-100/50 transition-colors" />

                <div className="flex flex-col gap-6 relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-blue-50 text-blue-600 border-none px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">Top Match</Badge>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 font-display mb-1 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                      <p className="text-base text-gray-500 font-medium">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="relative inline-flex items-center justify-center">
                        <svg className="w-14 h-14 -rotate-90">
                          <circle cx="28" cy="28" r="24" fill="transparent" stroke="#f3f4f6" strokeWidth="6" />
                          <motion.circle
                            initial={{ strokeDasharray: "0, 151" }}
                            animate={{ strokeDasharray: `${(job.matchScore / 100) * 151}, 151` }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                            cx="28" cy="28" r="24" fill="transparent" stroke="currentColor" strokeWidth="6" className={getScoreColor(job.matchScore)}
                          />
                        </svg>
                        <span className="absolute text-sm font-bold text-gray-900">{job.matchScore}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 py-4 border-y border-gray-100/80">
                    <div className="flex items-center gap-1.5 text-gray-600 bg-gray-50/50 px-3 py-1.5 rounded-xl border border-gray-100">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-xs font-semibold">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600 bg-gray-50/50 px-3 py-1.5 rounded-xl border border-gray-100">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-xs font-semibold">{job.salary}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Key Strengths</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.reasons.map((reason, i) => (
                        <div key={i} className="flex items-center gap-1.5 bg-white text-gray-700 border border-gray-100 px-3 py-2 rounded-xl text-xs shadow-sm font-medium hover:border-blue-200 transition-colors">
                          <Check className="w-3.5 h-3.5 text-blue-500" />
                          {reason}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleGenerateApplication(job)}
                    className="w-full bg-gray-900 hover:bg-blue-600 text-white rounded-xl py-5 h-auto text-base font-bold shadow-lg transition-all duration-500"
                  >
                    <span>Apply Ethically</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="flagged"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="space-y-8"
          >
            {flaggedJobs.map((job) => (
              <motion.div
                key={job.id}
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-xl border border-red-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-red-50/30 blur-3xl rounded-full -mr-24 -mt-24 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${job.risk === "High" ? "bg-red-100 text-red-600 shadow-lg shadow-red-200/50" : "bg-amber-100 text-amber-600 shadow-lg shadow-amber-200/50"
                        }`}>
                        <ShieldAlert className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-gray-900 font-display">{job.title}</h3>
                          <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${job.risk === "High" ? "bg-red-50 text-red-600 border-red-100" : "bg-amber-50 text-amber-600 border-amber-100"
                            }`}>
                            {job.risk} RISK
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm font-semibold">{job.company} • {job.location}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {job.categories.map((cat, i) => (
                          <Badge key={i} className="bg-white/80 text-red-700 border border-red-100 px-3 py-1 text-[9px] rounded-lg font-bold">
                            {cat}
                          </Badge>
                        ))}
                      </div>

                      <div className="bg-red-50/40 border border-red-100/50 rounded-2xl p-5 shadow-inner ring-1 ring-white/50">
                        <div className="flex items-center gap-2 mb-2 text-red-700">
                          <Sparkles className="w-3.5 h-3.5" />
                          <p className="text-[10px] font-black uppercase tracking-wider">AI Insight</p>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed font-sans">{job.explanation}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-[35%] flex flex-col justify-between">
                    <div className="bg-gray-900/5 border border-gray-900/10 rounded-2xl p-5 mb-4">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Detected Red Flag</p>
                      <div className="text-gray-800 italic text-base leading-relaxed relative p-1">
                        “{job.excerpt}”
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1 rounded-xl py-3.5 h-auto border-gray-200 text-gray-600 hover:bg-gray-50 font-bold text-xs">
                        Dismiss
                      </Button>
                      <Button className="flex-[1.5] bg-red-600 hover:bg-black text-white rounded-xl py-3.5 h-auto shadow-lg flex items-center justify-center gap-2 transition-all duration-300 font-bold text-xs group">
                        <AlertTriangle className="w-4 h-4 group-hover:animate-shake" />
                        Report
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Application Modal */}
      <AnimatePresence>
        {showModal && selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-gray-900/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-[2.5rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] w-full max-w-xl relative z-10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600" />

              <div className="p-10">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                      className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/10 border border-emerald-100 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Check className="w-12 h-12 text-emerald-500" strokeWidth={3} />
                    </motion.div>
                    <h3 className="text-4xl font-black text-gray-900 mb-4 font-display tracking-tight">Success!</h3>
                    <div className="flex items-center justify-center gap-2 text-gray-500 text-lg font-medium">
                      <span>Your ethical application has been sent</span>
                      <motion.span
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="flex items-center"
                      >
                        <Heart className="w-5 h-5 text-blue-500 fill-blue-500/20" />
                      </motion.span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col h-full max-h-[85vh]">
                    {/* Header */}
                    <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 flex-shrink-0">
                      <div>
                        <div className="flex items-center gap-2.5 mb-2">
                          <Badge className="bg-blue-50 text-blue-600 border-none px-2 py-0.5 text-[9px] font-black uppercase tracking-widest">Ethical Draft</Badge>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 font-display">Crafting Your Pitch</h3>
                        <p className="text-gray-400 text-base mt-0.5 font-medium italic">For {selectedJob.company}</p>
                      </div>
                      <button onClick={() => setShowModal(false)} className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-gray-900 border border-gray-100 hover:scale-110 active:scale-90 flex-shrink-0">
                        <span className="text-xl font-light">✕</span>
                      </button>
                    </div>

                    {/* Scrollable Body */}
                    <div className="overflow-y-auto pr-2 space-y-6 flex-1 mb-6 custom-scrollbar">
                      <div className="relative">
                        <Textarea
                          value={applicationText}
                          onChange={(e) => setApplicationText(e.target.value)}
                          className="min-h-[200px] p-6 text-base leading-relaxed text-gray-700 bg-gray-50/50 border-none focus:ring-2 focus:ring-blue-100 rounded-3xl resize-none shadow-inner font-sans w-full custom-scrollbar"
                        />
                        <div className="absolute top-4 right-4 opacity-30">
                          <div className="px-2 py-0.5 bg-white rounded flex items-center gap-1.5 text-[9px] font-bold text-gray-400 border border-gray-100 uppercase">
                            <Sparkles className="w-3 h-3 text-blue-400" />
                            Editor
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-xl shadow-gray-200 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 blur-2xl rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-1000" />
                        <div className="flex gap-4 relative z-10">
                          <div className="w-10 h-10 bg-white/10 rounded-xl backdrop-blur-md border border-white/10 flex-shrink-0 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold mb-0.5 text-blue-400">Ethically Optimized</h4>
                            <p className="text-white/70 text-sm leading-relaxed font-medium">
                              Your pitch is highlight-focused and bias-free.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-4 pt-4 border-t border-gray-100 flex-shrink-0 bg-white">
                      <Button
                        variant="ghost"
                        className="flex-1 rounded-2xl h-14 text-gray-500 hover:bg-gray-100 hover:text-gray-900 font-bold text-base"
                        onClick={() => setShowModal(false)}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 shadow-xl shadow-blue-100 transition-all hover:scale-[1.02] active:scale-[0.98] font-bold text-base"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending...</span>
                          </div>
                        ) : "Apply Now"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

