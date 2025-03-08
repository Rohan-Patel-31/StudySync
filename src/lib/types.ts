export interface StudyPlan {
  id: string;
  user_id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  schedule: {
    [date: string]: {
      topics: string[];
      duration: number;
      resources: string[];
    }[];
  };
  created_at: string;
  updated_at: string;
}

export interface NewStudyPlan {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  schedule: StudyPlan['schedule'];
}

export interface Document {
  id: string;
  user_id: string;
  title: string;
  summary: string;
  key_points: string[];
  mcqs: {
    question: string;
    options: string[];
    correct_answer: string;
    type: 'mcq' | 'fill_in_blank';
  }[];
  created_at: string;
  updated_at: string;
}

export interface DocumentAnalysis {
  summary: string;
  key_points: string[];
  mcqs: Document['mcqs'];
}