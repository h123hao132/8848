import { Quiz } from '../types';

export const quizzes: Quiz[] = [
  {
    id: 'quiz-chapter-1',
    chapterId: 'chapter-1',
    questions: [
      {
        id: 'q1-1',
        type: 'single',
        difficulty: 'easy',
        question: 'Pandas 中主要的两个数据结构是什么？',
        options: [
          'Array 和 List',
          'Series 和 DataFrame',
          'Matrix 和 Vector',
          'Table 和 Sheet',
        ],
        correctAnswer: 'Series 和 DataFrame',
        explanation: 'Pandas 的核心数据结构是 Series（一维）和 DataFrame（二维）。',
        knowledgePoint: 'Pandas 数据结构',
      },
      {
        id: 'q1-2',
        type: 'single',
        difficulty: 'easy',
        question: 'DataFrame 可以看作是什么？',
        options: [
          '一维数组',
          'Excel 表格或 SQL 表',
          'Python 字典',
          'NumPy 数组',
        ],
        correctAnswer: 'Excel 表格或 SQL 表',
        explanation: 'DataFrame 是一个二维的表格型数据结构，类似 Excel 表格。',
        knowledgePoint: 'DataFrame 概念',
      },
      {
        id: 'q1-3',
        type: 'code-fix',
        difficulty: 'medium',
        question: '下面的代码有错误，请找出并修正：',
        codeSnippet: `import pandas as pd

# 创建 DataFrame
data = {'name': ['Alice', 'Bob']}
df = pd.DataFrame
print(df)`,
        correctAnswer: 'pd.DataFrame()',
        explanation: 'DataFrame 是构造函数，需要加括号调用。',
        knowledgePoint: 'DataFrame 创建',
      },
    ],
  },
  {
    id: 'quiz-chapter-2',
    chapterId: 'chapter-2',
    questions: [
      {
        id: 'q2-1',
        type: 'single',
        difficulty: 'easy',
        question: '读取 CSV 文件用什么函数？',
        options: [
          'read_excel()',
          'read_csv()',
          'load_csv()',
          'open_csv()',
        ],
        correctAnswer: 'read_csv()',
        explanation: 'pandas 提供 read_csv() 函数读取 CSV 文件。',
        knowledgePoint: '数据读取',
      },
      {
        id: 'q2-2',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Pandas 支持读取哪些格式的数据？（多选）',
        options: [
          'CSV',
          'Excel',
          'JSON',
          'SQL',
        ],
        correctAnswer: ['CSV', 'Excel', 'JSON', 'SQL'],
        explanation: 'Pandas 支持多种数据格式的读取和写入。',
        knowledgePoint: '数据格式',
      },
    ],
  },
];
