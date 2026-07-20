import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code, Layout, Server, Database, Cpu, Wrench } from 'lucide-react';

const skillCategories = [
  {
    id: 'programming',
    title: 'Programming',
    icon: Code,
    color: 'amber',
    dotColor: 'bg-amber-500',
    borderColor: 'border-amber-500/20',
    bgColor: 'bg-amber-500/5',
    textColor: 'text-amber-700',
    skills: [
      { name: 'Python', level: 'Intermediate / Primary', pct: '85%' },
      { name: 'C', level: 'Academic Foundations', pct: '75%' },
      { name: 'JavaScript', level: 'Frontend Core', pct: '80%' },
      { name: 'HTML & CSS', level: 'Web Basics', pct: '90%' },
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: Layout,
    color: 'sky',
    dotColor: 'bg-sky-400',
    borderColor: 'border-sky-400/20',
    bgColor: 'bg-sky-400/5',
    textColor: 'text-sky-700',
    skills: [
      { name: 'React', level: 'Component Architecture', pct: '82%' },
      { name: 'React Three Fiber', level: '3D Graphics Basics', pct: '70%' },
      { name: 'Tailwind CSS', level: 'Responsive Styling', pct: '88%' },
      { name: 'Bootstrap', level: 'UI Components', pct: '80%' },
    ]
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Server,
    color: 'emerald',
    dotColor: 'bg-emerald-500',
    borderColor: 'border-emerald-500/20',
    bgColor: 'bg-emerald-500/5',
    textColor: 'text-emerald-700',
    skills: [
      { name: 'Django', level: 'Web Framework', pct: '82%' },
      { name: 'Django REST Framework', level: 'API Design', pct: '85%' },
      { name: 'REST APIs', level: 'JSON & Endpoints', pct: '88%' },
      { name: 'JWT Authentication', level: 'Secure Tokens', pct: '78%' },
    ]
  },
  {
    id: 'database',
    title: 'Database',
    icon: Database,
    color: 'yellow',
    dotColor: 'bg-yellow-500',
    borderColor: 'border-yellow-500/20',
    bgColor: 'bg-yellow-500/5',
    textColor: 'text-yellow-700',
    skills: [
      { name: 'PostgreSQL', level: 'Relational DB', pct: '80%' },
      { name: 'MySQL', level: 'SQL Databases', pct: '78%' },
      { name: 'SQL', level: 'Queries & Joins', pct: '84%' },
    ]
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    icon: Cpu,
    color: 'purple',
    dotColor: 'bg-purple-500',
    borderColor: 'border-purple-500/20',
    bgColor: 'bg-purple-500/5',
    textColor: 'text-purple-700',
    skills: [
      { name: 'NumPy & Pandas', level: 'Data Processing', pct: '82%' },
      { name: 'Scikit-learn', level: 'ML Algorithms', pct: '75%' },
      { name: 'ML & NLP Basics', level: 'Classification & Text', pct: '78%' },
      { name: 'OpenAI & Gemini API', level: 'LLM Integration', pct: '85%' },
      { name: 'Ollama (Basics)', level: 'Local Models', pct: '70%' },
    ]
  },
  {
    id: 'tools',
    title: 'Tools & Workflow',
    icon: Wrench,
    color: 'slate',
    dotColor: 'bg-slate-400',
    borderColor: 'border-slate-400/20',
    bgColor: 'bg-slate-400/5',
    textColor: 'text-slate-700',
    skills: [
      { name: 'Git & GitHub', level: 'Version Control', pct: '88%' },
      { name: 'VS Code & Postman', level: 'Dev & API Testing', pct: '90%' },
      { name: 'Docker (Basics)', level: 'Containerization', pct: '68%' },
      { name: 'Vercel & Render', level: 'Cloud Deployment', pct: '85%' },
    ]
  }
];

export const MobileSkillMatrix = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredCategories = activeTab === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.id === activeTab);

  return (
    <div className="w-full bg-white/90 backdrop-blur-xl border border-zinc-200/80 rounded-3xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.03)] select-none">
      {/* Card Title Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-orange-500/10 text-[#FF6B35]">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold font-outfit text-zinc-900">Tech Stack Overview</h3>
            <p className="text-[11px] text-zinc-400 font-mono">Fresher Skill Proficiency</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-500 text-[10px] font-mono font-bold">
          Mobile Matrix
        </span>
      </div>

      {/* Category Tabs Filter */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1 rounded-full text-[11px] font-outfit font-bold whitespace-nowrap transition-all duration-200 ${
            activeTab === 'all'
              ? 'bg-[#FF6B35] text-white shadow-sm'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/60'
          }`}
        >
          All Tech
        </button>
        {skillCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`px-3 py-1 rounded-full text-[11px] font-outfit font-bold whitespace-nowrap transition-all duration-200 ${
              activeTab === cat.id
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/60'
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Categories & Skill Bars */}
      <div className="space-y-4">
        {filteredCategories.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="p-4 rounded-2xl bg-zinc-50/60 border border-zinc-200/60 space-y-3"
            >
              <div className="flex items-center space-x-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${cat.dotColor}`} />
                <IconComponent className="w-4 h-4 text-zinc-700" />
                <h4 className="text-xs font-extrabold font-outfit text-zinc-900">{cat.title}</h4>
              </div>

              <div className="space-y-2.5">
                {cat.skills.map((skill, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-outfit">
                      <span className="font-bold text-zinc-800">{skill.name}</span>
                      <span className="text-zinc-400 font-mono text-[10px]">{skill.level}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-zinc-200/70 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: skill.pct }}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                        className={`h-full rounded-full ${cat.dotColor}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileSkillMatrix;
