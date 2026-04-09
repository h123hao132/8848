-- 创建课程表
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  level VARCHAR(50) NOT NULL,
  duration INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 创建课程内容表
CREATE TABLE IF NOT EXISTS course_contents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 创建学习进度表
CREATE TABLE IF NOT EXISTS learning_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  content_id UUID REFERENCES course_contents(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 创建成就表
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 创建用户成就表
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP DEFAULT now(),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 插入示例课程数据
INSERT INTO courses (title, description, level, duration) VALUES
('Python基础', 'Python编程语言的基础知识，包括变量、数据类型、控制流和函数', 'beginner', 40),
('数据分析基础', '使用Python进行数据分析的基本方法，包括NumPy和Pandas库的使用', 'intermediate', 60),
('数据可视化', '使用Matplotlib和Seaborn库创建各种数据可视化图表', 'intermediate', 45),
('机器学习基础', '机器学习的基本概念和算法，包括监督学习和无监督学习', 'advanced', 80);

-- 插入示例课程内容数据
-- Python基础课程内容
INSERT INTO course_contents (course_id, title, content, type, order_index) VALUES
((SELECT id FROM courses WHERE title = 'Python基础'), 'Python简介', 'Python是一种高级编程语言，以其简洁的语法和强大的功能而闻名。', 'text', 1),
((SELECT id FROM courses WHERE title = 'Python基础'), '变量和数据类型', 'Python支持多种数据类型，包括整数、浮点数、字符串和布尔值。', 'text', 2),
((SELECT id FROM courses WHERE title = 'Python基础'), '控制流', 'Python的控制流语句包括if-else、for循环和while循环。', 'text', 3),
((SELECT id FROM courses WHERE title = 'Python基础'), '函数', '函数是Python中的重要概念，用于封装可重用的代码。', 'text', 4);

-- 数据分析基础课程内容
INSERT INTO course_contents (course_id, title, content, type, order_index) VALUES
((SELECT id FROM courses WHERE title = '数据分析基础'), 'NumPy库', 'NumPy是Python中用于科学计算的核心库，提供了强大的数组操作功能。', 'text', 1),
((SELECT id FROM courses WHERE title = '数据分析基础'), 'Pandas库', 'Pandas是Python中用于数据分析的重要库，提供了DataFrame等数据结构。', 'text', 2),
((SELECT id FROM courses WHERE title = '数据分析基础'), '数据清洗', '数据清洗是数据分析的重要步骤，包括处理缺失值、异常值和重复值。', 'text', 3),
((SELECT id FROM courses WHERE title = '数据分析基础'), '数据转换', '数据转换包括数据类型转换、数据标准化和数据聚合等操作。', 'text', 4);

-- 插入示例成就数据
INSERT INTO achievements (title, description, icon, type) VALUES
('Python新手', '完成Python基础课程', 'python-beginner.png', 'course'),
('数据分析达人', '完成数据分析基础课程', 'data-analysis.png', 'course'),
('可视化专家', '完成数据可视化课程', 'visualization.png', 'course'),
('机器学习入门', '完成机器学习基础课程', 'machine-learning.png', 'course'),
('学习先锋', '完成第一个课程', 'first-course.png', 'milestone'),
('持之以恒', '连续学习7天', 'consistency.png', 'streak'),
('知识渊博', '完成所有课程', 'knowledgeable.png', 'completion');

-- 创建题目表
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL, -- multiple_choice, true_false, coding
  options JSONB, -- 选择题选项
  correct_answer JSONB, -- 正确答案
  difficulty VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 创建考试表
CREATE TABLE IF NOT EXISTS exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  duration INTEGER NOT NULL, -- 考试时长（分钟）
  passing_score INTEGER NOT NULL, -- 及格分数
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 创建考试题目关联表
CREATE TABLE IF NOT EXISTS exam_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- 创建用户考试表
CREATE TABLE IF NOT EXISTS user_exams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  start_time TIMESTAMP DEFAULT now(),
  end_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 创建用户答题表
CREATE TABLE IF NOT EXISTS user_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  user_answer JSONB, -- 用户答案
  is_correct BOOLEAN,
  created_at TIMESTAMP DEFAULT now()
);

-- 插入示例题目数据
INSERT INTO questions (course_id, title, content, type, options, correct_answer, difficulty) VALUES
((SELECT id FROM courses WHERE title = 'Python基础'), 'Python的发明者是谁？', 'Python编程语言的创始人是谁？', 'multiple_choice', '{"A": "Guido van Rossum", "B": "James Gosling", "C": "Larry Page", "D": "Sergey Brin"}', '{"answer": "A"}', 'easy'),
((SELECT id FROM courses WHERE title = 'Python基础'), 'Python中如何定义函数？', '在Python中，定义函数的关键字是什么？', 'multiple_choice', '{"A": "func", "B": "def", "C": "function", "D": "define"}', '{"answer": "B"}', 'easy'),
((SELECT id FROM courses WHERE title = 'Python基础'), 'Python是解释型语言', 'Python是一种解释型编程语言，不需要编译。', 'true_false', '{"true": "正确", "false": "错误"}', '{"answer": true}', 'easy'),
((SELECT id FROM courses WHERE title = '数据分析基础'), 'NumPy的主要用途是什么？', 'NumPy库在Python中的主要用途是什么？', 'multiple_choice', '{"A": "Web开发", "B": "科学计算", "C": "游戏开发", "D": "机器学习"}', '{"answer": "B"}', 'easy'),
((SELECT id FROM courses WHERE title = '数据分析基础'), 'Pandas中用于数据处理的主要数据结构是什么？', 'Pandas库中用于数据处理的核心数据结构是什么？', 'multiple_choice', '{"A": "Array", "B": "List", "C": "DataFrame", "D": "Dictionary"}', '{"answer": "C"}', 'easy');

-- 插入示例考试数据
INSERT INTO exams (course_id, title, description, duration, passing_score) VALUES
((SELECT id FROM courses WHERE title = 'Python基础'), 'Python基础测评', '测试你对Python基础知识的掌握程度', 60, 60),
((SELECT id FROM courses WHERE title = '数据分析基础'), '数据分析基础测评', '测试你对数据分析基础知识的掌握程度', 60, 60);

-- 插入示例考试题目关联数据
INSERT INTO exam_questions (exam_id, question_id, order_index) VALUES
((SELECT id FROM exams WHERE title = 'Python基础测评'), (SELECT id FROM questions WHERE title = 'Python的发明者是谁？'), 1),
((SELECT id FROM exams WHERE title = 'Python基础测评'), (SELECT id FROM questions WHERE title = 'Python中如何定义函数？'), 2),
((SELECT id FROM exams WHERE title = 'Python基础测评'), (SELECT id FROM questions WHERE title = 'Python是解释型语言'), 3),
((SELECT id FROM exams WHERE title = '数据分析基础测评'), (SELECT id FROM questions WHERE title = 'NumPy的主要用途是什么？'), 1),
((SELECT id FROM exams WHERE title = '数据分析基础测评'), (SELECT id FROM questions WHERE title = 'Pandas中用于数据处理的主要数据结构是什么？'), 2);

-- 配置数据库权限
-- 允许认证用户读取课程、成就、题目和考试数据
GRANT SELECT ON courses TO authenticated;
GRANT SELECT ON course_contents TO authenticated;
GRANT SELECT ON achievements TO authenticated;
GRANT SELECT ON questions TO authenticated;
GRANT SELECT ON exams TO authenticated;
GRANT SELECT ON exam_questions TO authenticated;

-- 允许认证用户管理自己的学习进度、成就、考试和答题
GRANT INSERT, UPDATE, DELETE, SELECT ON learning_progress TO authenticated;
GRANT INSERT, SELECT ON user_achievements TO authenticated;
GRANT INSERT, SELECT ON user_exams TO authenticated;
GRANT INSERT, SELECT ON user_answers TO authenticated;

-- 创建策略，确保用户只能访问自己的学习进度、成就、考试和答题
CREATE POLICY "Users can only access their own learning progress" ON learning_progress
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can only access their own achievements" ON user_achievements
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can only access their own exams" ON user_exams
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Users can only access their own answers" ON user_answers
  FOR ALL USING (user_id = auth.uid());
