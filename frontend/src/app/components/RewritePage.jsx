import { useState } from "react";
import { Check, Copy, ArrowRight, AlertCircle, UserPlus, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";

export function RewritePage({ originalContent, onAccept }) {
  const [copied, setCopied] = useState(false);

  const rewrittenContent = "Experienced software engineer with strong technical skills. Excellent communication abilities required. Collaborative team player with fresh perspectives and energy.";

  const biasTypeStyles = {
    "Language Bias": {
      bg: "bg-orange-50",
      border: "border-orange-100",
      text: "text-orange-700",
      icon: <MessageSquare className="w-3.5 h-3.5" />,
      lightText: "text-orange-600/70"
    },
    "Age Bias": {
      bg: "bg-purple-50",
      border: "border-purple-100",
      text: "text-purple-700",
      icon: <UserPlus className="w-3.5 h-3.5" />,
      lightText: "text-purple-600/70"
    },
    "Enhanced": {
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      text: "text-emerald-700",
      icon: <Sparkles className="w-3.5 h-3.5" />,
      lightText: "text-emerald-600/70"
    }
  };

  const changes = [
    { original: "Native English speaker preferred", rewritten: "Excellent communication abilities required", type: "Language Bias" },
    { original: "Young and energetic", rewritten: "Fresh perspectives and energy", type: "Age Bias" },
    { original: "team player", rewritten: "Collaborative team player", type: "Enhanced" }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(rewrittenContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Ethical Rewrite</h2>
        <p className="text-lg text-gray-600">
          Review the suggested changes and apply them to your document
        </p>
      </div>

      {/* Side-by-side comparison */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {/* Original */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Original</h3>
            <Badge className="bg-red-50 text-red-700 border-red-200 px-3 py-1">
              {changes.length} Issues Detected
            </Badge>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm h-full">
            <p className="text-gray-700 leading-relaxed text-lg">{originalContent}</p>
          </div>
        </div>

        {/* Rewritten */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Ethical Version</h3>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1">
              100% Corrected
            </Badge>
          </div>
          <div className="bg-white border-2 border-blue-600/20 rounded-2xl p-8 shadow-xl shadow-blue-600/5 ring-4 ring-blue-50/50 h-full flex flex-col">
            <p className="text-gray-800 leading-relaxed mb-8 text-lg font-medium">{rewrittenContent}</p>
            <div className="mt-auto">
              <Button
                onClick={handleCopy}
                variant="outline"
                className="w-full h-12 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 rounded-xl font-bold"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Copied to Clipboard
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 mr-2" />
                    Copy Ethical Rewrite
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Changes Summary */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-8 pl-1">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <AlertCircle className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Changes Summary</h3>
        </div>

        <div className="grid gap-6">
          {changes.map((change, index) => {
            const style = biasTypeStyles[change.type] || biasTypeStyles["Enhanced"];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white border ${style.border} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 overflow-hidden relative group`}
              >
                {/* Accent line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${style.text.replace('text', 'bg')}`} />

                <div className="flex flex-col md:flex-row md:items-center gap-6 relative">
                  <div className="shrink-0 min-w-[160px]">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${style.bg} ${style.border} border ${style.text} text-xs font-bold mb-2`}>
                      {style.icon}
                      {change.type}
                    </div>
                  </div>

                  <div className="flex-1 grid md:grid-cols-2 gap-6 items-center">
                    {/* Original Section */}
                    <div className="p-4 bg-red-50/50 rounded-xl border border-red-100/50 relative overflow-hidden group-hover:bg-red-50 transition-colors">
                      <p className="text-[10px] uppercase tracking-widest font-black text-red-400 mb-2">Original Context</p>
                      <p className="text-gray-500 line-through decoration-red-300/50 decoration-2 italic text-sm">
                        "{change.original}"
                      </p>
                    </div>

                    <div className="hidden md:flex justify-center text-gray-300">
                      <ArrowRight className="w-6 h-6 group-hover:text-emerald-400 transition-colors duration-300" />
                    </div>

                    {/* Rewritten Section */}
                    <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100/50 relative overflow-hidden group-hover:bg-emerald-50 transition-colors">
                      <p className="text-[10px] uppercase tracking-widest font-black text-emerald-500 mb-2">Rewritten Version</p>
                      <p className="text-gray-900 font-bold text-sm">
                        "{change.rewritten}"
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>


      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8 animate-slide-up">
        <Button
          variant="outline"
          className="px-8 py-4 text-base h-auto rounded-xl border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-white hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-200"
        >
          Revise Again
        </Button>
        <Button
          onClick={onAccept}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base h-auto rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-300 group font-semibold tracking-wide"
        >
          Accept & Continue
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
