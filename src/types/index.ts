export interface CodeExample {
  title: string;
  description: string;
  code: string;
  explanation: string;
}

export interface Chapter {
  id: string;
  title: string;
  order: number;
  learningObjectives: string[];
  prerequisites: string[];
  theory: string;
  codeExamples: CodeExample[];
  businessInsights: string;
  commonMistakes: string[];
  summary: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  steps: string[];
  requirements: string[];
  hint?: string;
  solution?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  order: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tasks: {
    basic: Task[];
    advanced: Task[];
    comprehensive: Task[];
  };
  dataset: string;
  businessScenario: string;
}

export interface Question {
  id: string;
  type: 'single' | 'multiple' | 'code-fix' | 'code-fill' | 'coding';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  knowledgePoint: string;
  codeSnippet?: string;
  solutionCode?: string;
}

export interface Quiz {
  id: string;
  chapterId: string;
  questions: Question[];
}

export interface AssessmentQuestion {
  id: string;
  dimension: string;
  question: Question;
  score: number;
}

export interface Assessment {
  id: string;
  type: 'section' | 'unit' | 'stage' | 'final';
  title: string;
  description: string;
  duration: number;
  totalScore: number;
  passingScore: number;
  questions: AssessmentQuestion[];
  dimensions: string[];
}

export interface LearningProgress {
  chapters: Record<string, { completed: boolean; lastAccessed: number }>;
  projects: Record<string, { completed: boolean; tasks: Record<string, boolean> }>;
  quizzes: Record<string, { score: number; completed: boolean }>;
  assessments: Record<string, { score: number; passed: boolean; completedDate: number }>;
}
