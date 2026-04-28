import { Assessment } from '../types';

export const assessments: Assessment[] = [
  {
    id: 'assessment-section-1',
    type: 'section',
    title: '第一章随堂测试',
    description: '测试 Pandas 基础概念的掌握情况',
    duration: 30,
    totalScore: 100,
    passingScore: 60,
    dimensions: ['基础概念', '代码理解'],
    questions: [
      {
        id: 'aq1-1',
        dimension: '基础概念',
        score: 20,
        question: {
          id: 'aq1',
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
      },
      {
        id: 'aq1-2',
        dimension: '代码理解',
        score: 30,
        question: {
          id: 'aq2',
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
      },
      {
        id: 'aq1-3',
        dimension: '基础概念',
        score: 50,
        question: {
          id: 'aq3',
          type: 'coding',
          difficulty: 'hard',
          question: '请编写代码创建一个包含姓名、年龄和城市的 DataFrame',
          solutionCode: `import pandas as pd

data = {
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'city': ['Beijing', 'Shanghai', 'Guangzhou']
}
df = pd.DataFrame(data)
print(df)`,
          correctAnswer: '创建包含三列的 DataFrame',
          explanation: '可以使用字典来创建 DataFrame，键为列名，值为数据列表。',
          knowledgePoint: 'DataFrame 创建',
        },
      },
    ],
  },
];
