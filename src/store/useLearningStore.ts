import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LearningProgress } from '../types';

interface LearningState {
  progress: LearningProgress;
  updateChapterProgress: (chapterId: string, completed: boolean) => void;
  updateProjectTask: (projectId: string, taskId: string, completed: boolean) => void;
  updateQuizScore: (quizId: string, score: number, completed: boolean) => void;
  updateAssessment: (assessmentId: string, score: number, passed: boolean) => void;
  resetProgress: () => void;
}

const initialProgress: LearningProgress = {
  chapters: {},
  projects: {},
  quizzes: {},
  assessments: {},
};

export const useLearningStore = create<LearningState>()(
  persist(
    (set) => ({
      progress: initialProgress,
      updateChapterProgress: (chapterId: string, completed: boolean) =>
        set((state) => ({
          progress: {
            ...state.progress,
            chapters: {
              ...state.progress.chapters,
              [chapterId]: {
                completed,
                lastAccessed: Date.now(),
              },
            },
          },
        })),
      updateProjectTask: (projectId: string, taskId: string, completed: boolean) =>
        set((state) => {
          const projectProgress = state.progress.projects[projectId] || {
            completed: false,
            tasks: {},
          };
          const updatedTasks = {
            ...projectProgress.tasks,
            [taskId]: completed,
          };
          const allTasksCompleted = Object.values(updatedTasks).every(Boolean);

          return {
            progress: {
              ...state.progress,
              projects: {
                ...state.progress.projects,
                [projectId]: {
                  ...projectProgress,
                  completed: allTasksCompleted,
                  tasks: updatedTasks,
                },
              },
            },
          };
        }),
      updateQuizScore: (quizId: string, score: number, completed: boolean) =>
        set((state) => ({
          progress: {
            ...state.progress,
            quizzes: {
              ...state.progress.quizzes,
              [quizId]: { score, completed },
            },
          },
        })),
      updateAssessment: (assessmentId: string, score: number, passed: boolean) =>
        set((state) => ({
          progress: {
            ...state.progress,
            assessments: {
              ...state.progress.assessments,
              [assessmentId]: {
                score,
                passed,
                completedDate: Date.now(),
              },
            },
          },
        })),
      resetProgress: () =>
        set(() => ({
          progress: initialProgress,
        })),
    }),
    {
      name: 'pandas-learning-progress',
    }
  )
);
