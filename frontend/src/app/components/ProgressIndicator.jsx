import { Check } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  { id: 1, label: "Capture" },
  { id: 2, label: "Analyze" },
  { id: 3, label: "Synthesize" },
  { id: 4, label: "Reflect" },
  { id: 5, label: "Resonate" },
  { id: 6, label: "Complete" }
];

export function ProgressIndicator({ currentStep }) {
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="relative">
        {/* Background Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />

        {/* Progress Line */}
        <motion.div
          className="absolute top-5 left-0 h-0.5 bg-blue-600"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step) => {
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;

            return (
              <div key={step.id} className="flex flex-col items-center">
                {/* Dot/Check */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isActive || isCompleted ? "#2563EB" : "#FFFFFF",
                    borderColor: isActive || isCompleted ? "#2563EB" : "#E5E7EB",
                  }}
                  transition={{ duration: 0.3 }}
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 border-transparent z-10
                    ${isActive ? 'ring-4 ring-blue-100' : ''}
                  `}
                >
                  <motion.div
                    initial={false}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                    ) : (
                      <span className={`text-sm font-semibold ${isActive || isCompleted ? 'text-white' : 'text-gray-400'}`}>
                        {step.id}
                      </span>
                    )}
                  </motion.div>
                </motion.div>

                {/* Label */}
                <span className={`
                  mt-3 text-xs font-medium uppercase tracking-wider transition-colors duration-300
                  ${isActive || isCompleted ? 'text-gray-900' : 'text-gray-400'}
                  ${isActive ? 'block' : 'hidden sm:block'}
                `}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}