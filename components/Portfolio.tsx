

import React, { useState, useEffect } from 'react';
import { ResumeData } from '../types';
import { Terminal, Server, Cloud, Github, Linkedin, Mail, Cpu, Globe, ExternalLink, ChevronRight, MapPin, ShieldCheck, Code, Send, Lock, CheckCircle, Copy, Download, GraduationCap, FolderGit2, Link as LinkIcon, Activity, Sparkles } from 'lucide-react';

interface PortfolioProps {
  data: ResumeData;
}

// Typewriter Component for terminal effects
const Typewriter = ({ 
  text, 
  speed = 30, 
  startDelay = 0, 
  onComplete, 
  className,
  showCursor = true
}: { 
  text: string; 
  speed?: number; 
  startDelay?: number; 
  onComplete?: () => void; 
  className?: string; 
  showCursor?: boolean;
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, startDelay);
    return () => clearTimeout(startTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!isStarted) return;
    
    let currentIndex = 0;
    // Handle empty text case
    if (text.length === 0) {
        setIsComplete(true);
        if (onComplete) onComplete();
        return;
    }

    const interval = setInterval(() => {
      if (currentIndex >= text.length) {
        clearInterval(interval);
        setIsComplete(true);
        if (onComplete) onComplete();
        return;
      }
      
      setDisplayText(text.slice(0, currentIndex + 1));
      currentIndex++;
    }, speed);

    return () => clearInterval(interval);
  }, [isStarted, text, speed]);

  return (
    <span className={className} aria-label={text}>
      {displayText}
      {showCursor && !isComplete && (
        <span className="animate-pulse border-r-2 border-cyan-400 ml-0.5 h-[1em] inline-block align-middle">&nbsp;</span>
      )}
    </span>
  );
};

const Portfolio: React.FC<PortfolioProps> = ({ data }) => {
  
  const [handshakeStatus, setHandshakeStatus] = useState<'idle' | 'connecting' | 'connected'>('idle');
  const [activeTab, setActiveTab] = useState('console');
  const [emailCopied, setEmailCopied] = useState(false);
  const [terminalStep, setTerminalStep] = useState(0);

  // Helper to strip markdown for clean text
  const cleanText = (text: string) => text.replace(/\*\*/g, '');

  // Helper: Smooth Scroll
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTab(id);
    }
  };

  const initiateHandshake = () => {
    setHandshakeStatus('connecting');
    setTimeout(() => {
      setHandshakeStatus('connected');
      // Scroll to results if needed
      const resultDiv = document.getElementById('handshake-result');
      if (resultDiv) resultDiv.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.personalInfo.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Portfolio URL copied to clipboard!");
  };

  // Helper to highlight tech keywords in text to make it look different from resume
  const highlightTech = (text: string) => {
    const keywords = ['Kubernetes', 'Azure', 'AWS', 'GCP', 'Terraform', 'Docker', 'Python', 'AI', 'LLM', 'React', 'Node', 'Prometheus', 'Grafana', 'Jenkins', 'Git', 'CI/CD', 'Ansible', 'Linux'];
    let processedText = cleanText(text);
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      // Using new color palette: Cyan for tech
      processedText = processedText.replace(regex, `<span class="text-cyan-300 font-semibold font-mono bg-cyan-950/40 px-1 rounded border border-cyan-800/50">${keyword}</span>`);
    });
    
    return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
  };

  return (
    // Base Canvas: Deepest Gray/Black with a hint of indigo for "Space" feel
    <div className="min-h-screen bg-[#030712] text-gray-200 font-sans selection:bg-cyan-500 selection:text-black pb-20 relative overflow-x-hidden">
      
      {/* Ambient Background Glows */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none z-0"></div>
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="font-mono font-bold text-xl tracking-tighter text-cyan-400 cursor-pointer flex items-center gap-2 group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="bg-cyan-500/10 p-1.5 rounded border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
            <Terminal size={18} />
          </div>
          <span>{data.personalInfo.fullName.split(' ')[0]}<span className="text-gray-600">.sh</span></span>
        </div>
        <div className="flex gap-6 text-sm font-medium items-center">
          <button onClick={() => scrollToSection('about')} className="text-gray-400 hover:text-cyan-400 transition-colors hidden md:block">Console</button>
          <button onClick={() => scrollToSection('stack')} className="text-gray-400 hover:text-cyan-400 transition-colors hidden md:block">Stack</button>
          <button onClick={() => scrollToSection('projects')} className="text-gray-400 hover:text-cyan-400 transition-colors hidden md:block">Projects</button>
          <button onClick={() => scrollToSection('experience')} className="text-gray-400 hover:text-cyan-400 transition-colors hidden md:block">Deployments</button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-cyan-600 hover:bg-cyan-500 text-black px-4 py-1.5 rounded-full transition-all shadow-[0_0_15px_rgba(8,145,178,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] text-xs uppercase tracking-wider font-bold flex items-center gap-2"
          >
            <ShieldCheck size={14} /> Secure Connect
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative px-6 py-24 md:py-36 max-w-6xl mx-auto text-center z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[80px] -z-10 mix-blend-screen"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-mono mb-8 shadow-2xl backdrop-blur-md animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          SYSTEM_ONLINE // READY_FOR_INTERVIEW
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
          Building the <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">Automated Future</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
          <b>{data.personalInfo.fullName}</b>: Cloud Architect & AI Engineer.
          <br/>
          Designing self-healing infrastructure and intelligent pipelines.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
           <button onClick={() => scrollToSection('stack')} className="px-8 py-4 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2">
             Explore Architecture <ChevronRight size={18} />
           </button>
           <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center gap-2 backdrop-blur-sm">
             <Mail size={18} /> Contact Protocol
           </button>
        </div>
      </header>

      {/* Terminal / About Me */}
      <section id="about" className="px-6 py-16 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Terminal Side */}
          <div className="md:col-span-2 bg-[#0a0c10] rounded-xl overflow-hidden shadow-2xl border border-white/10 font-mono text-sm md:text-base transform transition-all hover:border-cyan-500/30 duration-500 min-h-[350px] relative group">
            {/* Glossy Reflection */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            
            <div className="bg-[#0f1116] px-4 py-3 flex items-center gap-2 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="text-gray-500 ml-2 text-xs font-bold uppercase flex-1 text-center mr-12">root@kolluri-cloud:~/profile</div>
            </div>
            
            <div className="p-6 text-gray-300 space-y-6">
              {/* Step 1: Command */}
              <div>
                <span className="text-cyan-400 font-bold">root@cloud:~$</span>{' '}
                <Typewriter 
                  text="whoami --verbose" 
                  speed={40}
                  onComplete={() => setTerminalStep(prev => Math.max(prev, 1))}
                  className="text-white"
                />
              </div>
              
              {/* Step 2: Output Grid */}
              {(terminalStep >= 1) && (
                <div className="pl-4 text-gray-400 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-300 slide-in-from-left-2">
                   <div className="bg-white/5 p-3 rounded border border-white/5 backdrop-blur-sm">
                      <div className="text-[10px] text-gray-500 uppercase mb-1 tracking-wider">Role</div>
                      <div className="text-cyan-300 font-bold tracking-wide">
                        <Typewriter 
                            text="Cloud & DevOps Engineer" 
                            speed={20} 
                            startDelay={200}
                            showCursor={false}
                        />
                      </div>
                   </div>
                   <div className="bg-white/5 p-3 rounded border border-white/5 backdrop-blur-sm">
                      <div className="text-[10px] text-gray-500 uppercase mb-1 tracking-wider">Specialization</div>
                      <div className="text-violet-300 font-bold tracking-wide">
                         <Typewriter 
                            text="AI/LLM Integration" 
                            speed={20} 
                            startDelay={800}
                            showCursor={false}
                            onComplete={() => setTerminalStep(prev => Math.max(prev, 2))}
                         />
                      </div>
                   </div>
                </div>
              )}

              {/* Step 3: Second Command */}
              {(terminalStep >= 2) && (
                <div>
                  <span className="text-cyan-400 font-bold">root@cloud:~$</span>{' '}
                  <Typewriter 
                    text='cat summary.txt | grep "Highlights"' 
                    speed={30}
                    startDelay={500}
                    className="text-white"
                    onComplete={() => setTerminalStep(prev => Math.max(prev, 3))}
                  />
                </div>
              )}
              
              {/* Step 4: Summary Output */}
              {(terminalStep >= 3) && (
                <div className="pl-4 border-l-2 border-cyan-500/20 ml-1 text-gray-300 leading-relaxed text-sm">
                  <Typewriter 
                    text={cleanText(data.personalInfo.summary)}
                    speed={5}
                    startDelay={200}
                    showCursor={false}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Stats Side */}
          <div className="space-y-4">
            <div className="bg-[#0a0c10] border border-white/10 p-6 rounded-xl hover:border-cyan-500/30 transition-colors shadow-lg">
               <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-4 flex items-center gap-2"><Cpu size={14} className="text-cyan-500"/> System Resources</h3>
               <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                       <span className="text-gray-400 font-mono">Kubernetes</span>
                       <span className="text-emerald-400 font-mono">98%</span>
                    </div>
                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[98%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                       <span className="text-gray-400 font-mono">IaC (Terraform)</span>
                       <span className="text-cyan-400 font-mono">95%</span>
                    </div>
                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                       <div className="h-full bg-cyan-500 w-[95%] shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                       <span className="text-gray-400 font-mono">CI/CD Pipelines</span>
                       <span className="text-violet-400 font-mono">92%</span>
                    </div>
                    <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                       <div className="h-full bg-violet-500 w-[92%] shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                    </div>
                  </div>
               </div>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-950/20 to-[#0a0c10] border border-cyan-500/20 p-6 rounded-xl text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors"></div>
               <Globe className="mx-auto text-cyan-400 mb-2 relative z-10" size={24} />
               <div className="text-2xl font-bold text-white mb-1 relative z-10">Global</div>
               <div className="text-xs text-gray-400 uppercase tracking-widest relative z-10">Remote Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack - Holographic Cards */}
      <section id="stack" className="px-6 py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <Server className="text-cyan-500" /> 
            <span>Operational Stack</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.skills.map((skillGroup, i) => {
              const [category, items] = skillGroup.includes(':') ? skillGroup.split(':') : ['Core', skillGroup];
              return (
                <div key={i} className="bg-[#0a0c10] border border-white/10 p-6 rounded-xl hover:border-cyan-500/40 transition-all group relative overflow-hidden hover:-translate-y-1 duration-300 shadow-xl">
                  {/* Glow Effect */}
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors"></div>
                  
                  <h3 className="text-cyan-400 font-mono text-xs mb-4 uppercase tracking-widest font-bold flex items-center gap-2 border-b border-white/10 pb-2">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-sm shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div> {category}
                  </h3>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {items.split(',').map((skill, j) => (
                      <span key={j} className="px-3 py-1.5 bg-[#0f1116] text-gray-300 text-xs font-medium rounded border border-white/10 group-hover:border-cyan-500/30 group-hover:text-cyan-100 transition-colors">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {data.projects.length > 0 && (
        <section id="projects" className="px-6 py-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <Activity className="text-violet-500" /> 
            <span>Mission Critical Deployments</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {data.projects.map((proj) => (
              <div key={proj.id} className="bg-[#0a0c10]/80 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:border-cyan-500/50 transition-all group relative overflow-hidden flex flex-col shadow-2xl">
                 
                 {/* Header: Status & Region */}
                 <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></div>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-widest">SERVICE_HEALTHY</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono">
                        <Cloud size={12} />
                        <span>us-west1</span>
                    </div>
                 </div>

                 {/* Title & Tech */}
                 <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">{proj.name}</h3>
                 <div className="flex flex-wrap gap-2 mb-4">
                    {proj.techStack.split(',').map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 bg-indigo-950/30 text-indigo-300 text-[10px] font-mono rounded border border-indigo-500/20">
                            {tech.trim()}
                        </span>
                    ))}
                 </div>

                 {/* Description */}
                 <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow border-l-2 border-white/10 pl-3 ml-1 group-hover:border-cyan-500/50 transition-colors">
                    {proj.description}
                 </p>

                 {/* Action Button (CLI Style) */}
                 <div className="mt-auto pt-6">
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="group relative w-full flex items-center justify-between bg-black/50 p-4 rounded-lg border border-white/10 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden">
                        
                        {/* Background Progress/Scan Effect */}
                        <div className="absolute top-0 bottom-0 left-0 w-1 bg-emerald-500 group-hover:w-full transition-all duration-500 ease-out opacity-10"></div>
                        
                        <div className="flex flex-col z-10 gap-1">
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-emerald-400 transition-colors font-semibold flex items-center gap-2">
                                <Terminal size={10} /> EXECUTE PROTOCOL
                            </span>
                            <div className="font-mono text-sm font-bold text-gray-300 group-hover:text-white transition-colors flex items-center">
                                <span className="text-emerald-500 mr-2">$</span>
                                <span>./init_{proj.name.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '')}.sh</span>
                                <span className="inline-block w-2 h-4 bg-emerald-500 ml-1 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            </div>
                        </div>

                        <div className="z-10 flex items-center justify-center w-10 h-10 bg-white/5 rounded border border-white/10 group-hover:border-emerald-500/30 group-hover:bg-[#0a0c10] transition-all shadow-lg">
                            <ExternalLink size={18} className="text-gray-500 group-hover:text-emerald-400 transition-colors" />
                        </div>
                    </a>
                 </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience Timeline */}
      <section id="experience" className="px-6 py-24 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-16 flex items-center gap-3">
          <Code className="text-emerald-500" /> 
          <span>Deployment History</span>
        </h2>

        <div className="relative border-l border-white/10 ml-4 md:ml-8 space-y-16">
          {data.experience.map((exp, i) => (
            <div key={exp.id} className="relative pl-10 md:pl-16 group">
              {/* Timeline Node */}
              <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full border-2 border-[#030712] ${exp.current ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-pulse' : 'bg-gray-700'}`}></div>
              
              <div className="bg-[#0a0c10] border border-white/10 p-6 md:p-8 rounded-2xl hover:bg-[#0f1116] hover:border-cyan-500/30 transition-all duration-300 shadow-xl group-hover:-translate-y-1">
                 <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                        {exp.role}
                        {exp.current && <span className="text-[10px] bg-emerald-950/50 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 uppercase tracking-wide font-bold">Active</span>}
                      </h3>
                      <div className="text-gray-400 text-sm font-medium mt-1 flex items-center gap-2">
                         <span className="text-violet-400 font-mono">@ {exp.company}</span>
                         <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                         <span>{exp.location}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded bg-black/40 text-gray-500 border border-white/5 whitespace-nowrap">
                      {exp.startDate} — {exp.current ? 'PRESENT' : exp.endDate}
                    </span>
                 </div>

                 <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                    {exp.description.split('\n').map((line, idx) => {
                       if (!line.trim()) return null;
                       const parts = line.split(/(\*\*.*?\*\*)/);
                       const hasHeader = parts.some(p => p.startsWith('**'));

                       return (
                        <div key={idx} className={`flex items-start gap-3 group/item ${hasHeader ? 'mt-4' : ''}`}>
                           {!hasHeader && (
                             <div className="mt-2 w-1.5 h-1.5 bg-gray-700 rotate-45 flex-shrink-0 group-hover/item:bg-cyan-500 transition-colors"></div>
                           )}
                           <div className="w-full">
                            {parts.map((part, pIdx) => {
                                if (part.startsWith('**')) {
                                   return <div key={pIdx} className="text-white font-bold mb-1 text-base border-b border-white/10 pb-1 inline-block">{part.slice(2, -2)}</div>
                                }
                                return <span key={pIdx} className="text-gray-400">{highlightTech(part)}</span>
                            })}
                           </div>
                        </div>
                       );
                    })}
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="px-6 py-12 max-w-5xl mx-auto border-t border-white/5 mt-12">
         <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <GraduationCap className="text-gray-500" /> 
            <span>Academic Credentials</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
             {data.education.map((edu) => (
                <div key={edu.id} className="bg-white/5 p-4 rounded border border-white/5 hover:border-white/20 transition-colors">
                   <div className="text-emerald-400 font-bold text-sm mb-1">{edu.degree}</div>
                   <div className="text-gray-300 text-sm">{edu.institution}</div>
                   <div className="text-gray-500 text-xs mt-2 font-mono">{edu.year}</div>
                </div>
             ))}
          </div>
      </section>

      {/* Interactive Contact - The "Handshake" */}
      <section id="contact" className="px-6 py-32 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[#030712]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-600/10 text-cyan-400 mb-8 border border-cyan-500/30 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Secure Uplink Required</h2>
          <p className="text-gray-400 mb-12 max-w-xl mx-auto">
            Initiate a direct handshake protocol to reveal contact coordinates. Connection is encrypted and private.
          </p>
          
          {handshakeStatus === 'idle' && (
            <button 
              onClick={initiateHandshake}
              className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 bg-cyan-600 text-black rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] z-20"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-20"></span>
              <Lock size={20} /> Initialize Handshake
            </button>
          )}

          {handshakeStatus === 'connecting' && (
             <div className="flex flex-col items-center gap-4">
                <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full bg-cyan-500 animate-progress-indeterminate"></div>
                </div>
                <div className="font-mono text-cyan-400 text-xs blink tracking-widest">DECRYPTING_PACKETS...</div>
             </div>
          )}

          {handshakeStatus === 'connected' && (
            <div id="handshake-result" className="bg-[#0a0c10] border border-cyan-500/50 rounded-2xl p-8 max-w-lg mx-auto animate-in fade-in zoom-in duration-500 shadow-[0_0_50px_rgba(34,211,238,0.1)]">
               <div className="flex items-center justify-center gap-2 text-emerald-400 font-mono text-sm font-bold mb-6 pb-4 border-b border-white/10">
                  <CheckCircle size={16} /> CONNECTION ESTABLISHED
               </div>
               
               <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-lg border border-white/5 flex items-center justify-between group hover:border-cyan-500/50 transition-colors">
                     <div className="flex items-center gap-3">
                        <Mail className="text-gray-500" size={20} />
                        <span className="text-gray-200 font-medium">{data.personalInfo.email}</span>
                     </div>
                     <button 
                      onClick={handleCopyEmail}
                      className={`transition-all p-2 rounded flex items-center gap-2 ${emailCopied ? 'text-emerald-400 bg-emerald-500/10' : 'text-gray-500 hover:text-cyan-400 hover:bg-white/5'}`}
                      title="Copy Email"
                     >
                        {emailCopied ? (
                          <>
                            <CheckCircle size={16} />
                            <span className="text-xs font-mono font-bold">COPIED</span>
                          </>
                        ) : (
                          <Copy size={16} />
                        )}
                     </button>
                  </div>
                  
                  <div className="flex gap-4">
                    <a href={`https://${data.personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex-1 bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-blue-400 py-3 rounded-lg font-medium transition-colors border border-blue-500/20 flex justify-center items-center gap-2">
                       <Linkedin size={18} /> LinkedIn
                    </a>
                    <a href={`https://${data.personalInfo.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg font-medium transition-colors border border-white/10 flex justify-center items-center gap-2">
                       <Github size={18} /> GitHub
                    </a>
                  </div>
               </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 flex flex-col items-center gap-4 text-center text-gray-700 text-xs font-mono border-t border-white/5 mt-12">
        <p className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            SYSTEM STATUS: OPTIMAL // &copy; {new Date().getFullYear()} {data.personalInfo.fullName}
        </p>
        <button onClick={copyToClipboard} className="flex items-center gap-2 text-gray-600 hover:text-cyan-400 transition-colors">
          <LinkIcon size={12} /> Copy Portfolio Link
        </button>
      </footer>
      
      <style>{`
        @keyframes progress-indeterminate {
          0% { left: -100%; width: 50%; }
          100% { left: 100%; width: 50%; }
        }
        .animate-progress-indeterminate {
          animation: progress-indeterminate 1.5s infinite linear;
        }
        .blink {
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
