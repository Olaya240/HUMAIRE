import { useState } from "react";
import { AlertTriangle, Info, CheckCircle, ArrowRight, Lightbulb, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AIQuery } from "./AIQuery";
import { useAuth } from '../../contexts/AuthContext';
import { Login } from './Auth/Login';
import { motion } from "motion/react";

export function ResultsPage({ content, analysis, onGenerateRewrite }) {
  const [selectedIssue, setSelectedIssue] = useState(null);

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 50) return "text-amber-500";
    return "text-red-500";
  };

  const getScoreBg = (score) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-red-500";
  };

  const issues = [
    {
      id: 1,
      text: "Native English speaker",
      risk: "high",
      category: "Language Discrimination",
      explanation: "This phrase discriminates against non-native English speakers and may violate equal opportunity laws.",
      startIndex: content.indexOf("Native English speaker"),
      endIndex: content.indexOf("Native English speaker") + "Native English speaker".length
    },
    {
      id: 2,
      text: "Young and energetic",
      risk: "high",
      category: "Age Discrimination",
      explanation: "This language suggests age bias, potentially discriminating against older candidates.",
      startIndex: content.indexOf("Young and energetic"),
      endIndex: content.indexOf("Young and energetic") + "Young and energetic".length
    }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case "high": return "text-red-700 bg-red-50 border-red-200";
      case "medium": return "text-amber-700 bg-amber-50 border-amber-200";
      case "low": return "text-emerald-700 bg-emerald-50 border-emerald-200";
      default: return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case "high": return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "medium": return <Info className="w-5 h-5 text-amber-600" />;
      case "low": return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      default: return null;
    }
  };

  const highlightedContent = () => {
    let result = content;
    let offset = 0;

    issues.forEach((issue) => {
      if (issue.startIndex === -1) return;

      const before = result.slice(0, issue.startIndex + offset);
      const highlighted = result.slice(issue.startIndex + offset, issue.endIndex + offset);
      const after = result.slice(issue.endIndex + offset);

      const riskClass =
        issue.risk === "high"
          ? "bg-red-100 border-b-2 border-red-500"
          : issue.risk === "medium"
            ? "bg-amber-100 border-b-2 border-amber-500"
            : "bg-emerald-100 border-b-2 border-emerald-500";

      const wrappedText = `<mark class="${riskClass} px-1 rounded-sm cursor-pointer hover:bg-opacity-80 transition-colors" data-issue-id="${issue.id}">${highlighted}</mark>`;
      result = before + wrappedText + after;
      offset += wrappedText.length - highlighted.length;
    });

    return result;
  };

  const handleTextClick = (e) => {
    const target = e.target;
    if (target.tagName === "MARK") {
      const issueId = parseInt(target.getAttribute("data-issue-id") || "0");
      const issue = issues.find(i => i.id === issueId);
      if (issue) setSelectedIssue(issue);
    }
  };

  const ethicalScore = Math.round((1 - issues.filter(i => i.risk === "high").length / 5) * 100);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >

      {/* Header */}
      <motion.div className="mb-12" variants={itemVariants}>
        <h2 className="text-4xl font-bold text-gray-900 mb-4 font-display">Analysis Results</h2>
        <p className="text-lg text-gray-600">
          Ethical + Skills-based AI analysis of your CV & job offer
        </p>
      </motion.div>

      {/* Score */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <motion.div
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          variants={itemVariants}
        >
          <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Ethical Score</p>
          <div className="flex items-baseline gap-2">
            <p className={`text-5xl font-bold tracking-tight ${getScoreColor(ethicalScore)}`}>{ethicalScore}%</p>
            <span className="text-gray-400 font-medium">/ 100</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          variants={itemVariants}
        >
          <p className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">Compatibility Score</p>
          <div className="flex items-baseline gap-2">
            <p className={`text-5xl font-bold tracking-tight ${getScoreColor(analysis?.compatibility_score || 0)}`}>
              {analysis?.compatibility_score || 0}%
            </p>
            <span className="text-gray-400 font-medium">/ 100</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-4 overflow-hidden">
            <motion.div
              className={`h-2 rounded-full ${getScoreBg(analysis?.compatibility_score || 0)}`}
              initial={{ width: 0 }}
              animate={{ width: `${analysis?.compatibility_score || 0}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Strengths / Weaknesses / Missing / Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-14">
        <ListCard
          title="Strengths"
          icon={<CheckCircle className="text-emerald-600" />}
          items={analysis?.strengths}
          variant="success"
          variants={itemVariants}
        />

        <ListCard
          title="Weaknesses"
          icon={<AlertTriangle className="text-amber-600" />}
          items={analysis?.weaknesses}
          variant="warning"
          variants={itemVariants}
        />

        <ListCard
          title="Missing Skills"
          icon={<XCircle className="text-red-600" />}
          items={analysis?.missing_skills}
          variant="danger"
          variants={itemVariants}
        />

        <ListCard
          title="Improvement Suggestions"
          icon={<Lightbulb className="text-blue-600" />}
          items={analysis?.improvement_suggestions}
          variant="info"
          variants={itemVariants}
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 font-display">Document Preview</h3>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div
              className="text-gray-700 leading-relaxed font-serif text-lg"
              onClick={handleTextClick}
              dangerouslySetInnerHTML={{ __html: highlightedContent() }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-3 font-medium">Click on highlighted text to see details</p>
        </motion.div>

        {/* Right */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 font-display">Detected Issues</h3>
          <div className="space-y-3">
            {issues.map((issue) => (
              <motion.div
                key={issue.id}
                onClick={() => setSelectedIssue(issue)}
                whileHover={{ scale: 1.01, backgroundColor: "#fafafa" }}
                className={`bg-white border rounded-xl p-5 cursor-pointer transition-colors
                  ${selectedIssue?.id === issue.id ? 'border-blue-600 shadow-md ring-1 ring-blue-100' : 'border-gray-200'}
                `}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0">{getRiskIcon(issue.risk)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-gray-900 truncate">{issue.text}</span>
                      <Badge className={`text-xs ${getRiskColor(issue.risk)} border px-2 py-0.5 rounded-full shadow-none`}>
                        {issue.risk}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 font-medium mb-2">{issue.category}</p>

                    {selectedIssue?.id === issue.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-sm text-gray-700 mt-3 pt-3 border-t border-gray-100 bg-gray-50/50 -mx-5 -mb-5 p-5 rounded-b-xl"
                      >
                        <p className="leading-relaxed">{issue.explanation}</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Action */}
      <motion.div variants={itemVariants}>
        <AuthActionArea onGenerateRewrite={onGenerateRewrite} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <AIQuery initialPrompt={content.slice(0, 800)} />
      </motion.div>
    </motion.div>
  );
}

function ListCard({ title, icon, items = [], variant = "default", variants }) {
  const getVariantStyles = () => {
    switch (variant) {
      case "success": return "bg-emerald-50/30 border-emerald-100";
      case "warning": return "bg-amber-50/30 border-amber-100";
      case "danger": return "bg-red-50/30 border-red-100";
      case "info": return "bg-blue-50/30 border-blue-100";
      default: return "bg-white border-gray-200";
    }
  };

  return (
    <motion.div
      className={`border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ${getVariantStyles()}`}
      variants={variants}
    >
      <div className="flex items-center gap-2.5 mb-5 border-b border-gray-100 pb-3">
        {icon}
        <h4 className="font-bold text-gray-900 font-display">{title}</h4>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-gray-400 italic">No specific data available</p>
      ) : (
        <ul className="space-y-2.5">
          {items.map((item, i) => (
            <li key={i} className="text-sm text-gray-700 bg-white/80 border border-gray-100/50 rounded-lg px-3.5 py-2.5 flex items-start gap-2 shadow-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}

function AuthActionArea({ onGenerateRewrite }) {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="mt-16 flex flex-col items-center">
      <Button
        onClick={onGenerateRewrite}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-7 text-lg rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
        disabled={!user}
      >
        <span className="font-semibold tracking-wide">Generate Ethical Rewrite</span>
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>

      {!user && (
        <div className="text-sm text-gray-500 mt-4 font-medium">
          Please{" "}
          <button className="text-blue-600 hover:text-blue-800 underline transition-colors" onClick={() => setShowLogin(true)}>
            sign in
          </button>{" "}
          to unlock full features
        </div>
      )}

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </div>
  );
}
