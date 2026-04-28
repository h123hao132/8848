import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'project-1',
    title: '电商销售数据分析',
    description: '分析电商平台的销售数据，发现业务洞察',
    order: 1,
    difficulty: 'beginner',
    businessScenario: '某电商平台需要分析月度销售数据，了解销售趋势、热门商品和客户购买行为。',
    dataset: 'ecommerce_sales.csv',
    tasks: {
      basic: [
        {
          id: 'p1-basic-1',
          title: '数据加载与基本探索',
          description: '读取销售数据并进行初步查看',
          steps: [
            '使用 pandas 读取 CSV 数据文件',
            '查看数据的前几行、数据形状、列名',
            '检查数据类型和缺失值',
          ],
          requirements: [
            '成功读取数据',
            '输出数据的基本信息',
            '统计缺失值数量',
          ],
          hint: '使用 read_csv(), head(), info(), isnull() 等方法',
        },
        {
          id: 'p1-basic-2',
          title: '数据清洗',
          description: '处理数据中的缺失值和异常值',
          steps: [
            '识别并处理缺失值',
            '检查重复数据并删除',
            '统一日期格式',
          ],
          requirements: [
            '缺失值处理完成',
            '无重复数据',
            '日期格式正确',
          ],
        },
      ],
      advanced: [
        {
          id: 'p1-advanced-1',
          title: '销售趋势分析',
          description: '分析月度销售趋势',
          steps: [
            '按月份聚合销售数据',
            '计算月销售额和订单量',
            '分析销售高峰和低谷',
          ],
          requirements: ['生成月度销售报告'],
        },
      ],
      comprehensive: [
        {
          id: 'p1-comprehensive-1',
          title: '完整数据分析报告',
          description: '生成完整的销售数据分析报告',
          steps: [
            '汇总所有分析结果',
            '生成关键指标',
            '提出业务建议',
          ],
          requirements: ['完整的分析报告'],
        },
      ],
    },
  },
  {
    id: 'project-2',
    title: '客户数据分析与画像',
    description: '分析客户数据并构建用户画像',
    order: 2,
    difficulty: 'intermediate',
    businessScenario: '企业需要深入了解客户构成和消费习惯，为精准营销提供支持。',
    dataset: 'customer_data.csv',
    tasks: {
      basic: [
        {
          id: 'p2-basic-1',
          title: '客户基础信息分析',
          description: '分析客户基本特征',
          steps: [
            '分析客户年龄分布',
            '分析地域分布',
            '分析注册时间',
          ],
          requirements: ['基础统计分析'],
        },
      ],
      advanced: [
        {
          id: 'p2-advanced-1',
          title: 'RFM 分析',
          description: '进行 RFM 客户价值分析',
          steps: ['计算 R、F、M 指标', '客户分群'],
          requirements: ['RFM 分析结果'],
        },
      ],
      comprehensive: [
        {
          id: 'p2-comprehensive-1',
          title: '客户画像构建',
          description: '构建完整的客户画像体系',
          steps: [
            '整合所有分析维度',
            '定义客户标签',
            '给出营销建议',
          ],
          requirements: ['客户画像报告'],
        },
      ],
    },
  },
  {
    id: 'project-3',
    title: 'K-Means 聚类分析',
    description: '使用 K-Means 进行数据聚类建模',
    order: 3,
    difficulty: 'advanced',
    businessScenario: '通过聚类发现用户群组，为不同群体提供差异化服务。',
    dataset: 'user_behavior.csv',
    tasks: {
      basic: [
        {
          id: 'p3-basic-1',
          title: '数据标准化',
          description: '对数据进行标准化处理',
          steps: ['选择特征', '数据标准化'],
          requirements: ['标准化后的数据'],
        },
      ],
      advanced: [
        {
          id: 'p3-advanced-1',
          title: '聚类模型构建',
          description: '使用 K-Means 进行聚类',
          steps: ['选择最佳 K 值', '构建模型', '解释结果'],
          requirements: ['聚类结果'],
        },
      ],
      comprehensive: [
        {
          id: 'p3-comprehensive-1',
          title: '聚类分析报告',
          description: '生成完整的聚类分析报告',
          steps: ['分析每个聚类特征', '给出业务建议'],
          requirements: ['聚类分析报告'],
        },
      ],
    },
  },
];
