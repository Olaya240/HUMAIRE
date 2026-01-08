import { useState } from "react";
import { Header } from "./components/Header";
import { ProgressIndicator } from "./components/ProgressIndicator";
import { LandingPage } from "./components/LandingPage";
import { UploadPage } from "./components/UploadPage";
import { ResultsPage } from "./components/ResultsPage";
import { RewritePage } from "./components/RewritePage";
import { ReflectionPage } from "./components/ReflectionPage";
import { MatchingPage } from "./components/MatchingPage";

import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentStep, setCurrentStep] = useState("landing");
  const [documentContent, setDocumentContent] = useState("");
  const [documentType, setDocumentType] = useState("");

  const getStepNumber = (step) => {
    const steps = {
      landing: 0,
      upload: 1,
      results: 2,
      rewrite: 3,
      reflection: 4,
      matching: 5
    };
    return steps[step];
  };

  const handleGetStarted = () => {
    setCurrentStep("upload");
  };

  const handleAnalyze = (type, content) => {
    setDocumentType(type);
    setDocumentContent(content);
    setCurrentStep("results");
  };

  const handleGenerateRewrite = () => {
    setCurrentStep("rewrite");
  };

  const handleAcceptRewrite = () => {
    setCurrentStep("reflection");
  };

  const handleContinueToMatching = () => {
    setCurrentStep("matching");
  };

  const handleNavigate = (item) => {
    if (item === "Home") {
      setCurrentStep("landing");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (item === "About Us") {
      setCurrentStep("landing");
      setTimeout(() => {
        const aboutSection = document.getElementById("about-us");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3, ease: "easeInOut" }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col min-h-screen">
        <Header
          currentStep={getStepNumber(currentStep)}
          onNavigate={handleNavigate}
        />

        <main className="flex-grow">
          <AnimatePresence mode="wait">
            {currentStep === "landing" ? (
              <motion.div
                key="landing"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
              >
                <LandingPage onGetStarted={handleGetStarted} />
              </motion.div>
            ) : (
              <motion.div
                key="main-app"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                className="w-full"
              >
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 pt-24 pb-8 sm:py-12 w-full space-y-8 sm:space-y-12">
                  <div className="max-w-[1000px] mx-auto">
                    <ProgressIndicator currentStep={getStepNumber(currentStep)} />
                  </div>

                  <div className="relative">
                    <AnimatePresence mode="wait">
                      {currentStep === "upload" && (
                        <motion.div
                          key="upload"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <UploadPage onAnalyze={handleAnalyze} />
                        </motion.div>
                      )}

                      {currentStep === "results" && (
                        <motion.div
                          key="results"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ResultsPage
                            content={documentContent}
                            onGenerateRewrite={handleGenerateRewrite}
                          />
                        </motion.div>
                      )}

                      {currentStep === "rewrite" && (
                        <motion.div
                          key="rewrite"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <RewritePage
                            originalContent={documentContent}
                            onAccept={handleAcceptRewrite}
                          />
                        </motion.div>
                      )}

                      {currentStep === "reflection" && (
                        <motion.div
                          key="reflection"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ReflectionPage onContinue={handleContinueToMatching} />
                        </motion.div>
                      )}

                      {currentStep === "matching" && (
                        <motion.div
                          key="matching"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <MatchingPage />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="border-t border-gray-200 bg-white mt-24">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-sm" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">HUMAIRE</p>
                  <p className="text-xs text-gray-500">Human-first Ethical AI Platform</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-gray-500">
                <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
                <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
                <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}