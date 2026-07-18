import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { View, Preload, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from './store/usePortfolioStore';

// Slow-drifting global neural background mesh for AI/ML atmosphere
const GlobalBackgroundNet = () => {
  const lineGeometryRef = useRef();
  const pointsRef = useRef();
  const groupRef = useRef();
  const scrollPercent = usePortfolioStore((state) => state.scrollPercent);

  const nodeCount = 35;
  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < nodeCount; i++) {
      arr.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05
        )
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scrollFactor = scrollPercent * 0.002;

    // Slowly move nodes
    nodes.forEach((node) => {
      node.position.addScaledVector(node.velocity, state.delta);
      
      // Wrap nodes when they exit screen boundaries
      if (Math.abs(node.position.x) > 5) node.position.x = -node.position.x;
      if (Math.abs(node.position.y) > 4) node.position.y = -node.position.y;
      if (Math.abs(node.position.z) > 3) node.position.z = -node.position.z;
    });

    // Update lines
    const linePositions = [];
    const maxConnect = 2.0;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < maxConnect) {
          linePositions.push(
            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
          );
        }
      }
    }

    if (linePositions.length > 0 && lineGeometryRef.current) {
      const posArray = new Float32Array(linePositions);
      lineGeometryRef.current.setAttribute(
        'position',
        new THREE.BufferAttribute(posArray, 3)
      );
      lineGeometryRef.current.setDrawRange(0, posArray.length / 3);
      lineGeometryRef.current.attributes.position.needsUpdate = true;
    } else if (lineGeometryRef.current) {
      lineGeometryRef.current.setDrawRange(0, 0);
    }

    // Slowly rotate the whole network on scroll
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.015 + scrollFactor;
      groupRef.current.rotation.x = scrollFactor * 0.5;
    }
  });

  const pointPositions = useMemo(() => {
    const arr = new Float32Array(nodeCount * 3);
    return arr;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      nodes.forEach((node, i) => {
        posAttr.setXYZ(i, node.position.x, node.position.y, node.position.z);
      });
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#6366F1"
          size={0.12}
          transparent
          opacity={0.15}
          sizeAttenuation={true}
        />
      </points>

      <lineSegments>
        <bufferGeometry ref={lineGeometryRef} />
        <lineBasicMaterial
          color="#14B8A6"
          transparent
          opacity={0.06} // faint background synapse lines
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
};
import { Navbar } from './components/layout/Navbar';
import { Preloader } from './components/layout/Preloader';
import { HeroScene } from './three/scenes/HeroScene';
import { LaptopScene } from './three/scenes/LaptopScene';
import { GalaxyScene } from './three/scenes/GalaxyScene';
import { ProfileCard } from './components/ui/ProfileCard';
import { GlassCard } from './components/ui/GlassCard';
import { Badge } from './components/ui/Badge';
import { Button } from './components/ui/Button';
import confetti from 'canvas-confetti';
import narendraImage from './assets/narendra.jpg';
import {
  Cpu,
  Layers,
  Mic,
  Code,
  Award,
  Terminal,
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  Sparkles,
  Briefcase,
  Database,
  Cpu as AIicon,
  Cloud,
  ChevronRight,
  TrendingUp,
  Brain,
  ShieldCheck,
  Send,
  MessageSquare,
  Lock,
  X,
  Mail,
  Phone,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const internshipDetails = {
  plasmid: {
    company: 'Plasmid',
    role: 'Artificial Intelligence Intern',
    duration: 'Sep 2024 - Nov 2024',
    type: 'Online',
    badgeColor: 'indigo',
    glowColor: 'bg-accent-indigo/10',
    description: 'Engaged in machine learning pipelines and exploratory data analysis. Built predictive text models for natural language processing applications.',
    highlights: [
      <span>Performed <strong className="text-zinc-800 font-bold">data preprocessing</strong>, data cleaning, and exploratory data analysis using Python.</span>,
      <span>Developed and optimized machine learning models for <strong className="text-zinc-800 font-bold">NLP-based Fake News Detection</strong>, achieving <strong className="text-zinc-950 font-bold">~90% prediction accuracy</strong>.</span>,
      <span>Applied key <strong className="text-zinc-850 font-bold">feature engineering</strong> and extraction techniques (TF-IDF vectorization).</span>,
      <span>Engineered <strong className="text-zinc-850 font-bold">end-to-end ML training pipelines</strong> from collection/preprocessing to evaluation.</span>
    ],
    technologies: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'NLP Fundamentals', 'Model Tuning', 'ML Pipelines']
  },
  zdot: {
    company: 'Zdot Apps',
    role: 'Full Stack Developer Intern',
    duration: 'Jan 2026 - Present',
    type: 'Paid Internship',
    stipend: '₹10,000 / month',
    badgeColor: 'purple',
    glowColor: 'bg-accent-purple/10',
    description: 'Developed and optimized enterprise modules, designing REST APIs and database schema connections.',
    highlights: [
      <span>Developed robust <strong className="text-zinc-800 font-bold">enterprise application modules</strong> using Django, React, and MySQL architectures.</span>,
      <span>Designed and implemented <strong className="text-zinc-800 font-bold">secure RESTful APIs</strong> for Expense Management and Facilities modules.</span>,
      <span>Integrated frontend user interfaces, backend logic, and MySQL databases to <strong className="text-zinc-850 font-bold">improve workflow speeds</strong>.</span>,
      <span>Collaborated in active sprint cycles using standard <strong className="text-zinc-850 font-bold">Git-based version control</strong> workflows.</span>
    ],
    technologies: ['Django', 'React', 'MySQL', 'REST APIs', 'Git', 'HTML/CSS', 'Bootstrap', 'Database Schema']
  }
};

const projectDetails = {
  resumeAnalyzer: {
    title: 'AI Interview Preparation Platform',
    category: 'Artificial Intelligence',
    badgeColor: 'indigo',
    glowColor: 'bg-accent-indigo/10',
    liveLink: 'https://ai-interview-platform-2026-tau.vercel.app/',
    techStack: ['Python', 'OpenAI API', 'LangChain', 'FAISS', 'Streamlit'],
    description: 'An AI-powered system designed to analyze resumes, evaluate them against target job descriptions, calculate keyword scores, and recommend custom learning pathways.',
    highlights: [
      <span>Developed an <strong className="text-zinc-800 font-bold">AI-powered Resume Analyzer</strong> that evaluates resumes against job descriptions using Large Language Models (LLMs).</span>,
      <span>Implemented <strong className="text-zinc-800 font-bold">ATS score generation</strong>, keyword matching, and skill gap analysis to identify missing competencies.</span>,
      <span>Provided actionable <strong className="text-zinc-850 font-bold">resume improvement suggestions</strong> and job-role suitability recommendations.</span>,
      <span>Utilized <strong className="text-zinc-800 font-bold">vector embeddings and semantic search</strong> via FAISS for precise resume-to-job matching.</span>,
      <span>Integrated robust <strong className="text-zinc-850 font-bold">LangChain workflows</strong> with OpenAI API models for intelligent text evaluation.</span>,
      <span>Built an interactive <strong className="text-zinc-800 font-bold">Streamlit dashboard</strong> to visualize ATS scores and skill-gap breakdowns.</span>
    ]
  },
  careerChatbot: {
    title: 'AI Career Assistant Chatbot',
    category: 'Generative AI',
    badgeColor: 'teal',
    glowColor: 'bg-accent-teal/10',
    techStack: ['Python', 'LangChain', 'OpenAI API', 'FAISS', 'RAG'],
    description: 'Conversational assistant delivering context-aware professional guidance, resume optimization hints, and study guides using vector retrieval structures.',
    highlights: [
      <span>Developed a conversational AI assistant using <strong className="text-zinc-800 font-bold">Retrieval-Augmented Generation (RAG)</strong>.</span>,
      <span>Enabled <strong className="text-zinc-800 font-bold">context-aware conversations</strong> and personalized career guidance for target engineering fields.</span>,
      <span>Implemented <strong className="text-zinc-850 font-bold">memory-enabled interactions</strong> (session memory) for a cohesive user chat experience.</span>,
      <span>Integrated <strong className="text-zinc-800 font-bold">vector database retrieval</strong> for highly contextual and accurate responses.</span>,
      <span>Assisted users with <strong className="text-zinc-850 font-bold">interview preparation</strong>, learning roadmaps, and custom skill suggestions.</span>
    ]
  },
  expenseSystem: {
    title: 'Expense Management System (ZDotbox)',
    category: 'Web Development',
    badgeColor: 'purple',
    glowColor: 'bg-accent-purple/10',
    techStack: ['Django', 'React', 'MySQL', 'REST APIs', 'JWT Auth'],
    description: 'A full-stack tracking and management system to submit, approve, and audit employee expenses with speed and security.',
    highlights: [
      <span>Developed employee <strong className="text-zinc-800 font-bold">expense tracking and approval workflows</strong> to streamline claims.</span>,
      <span>Built REST APIs for expense creation, approval, and management using <strong className="text-zinc-800 font-bold">Django REST Framework</strong>.</span>,
      <span>Designed responsive frontend interfaces in React and <strong className="text-zinc-850 font-bold">optimized backend query operations</strong>.</span>,
      <span>Improved overall workflow efficiency and ensured strict <strong className="text-zinc-850 font-bold">data consistency</strong> across transactional schemas.</span>
    ]
  },
  fakeNews: {
    title: 'Fake News Detection System',
    category: 'Machine Learning',
    badgeColor: 'indigo',
    glowColor: 'bg-accent-indigo/10',
    techStack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'TF-IDF'],
    description: 'A text classification machine learning tool that reads raw news text and predicts classification ratings with high confidence.',
    highlights: [
      <span>Developed an NLP-based machine learning model to <strong className="text-zinc-800 font-bold">identify fake news articles</strong> automatically.</span>,
      <span>Applied <strong className="text-zinc-800 font-bold">TF-IDF vectorization</strong> and advanced text feature engineering pipelines.</span>,
      <span>Trained and evaluated <strong className="text-zinc-850 font-bold">multiple classification algorithms</strong> (Naive Bayes, Logistic Regression).</span>,
      <span>Visualized model performance metrics and feature importance using <strong className="text-zinc-800 font-bold">Matplotlib and Seaborn</strong>.</span>,
      <span>Achieved approximately <strong className="text-zinc-950 font-bold">90% prediction accuracy</strong> on benchmark datasets.</span>
    ]
  }
};

function App() {
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);
  const { setActiveSection, activeSection, setScrollPercent } = usePortfolioStore();
  const [stats, setStats] = useState({ cgpa: 0, internships: 0, techCount: 0 });

  useEffect(() => {
    // Start count up after preloader completes
    const timer = setTimeout(() => {
      const duration = 1200; // ms
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing out quadratic
        const ease = progress * (2 - progress);

        setStats({
          cgpa: (ease * 7.9).toFixed(1),
          internships: Math.floor(ease * 3),
          techCount: Math.floor(ease * 15),
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Setup intersection observer to track current active section
  useEffect(() => {
    const sections = ['hero', 'about', 'timeline', 'flagship', 'skills', 'credentials', 'contact'];

    const observers = sections.map((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        { threshold: 0.35 }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [setActiveSection]);

  // Track scroll position percentage globally
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPos = window.scrollY;
      const percent = docHeight > 0 ? (scrollPos / docHeight) * 100 : 0;
      setScrollPercent(percent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrollPercent]);

  const handleConfetti = (examName) => {
    confetti({
      particleCount: 120,
      spread: 80,
      colors: ['#6366F1', '#14B8A6', '#A855F7'],
      origin: { y: 0.75 }
    });
  };



  return (
    <div ref={containerRef} className="relative bg-[#FAFAFC] text-zinc-700 min-h-screen selection:bg-accent-indigo/30 selection:text-zinc-900">
      {/* 3D Global Canvas Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Canvas
          eventSource={containerRef}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 5], fov: 45 }}
          className="w-full h-full"
        >
          <GlobalBackgroundNet />
          <View.Port />
          <Preload all />
        </Canvas>
      </div>

      {/* HTML Layout Overlays */}
      <div className="relative z-10">
        <Preloader />
        <Navbar />

        {/* Floating Launch Button - Fixed Position */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.a
            href="https://ai-interview-platform-2026-tau.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center space-x-3 px-5 py-3 rounded-full bg-gradient-to-r from-accent-indigo to-accent-teal text-white font-bold text-sm shadow-[0_8px_32px_rgba(99,102,241,0.4)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.6)] backdrop-blur-sm border border-white/20 transition-all duration-300"
            onClick={(e) => {
              // Add confetti effect
              confetti({
                particleCount: 150,
                spread: 70,
                colors: ['#6366F1', '#14B8A6', '#A855F7'],
                origin: { x: 0.9, y: 0.8 }
              });
            }}
          >
            <span className="text-sm">🚀</span>
            <span className="hidden sm:inline">Launch AI Platform</span>
            <span className="sm:hidden">Launch</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </motion.div>

        {/* ==================================================== */}
        {/* HERO SECTION */}
        {/* ==================================================== */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-transparent">
          {/* Subtle background coordinate grid */}
          <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

          {/* Animated Gradient Mesh & Blurred Warm Light Spheres */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Drifting radial orange-gold glows */}
            <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-accent-indigo/12 via-accent-teal/5 to-transparent blur-[140px] -top-1/4 -left-1/4 pointer-events-none animate-pulse-slow" />
            <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent-teal/10 via-accent-purple/5 to-transparent blur-[120px] bottom-1/4 -right-1/4 pointer-events-none" />
            <div className="absolute w-[350px] h-[350px] rounded-full bg-accent-indigo/6 blur-[90px] top-1/3 left-1/3 pointer-events-none" />
            
            {/* Floating Glass Circles (Awwwards depth aesthetic) */}
            <div className="absolute top-[18%] left-[8%] w-10 h-10 rounded-full border border-accent-indigo/10 bg-white/5 backdrop-blur-[2px] animate-float-slow" />
            <div className="absolute bottom-[22%] left-[12%] w-16 h-16 rounded-full border border-accent-teal/10 bg-white/5 backdrop-blur-[3px] animate-float-mid" />
            <div className="absolute top-[28%] right-[16%] w-12 h-12 rounded-full border border-accent-purple/10 bg-white/5 backdrop-blur-[2px] animate-float-slow" />
            <div className="absolute bottom-[16%] right-[22%] w-8 h-8 rounded-full border border-accent-indigo/10 bg-white/5 backdrop-blur-[1px] animate-float-fast" />
          </div>

          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full min-h-[calc(100vh-8rem)]">
            {/* Left Content (Title / Description) */}
            <div className="flex flex-col space-y-8 z-20 text-center lg:text-left">

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-outfit leading-tight text-zinc-900">
                <motion.span 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Hi, I'm
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-gradient-indigo-teal mt-1"
                >
                  Narendra Naramsetty
                </motion.span>
              </h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm md:text-base text-zinc-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-outfit"
              >
                Passionate software developer with hands-on experience building <span className="text-accent-teal font-semibold">AI-powered web applications</span>, full-stack platforms, and intelligent automation solutions. Skilled in <span className="text-zinc-900 font-medium hover:text-accent-indigo transition-colors duration-200">React</span>, <span className="text-zinc-900 font-medium hover:text-accent-indigo transition-colors duration-200">Python</span>, <span className="text-zinc-900 font-medium hover:text-accent-indigo transition-colors duration-200">Django</span>, <span className="text-zinc-900 font-medium hover:text-accent-indigo transition-colors duration-200">PostgreSQL</span>, REST APIs, machine learning, databases, and modern deployment workflows, with a strong focus on clean architecture, performance, and user experience.
              </motion.p>

              {/* Core Engineering Specializations */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0 w-full"
              >
                {/* Specialty 1 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative p-4 rounded-xl border border-zinc-200/60 bg-white/75 backdrop-blur-sm shadow-[0_8px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_25px_rgba(255,107,53,0.04)] hover:border-[#FF6B35]/20 transition-all duration-300 group text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-[#FF6B35]/5 text-[#FF6B35]">
                      <Brain className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold font-outfit text-zinc-800">AI Integration</div>
                  </div>
                  <p className="text-[11px] leading-relaxed text-zinc-500 mt-2.5">
                    Semantic search engines, speech transcription pipelines, and LLM reasoning workflows.
                  </p>
                </motion.div>

                {/* Specialty 2 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative p-4 rounded-xl border border-zinc-200/60 bg-white/75 backdrop-blur-sm shadow-[0_8px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_25px_rgba(255,107,53,0.04)] hover:border-[#FF8C42]/20 transition-all duration-300 group text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-[#FF8C42]/5 text-[#FF8C42]">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold font-outfit text-zinc-800">Full-Stack Core</div>
                  </div>
                  <p className="text-[11px] leading-relaxed text-zinc-500 mt-2.5">
                    Modern high-performance React frontends paired with secure, robust Django REST APIs.
                  </p>
                </motion.div>

                {/* Specialty 3 */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative p-4 rounded-xl border border-zinc-200/60 bg-white/75 backdrop-blur-sm shadow-[0_8px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_25px_rgba(255,107,53,0.04)] hover:border-zinc-300 transition-all duration-300 group text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-zinc-400/5 text-zinc-500">
                      <Database className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold font-outfit text-zinc-800">Systems & DBs</div>
                  </div>
                  <p className="text-[11px] leading-relaxed text-zinc-500 mt-2.5">
                    Relational databases, vector DB optimization, and clean architectural design patterns.
                  </p>
                </motion.div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-5"
              >
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                  <a
                    href="https://ai-interview-platform-2026-tau.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent-indigo to-accent-teal text-white text-sm font-bold font-outfit shadow-[0_8px_32px_rgba(99,102,241,0.3)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.4)] hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                    onClick={(e) => {
                      // Add confetti effect when launched
                      confetti({
                        particleCount: 120,
                        spread: 80,
                        colors: ['#6366F1', '#14B8A6', '#A855F7'],
                        origin: { y: 0.7 }
                      });
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">Launch AI Platform</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 relative z-10" />
                  </a>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="secondary"
                    onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                    className="hover:border-zinc-300 hover:bg-zinc-50"
                  >
                    Contact Me
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column: Premium Static Profile Showcase */}
            <ProfileCard />
          </div>

          {/* Premium scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none z-20">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2 font-bold">Scroll To Explore</span>
            <div className="w-[1.5px] h-10 bg-zinc-200/80 rounded-full overflow-hidden relative">
              <motion.div 
                animate={{ y: [0, 40, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-accent-indigo to-accent-teal rounded-full"
              />
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* ABOUT ME SECTION */}
        {/* ==================================================== */}
        <section id="about" className="relative py-28 border-t border-zinc-200/50 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <Badge variant="teal" className="mb-4">About Me</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-outfit text-zinc-900">
                Building intelligent software through continuous learning, practical experience, and real-world projects.
              </h2>
              <div className="text-zinc-500 mt-6 text-sm md:text-base leading-relaxed space-y-4 max-w-2xl mx-auto">
                <p>
                  I completed my Bachelor's degree in Electronics and Communication Engineering, but my passion has always been software development and building technology that solves real-world problems.
                </p>
                <p>
                  Over the past few years, I have dedicated myself to learning modern web development, backend engineering, artificial intelligence, and machine learning through continuous learning, internships, and hands-on projects.
                </p>
                <p>
                  I enjoy turning ideas into real applications by combining intuitive frontend experiences with scalable backend systems, focusing on practical development experience and a problem-solving mindset.
                </p>
              </div>
            </div>

            {/* Grid of 4 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">

              {/* CARD 1: Software Development */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <GlassCard glow="indigo" className="relative group h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-accent-indigo/10 flex items-center justify-center text-accent-indigo mb-6 group-hover:scale-110 transition-transform">
                      <Code className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold font-outfit text-zinc-900 mb-2">Software Development</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Building modern full-stack applications using React, JavaScript, Python, Django, REST APIs, PostgreSQL, and cloud deployment with a strong focus on scalability and clean architecture.
                    </p>
                  </div>
                </GlassCard>
              </motion.div>

              {/* CARD 2: Artificial Intelligence */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <GlassCard glow="teal" className="relative group h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-accent-teal/10 flex items-center justify-center text-accent-teal mb-6 group-hover:scale-110 transition-transform">
                      <Brain className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold font-outfit text-zinc-900 mb-2">Artificial Intelligence</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Hands-on experience building AI-powered applications using Machine Learning, Natural Language Processing, Whisper Speech Recognition, Vector Databases, Sentence Transformers, and intelligent automation workflows.
                    </p>
                  </div>
                </GlassCard>
              </motion.div>

              {/* CARD 3: Problem Solving */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <GlassCard glow="teal" className="relative group h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-accent-teal/10 flex items-center justify-center text-accent-teal mb-6 group-hover:scale-110 transition-transform">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold font-outfit text-zinc-900 mb-2">Problem Solving</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      I enjoy solving real-world challenges by designing efficient software solutions, writing clean code, optimizing performance, and continuously learning modern technologies.
                    </p>
                  </div>
                </GlassCard>
              </motion.div>

              {/* CARD 4: Continuous Learning */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <GlassCard glow="indigo" className="relative group h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-accent-indigo/10 flex items-center justify-center text-accent-indigo mb-6 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold font-outfit text-zinc-900 mb-2">Continuous Learning</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Technology evolves every day, and I continuously improve my skills by building projects, exploring new frameworks, contributing to practical applications, and staying updated with modern software engineering practices.
                    </p>
                  </div>
                </GlassCard>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* TIMELINE / INTERNSHIPS SECTION */}
        {/* ==================================================== */}
        <section id="timeline" className="relative py-28 border-t border-zinc-200/50 bg-zinc-100/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <Badge variant="purple" className="mb-4">My Internships</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-outfit text-zinc-900">
                Career Journey & Growth Track
              </h2>
              <p className="text-zinc-500 mt-4 text-sm md:text-base leading-relaxed">
                Professional internship roles focused on training machine learning structures and deploying secure full-stack applications.
              </p>
            </div>

            {/* Timeline Cards Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto relative">
              {/* Path Connector Line for Desktop */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-indigo to-accent-purple opacity-20 -translate-y-1/2 hidden lg:block z-0" />

              {/* CARD 1: Plasmid */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative z-10 flex flex-col h-full"
              >
                <GlassCard 
                  glow="indigo" 
                  onClick={() => setSelectedInternship(internshipDetails.plasmid)}
                  className="flex flex-col h-full border-t-2 border-t-accent-indigo cursor-pointer hover:border-accent-indigo/60 hover:shadow-[0_15px_30px_rgba(99,102,241,0.06)] transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="indigo">AI / ML</Badge>
                    <span className="text-[10px] text-zinc-400 font-mono uppercase font-semibold">Sep 24 - Nov 24</span>
                  </div>

                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-lg font-bold font-outfit text-zinc-900 group-hover:text-accent-indigo transition-colors">Plasmid</h3>
                    <span className="text-[9px] font-mono text-zinc-400 group-hover:underline">Click to view &gt;</span>
                  </div>
                  
                  <div className="text-xs text-accent-indigo font-mono mb-4 flex items-center">
                    <Briefcase className="w-3.5 h-3.5 mr-1" />
                    Artificial Intelligence Intern
                  </div>

                  <p className="text-xs text-zinc-500 leading-relaxed mb-6 flex-grow">
                    Performed data preprocessing, cleaning, and exploratory data analysis using Python. Developed machine learning models for Fake News Detection achieving approximately 90% accuracy, applying feature extraction and model optimization.
                  </p>

                  <div className="border-t border-zinc-200/50 pt-4">
                    <div className="text-[10px] text-zinc-400 font-mono uppercase mb-2">Technologies</div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] text-zinc-600 font-mono">Python</span>
                      <span className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] text-zinc-600 font-mono">Scikit-Learn</span>
                      <span className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] text-zinc-600 font-mono">Pandas</span>
                      <span className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] text-zinc-600 font-mono">NumPy</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* CARD 2: Zdot Apps */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative z-10 flex flex-col h-full"
              >
                <GlassCard 
                  glow="indigo" 
                  onClick={() => setSelectedInternship(internshipDetails.zdot)}
                  className="flex flex-col h-full border-t-2 border-t-accent-purple cursor-pointer hover:border-accent-purple/60 hover:shadow-[0_15px_30px_rgba(168,85,247,0.06)] transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="purple">Full Stack</Badge>
                    <span className="text-[10px] text-zinc-400 font-mono uppercase font-semibold">Jan 26 - Present</span>
                  </div>

                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-lg font-bold font-outfit text-zinc-900 group-hover:text-accent-purple transition-colors">Zdot Apps</h3>
                    <span className="text-[9px] font-mono text-zinc-400 group-hover:underline">Click to view &gt;</span>
                  </div>
                  
                  <div className="text-xs text-accent-purple font-mono mb-4 flex items-center justify-between w-full">
                    <span className="flex items-center">
                      <Briefcase className="w-3.5 h-3.5 mr-1" />
                      Full Stack Developer Intern
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-accent-purple/10 text-accent-purple text-[9px] font-bold">
                      Paid (₹10K/mo)
                    </span>
                  </div>

                  <p className="text-xs text-zinc-500 leading-relaxed mb-6 flex-grow">
                    Developed enterprise application modules using Django, React, and MySQL. Designed and implemented RESTful APIs for Expense Management and Facilities modules, optimizing workflows.
                  </p>

                  <div className="border-t border-zinc-200/50 pt-4">
                    <div className="text-[10px] text-zinc-400 font-mono uppercase mb-2">Technologies</div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] text-zinc-600 font-mono">Django</span>
                      <span className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] text-zinc-600 font-mono">React</span>
                      <span className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] text-zinc-600 font-mono">MySQL</span>
                      <span className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] text-zinc-600 font-mono">REST APIs</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* FEATURED PROJECT SECTION */}
        {/* ==================================================== */}
        <section id="flagship" className="relative py-28 border-t border-zinc-200/50 bg-zinc-50/50 overflow-hidden">
          {/* Neon Grid Backdrop */}
          <div className="absolute inset-0 cyber-grid opacity-[0.08]" />

          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="indigo" className="mb-4"> Live & Deployed</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-outfit text-zinc-900">
                AI Interview Preparation Platform
              </h2>
              <p className="text-zinc-500 mt-4 mb-6 text-sm md:text-base leading-relaxed font-outfit">
                A full-stack, deployed <span className="text-zinc-800 font-bold underline decoration-accent-indigo/30 decoration-2">Generative AI platform</span> delivering personalized, <span className="text-zinc-800 font-bold">AI-driven mock interview sessions</span> end-to-end using LangChain workflows and vector retrieval.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="https://ai-interview-platform-2026-tau.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent-indigo to-accent-teal text-white text-sm font-bold font-outfit shadow-[0_8px_32px_rgba(99,102,241,0.3)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.4)] hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                  onClick={(e) => {
                    // Add confetti effect when launched
                    confetti({
                      particleCount: 100,
                      spread: 70,
                      colors: ['#6366F1', '#14B8A6', '#A855F7'],
                      origin: { y: 0.6 }
                    });
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">🚀 Launch Live Application</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 relative z-10" />
                </a>
              </motion.div>
            </div>

            {/* 3D Laptop Component Container & Floating widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">

              {/* R3F Canvas Container */}
              <div className="lg:col-span-7 h-[350px] md:h-[480px] w-full relative">
                {/* Floating screen overlay widgets */}
                <div className="absolute top-4 left-4 bg-zinc-100/80 border border-zinc-200/50 p-3 rounded-lg backdrop-blur-md z-20 shadow-lg flex items-center space-x-2 animate-bounce-slow">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent-teal animate-pulse" />
                </div>

                <div className="absolute bottom-12 right-4 bg-zinc-100/80 border border-zinc-200/50 p-4 rounded-xl backdrop-blur-md z-20 shadow-lg max-w-[200px]">
                  <div className="w-full bg-zinc-100 h-1 rounded-full mt-2 overflow-hidden">
                    <div className="bg-accent-teal h-full w-[92%]" />
                  </div>
                </div>

                <View className="w-full h-full cursor-grab active:cursor-grabbing">
                  <LaptopScene />
                </View>
              </div>

              {/* Platform Info details & Stats */}
              <div className="lg:col-span-5 flex flex-col space-y-6">
                <div className="font-outfit text-xs text-accent-indigo uppercase font-semibold tracking-wider font-mono">Featured Capabilities</div>
                <h3 className="text-2xl font-bold font-outfit text-zinc-900">AI Interview Preparation Platform</h3>
                <p className="text-zinc-600 text-xs md:text-sm leading-relaxed font-outfit">
                  Integrates RAG chatbots, speech-to-text models, and LLM evaluation chains to automate technical mock interview loops, dynamically formulate role-specific questions, and generate improvement roadmaps.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="p-1.5 rounded bg-accent-indigo/10 text-accent-indigo mt-0.5">
                      <Mic className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">RAG similarity search</h4>
                      <p className="text-[11px] text-zinc-500">Sentence Transformers and <span className="text-zinc-800 font-bold">Qdrant vector databases</span> index technical contexts for similarity-based question prompts.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-1.5 rounded bg-accent-teal/10 text-accent-teal mt-0.5">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">LLM orchestration</h4>
                      <p className="text-[11px] text-zinc-500">LangChain workflows coordinating <span className="text-zinc-800 font-bold">Ollama, Gemini, and OpenAI API</span> to evaluate resume content.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-1.5 rounded bg-accent-purple/10 text-accent-purple mt-0.5">
                      <Code className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">Whisper Voice Synthesis</h4>
                      <p className="text-[11px] text-zinc-500">Converts vocal interview answers into text transcripts for <span className="text-zinc-800 font-bold">prompt-engineered evaluation chains</span>.</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-200/50 pt-6 grid grid-cols-2 gap-4">
                </div>
              </div>
            </div>

            {/* Technical Highlights / Responsibilities Checklist */}
            <div className="mt-16">
              <h3 className="text-xl font-bold font-outfit text-zinc-900 text-center mb-8">Technical Implementation Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/70 backdrop-blur-sm border border-zinc-200/60 p-6 md:p-8 rounded-2xl">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="p-1 rounded-full bg-accent-indigo/10 text-accent-indigo mt-0.5"><CheckCircle2 className="w-4 h-4" /></span>
                    <p className="text-xs md:text-sm text-zinc-650 leading-relaxed font-outfit">
                      Designed and developed a full-stack <strong className="text-zinc-800 font-bold">Generative AI platform</strong> delivering personalized, AI-driven mock interview sessions end-to-end.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="p-1 rounded-full bg-accent-indigo/10 text-accent-indigo mt-0.5"><CheckCircle2 className="w-4 h-4" /></span>
                    <p className="text-xs md:text-sm text-zinc-650 leading-relaxed font-outfit">
                      Built a <strong className="text-zinc-800 font-bold">Retrieval-Augmented Generation (RAG) pipeline</strong> using Sentence Transformers for embedding generation and the Qdrant vector database for similarity search.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="p-1 rounded-full bg-accent-indigo/10 text-accent-indigo mt-0.5"><CheckCircle2 className="w-4 h-4" /></span>
                    <p className="text-xs md:text-sm text-zinc-650 leading-relaxed font-outfit">
                      Engineered LLM orchestration workflows using <strong className="text-zinc-800 font-bold">LangChain</strong> to coordinate multiple generative models (Ollama, Gemini) for generating technical questions.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="p-1 rounded-full bg-accent-indigo/10 text-accent-indigo mt-0.5"><CheckCircle2 className="w-4 h-4" /></span>
                    <p className="text-xs md:text-sm text-zinc-650 leading-relaxed font-outfit">
                      Implemented AI-powered resume analysis using <strong className="text-zinc-800 font-bold">Large Language Models (LLMs)</strong> to generate ATS scores, extract skills, and identify skill gaps.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="p-1 rounded-full bg-accent-indigo/10 text-accent-indigo mt-0.5"><CheckCircle2 className="w-4 h-4" /></span>
                    <p className="text-xs md:text-sm text-zinc-650 leading-relaxed font-outfit">
                      Integrated <strong className="text-zinc-800 font-bold">Whisper Speech-to-Text</strong> for voice-based responses, converting candidate audio into transcribed text for evaluation.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="p-1 rounded-full bg-accent-indigo/10 text-accent-indigo mt-0.5"><CheckCircle2 className="w-4 h-4" /></span>
                    <p className="text-xs md:text-sm text-zinc-650 leading-relaxed font-outfit">
                      Designed AI-based evaluation logic using LLM prompting to analyze <strong className="text-zinc-800 font-bold">technical knowledge, communication skills</strong>, and overall response quality.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="p-1 rounded-full bg-accent-indigo/10 text-accent-indigo mt-0.5"><CheckCircle2 className="w-4 h-4" /></span>
                    <p className="text-xs md:text-sm text-zinc-650 leading-relaxed font-outfit">
                      Generated personalized <strong className="text-zinc-800 font-bold">learning roadmaps</strong>, improvement suggestions, and feedback logs using generative model weights.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="p-1 rounded-full bg-accent-indigo/10 text-accent-indigo mt-0.5"><CheckCircle2 className="w-4 h-4" /></span>
                    <p className="text-xs md:text-sm text-zinc-650 leading-relaxed font-outfit">
                      Built supporting RESTful APIs using <strong className="text-zinc-800 font-bold">Django REST Framework</strong> and a PostgreSQL schema to persist embeddings metadata, interview history, and analytics.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="p-1 rounded-full bg-accent-indigo/10 text-accent-indigo mt-0.5"><CheckCircle2 className="w-4 h-4" /></span>
                    <p className="text-xs md:text-sm text-zinc-650 leading-relaxed font-outfit">
                      Deployed the frontend to Vercel and backend/LLM services to Render, integrated with a <strong className="text-zinc-800 font-bold">cloud-hosted PostgreSQL database</strong>.
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="text-[10px] text-zinc-400 font-mono uppercase mb-2">Technologies Used</div>
                    <div className="flex flex-wrap gap-1">
                      {['Python', 'LangChain', 'Qdrant', 'Whisper', 'Gemini', 'Django REST', 'PostgreSQL', 'React'].map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200/50 text-[10px] font-mono text-zinc-600">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* SKILL GALAXY SECTION */}
        {/* ==================================================== */}
        <section id="skills" className="relative py-28 border-t border-zinc-200/50 bg-zinc-100/50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="teal" className="mb-4">Skill Galaxy</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-outfit text-zinc-900">
                Interactive Technical Constellation
              </h2>
              <p className="text-zinc-500 mt-4 text-sm md:text-base leading-relaxed">
                Drag the galaxy sphere to explore my tech stack. Click and hover on skill labels to highlight associated ecosystems.
              </p>
            </div>

            {/* Galaxy Canvas Box & Legend */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Galaxy Legend */}
              <div className="lg:col-span-4 flex flex-col space-y-4 order-2 lg:order-1">
                <h3 className="text-xl font-bold font-outfit text-zinc-950 mb-3.5 tracking-tight">Core Technical Skills</h3>

                <div className="space-y-4">
                  {/* Generative AI / LLMs */}
                  <div className="flex items-start space-x-4 p-5 rounded-2xl bg-white/80 border border-zinc-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_30px_rgba(99,102,241,0.06)] hover:border-accent-indigo/25 transition-all duration-300">
                    <span className="w-3 h-3 rounded-full bg-accent-indigo shadow-[0_0_10px_rgba(99,102,241,0.6)] flex-shrink-0 mt-1.5" />
                    <div className="flex-1">
                      <h4 className="text-base font-extrabold text-zinc-900 font-outfit mb-2.5">Generative AI / LLMs</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-lg bg-accent-indigo/5 text-accent-indigo border border-accent-indigo/20 text-xs font-outfit font-bold">OpenAI API</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">Google Gemini</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">Ollama</span>
                        <span className="px-3 py-1 rounded-lg bg-accent-indigo/5 text-accent-indigo border border-accent-indigo/20 text-xs font-outfit font-bold">LangChain</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">Prompt Engineering</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">LLM Orchestration</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">AI Agents (Basic)</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">Conversational AI</span>
                      </div>
                    </div>
                  </div>

                  {/* Retrieval-Augmented Generation */}
                  <div className="flex items-start space-x-4 p-5 rounded-2xl bg-white/80 border border-zinc-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_30px_rgba(56,189,248,0.06)] hover:border-sky-400/25 transition-all duration-300">
                    <span className="w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.6)] flex-shrink-0 mt-1.5" />
                    <div className="flex-1">
                      <h4 className="text-base font-extrabold text-zinc-900 font-outfit mb-2.5">Retrieval-Augmented Gen</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-lg bg-sky-400/5 text-sky-650 border border-sky-400/20 text-xs font-outfit font-bold">RAG Pipeline Design</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">Vector Embeddings</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">Semantic Search</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">Context-Aware Gen</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">Memory-Enabled</span>
                      </div>
                    </div>
                  </div>

                  {/* Vector Databases & NLP */}
                  <div className="flex items-start space-x-4 p-5 rounded-2xl bg-white/80 border border-zinc-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_30px_rgba(20,184,166,0.06)] hover:border-accent-teal/25 transition-all duration-300">
                    <span className="w-3 h-3 rounded-full bg-accent-teal shadow-[0_0_10px_rgba(20,184,166,0.6)] flex-shrink-0 mt-1.5" />
                    <div className="flex-1">
                      <h4 className="text-base font-extrabold text-zinc-900 font-outfit mb-2.5">Vector Databases & NLP</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-lg bg-accent-teal/5 text-accent-teal border border-accent-teal/20 text-xs font-outfit font-bold">Qdrant</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">FAISS</span>
                        <span className="px-3 py-1 rounded-lg bg-accent-teal/5 text-accent-teal border border-accent-teal/20 text-xs font-outfit font-bold">Whisper STT</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">Sentence Transformers</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">NLP Fundamentals</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">Text Classification</span>
                      </div>
                    </div>
                  </div>

                  {/* Programming & Backend */}
                  <div className="flex items-start space-x-4 p-5 rounded-2xl bg-white/80 border border-zinc-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_30px_rgba(245,158,11,0.06)] hover:border-amber-500/25 transition-all duration-300">
                    <span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)] flex-shrink-0 mt-1.5" />
                    <div className="flex-1">
                      <h4 className="text-base font-extrabold text-zinc-900 font-outfit mb-2.5">Programming & Backend</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-lg bg-amber-500/5 text-amber-650 border border-amber-500/20 text-xs font-outfit font-bold">Python</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">SQL</span>
                        <span className="px-3 py-1 rounded-lg bg-amber-500/5 text-amber-650 border border-amber-500/20 text-xs font-outfit font-bold">Django</span>
                        <span className="px-3 py-1 rounded-lg bg-amber-500/5 text-amber-650 border border-amber-500/20 text-xs font-outfit font-bold">Django REST</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">REST APIs</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">JWT Auth</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">PostgreSQL</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">MySQL</span>
                      </div>
                    </div>
                  </div>

                  {/* Data & Deployment Tools */}
                  <div className="flex items-start space-x-4 p-5 rounded-2xl bg-white/80 border border-zinc-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_30px_rgba(168,85,247,0.06)] hover:border-purple-500/25 transition-all duration-300">
                    <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.6)] flex-shrink-0 mt-1.5" />
                    <div className="flex-1">
                      <h4 className="text-base font-extrabold text-zinc-900 font-outfit mb-2.5">Data &amp; Deployment Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">Pandas</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">NumPy</span>
                        <span className="px-3 py-1 rounded-lg bg-purple-500/5 text-purple-650 border border-purple-500/20 text-xs font-outfit font-bold">Scikit-Learn</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">Vercel</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">Render</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">Docker</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">AWS Basics</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">Git / GitHub</span>
                        <span className="px-3 py-1 rounded-lg bg-zinc-100/80 text-zinc-650 border border-zinc-200/40 text-xs font-outfit font-medium">Postman</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Canvas viewport */}
              <div className="lg:col-span-8 h-[450px] lg:h-[550px] w-full relative bg-radial-gradient-dark rounded-2xl border border-zinc-200/50 order-1 lg:order-2">
                <div className="absolute top-4 right-4 bg-zinc-100/50 border border-zinc-200/50 px-2.5 py-1 rounded text-[10px] font-mono text-zinc-500 z-20 select-none">
                  DRAG MOUSE TO ROTATE
                </div>
                <View className="w-full h-full cursor-grab active:cursor-grabbing">
                  <GalaxyScene />
                </View>
              </div>

            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* OTHER PROJECTS & DETAILS */}
        {/* ==================================================== */}
        <section id="other-projects" className="relative py-28 border-t border-zinc-200/50 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <Badge variant="indigo" className="mb-4">Extended Work</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-outfit text-zinc-900">Other Project Structures</h2>
              <p className="text-zinc-500 mt-4 text-sm md:text-base leading-relaxed">
                Applying core engineering logic across machine learning workflows and terminal database applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* AI Resume Analyzer */}
              <GlassCard 
                glow="indigo" 
                onClick={() => setSelectedProject(projectDetails.resumeAnalyzer)}
                className="flex flex-col h-full cursor-pointer hover:border-accent-indigo/60 hover:shadow-[0_15px_30px_rgba(99,102,241,0.06)] transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="indigo">Artificial Intelligence</Badge>
                  <span className="text-[10px] text-zinc-400 font-mono font-bold">Python, Streamlit</span>
                </div>
                
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-xl font-bold font-outfit text-zinc-900 group-hover:text-accent-indigo transition-colors">AI Resume Analyzer</h3>
                  <span className="text-[10px] font-mono text-zinc-400 group-hover:underline">Click to view &gt;</span>
                </div>

                <p className="text-xs text-zinc-500 leading-relaxed mb-6 font-outfit">
                  Developed an <span className="text-zinc-800 font-bold">AI-powered Resume Analyzer</span> that evaluates resumes against job descriptions using LLMs. Implemented <span className="text-zinc-800 font-bold">ATS score generation</span>, keyword matching, and skill gap analysis while building an interactive <span className="text-zinc-850 font-bold">Streamlit dashboard</span>.
                </p>

                <div className="border-t border-zinc-200/50 pt-4 mt-auto">
                  <div className="text-[10px] text-zinc-400 font-mono uppercase mb-2">Technologies Used</div>
                  <div className="flex flex-wrap gap-1.5">
                    {projectDetails.resumeAnalyzer.techStack.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] text-zinc-600 font-mono">{tech}</span>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* AI Career Assistant Chatbot */}
              <GlassCard 
                glow="teal" 
                onClick={() => setSelectedProject(projectDetails.careerChatbot)}
                className="flex flex-col h-full cursor-pointer hover:border-accent-teal/60 hover:shadow-[0_15px_30px_rgba(20,184,166,0.06)] transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="teal">Generative AI</Badge>
                  <span className="text-[10px] text-zinc-400 font-mono font-bold">Python, LangChain</span>
                </div>
                
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-xl font-bold font-outfit text-zinc-900 group-hover:text-accent-teal transition-colors">AI Career Assistant Chatbot</h3>
                  <span className="text-[10px] font-mono text-zinc-400 group-hover:underline">Click to view &gt;</span>
                </div>

                <p className="text-xs text-zinc-500 leading-relaxed mb-6 font-outfit">
                  Developed a conversational AI assistant using <span className="text-zinc-800 font-bold">Retrieval-Augmented Generation (RAG)</span>. Enabled context-aware conversations, personalized career guidance, and memory-enabled interactions with <span className="text-zinc-850 font-bold">vector databases</span>.
                </p>

                <div className="border-t border-zinc-200/50 pt-4 mt-auto">
                  <div className="text-[10px] text-zinc-400 font-mono uppercase mb-2">Technologies Used</div>
                  <div className="flex flex-wrap gap-1.5">
                    {projectDetails.careerChatbot.techStack.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] text-zinc-600 font-mono">{tech}</span>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Expense Management System */}
              <GlassCard 
                glow="purple" 
                onClick={() => setSelectedProject(projectDetails.expenseSystem)}
                className="flex flex-col h-full cursor-pointer hover:border-accent-purple/60 hover:shadow-[0_15px_30px_rgba(168,85,247,0.06)] transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="purple">Web Development</Badge>
                  <span className="text-[10px] text-zinc-400 font-mono font-bold">Django, React, MySQL</span>
                </div>
                
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-xl font-bold font-outfit text-zinc-900 group-hover:text-accent-purple transition-colors">Expense Management System (ZDotbox)</h3>
                  <span className="text-[10px] font-mono text-zinc-400 group-hover:underline">Click to view &gt;</span>
                </div>

                <p className="text-xs text-zinc-500 leading-relaxed mb-6 font-outfit">
                  Developed employee <span className="text-zinc-800 font-bold">expense tracking and approval workflows</span>. Built <span className="text-zinc-800 font-bold">REST APIs</span> for expense creation, approval, and management, designed <span className="text-zinc-850 font-bold">responsive frontend interfaces</span>, and optimized backend operations for data consistency.
                </p>

                <div className="border-t border-zinc-200/50 pt-4 mt-auto">
                  <div className="text-[10px] text-zinc-400 font-mono uppercase mb-2">Technologies Used</div>
                  <div className="flex flex-wrap gap-1.5">
                    {projectDetails.expenseSystem.techStack.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] text-zinc-600 font-mono">{tech}</span>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Fake News Detector */}
              <GlassCard 
                glow="indigo" 
                onClick={() => setSelectedProject(projectDetails.fakeNews)}
                className="flex flex-col h-full cursor-pointer hover:border-accent-indigo/60 hover:shadow-[0_15px_30px_rgba(99,102,241,0.06)] transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="indigo">Machine Learning</Badge>
                  <span className="text-[10px] text-zinc-400 font-mono font-bold">NLP Python</span>
                </div>
                
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-xl font-bold font-outfit text-zinc-900 group-hover:text-accent-indigo transition-colors">Fake News Detection System</h3>
                  <span className="text-[10px] font-mono text-zinc-400 group-hover:underline">Click to view &gt;</span>
                </div>

                <p className="text-xs text-zinc-500 leading-relaxed mb-6 font-outfit">
                  Developed an <span className="text-zinc-800 font-bold">NLP text classification system</span> to verify article validity. Preprocessed raw input via <span className="text-zinc-800 font-bold">Scikit-Learn pipelines</span>, tokenized text patterns, and trained classification algorithms achieving <span className="text-zinc-850 font-bold">~90% prediction accuracy</span>.
                </p>

                <div className="border-t border-zinc-200/50 pt-4 mt-auto">
                  <div className="text-[10px] text-zinc-400 font-mono uppercase mb-2">Technologies Used</div>
                  <div className="flex flex-wrap gap-1.5">
                    {projectDetails.fakeNews.techStack.map((tech, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] text-zinc-600 font-mono">{tech}</span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* CREDENTIALS / ACHIEVEMENTS */}
        {/* ==================================================== */}
        <section id="credentials" className="relative py-28 border-t border-zinc-200/50 bg-zinc-100/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="purple" className="mb-4">Certifications & Achievements</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-outfit text-zinc-900">
                Exam Qualifications, Certifications & Honors
              </h2>
              <p className="text-zinc-500 mt-4 text-sm md:text-base leading-relaxed">
                Demonstrating technical excellence, analytical competence, and absolute discipline under pressure.
              </p>
            </div>

            {/* Part 1: Technical & Academic Achievements */}
            <div className="mb-16">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-6 text-center lg:text-left">Technical Competitions & Industry Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Hackathon Card */}
                <GlassCard className="p-6 flex flex-col h-full border-t-2 border-t-accent-teal hover:border-[#FF6B35]/20 hover:shadow-[0_12px_25px_rgba(255,107,53,0.04)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-2 rounded bg-accent-teal/5 text-accent-teal">
                      <Award className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono font-bold uppercase">Hackathon Winner</span>
                  </div>
                  <h4 className="text-base font-bold font-outfit text-zinc-950 mb-2">1st Prize - Hackathon Arena</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    Secured 1st Prize in a national Hackathon conducted by Sri City Educational Foundation, demonstrating rapid prototyping and vector search software architecture.
                  </p>
                </GlassCard>

                {/* AI / ML Certifications Card */}
                <GlassCard className="p-6 flex flex-col h-full border-t-2 border-t-accent-indigo hover:border-[#FF6B35]/20 hover:shadow-[0_12px_25px_rgba(255,107,53,0.04)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-2 rounded bg-accent-indigo/5 text-accent-indigo">
                      <Cpu className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono font-bold uppercase">LinkedIn Learning</span>
                  </div>
                  <h4 className="text-base font-bold font-outfit text-zinc-950 mb-2">Machine Learning & SQL</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    Certified in Machine Learning with Python Foundations and SQL for Beginners, validating relational schemas and algorithmic modeling competence.
                  </p>
                </GlassCard>

                {/* AI for Everyone Card */}
                <GlassCard className="p-6 flex flex-col h-full border-t-2 border-t-accent-purple hover:border-[#FF6B35]/20 hover:shadow-[0_12px_25px_rgba(255,107,53,0.04)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="p-2 rounded bg-accent-purple/5 text-accent-purple">
                      <Brain className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono font-bold uppercase">HP Life / LinkedIn</span>
                  </div>
                  <h4 className="text-base font-bold font-outfit text-zinc-950 mb-2">AI & Python Foundations</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    Successfully completed AI for Everyone by HP Life and Python Programming by LinkedIn Learning, building backend architectural structures.
                  </p>
                </GlassCard>
              </div>
            </div>

            {/* Part 2: Defense Qualifications */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-6 text-center lg:text-left">National Competitive Defense Examinations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Navy Card */}
                <GlassCard
                  onClick={() => handleConfetti('Navy SSR')}
                  className="cursor-pointer text-center flex flex-col items-center p-8 group border border-accent-indigo/10 bg-gradient-to-b from-accent-indigo/5 to-transparent transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-accent-indigo/10 flex items-center justify-center text-accent-indigo mb-6 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-outfit text-zinc-900 mb-2">Navy SSR Examination</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    Qualified the national exam demonstrating analytical capability, physics knowledge, and mental speed.
                  </p>
                  <span className="text-[10px] text-accent-indigo font-mono uppercase font-bold tracking-wider group-hover:underline">
                    Click to Celebrate
                  </span>
                </GlassCard>

                {/* Air Force Card */}
                <GlassCard
                  onClick={() => handleConfetti('Air Force')}
                  className="cursor-pointer text-center flex flex-col items-center p-8 group border border-accent-teal/10 bg-gradient-to-b from-accent-teal/5 to-transparent transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-accent-teal/10 flex items-center justify-center text-accent-teal mb-6 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-outfit text-zinc-900 mb-2">Indian Air Force Exam</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    Successfully cleared the Indian Air Force national test, proving strong spatial logic and quantitative reasoning.
                  </p>
                  <span className="text-[10px] text-accent-teal font-mono uppercase font-bold tracking-wider group-hover:underline">
                    Click to Celebrate
                  </span>
                </GlassCard>

                {/* Coast Guard Card */}
                <GlassCard
                  onClick={() => handleConfetti('Coast Guard')}
                  className="cursor-pointer text-center flex flex-col items-center p-8 group border border-accent-purple/10 bg-gradient-to-b from-accent-purple/5 to-transparent transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-accent-purple/10 flex items-center justify-center text-accent-purple mb-6 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-outfit text-zinc-900 mb-2">Indian Coast Guard GD</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                    Cleared the Indian Coast Guard (General Duty) Stage II selection, demonstrating exceptional logical reasoning, situational adaptability, and analytical focus under high-pressure parameters.
                  </p>
                  <span className="text-[10px] text-accent-purple font-mono uppercase font-bold tracking-wider group-hover:underline">
                    Click to Celebrate
                  </span>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* CONTACT / Direct Contact Hub */}
        {/* ==================================================== */}
        <section id="contact" className="relative py-28 border-t border-zinc-200/50 bg-zinc-50/50 overflow-hidden">
          <div className="absolute inset-0 cyber-grid opacity-[0.06]" />

          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Info Details */}
              <div className="flex flex-col space-y-6">
                <Badge variant="indigo" className="w-fit">Connect</Badge>
                <h2 className="text-3xl md:text-4xl font-bold font-outfit text-zinc-900">Let's Establish Connection</h2>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-md font-outfit">
                  Recruiters and engineering teams, feel free to reach out. I am looking for software engineering roles focusing on React web stacks and AI integrations. Let's build something premium together.
                </p>

                <div className="space-y-4 pt-4 text-xs font-mono text-zinc-600">
                  <div className="flex items-center space-x-3">
                    <span className="text-accent-teal font-bold">&gt; Status:</span>
                    <span>Available for Full-time Roles / Internships</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-accent-indigo font-bold">&gt; Location:</span>
                    <span>India (Available for remote & relocation)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-accent-purple font-bold">&gt; Base Stack:</span>
                    <span>React 19, Python, Django, MySQL, ML, RAG</span>
                  </div>
                </div>
              </div>

              {/* Direct Contact Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Card */}
                <a 
                  href="mailto:narinaramsetty@gmail.com"
                  className="block group"
                >
                  <GlassCard glow="indigo" className="p-5 flex flex-col h-full border border-zinc-200/50 hover:border-[#FF6B35]/30 hover:shadow-[0_12px_25px_rgba(255,107,53,0.05)] transition-all duration-300">
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="p-2 rounded-lg bg-red-500/5 text-red-500 group-hover:scale-105 transition-transform">
                        <Mail className="w-4 h-4" />
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-650 transition-colors" />
                    </div>
                    <div className="text-[10px] text-zinc-400 font-mono uppercase mb-1">Email Address</div>
                    <div className="text-xs font-bold text-zinc-900 font-outfit truncate">
                      narinaramsetty@gmail.com
                    </div>
                  </GlassCard>
                </a>

                {/* LinkedIn Card */}
                <a 
                  href="https://www.linkedin.com/in/narendra-naramsetty-169476338"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <GlassCard glow="indigo" className="p-5 flex flex-col h-full border border-zinc-200/50 hover:border-[#FF6B35]/30 hover:shadow-[0_12px_25px_rgba(255,107,53,0.05)] transition-all duration-300">
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="p-2 rounded-lg bg-blue-500/5 text-blue-500 group-hover:scale-105 transition-transform">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-650 transition-colors" />
                    </div>
                    <div className="text-[10px] text-zinc-400 font-mono uppercase mb-1">LinkedIn</div>
                    <div className="text-xs font-bold text-zinc-900 font-outfit truncate">
                      Narendra Naramsetty
                    </div>
                  </GlassCard>
                </a>

                {/* GitHub Card */}
                <a 
                  href="https://github.com/NarendraNaramsetty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <GlassCard glow="indigo" className="p-5 flex flex-col h-full border border-zinc-200/50 hover:border-[#FF6B35]/30 hover:shadow-[0_12px_25px_rgba(255,107,53,0.05)] transition-all duration-300">
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="p-2 rounded-lg bg-zinc-900/5 text-zinc-900 group-hover:scale-105 transition-transform">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                          <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-650 transition-colors" />
                    </div>
                    <div className="text-[10px] text-zinc-400 font-mono uppercase mb-1">GitHub</div>
                    <div className="text-xs font-bold text-zinc-900 font-outfit truncate">
                      NarendraNaramsetty
                    </div>
                  </GlassCard>
                </a>

                {/* Mobile Card */}
                <a 
                  href="tel:+916301380071"
                  className="block group"
                >
                  <GlassCard glow="indigo" className="p-5 flex flex-col h-full border border-zinc-200/50 hover:border-[#FF6B35]/30 hover:shadow-[0_12px_25px_rgba(255,107,53,0.05)] transition-all duration-300">
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="p-2 rounded-lg bg-teal-500/5 text-teal-500 group-hover:scale-105 transition-transform">
                        <Phone className="w-4 h-4" />
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-650 transition-colors" />
                    </div>
                    <div className="text-[10px] text-zinc-400 font-mono uppercase mb-1">Mobile Number</div>
                    <div className="text-xs font-bold text-zinc-900 font-outfit truncate">
                      +91 63013 80071
                    </div>
                  </GlassCard>
                </a>
              </div>

            </div>
          </div>
        </section>

        <footer className="py-8 border-t border-zinc-200/50 bg-[#FAFAFC]">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-400 font-mono">
            <div>
              Narendra Naramsetty
            </div>
            <div className="mt-4 md:mt-0 text-zinc-400">
              ECE Graduate // AI &amp; Software Engineer
            </div>
          </div>
        </footer>
      {/* Detailed Internship Modal */}
      <AnimatePresence>
        {selectedInternship && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInternship(null)}
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 p-6 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.12)] text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedInternship(null)}
                className="absolute top-4 right-4 p-2 rounded-full border border-zinc-200/60 bg-white/80 hover:bg-zinc-100 hover:scale-105 active:scale-95 text-zinc-500 hover:text-zinc-800 transition-all z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Decorative Glow Core */}
              <div className={`absolute -top-12 -left-12 w-32 h-32 rounded-full blur-2xl opacity-40 pointer-events-none ${selectedInternship.glowColor}`} />

              {/* Header Info */}
              <div className="mb-6 relative">
                <div className="flex items-center space-x-3 mb-2.5">
                  <Badge variant={selectedInternship.badgeColor}>{selectedInternship.company}</Badge>
                  <span className="text-[10px] text-zinc-400 font-mono font-semibold uppercase">{selectedInternship.type}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-outfit text-zinc-950">{selectedInternship.role}</h3>
                <div className="text-xs font-mono text-zinc-500 mt-1 flex flex-wrap gap-y-1 gap-x-4 items-center">
                  <span className="flex items-center">
                    <Briefcase className="w-3.5 h-3.5 mr-1.5 text-zinc-400" />
                    {selectedInternship.duration}
                  </span>
                  {selectedInternship.stipend && (
                    <span className="flex items-center text-accent-purple font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-purple mr-1.5 animate-pulse" />
                      Stipend: {selectedInternship.stipend}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed mb-6 font-outfit">
                {selectedInternship.description}
              </p>

              {/* Key Highlights / Bullet points */}
              <div className="mb-6">
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold mb-3.5">Key Responsibilities & Deliverables</h4>
                <div className="space-y-3">
                  {selectedInternship.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5">
                      <div className={`p-0.5 rounded-full mt-1 ${selectedInternship.badgeColor === 'indigo' ? 'bg-accent-indigo/10 text-accent-indigo' : 'bg-accent-purple/10 text-accent-purple'}`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed font-outfit">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Tag Row */}
              <div className="border-t border-zinc-200/50 pt-5">
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold mb-2.5">Core Stack Utilized</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedInternship.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded bg-zinc-100/60 border border-zinc-200/30 text-[10px] text-zinc-600 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Detailed Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 p-6 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.12)] text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full border border-zinc-200/60 bg-white/80 hover:bg-zinc-100 hover:scale-105 active:scale-95 text-zinc-500 hover:text-zinc-800 transition-all z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Decorative Glow Core */}
              <div className={`absolute -top-12 -left-12 w-32 h-32 rounded-full blur-2xl opacity-40 pointer-events-none ${selectedProject.glowColor}`} />

              {/* Header Info */}
              <div className="mb-6 relative">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center space-x-3">
                    <Badge variant={selectedProject.badgeColor}>{selectedProject.category}</Badge>
                  </div>
                  {selectedProject.liveLink && (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-outfit border transition-all duration-300 ${
                        selectedProject.badgeColor === 'indigo'
                          ? 'bg-accent-indigo/5 border-accent-indigo/20 text-accent-indigo hover:bg-accent-indigo/10'
                          : 'bg-accent-purple/5 border-accent-purple/20 text-accent-purple hover:bg-accent-purple/10'
                      }`}
                    >
                      <span>Launch App</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-outfit text-zinc-950">{selectedProject.title}</h3>
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed mb-6 font-outfit">
                {selectedProject.description}
              </p>

              {/* Highlights / Responsibilities */}
              <div className="mb-6">
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold mb-3.5">Project Highlights & Key Contributions</h4>
                <div className="space-y-3">
                  {selectedProject.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5">
                      <div className={`p-0.5 rounded-full mt-1 ${selectedProject.badgeColor === 'indigo' ? 'bg-accent-indigo/10 text-accent-indigo' : 'bg-accent-purple/10 text-accent-purple'}`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed font-outfit">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Tag Row */}
              <div className="border-t border-zinc-200/50 pt-5">
                <h4 className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold mb-2.5">Technologies Used</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded bg-zinc-100/60 border border-zinc-200/30 text-[10px] text-zinc-600 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
