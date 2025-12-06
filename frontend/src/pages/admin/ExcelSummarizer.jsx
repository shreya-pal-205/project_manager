import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";
import { FiCopy, FiVolume2, FiSend, FiUpload } from "react-icons/fi";
import * as XLSX from "xlsx";
import DashboardLayout from "../../components/layouts/DashboardLayout";

// ✅ Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const ExcelSummarizer = () => {
  const [file, setFile] = useState(null);
  const [summaryType, setSummaryType] = useState("Crisp Summary");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ File Reading Logic
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);

    const fileType = selectedFile.name.split(".").pop().toLowerCase();

    try {
      if (fileType === "xlsx") {
        const data = await selectedFile.arrayBuffer();
        const workbook = XLSX.read(data);
        let text = "";
        workbook.SheetNames.forEach((name) => {
          const sheet = XLSX.utils.sheet_to_csv(workbook.Sheets[name]);
          text += sheet + "\n";
        });
        setContent(text.slice(0, 30000)); // limit for Gemini
      } else if (fileType === "txt") {
        const text = await selectedFile.text();
        setContent(text.slice(0, 30000));
      } else if (fileType === "pdf" || fileType === "docx") {
        const text = await selectedFile.text().catch(() => "");
        setContent(text.slice(0, 30000));
      } else {
        setError("❌ Unsupported file type! Please upload Excel, Word, or PDF.");
      }
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to read file content.");
    }
  };

  // ✅ Generate Summary
  const generateSummary = async () => {
    if (!file) {
      setError("Please upload a file first 📂");
      return;
    }
    setError("");
    setSummary("");
    setLoading(true);

    try {
      const prompt = `
      You are an expert assistant helping an HR manager.
      Summarize the following document in a ${summaryType.toLowerCase()}.
      Keep tone professional, readable, and well-structured with bullet points or short paragraphs.

      Document Content:
      ${content}
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setSummary(text);
    } catch (err) {
      console.error(err);
      setError("⚠️ Error generating summary. Try again!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Copy & Speak
  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    alert("📋 Summary copied!");
  };

  const speakText = () => {
    const utter = new SpeechSynthesisUtterance(summary);
    utter.lang = "en-IN";
    utter.rate = 1.0;
    speechSynthesis.speak(utter);
  };

  return (
    <DashboardLayout activeMenu="Excel Summarizer">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#D9EEFF] via-[#A7D8F2] to-[#89CFF3] p-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-[#C5E4F3] p-8 w-full max-w-3xl"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-[#1B4965] mb-2">
              📊 AI Document Summarizer
            </h1>
            <p className="text-[#527CA0] text-sm">
              Upload any file — Excel, PDF, or Word — and get an instant summary
            </p>
          </div>

          {/* File Upload */}
          <div className="flex flex-col gap-4">
            <label
              htmlFor="fileUpload"
              className="flex flex-col items-center justify-center border-2 border-dashed border-[#A7D8F2] rounded-xl p-6 cursor-pointer hover:bg-[#F0FAFF] transition-all"
            >
              <FiUpload className="text-[#0077B6] text-3xl mb-2" />
              <p className="text-gray-700 font-medium">
                {file ? file.name : "Click to upload a file"}
              </p>
              <input
                type="file"
                id="fileUpload"
                accept=".xlsx,.pdf,.docx,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <select
                className="bg-white border border-[#C5E4F3] text-gray-700 font-medium px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#61A5C2]"
                value={summaryType}
                onChange={(e) => setSummaryType(e.target.value)}
              >
                <option>Crisp Summary</option>
                <option>Detailed Summary</option>
              </select>

              <button
                onClick={generateSummary}
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-[#0077B6] to-[#0096C7] hover:from-[#0096C7] hover:to-[#00B4D8] text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-md disabled:opacity-50"
              >
                <FiSend /> {loading ? "Analyzing..." : "Generate Summary"}
              </button>
            </div>

            {error && (
              <p className="text-red-600 text-sm mt-1 font-medium">{error}</p>
            )}

            {loading && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="mx-auto mt-6 w-10 h-10 border-4 border-t-transparent border-[#0096C7] rounded-full"
              />
            )}
          </div>

          {/* Output */}
          {summary && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#F0FAFF] border border-[#BEE3F8] p-5 rounded-xl mt-6 shadow-sm"
            >
              <h2 className="font-semibold text-lg text-[#0077B6] mb-3">
                ✨ {summaryType} Result
              </h2>
              <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed bg-white p-3 rounded-lg border border-[#E0F4FF]">
                {summary}
              </pre>

              <div className="flex justify-end gap-4 mt-4">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 text-[#0077B6] hover:text-[#023E8A] font-medium"
                >
                  <FiCopy /> Copy
                </button>
                <button
                  onClick={speakText}
                  className="flex items-center gap-2 text-[#0096C7] hover:text-[#023E8A] font-medium"
                >
                  <FiVolume2 /> Speak
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        <footer className="mt-6 text-[#1B4965] text-sm text-center opacity-80">
          🧠 Powered by <span className="font-semibold">Gemini AI</span> •
          Designed for HR Efficiency
        </footer>
      </div>
    </DashboardLayout>
  );
};

export default ExcelSummarizer;
