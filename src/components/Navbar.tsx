import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  Brain,
  LogOut,
  Calendar,
  FileText,
  BookOpen,
  BarChart2,
  Lightbulb,
} from 'lucide-react';

export function Navbar() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="border-b border-gray-800 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-indigo-500" />
            <span className="ml-2 text-xl font-bold text-white">StudySync</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="/planner" className="flex items-center text-gray-300 hover:text-white">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Study Planner</span>
            </a>
            <a href="/documents" className="flex items-center text-gray-300 hover:text-white">
              <FileText className="h-5 w-5 mr-2" />
              <span>Documents</span>
            </a>
            <a href="/papers" className="flex items-center text-gray-300 hover:text-white">
              <BookOpen className="h-5 w-5 mr-2" />
              <span>Question Papers</span>
            </a>
            <a href="/analytics" className="flex items-center text-gray-300 hover:text-white">
              <BarChart2 className="h-5 w-5 mr-2" />
              <span>Analytics</span>
            </a>
            <a href="/recommendations" className="flex items-center text-gray-300 hover:text-white">
              <Lightbulb className="h-5 w-5 mr-2" />
              <span>Recommendations</span>
            </a>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center text-gray-300 hover:text-white"
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}