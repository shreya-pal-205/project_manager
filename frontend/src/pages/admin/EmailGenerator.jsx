import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";
import { FiCopy, FiVolume2, FiSend } from "react-icons/fi";
import DashboardLayout from "../../components/layouts/DashboardLayout";

// ✅ Gemini API Setup
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const EmailGenerator = () => {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("Email");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateEmail = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic or description ✍️");
      return;
    }
    setError("");
    setGeneratedText("");
    setLoading(true);

    try {
      const prompt = `
      Write a professional ${type} for the following topic:
      "${topic}"
      Requirements:
      - Use correct grammar and formal tone
      - Include subject line if it's an email
      - Be polite and concise
      - Format neatly with line breaks and spacing
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setGeneratedText(text);
    } catch (err) {
      setError("⚠️ Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    alert("📋 Copied to clipboard!");
  };

  const speakText = () => {
    const utter = new SpeechSynthesisUtterance(generatedText);
    utter.lang = "en-IN";
    utter.rate = 1.0;
    speechSynthesis.speak(utter);
  };

  return (
    <DashboardLayout activeMenu="Email Generator">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#D9EEFF] via-[#A7D8F2] to-[#89CFF3] p-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-[#C5E4F3] p-8 w-full max-w-3xl"
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-[#1B4965] mb-2">
              💼 AI Email & Letter Generator
            </h1>
            <p className="text-[#527CA0] text-sm">
              Generate polished and professional communication instantly
            </p>
          </div>

          {/* Input Section */}
          <div className="flex flex-col gap-4">
            <textarea
              className="w-full p-4 rounded-xl border border-[#C5E4F3] focus:ring-2 focus:ring-[#61A5C2] outline-none text-gray-800 placeholder-gray-500 resize-none"
              placeholder="Enter your topic or short description..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
            />

            <div className="flex items-center justify-between flex-wrap gap-3">
              <select
                className="bg-white border border-[#C5E4F3] text-gray-700 font-medium px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#61A5C2]"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option>Email</option>
                <option>Letter</option>
                <option>Memo</option>
              </select>

              <button
                onClick={generateEmail}
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-[#0077B6] to-[#0096C7] hover:from-[#0096C7] hover:to-[#00B4D8] text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-md disabled:opacity-50"
              >
                <FiSend /> {loading ? "Generating..." : "Generate"}
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

          {/* Generated Output */}
          {generatedText && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#F0FAFF] border border-[#BEE3F8] p-5 rounded-xl mt-6 shadow-sm"
            >
              <h2 className="font-semibold text-lg text-[#0077B6] mb-3">
                ✨ Generated {type}
              </h2>
              <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed bg-white p-3 rounded-lg border border-[#E0F4FF]">
                {generatedText}
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
          Powered by <span className="font-semibold">Gemini AI</span> • Crafted
          with 💙 for professionals
        </footer>
      </div>
    </DashboardLayout>
  );
};

export default EmailGenerator;
