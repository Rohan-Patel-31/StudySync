import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload, Book, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { supabase } from '../lib/supabase';
import type { Document } from '../lib/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function Documents() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [testMode, setTestMode] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setAnalyzing(true);
    try {
      // In a real application, you would upload the file to Supabase storage
      // and then call your AI service to analyze the PDF
      // For now, we'll simulate the analysis with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockAnalysis = {
        title: file.name,
        summary: "This is a sample summary of the uploaded document...",
        key_points: [
          "Key point 1 about the document",
          "Key point 2 about important concepts",
          "Key point 3 highlighting main ideas"
        ],
        mcqs: [
          {
            question: "What is the main topic discussed in the document?",
            options: ["Option A", "Option B", "Option C", "Option D"],
            correct_answer: "Option A",
            type: "mcq"
          },
          {
            question: "Fill in the blank: The document discusses _____ in detail.",
            options: ["concept", "theory", "practice", "methodology"],
            correct_answer: "theory",
            type: "fill_in_blank"
          }
        ]
      };

      const { data, error } = await supabase
        .from('documents')
        .insert([mockAnalysis])
        .select()
        .single();

      if (error) throw error;

      setDocuments(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error analyzing document:', error);
    } finally {
      setAnalyzing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  async function fetchDocuments() {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  }

  function startTest(document: Document) {
    setSelectedDocument(document);
    setTestMode(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
  }

  function handleAnswer(answer: string) {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestionIndex + 1 < selectedDocument!.mcqs.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate score
      const correctAnswers = selectedDocument!.mcqs.filter(
        (q, i) => q.correct_answer === newAnswers[i]
      ).length;
      setScore((correctAnswers / selectedDocument!.mcqs.length) * 100);
      setShowResults(true);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-3xl font-bold text-white mb-8">Document Analysis</h1>

          {/* Upload Section */}
          <div
            {...getRootProps()}
            className={`mb-8 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-700 hover:border-indigo-500'}`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-300">
              {isDragActive
                ? 'Drop the PDF here'
                : 'Drag and drop a PDF file here, or click to select'}
            </p>
            <p className="text-sm text-gray-500 mt-2">Only PDF files are accepted</p>
          </div>

          {analyzing && (
            <div className="mb-8 text-center">
              <RefreshCw className="animate-spin h-8 w-8 text-indigo-500 mx-auto mb-4" />
              <p className="text-gray-300">Analyzing your document...</p>
            </div>
          )}

          {/* Document List */}
          {loading ? (
            <div className="text-center text-gray-400">Loading documents...</div>
          ) : documents.length === 0 ? (
            <div className="text-center text-gray-400">
              No documents yet. Upload your first document to get started!
            </div>
          ) : testMode && selectedDocument ? (
            <div className="bg-gray-800 rounded-lg p-6">
              {showResults ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white text-center">Test Results</h2>
                  <div className="flex justify-center">
                    <div className="w-64 h-64 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">{Math.round(score)}%</span>
                      </div>
                      <ResponsiveContainer>
                        <BarChart data={[{ name: 'Score', value: score }]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Bar dataKey="value" fill="#6366F1" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {selectedDocument.mcqs.map((q, i) => (
                      <div key={i} className="bg-gray-700 rounded-lg p-4">
                        <p className="text-white mb-2">{q.question}</p>
                        <div className="flex items-center text-sm">
                          <span className="text-gray-300">Your answer: </span>
                          <span className="ml-2 text-white">{answers[i]}</span>
                          {answers[i] === q.correct_answer ? (
                            <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 ml-2" />
                          )}
                        </div>
                        {answers[i] !== q.correct_answer && (
                          <div className="text-sm text-gray-300 mt-1">
                            Correct answer: {q.correct_answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setTestMode(false);
                      setSelectedDocument(null);
                    }}
                    className="w-full mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Back to Documents
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Question {currentQuestionIndex + 1} of {selectedDocument.mcqs.length}
                  </h2>
                  <div className="space-y-6">
                    <p className="text-white text-lg">
                      {selectedDocument.mcqs[currentQuestionIndex].question}
                    </p>
                    <div className="grid gap-4">
                      {selectedDocument.mcqs[currentQuestionIndex].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAnswer(option)}
                          className="w-full px-4 py-3 text-left bg-gray-700 text-white rounded-md hover:bg-gray-600"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {documents.map((doc) => (
                <div key={doc.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 text-indigo-500" />
                      <h3 className="ml-2 text-lg font-semibold text-white">{doc.title}</h3>
                    </div>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300">Summary</h4>
                      <p className="mt-1 text-sm text-gray-400">{doc.summary}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-300">Key Points</h4>
                      <ul className="mt-1 list-disc list-inside text-sm text-gray-400">
                        {doc.key_points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={() => startTest(doc)}
                    className="mt-6 w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    <Book className="h-5 w-5 mr-2" />
                    Test Knowledge
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}