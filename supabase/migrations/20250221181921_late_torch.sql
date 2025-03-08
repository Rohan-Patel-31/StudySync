/*
  # AI Learning Features Schema

  1. New Tables
    - `study_plans`
      - Stores personalized study schedules
      - Links to user profiles
    - `documents`
      - Stores uploaded PDF metadata and analysis
    - `question_papers`
      - Stores analyzed past papers
    - `performance_metrics`
      - Tracks student progress and analytics

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Study Plans Table
CREATE TABLE IF NOT EXISTS study_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  schedule jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE study_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own study plans"
  ON study_plans
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Documents Table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  title text NOT NULL,
  summary text,
  key_points jsonb DEFAULT '[]',
  mcqs jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own documents"
  ON documents
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Question Papers Table
CREATE TABLE IF NOT EXISTS question_papers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  title text NOT NULL,
  subject text NOT NULL,
  analysis jsonb DEFAULT '{}',
  important_topics jsonb DEFAULT '[]',
  question_patterns jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE question_papers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own question papers"
  ON question_papers
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Performance Metrics Table
CREATE TABLE IF NOT EXISTS performance_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  subject text NOT NULL,
  score integer,
  strengths jsonb DEFAULT '[]',
  weaknesses jsonb DEFAULT '[]',
  recommendations jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own performance metrics"
  ON performance_metrics
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);