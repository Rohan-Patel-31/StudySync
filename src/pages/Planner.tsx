import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { Plus, Calendar, Clock, Book, Trash2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { supabase } from '../lib/supabase';
import type { StudyPlan, NewStudyPlan } from '../lib/types';

export function Planner() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewPlanForm, setShowNewPlanForm] = useState(false);
  const [newPlan, setNewPlan] = useState<NewStudyPlan>({
    title: '',
    description: '',
    start_date: new Date().toISOString(),
    end_date: new Date().toISOString(),
    schedule: {}
  });

  useEffect(() => {
    fetchStudyPlans();
  }, []);

  async function fetchStudyPlans() {
    try {
      const { data: studyPlans, error } = await supabase
        .from('study_plans')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPlans(studyPlans || []);
    } catch (error) {
      console.error('Error fetching study plans:', error);
    } finally {
      setLoading(false);
    }
  }

  async function createStudyPlan(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('study_plans')
        .insert([newPlan]);

      if (error) throw error;
      
      setShowNewPlanForm(false);
      setNewPlan({
        title: '',
        description: '',
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        schedule: {}
      });
      fetchStudyPlans();
    } catch (error) {
      console.error('Error creating study plan:', error);
    }
  }

  async function deletePlan(id: string) {
    try {
      const { error } = await supabase
        .from('study_plans')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchStudyPlans();
    } catch (error) {
      console.error('Error deleting study plan:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Study Planner</h1>
            <button
              onClick={() => setShowNewPlanForm(true)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Plan
            </button>
          </div>

          {showNewPlanForm && (
            <div className="mb-8 bg-gray-800 p-6 rounded-lg">
              <form onSubmit={createStudyPlan} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Title</label>
                  <input
                    type="text"
                    value={newPlan.title}
                    onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">Description</label>
                  <textarea
                    value={newPlan.description}
                    onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">Start Date</label>
                    <DatePicker
                      selected={new Date(newPlan.start_date)}
                      onChange={(date) => setNewPlan({ ...newPlan, start_date: date?.toISOString() || new Date().toISOString() })}
                      className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">End Date</label>
                    <DatePicker
                      selected={new Date(newPlan.end_date)}
                      onChange={(date) => setNewPlan({ ...newPlan, end_date: date?.toISOString() || new Date().toISOString() })}
                      className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowNewPlanForm(false)}
                    className="px-4 py-2 text-gray-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Create Plan
                  </button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="text-center text-gray-400">Loading study plans...</div>
          ) : plans.length === 0 ? (
            <div className="text-center text-gray-400">
              No study plans yet. Create your first plan to get started!
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan) => (
                <div key={plan.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-white">{plan.title}</h3>
                    <button
                      onClick={() => deletePlan(plan.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mt-2 text-gray-400">{plan.description}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>{format(new Date(plan.start_date), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>{format(new Date(plan.end_date), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Book className="h-5 w-5 mr-2" />
                      <span>{Object.keys(plan.schedule).length} study sessions</span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/planner/${plan.id}`)}
                    className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    View Details
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