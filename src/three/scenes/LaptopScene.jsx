import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import { 
  Sparkles, 
  Mic, 
  CheckCircle2, 
  Bot, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Target, 
  Star, 
  ArrowRight, 
  UserCheck 
} from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';

// Interactive Dashboard UI rendered directly onto the 3D Monitor Screen
const ScreenDashboard = () => {
  const [typedText, setTypedText] = useState('');
  const fullQuestion = 'What is REST API?';

  useEffect(() => {
    let timeout;
    if (typedText.length < fullQuestion.length) {
      timeout = setTimeout(() => {
        setTypedText(fullQuestion.slice(0, typedText.length + 1));
      }, 90);
    } else {
      timeout = setTimeout(() => {
        setTypedText('');
      }, 4200);
    }
    return () => clearTimeout(timeout);
  }, [typedText]);

  return (
    <div className="w-[540px] h-[350px] bg-slate-950 text-white font-outfit p-4 rounded-xl shadow-2xl flex flex-col justify-between select-none border border-slate-800/90 overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="text-[11px] font-mono text-slate-400 ml-2">AI Interview Prep Engine</span>
        </div>
        <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
          <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] font-medium text-slate-200">Candidate Profile</span>
          <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-950/80 border border-emerald-800/60 px-1.5 py-0.5 rounded">
            Resume Uploaded ✓
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-3 my-auto pt-2">
        {/* Question & Audio Waveform Panel */}
        <div className="col-span-7 bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-col justify-between shadow-inner">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold uppercase text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/50">
                Question 3 / 10
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Technical Session</span>
            </div>
            <div className="min-h-[42px]">
              <h4 className="text-sm font-semibold text-slate-100 leading-snug">
                "{typedText}"
                <span className="inline-block w-1.5 h-4 bg-indigo-400 ml-1 translate-y-0.5 animate-pulse" />
              </h4>
            </div>
          </div>

          {/* Recording & Waveform Bar */}
          <div className="flex items-center justify-between bg-slate-950/90 border border-slate-800/80 rounded-lg p-2 mt-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center animate-pulse">
                <Mic className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-mono text-slate-300">Recording...</span>
            </div>
            {/* Animated Audio Waveform */}
            <div className="flex items-center space-x-1 h-5 px-1">
              <span className="w-1 bg-indigo-400 rounded-full animate-pulse h-3" style={{ animationDuration: '0.6s' }} />
              <span className="w-1 bg-teal-400 rounded-full animate-pulse h-5" style={{ animationDuration: '0.4s' }} />
              <span className="w-1 bg-emerald-400 rounded-full animate-pulse h-2" style={{ animationDuration: '0.7s' }} />
              <span className="w-1 bg-indigo-400 rounded-full animate-pulse h-4" style={{ animationDuration: '0.5s' }} />
              <span className="w-1 bg-amber-400 rounded-full animate-pulse h-3" style={{ animationDuration: '0.8s' }} />
            </div>
          </div>
        </div>

        {/* Real-time AI Evaluation Panel */}
        <div className="col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase text-amber-400">AI Score</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
              85% Overall
            </span>
          </div>

          <div className="space-y-2 my-1.5">
            <div>
              <div className="flex justify-between text-[10px] text-slate-300 mb-0.5">
                <span>Communication</span>
                <span className="text-amber-400 font-bold">★★★★☆</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-teal-400 h-full w-[80%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] text-slate-300 mb-0.5">
                <span>Technical</span>
                <span className="text-amber-400 font-bold">★★★★☆</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-teal-400 to-emerald-400 h-full w-[90%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] text-slate-300 mb-0.5">
                <span>Confidence</span>
                <span className="text-amber-400 font-bold">★★★★☆</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-400 h-full w-[85%]" />
              </div>
            </div>
          </div>

          <button className="w-full py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-teal-500 text-white text-[11px] font-bold font-outfit flex items-center justify-center space-x-1 shadow-md hover:brightness-110 transition-all">
            <span>Next Question</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Footer Info Bar */}
      <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-[10px] text-slate-400 font-mono">
        <span>Session ID: #AI-MOCK-9402</span>
        <span className="flex items-center space-x-1 text-teal-400 font-semibold">
          <Sparkles className="w-3 h-3" />
          <span>AI Engine Active</span>
        </span>
      </div>
    </div>
  );
};

// Soft Ambient Particle Field around the 3D Scene
const ParticleField = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4
      ],
      color: Math.random() > 0.5 ? '#6366F1' : (Math.random() > 0.5 ? '#14B8A6' : '#FF5722'),
      size: Math.random() * 0.05 + 0.03
    }));
  }, []);

  return (
    <group>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
};

export const LaptopScene = () => {
  const laptopGroupRef = useRef();
  const scrollPercent = usePortfolioStore((state) => state.scrollPercent);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScale(0.55);
      } else if (window.innerWidth < 1024) {
        setScale(0.78);
      } else {
        setScale(1.0);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Subtle floating motion for laptop centerpiece
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (laptopGroupRef.current) {
      laptopGroupRef.current.position.y = Math.sin(t * 0.6) * 0.08 - 0.2;
      laptopGroupRef.current.rotation.y = Math.sin(t * 0.15) * 0.12 + scrollPercent * 0.01;
      laptopGroupRef.current.rotation.x = scrollPercent * 0.004;
    }
  });

  return (
    <group scale={scale} position={[0, 0, 0]}>
      {/* Lighting Setup */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[8, 10, 5]} intensity={1.5} color="#6366F1" />
      <directionalLight position={[-8, -5, -4]} intensity={0.7} color="#FF5722" />
      <pointLight position={[0, 2, 2]} intensity={1.2} color="#14B8A6" distance={6} />

      {/* Background Soft Particles */}
      <ParticleField />

      {/* Main 3D Laptop Centerpiece */}
      <group ref={laptopGroupRef} position={[0, -0.2, 0]}>
        {/* LAPTOP BASE CHASSIS */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[3.4, 0.08, 2.3]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.85} />
        </mesh>

        {/* LAPTOP BASE GLOW EDGE */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[3.42, 0.09, 2.32]} />
          <meshBasicMaterial color="#6366F1" wireframe transparent opacity={0.25} />
        </mesh>

        {/* KEYBOARD AREA */}
        <mesh position={[0, -0.01, 0.15]}>
          <boxGeometry args={[3.0, 0.01, 1.1]} />
          <meshStandardMaterial color="#020617" roughness={0.6} />
        </mesh>

        {/* TRACKPAD */}
        <mesh position={[0, -0.005, 0.85]}>
          <boxGeometry args={[0.9, 0.005, 0.55]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.5} />
        </mesh>

        {/* HINGE & SCREEN LID */}
        <group position={[0, 0.04, -1.1]} rotation={[-0.15, 0, 0]}>
          {/* Hinge */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 3.0, 16]} />
            <meshStandardMaterial color="#020617" metalness={0.9} />
          </mesh>

          {/* Screen Outer Lid Back */}
          <mesh position={[0, 1.15, -0.02]}>
            <boxGeometry args={[3.4, 2.3, 0.05]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.85} />
          </mesh>

          {/* Screen Bezel Glow Border */}
          <mesh position={[0, 1.15, 0]}>
            <boxGeometry args={[3.42, 2.32, 0.06]} />
            <meshBasicMaterial color="#14B8A6" wireframe transparent opacity={0.2} />
          </mesh>

          {/* Active Screen Base Surface */}
          <mesh position={[0, 1.15, 0.01]}>
            <planeGeometry args={[3.2, 2.1]} />
            <meshStandardMaterial 
              color="#020617" 
              emissive="#6366F1" 
              emissiveIntensity={0.15} 
              roughness={0.1}
            />
          </mesh>

          {/* Embedded HTML Interactive Screen UI */}
          <Html 
            transform 
            distanceFactor={3.15} 
            position={[0, 1.15, 0.02]} 
            rotation={[0, 0, 0]}
          >
            <ScreenDashboard />
          </Html>
        </group>
      </group>

      {/* Floating 3D SaaS Feature Cards around Laptop */}

      {/* Card 1: Resume Uploaded Card (Top Left) */}
      <Float speed={1.8} rotationIntensity={0.1} floatIntensity={0.4}>
        <Html position={[-3.0, 1.6, 0.4]} distanceFactor={4.5} center>
          <div className="bg-white/90 backdrop-blur-md border border-zinc-200/80 p-3 rounded-2xl shadow-xl min-w-[180px] select-none">
            <div className="flex items-center space-x-2 mb-2">
              <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-zinc-900 font-outfit">Resume Card</h5>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Uploaded
                </span>
              </div>
            </div>
            <div className="text-[10px] font-mono text-zinc-400 mb-1">Skills Extracted:</div>
            <div className="flex flex-wrap gap-1">
              {['Python', 'React', 'Django', 'SQL'].map((skill) => (
                <span key={skill} className="px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-200/60 text-[9px] font-mono font-medium text-zinc-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </Html>
      </Float>

      {/* Card 2: AI Assistant Bubble (Top Right) */}
      <Float speed={2.2} rotationIntensity={0.12} floatIntensity={0.5}>
        <Html position={[3.0, 1.7, 0.3]} distanceFactor={4.5} center>
          <div className="bg-white/90 backdrop-blur-md border border-indigo-100 p-3 rounded-2xl shadow-xl max-w-[200px] select-none">
            <div className="flex items-start space-x-2.5">
              <div className="p-1.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 text-white shrink-0 shadow-md">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center space-x-1 mb-0.5">
                  <span className="text-xs font-bold text-zinc-900 font-outfit">AI Assistant</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <p className="text-[11px] text-zinc-650 leading-snug font-outfit">
                  "Let's begin your interview."
                </p>
              </div>
            </div>
          </div>
        </Html>
      </Float>

      {/* Card 3: Score Card (Middle Right) */}
      <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.3}>
        <Html position={[3.0, 0.1, 0.6]} distanceFactor={4.5} center>
          <div className="bg-white/90 backdrop-blur-md border border-zinc-200/80 p-3 rounded-2xl shadow-xl min-w-[165px] select-none">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-zinc-800 font-outfit">Score Card</span>
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-xl font-extrabold text-zinc-900 font-outfit">85%</span>
              <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">
                Technical
              </span>
            </div>
            <div className="w-full bg-zinc-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full w-[85%]" />
            </div>
          </div>
        </Html>
      </Float>

      {/* Card 4: Chat Bubble (Middle Left) */}
      <Float speed={2.0} rotationIntensity={0.1} floatIntensity={0.4}>
        <Html position={[-3.0, 0.0, 0.7]} distanceFactor={4.5} center>
          <div className="bg-white/90 backdrop-blur-md border border-zinc-200/80 p-3 rounded-2xl shadow-xl max-w-[195px] select-none">
            <div className="flex items-center space-x-2 mb-1">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Question Prompt</span>
            </div>
            <p className="text-xs font-semibold text-zinc-800 font-outfit leading-tight">
              "Explain JWT Authentication."
            </p>
          </div>
        </Html>
      </Float>

      {/* Card 5: Dashboard Card (Bottom Right) */}
      <Float speed={1.6} rotationIntensity={0.08} floatIntensity={0.3}>
        <Html position={[2.9, -1.6, 0.8]} distanceFactor={4.5} center>
          <div className="bg-white/90 backdrop-blur-md border border-zinc-200/80 p-3 rounded-2xl shadow-xl min-w-[170px] select-none">
            <div className="flex items-center space-x-2 mb-1">
              <BarChart3 className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-[11px] font-bold text-zinc-800 font-outfit">Dashboard</span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-medium text-zinc-600">
              <span>Questions Completed</span>
              <span className="font-mono font-bold text-zinc-900">7/10</span>
            </div>
            <div className="w-full bg-zinc-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-teal-500 h-full w-[70%]" />
            </div>
          </div>
        </Html>
      </Float>

      {/* Card 6: Progress Ring Card (Bottom Left) */}
      <Float speed={1.9} rotationIntensity={0.1} floatIntensity={0.4}>
        <Html position={[-2.9, -1.7, 0.9]} distanceFactor={4.5} center>
          <div className="bg-white/90 backdrop-blur-md border border-zinc-200/80 p-3 rounded-2xl shadow-xl min-w-[170px] select-none flex items-center space-x-3">
            <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
              <svg className="w-9 h-9 transform -rotate-90">
                <circle cx="18" cy="18" r="14" stroke="#E2E8F0" strokeWidth="3" fill="transparent" />
                <circle cx="18" cy="18" r="14" stroke="#6366F1" strokeWidth="3" fill="transparent" strokeDasharray="88" strokeDashoffset="26" strokeLinecap="round" />
              </svg>
              <Target className="w-3.5 h-3.5 text-indigo-600 absolute" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-zinc-400">Progress Ring</div>
              <div className="text-xs font-bold text-zinc-900 font-outfit">70% Progress</div>
            </div>
          </div>
        </Html>
      </Float>
    </group>
  );
};

export default LaptopScene;
