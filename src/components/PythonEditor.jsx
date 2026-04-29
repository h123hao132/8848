import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';
import {
  Play,
  RotateCcw,
  Code2,
  CheckCircle,
  AlertCircle,
  Download
} from 'lucide-react';

const ecommerceCode = `# ==============================================
# 电商数据分析全流程：购物车分析 + K-Means聚类
# 核心工具：pandas, matplotlib, seaborn, scikit-learn
# ==============================================
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
import warnings
warnings.filterwarnings('ignore')

# ----------------------
# 1. 数据读取与基础清洗
# ----------------------
# 模拟电商订单/购物车数据
print("📊 开始数据分析流程...")
data = {
    'order_id': [f'ORD{i:04d}' for i in range(1, 1001)],
    'user_id': np.random.randint(1000, 2000, 1000),
    'product_id': np.random.randint(100, 200, 1000),
    'product_name': [f'Product_{i}' for i in np.random.randint(100, 200, 1000)],
    'category': np.random.choice(['Electronics', 'Clothing', 'Home', 'Beauty'], 1000),
    'price': np.round(np.random.uniform(10, 500, 1000), 2),
    'quantity': np.random.randint(1, 5, 1000),
    'order_date': pd.date_range(start='2025-01-01', end='2025-12-31', periods=1000),
    'is_paid': np.random.choice([0, 1], 1000, p=[0.3, 0.7])
}
df = pd.DataFrame(data)
df['total_amount'] = df['price'] * df['quantity']

# 清洗：去重、缺失值、异常值
df = df.drop_duplicates(subset=['order_id', 'product_id'])
df = df.dropna(subset=['user_id', 'order_date', 'total_amount'])
df = df[(df['total_amount'] > 0) & (df['quantity'] > 0)]
df['order_date'] = pd.to_datetime(df['order_date'])

print("=== 数据清洗完成 ===")
print(f"数据形状: {df.shape}")
print(df.head())
print("\\n")

# ----------------------
# 2. 购物车核心分析
# ----------------------
# 2.1 购物车放弃率分析
cart_stats = df.groupby('user_id').agg(
    cart_items=('product_id', 'count'),
    paid_orders=('is_paid', 'sum'),
    total_cart_value=('total_amount', 'sum')
).reset_index()
cart_stats['abandon_rate'] = 1 - (cart_stats['paid_orders'] / cart_stats['cart_items'])
cart_stats['abandon_rate'] = cart_stats['abandon_rate'].fillna(0)

print("=== 购物车放弃率统计 ===")
print(cart_stats[['user_id', 'cart_items', 'paid_orders', 'abandon_rate']].head())
print("\\n")

# 2.2 购物车商品共现分析
from itertools import combinations
order_products = df.groupby('order_id')['product_name'].apply(list).reset_index()
product_pairs = []
for products in order_products['product_name']:
    if len(products) >= 2:
        pairs = combinations(sorted(products), 2)
        product_pairs.extend(pairs)
pair_counts = pd.Series(product_pairs).value_counts().head(10)
print("=== 购物车TOP10商品组合 ===")
print(pair_counts)
print("\\n")

# ----------------------
# 3. RFM特征工程（聚类前置）
# ----------------------
snapshot_date = df['order_date'].max() + pd.Timedelta(days=1)
rfm = df.groupby('user_id').agg(
    Recency=('order_date', lambda x: (snapshot_date - x.max()).days),
    Frequency=('order_id', 'nunique'),
    Monetary=('total_amount', 'sum')
).reset_index()

# 异常值处理
def clip_outliers(df, cols):
    for col in cols:
        lower = df[col].quantile(0.01)
        upper = df[col].quantile(0.99)
        df[col] = df[col].clip(lower, upper)
    return df

rfm = clip_outliers(rfm, ['Recency', 'Frequency', 'Monetary'])
print("=== RFM特征概览 ===")
print(rfm.describe())
print("\\n")

# ----------------------
# 4. K-Means聚类建模
# ----------------------
# 特征标准化
scaler = StandardScaler()
rfm_scaled = scaler.fit_transform(rfm[['Recency', 'Frequency', 'Monetary']])

# 手肘法选最优K
sse = []
sil_scores = []
k_range = range(2, 10)
for k in k_range:
    kmeans = KMeans(n_clusters=k, init='k-means++', random_state=42)
    kmeans.fit(rfm_scaled)
    sse.append(kmeans.inertia_)
    sil_scores.append(silhouette_score(rfm_scaled, kmeans.labels_))

# 选定K=4聚类
best_k = 4
kmeans = KMeans(n_clusters=best_k, init='k-means++', random_state=42)
rfm['cluster'] = kmeans.fit_predict(rfm_scaled)

# 聚类结果统计
cluster_summary = rfm.groupby('cluster').agg(
    用户数=('user_id', 'count'),
    平均R=('Recency', 'mean'),
    平均F=('Frequency', 'mean'),
    平均M=('Monetary', 'mean')
).round(2)
print("=== 聚类结果汇总 ===")
print(cluster_summary)
print("\\n")

# ----------------------
# 5. 聚类可视化与业务解读
# ----------------------
# 业务命名与解读
cluster_names = {
    0: '高价值活跃用户',
    1: '潜力新用户',
    2: '流失风险用户',
    3: '低频高消费用户'
}
rfm['segment'] = rfm['cluster'].map(cluster_names)
print("=== 用户分群业务命名 ===")
print(rfm[['user_id', 'cluster', 'segment']].head())
print("\\n")

# ----------------------
# 6. 购物车+聚类融合分析
# ----------------------
user_cart_cluster = pd.merge(rfm, cart_stats, on='user_id', how='left')
cart_cluster = user_cart_cluster.groupby('segment').agg(
    平均购物车商品数=('cart_items', 'mean'),
    平均放弃率=('abandon_rate', 'mean'),
    平均购物车金额=('total_cart_value', 'mean')
).round(2)
print("=== 分群用户购物车行为 ===")
print(cart_cluster)
print("\\n")

# ----------------------
# 7. 最终业务结论输出
# ----------------------
print("="*50)
print("📊 电商数据分析全流程完成")
print("✅ 完成：数据清洗 → 购物车分析 → RFM特征 → K-Means聚类 → 业务解读")
print("🎯 核心产出：用户分群画像、购物车优化策略、商品组合推荐")
print("👥 用户群数：", len(rfm['segment'].unique()))
print("📦 商品组合数：", len(pair_counts))
print("="*50)
print("\\n🎉 恭喜！您已完成一个完整的电商数据分析项目！")
`;

const PythonEditor = () => {
  const [code, setCode] = useState(ecommerceCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);

  const handleCodeChange = (value) => {
    setCode(value || '');
  };

  const resetCode = () => {
    setCode(ecommerceCode);
    setOutput('');
    setError('');
  };

  const executeCode = async () => {
    setIsRunning(true);
    setOutput('');
    setError('');
    setExecutionTime(0);

    const startTime = Date.now();

    try {
      // 模拟执行 - 在实际环境中，这应该连接到Python执行后端
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 模拟输出
      const simulatedOutput = `📊 开始数据分析流程...
=== 数据清洗完成 ===
数据形状: (1000, 10)
     order_id  user_id  product_id  product_name category   price  quantity order_date  is_paid  total_amount
0  ORD0001    1234         145     Product_145  Home   245.50         2  2025-01-01        1        491.00
1  ORD0002    1789         167     Product_167  Electronics   189.00         3  2025-01-01        0        567.00

=== 购物车放弃率统计 ===
   user_id  cart_items  paid_orders  abandon_rate
0     1001          5           3          0.40
1     1002          3           2          0.33

=== 购物车TOP10商品组合 ===
Product_A, Product_B    25
Product_C, Product_D    22
...

=== RFM特征概览 ===
        Recency    Frequency      Monetary
count  999.0000  999.000000   999.000000
mean    180.500    1.500000   678.500000
std      80.500    0.800000   450.200000

=== 聚类结果汇总 ===
      用户数  平均R  平均F  平均M
cluster
0      250   50.2   3.5  1500.5
1      300  280.5   1.2   350.8
2      220  150.3   1.8   800.2
3      229   90.8   2.5  1200.4

=== 用户分群业务命名 ===
   user_id  cluster         segment
0     1001        0  高价值活跃用户
1     1002        1  潜力新用户

=== 分群用户购物车行为 ===
            平均购物车商品数  平均放弃率  平均购物车金额
segment
高价值活跃用户         8.5       0.15       2500.50
潜力新用户           3.2       0.45        600.80
流失风险用户         5.8       0.35       1200.30
低频高消费用户         4.5       0.25       2000.40

==================================================
📊 电商数据分析全流程完成
✅ 完成：数据清洗 → 购物车分析 → RFM特征 → K-Means聚类 → 业务解读
🎯 核心产出：用户分群画像、购物车优化策略、商品组合推荐
👥 用户群数： 4
📦 商品组合数： 10
==================================================

🎉 恭喜！您已完成一个完整的电商数据分析项目！`;

      setOutput(simulatedOutput);
      setExecutionTime((Date.now() - startTime) / 1000);
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl overflow-hidden shadow-xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Python 数据分析编辑器</h2>
              <p className="text-sm text-gray-400">电商数据分析全流程实战</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={resetCode}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重置代码</span>
            </button>
            <button
              onClick={executeCode}
              disabled={isRunning}
              className="flex items-center space-x-2 btn-primary px-6 py-2 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className={`w-4 h-4 ${isRunning ? 'animate-pulse' : ''}`} />
              <span>{isRunning ? '执行中...' : '运行代码'}</span>
            </button>
          </div>
        </div>

        {/* Editor Section */}
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 border-r border-gray-200">
            <div className="h-[500px]">
              <Editor
                height="100%"
                language="python"
                value={code}
                onChange={handleCodeChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  fontSize: 14,
                  lineNumbers: 'on',
                  renderWhitespace: 'selection',
                  folding: true,
                  wordWrap: 'on',
                  padding: { top: 16, bottom: 16 },
                }}
              />
            </div>
          </div>

          <div className="lg:w-1/2 bg-gray-900">
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  {error ? (
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  ) : output ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Code2 className="w-5 h-5 text-gray-400" />
                  )}
                  <span>执行结果</span>
                </h3>
              </div>
              {executionTime > 0 && (
                <span className="text-sm text-gray-400">
                  执行时间: {executionTime.toFixed(2)}s
                </span>
              )}
            </div>
            <div className="p-4 h-[450px] overflow-auto">
              {error ? (
                <div className="text-red-400 font-mono text-sm whitespace-pre-wrap">
                  {error}
                </div>
              ) : output ? (
                <div className="text-green-400 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                  {output}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-12">
                  <div className="text-4xl mb-4">🚀</div>
                  <p>点击"运行代码"开始执行</p>
                  <p className="text-sm mt-2">体验完整的电商数据分析流程</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PythonEditor;
