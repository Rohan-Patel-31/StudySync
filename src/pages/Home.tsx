import React from 'react';
import { Navbar } from '../components/Navbar';
import {
  Calendar,
  FileText,
  BookOpen,
  BarChart2,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-white">
            <h1 className="text-3xl font-bold">Welcome to StudySync</h1>
            <p className="mt-4 text-gray-300">
              Your AI-powered learning assistant is ready to help you succeed.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Study Planner Card */}
              <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-indigo-500" />
                  <h2 className="ml-3 text-xl font-semibold">Study Planner</h2>
                </div>
                <p className="mt-4 text-gray-400">
                  Get personalized study schedules based on your syllabus and learning pace.
                </p>
                <a
                  href="/planner"
                  className="mt-4 inline-flex items-center text-indigo-400 hover:text-indigo-300"
                >
                  Create Plan <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>

              {/* Document Analysis Card */}
              <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-indigo-500" />
                  <h2 className="ml-3 text-xl font-semibold">Document Analysis</h2>
                </div>
                <p className="mt-4 text-gray-400">
                  Upload PDFs for AI-powered summaries, key points, and practice questions.
                </p>
                <a
                  href="/documents"
                  className="mt-4 inline-flex items-center text-indigo-400 hover:text-indigo-300"
                >
                  Upload Document <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>

              {/* Question Papers Card */}
              <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-indigo-500" />
                  <h2 className="ml-3 text-xl font-semibold">Question Papers</h2>
                </div>
                <p className="mt-4 text-gray-400">
                  Analyze past papers for patterns and get AI-powered topic suggestions.
                </p>
                <a
                  href="/papers"
                  className="mt-4 inline-flex items-center text-indigo-400 hover:text-indigo-300"
                >
                  View Papers <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>

              {/* Performance Analytics Card */}
              <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                <div className="flex items-center">
                  <BarChart2 className="h-8 w-8 text-indigo-500" />
                  <h2 className="ml-3 text-xl font-semibold">Analytics</h2>
                </div>
                <p className="mt-4 text-gray-400">
                  Track your progress with AI-driven insights and performance metrics.
                </p>
                <a
                  href="/analytics"
                  className="mt-4 inline-flex items-center text-indigo-400 hover:text-indigo-300"
                >
                  View Analytics <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>

              {/* Recommendations Card */}
              <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
                <div className="flex items-center">
                  <Lightbulb className="h-8 w-8 text-indigo-500" />
                  <h2 className="ml-3 text-xl font-semibold">Recommendations</h2>
                </div>
                <p className="mt-4 text-gray-400">
                  Get personalized learning resources based on your progress and goals.
                </p>
                <a
                  href="/recommendations"
                  className="mt-4 inline-flex items-center text-indigo-400 hover:text-indigo-300"
                >
                  View Recommendations <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}