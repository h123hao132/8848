import { Chapter } from '../types';

export const chapters: Chapter[] = [
  {
    id: 'chapter-1',
    title: 'Pandas 入门基础',
    order: 1,
    learningObjectives: [
      '掌握 Pandas 的安装和基本概念',
      '学会创建和操作 Series 和 DataFrame',
      '理解数据结构的基本属性',
    ],
    prerequisites: ['Python 基础', 'NumPy 基础'],
    theory: `Pandas 是 Python 中最强大、最流行的数据分析库。它提供了高效的数据结构和数据分析工具，使数据处理变得简单直观。

主要数据结构：
- Series: 一维数组，带标签索引
- DataFrame: 二维表格数据结构，类似 Excel 表格`,
    codeExamples: [
      {
        title: '创建 Series',
        description: '创建一个简单的 Series',
        code: `import pandas as pd
import numpy as np

# 创建 Series
s = pd.Series([1, 3, 5, np.nan, 6, 8])
print(s)`,
        explanation: 'Series 是一维标记数组，能够保存任何数据类型',
      },
      {
        title: '创建 DataFrame',
        description: '从字典创建 DataFrame',
        code: `import pandas as pd

# 创建 DataFrame
data = {
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'city': ['Beijing', 'Shanghai', 'Guangzhou']
}
df = pd.DataFrame(data)
print(df)`,
        explanation: 'DataFrame 是一个二维的表格型数据结构',
      },
    ],
    businessInsights: '在实际业务中，Pandas 可以快速处理大量结构化数据，进行数据清洗、数据分析和特征工程，是数据科学家和分析师的必备工具。',
    commonMistakes: [
      '忘记处理缺失值 NaN',
      '索引处理不当导致数据对齐错误',
      '过度使用 inplace=True 造成难以调试',
    ],
    summary: '本章介绍了 Pandas 的核心数据结构 Series 和 DataFrame，掌握这些基础知识是后续学习的基础。',
  },
  {
    id: 'chapter-2',
    title: '数据读取与保存',
    order: 2,
    learningObjectives: [
      '学会读取 CSV、Excel 等常见格式文件',
      '掌握数据保存的方法',
      '了解大型数据的处理技巧',
    ],
    prerequisites: ['Pandas 入门基础'],
    theory: `Pandas 支持读取和保存多种数据格式：CSV、Excel、SQL、JSON、HTML 等。掌握数据读取是数据分析的第一步。`,
    codeExamples: [
      {
        title: '读取 CSV 文件',
        description: '从 CSV 文件读取数据',
        code: `import pandas as pd

# 读取 CSV 文件
df = pd.read_csv('data.csv')
print(df.head())`,
        explanation: 'read_csv 是最常用的读取函数，支持多种参数配置',
      },
      {
        title: '保存数据',
        description: '将 DataFrame 保存为各种格式',
        code: `import pandas as pd

# 保存为 CSV
df.to_csv('output.csv', index=False)

# 保存为 Excel
df.to_excel('output.xlsx', sheet_name='Sheet1')`,
        explanation: '使用 to_csv、to_excel 等方法保存数据',
      },
    ],
    businessInsights: '在商业环境中，数据来源多样，熟练掌握数据读取和保存能够高效处理各种数据源，为后续分析奠定基础。',
    commonMistakes: [
      '文件路径错误',
      '编码问题导致读取失败',
      '未指定正确的分隔符',
    ],
    summary: '本章讲解了数据读取和保存的方法，这些是数据分析工作流中的基本操作。',
  },
  {
    id: 'chapter-3',
    title: '数据清洗与预处理',
    order: 3,
    learningObjectives: [
      '掌握缺失值处理方法',
      '学会处理重复数据',
      '理解数据类型转换',
    ],
    prerequisites: ['数据读取与保存'],
    theory: `数据清洗是数据分析过程中最重要的步骤之一。真实世界的数据通常存在各种问题：缺失值、重复数据、异常值、格式不一致等。`,
    codeExamples: [
      {
        title: '处理缺失值',
        description: '检测和处理缺失值',
        code: `import pandas as pd

# 检测缺失值
print(df.isnull().sum())

# 删除缺失值
df_clean = df.dropna()

# 填充缺失值
df_filled = df.fillna(value=0)`,
        explanation: 'isnull() 和 notnull() 用于检测，dropna() 删除，fillna() 填充',
      },
    ],
    businessInsights: '数据质量直接影响分析结果，好的数据清洗能提升分析准确性。',
    commonMistakes: [
      '随意删除缺失数据',
      '填充值选择不当',
    ],
    summary: '数据清洗是数据分析的基础，必须重视。',
  },
];
