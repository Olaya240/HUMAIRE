import { useState } from "react";
import { Upload, FileText, Briefcase, ArrowRight, X, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion } from "motion/react";

export function UploadPage({ onAnalyze }) {
  const [uploadType, setUploadType] = useState("cv");
  const [files, setFiles] = useState([]);
  const [consent, setConsent] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).map(f => ({ name: f.name }));
      setFiles(prev => [...prev, ...newFiles].slice(0, 2));
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(f => ({ name: f.name }));
      setFiles(prev => [...prev, ...newFiles].slice(0, 2));
    }
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (files.length > 0 && consent) {
      const mockContent = uploadType === "cv"
        ? "Experienced software engineer with strong technical skills. Native English speaker preferred. Young and energetic team player."
        : "We're looking for a rockstar developer to join our dynamic young team. Must be a native English speaker and cultural fit. Ideal candidate is energetic and able to work long hours.";
      onAnalyze(uploadType, mockContent);
    }
  };

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <h2 className="text-4xl font-bold text-gray-900 mb-4 font-display">Upload Document</h2>
        <p className="text-lg text-gray-600">
          Choose a document type and upload for ethical analysis
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="mb-10">
        <Tabs value={uploadType} onValueChange={(v) => setUploadType(v)}>
          <TabsList className="grid w-full grid-cols-2 h-auto p-1.5 rounded-full bg-gray-50/50 border border-gray-100 shadow-inner">
            <TabsTrigger
              value="cv"
              className="rounded-full py-3 text-sm font-semibold tracking-wide data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md data-[state=active]:shadow-gray-200/50 transition-all duration-300 ease-out text-gray-500 hover:text-gray-900"
            >
              <div className="flex items-center justify-center gap-2.5">
                <FileText className="w-4 h-4" />
                <span>CV / Resume</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="job"
              className="rounded-full py-3 text-sm font-semibold tracking-wide data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md data-[state=active]:shadow-gray-200/50 transition-all duration-300 ease-out text-gray-500 hover:text-gray-900"
            >
              <div className="flex items-center justify-center gap-2.5">
                <Briefcase className="w-4 h-4" />
                <span>Job Posting</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Upload Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white border border-gray-200 rounded-2xl p-2 mb-8 shadow-sm"
      >
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-xl p-4 sm:p-8 text-center transition-all duration-300 relative
            ${dragActive
              ? 'border-blue-500 bg-blue-50/50 scale-[0.99]'
              : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50/50'}
            ${files.length > 0 ? 'bg-white' : ''}
          `}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileInput}
            accept=".pdf,.doc,.docx,.txt"
            multiple
          />

          {files.length > 0 ? (
            <div className="space-y-4 animate-fade-in">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 group hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-gray-900 truncate max-w-[200px] sm:max-w-[300px]">{file.name}</p>
                      <p className="text-xs text-blue-600 font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                        Ready for analysis
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}

              {files.length < 2 && (
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-3">Add another file (Optional)</p>
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2 border border-blue-200 rounded-lg text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 cursor-pointer transition-all"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Second File
                  </label>
                </div>
              )}
            </div>
          ) : (
            <div className="py-8">
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-colors duration-300 bg-gray-100 text-gray-400`}>
                <Upload className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <p className="text-xl font-bold text-gray-900 mb-3">
                Drag & drop your files here
              </p>
              <p className="text-sm text-gray-500 mb-6">Supported formats: PDF, DOCX, TXT</p>
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 cursor-pointer transition-all shadow-lg shadow-gray-900/10 hover:shadow-gray-900/20 hover:-translate-y-0.5"
              >
                Browse Files
              </label>
            </div>
          )}
        </div>
      </motion.div>

      {/* Consent */}
      <motion.div
        variants={itemVariants}
        className="flex items-start gap-3 mb-8 p-5 bg-blue-50/50 rounded-xl border border-blue-100"
      >
        <Checkbox
          id="consent"
          checked={consent}
          onCheckedChange={(checked) => setConsent(checked)}
          className="mt-1 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
        />
        <label htmlFor="consent" className="text-sm text-gray-700 leading-relaxed cursor-pointer select-none">
          I consent to <span className="font-semibold text-blue-700">AI-driven analysis</span> of this document. I understand that HUMAIRE
          operates with high standards of data privacy and confidentiality.
        </label>
      </motion.div>

      {/* Submit Button */}
      <motion.div variants={itemVariants}>
        <Button
          onClick={handleSubmit}
          disabled={files.length === 0 || !consent}
          className={`
            w-full py-7 text-lg h-auto rounded-xl font-semibold tracking-wide transition-all duration-300 group
            ${(files.length === 0 || !consent)
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-600/20 hover:shadow-2xl hover:shadow-blue-600/30 hover:-translate-y-0.5'}
          `}
        >
          <span className="flex items-center gap-2">
            {files.length > 1 ? 'Analyze Documents' : 'Analyze Document'}
            <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${(files.length === 0 || !consent) ? '' : 'group-hover:translate-x-1'}`} />
          </span>
        </Button>
      </motion.div>
    </motion.div>
  );
}