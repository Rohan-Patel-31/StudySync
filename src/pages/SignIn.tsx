import React from 'react';
import { Link } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import { Brain } from 'lucide-react';

export function SignIn() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Brain className="h-12 w-12 text-indigo-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Or{' '}
          <Link to="/signup" className="font-medium text-indigo-500 hover:text-indigo-400">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AuthForm type="signin" />
        </div>
      </div>
    </div>
  );
}