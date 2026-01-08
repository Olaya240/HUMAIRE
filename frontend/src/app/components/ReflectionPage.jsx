import { useState } from "react";
import { ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function ReflectionPage({ onContinue }) {
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: "What biases did you notice in your original document?",
      placeholder: "Reflect on the specific language or phrases that were flagged..."
    },
    {
      id: 2,
      question: "How might these biases have affected potential candidates?",
      placeholder: "Consider the impact on different groups of people..."
    },
    {
      id: 3,
      question: "What will you do differently in future job postings or CVs?",
      placeholder: "Think about concrete changes you can implement..."
    }
  ];

  const tips = [
    "Use gender-neutral language and avoid assumptions about candidates",
    "Focus on skills and qualifications rather than demographics",
    "Review your language for age, cultural, or ability bias",
    "Consider how your words might exclude qualified candidates"
  ];

  const handleAnswerChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const allAnswered = questions.every(q => answers[q.id]?.trim());

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Reflection & Learning</h2>
        <p className="text-lg text-gray-600">
          Take a moment to reflect on what you've learned about bias and inclusive language
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-600">
            {Object.keys(answers).filter(k => answers[k]?.trim()).length} of {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(Object.keys(answers).filter(k => answers[k]?.trim()).length / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-8 mb-12">
        {questions.map((q) => (
          <div key={q.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              {q.id}. {q.question}
            </label>
            <Textarea
              value={answers[q.id] || ""}
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              placeholder={q.placeholder}
              className="min-h-[120px] resize-none"
            />
          </div>
        ))}
      </div>

      {/* Learning Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
        <div className="flex items-start gap-3 mb-4">
          <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" strokeWidth={1.5} />
          <h3 className="text-lg font-semibold text-gray-900">Key Takeaways</h3>
        </div>
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-blue-600 mt-1">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <div className="flex justify-center pt-4 animate-slide-up">
        <Button
          onClick={onContinue}
          disabled={!allAnswered}
          className={`
            bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base h-auto rounded-xl 
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 
            transition-all duration-300 group font-semibold tracking-wide
          `}
        >
          Continue to Job Matching
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}