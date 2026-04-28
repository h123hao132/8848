import { CheckCircle, Circle, ChevronDown, ChevronRight, Lightbulb } from 'lucide-react';
import { Task } from '../types';
import { useState } from 'react';
import { useLearningStore } from '../store/useLearningStore';

interface TaskCardProps {
  projectId: string;
  task: Task;
}

export default function TaskCard({ projectId, task }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  
  const { progress, updateProjectTask } = useLearningStore();
  const isCompleted = progress.projects[projectId]?.tasks[task.id] || false;

  const toggleCompletion = () => {
    updateProjectTask(projectId, task.id, !isCompleted);
  };

  return (
    <div className={`border rounded-xl p-5 transition-all ${isCompleted ? 'border-green-500/50 bg-green-50 dark:bg-green-950/30' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={toggleCompletion}
          className={`mt-1 flex-shrink-0 transition-colors ${isCompleted ? 'text-green-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
        >
          {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
        </button>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className={`font-semibold text-lg ${isCompleted ? 'text-green-700 dark:text-green-400 line-through' : 'text-slate-900 dark:text-white'}`}>
              {task.title}
            </h3>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
          
          <p className="mt-1 text-slate-600 dark:text-slate-400">{task.description}</p>
          
          {isExpanded && (
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">步骤：</h4>
                <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  {task.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">要求：</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  {task.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex gap-3 flex-wrap">
                {task.hint && (
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
                  >
                    <Lightbulb className="w-4 h-4" />
                    {showHint ? '隐藏提示' : '显示提示'}
                  </button>
                )}
                {task.solution && (
                  <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    {showSolution ? '隐藏参考答案' : '查看参考答案'}
                  </button>
                )}
              </div>
              
              {showHint && task.hint && (
                <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="text-sm text-amber-800 dark:text-amber-300">{task.hint}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
