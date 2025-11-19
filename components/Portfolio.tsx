import React, { useState, useEffect } from 'react';
import { ResumeData } from '../types';
import { Terminal, Server, Cloud, Github, Linkedin, Mail, Cpu, Globe, ExternalLink, ChevronRight, MapPin, ShieldCheck, Code, Send, Lock, CheckCircle, Copy, Download, GraduationCap, FolderGit2 } from 'lucide-react';

interface PortfolioProps {
  data: ResumeData;
}

const Portfolio: React.FC<PortfolioProps> = ({ data }) => {
  
  const [handshakeStatus, setHandshakeStatus] = useState<'idle' | 'connecting' | 'connected'>('idle');
  const [activeTab, setActiveTab] = useState('console');

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

  // Helper to highlight tech keywords in text to make it look different from resume
  const highlightTech = (text: string) => {
    const keywords = ['Kubernetes', 'Azure', 'AWS', 'GCP', 'Terraform', 'Docker', 'Python', 'AI', 'LLM', 'React', 'Node', 'Prometheus', 'Grafana', 'Jenkins', 'Git', 'CI/CD', 'Ansible', 'Linux'];
    let processedText = cleanText(text);
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      processedText = processedText.replace(regex, `<span class="text-blue-400 font-semibold font-mono bg-blue-900/20 px-1 rounded">${keyword}</span>`);
    });
    
    return <span dangerouslySetInnerHTML={{ __html: processedText }} />;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500 selection:text-white pb-20">
      
      {/* Navigation / Hero */}
      <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex justify-between items-center shadow-xl">
        <div className="font-mono font-bold text-xl tracking-tighter text-blue-400 cursor-pointer flex items-center gap-2" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <Terminal size={20} />
          <span>{data.personalInfo.fullName.split(' ')[0]}<span className="text-slate-600">.sh</span></span>
        </div>
        <div className="flex gap-6 text-sm font-medium items-center">
          <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-colors hidden md:block">Console</button>
          <button onClick={() => scrollToSection('stack')} className="hover:text-blue-400 transition-colors hidden md:block">Stack</button>
          <button onClick={() => scrollToSection('projects')} className="hover:text-blue-400 transition-colors hidden md:block">Projects</button>
          <button onClick={() => scrollToSection('experience')} className="hover:text-blue-400 transition-colors hidden md:block">Deployments</button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-full transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] text-xs uppercase tracking-wider font-bold flex items-center gap-2"
          >
            <ShieldCheck size={14} /> Secure Connect
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative px-6 py-24 md:py-36 max-w-6xl mx-auto text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-mono mb-8 shadow-xl animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          SYSTEM_ONLINE // READY_FOR_INTERVIEW
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
          Building the <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Automated Future</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
          <b>{data.personalInfo.fullName}</b>: Cloud Architect & AI Engineer.
          <br/>
          Designing self-healing infrastructure and intelligent pipelines.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
           <button onClick={() => scrollToSection('stack')} className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
             Explore Architecture <ChevronRight size={18} />
           </button>
           <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors border border-slate-700 flex items-center justify-center gap-2">
             <Mail size={18} /> Contact Protocol
           </button>
        </div>
      </header>

      {/* Terminal / About Me */}
      <section id="about" className="px-6 py-16 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Terminal Side */}
          <div className="md:col-span-2 bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-slate-800 font-mono text-sm md:text-base transform transition-all hover:scale-[1.01] duration-500">
            <div className="bg-slate-900 px-4 py-3 flex items-center gap-2 border-b border-slate-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-slate-500 ml-2 text-xs font-bold uppercase flex-1 text-center mr-12">admin@portfolio:~/profile</div>
            </div>
            <div className="p-6 text-slate-300 space-y-6 min-h-[300px]">
              <div>
                <span className="text-green-500">admin@sys:~$</span> <span className="text-blue-400">whoami --verbose</span>
              </div>
              <div className="pl-4 text-slate-400 grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="bg-slate-900/50 p-3 rounded border border-slate-800/50">
                    <div className="text-xs text-slate-600 uppercase mb-1">Role</div>
                    <div className="text-emerald-400 font-bold">Cloud & DevOps Engineer</div>
                 </div>
                 <div className="bg-slate-900/50 p-3 rounded border border-slate-800/50">
                    <div className="text-xs text-slate-600 uppercase mb-1">Specialization</div>
                    <div className="text-blue-400 font-bold">AI/LLM Integration</div>
                 </div>
              </div>

              <div>
                <span className="text-green-500">admin@sys:~$</span> <span className="text-blue-400">cat summary.txt | grep "Highlights"</span>
              </div>
              <div className="pl-4 border-l-2 border-blue-500/30 ml-1 text-slate-300 leading-relaxed text-sm animate-pulse-slow">
                {cleanText(data.personalInfo.summary)}
              </div>
            </div>
          </div>

          {/* Stats Side */}
          <div className="space-y-4">
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-blue-500/30 transition-colors">
               <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4 flex items-center gap-2"><Cpu size={14}/> System Resources</h3>
               <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                       <span className="text-slate-300 font-mono">Kubernetes</span>
                       <span className="text-emerald-400 font-mono">98%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[98%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                       <span className="text-slate-300 font-mono">IaC (Terraform)</span>
                       <span className="text-blue-400 font-mono">95%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 w-[95%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                       <span className="text-slate-300 font-mono">CI/CD Pipelines</span>
                       <span className="text-purple-400 font-mono">92%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-purple-500 w-[92%] shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                    </div>
                  </div>
               </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/20 to-slate-900 border border-blue-500/20 p-6 rounded-xl text-center">
               <Globe className="mx-auto text-blue-400 mb-2" size={24} />
               <div className="text-2xl font-bold text-white mb-1">Global</div>
               <div className="text-xs text-slate-400 uppercase tracking-widest">Remote Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack - Holographic Cards */}
      <section id="stack" className="px-6 py-20 bg-slate-900/30 border-y border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <Server className="text-blue-500" /> 
            <span>Operational Stack</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.skills.map((skillGroup, i) => {
              const [category, items] = skillGroup.includes(':') ? skillGroup.split(':') : ['Core', skillGroup];
              return (
                <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-blue-500/40 transition-all group relative overflow-hidden hover:-translate-y-1 duration-300">
                  {/* Glow Effect */}
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
                  
                  <h3 className="text-blue-400 font-mono text-sm mb-4 uppercase tracking-wider font-bold flex items-center gap-2 border-b border-slate-800 pb-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-sm shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div> {category}
                  </h3>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {items.split(',').map((skill, j) => (
                      <span key={j} className="px-3 py-1.5 bg-slate-950 text-slate-300 text-xs font-medium rounded border border-slate-800 group-hover:border-blue-500/30 group-hover:text-blue-100 transition-colors">
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

      {/* Projects Section (New) */}
      {data.projects.length > 0 && (
        <section id="projects" className="px-6 py-20 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3">
            <FolderGit2 className="text-purple-500" /> 
            <span>Active Repositories</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {data.projects.map((proj) => (
              <div key={proj.id} className="bg-slate-900/80 border border-slate-700 p-6 rounded-xl hover:bg-slate-800 transition-all group">
                 <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{proj.name}</h3>
                    <a href={proj.link || '#'} className="text-slate-500 hover:text-white"><ExternalLink size={18}/></a>
                 </div>
                 <div className="text-xs font-mono text-blue-400 mb-4">{proj.techStack}</div>
                 <p className="text-slate-400 text-sm leading-relaxed mb-4">{proj.description}</p>
                 <div className="text-xs text-slate-600 font-mono border-t border-slate-800 pt-2 mt-auto">
                    Last Commit: {proj.endDate || 'Running'}
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

        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-8 space-y-16">
          {data.experience.map((exp, i) => (
            <div key={exp.id} className="relative pl-10 md:pl-16 group">
              {/* Timeline Node */}
              <div className={`absolute -left-[9px] top-2 w-4 h-4 rounded-full border-4 border-slate-950 ${exp.current ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)] animate-pulse' : 'bg-slate-700'}`}></div>
              
              <div className="bg-slate-900/50 border border-slate-800 p-6 md:p-8 rounded-2xl hover:bg-slate-900 hover:border-blue-500/30 transition-all duration-300 shadow-lg">
                 <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                        {exp.role}
                        {exp.current && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 uppercase tracking-wide">Active</span>}
                      </h3>
                      <div className="text-slate-400 text-sm font-medium mt-1 flex items-center gap-2">
                         <span className="text-blue-400 font-mono">@ {exp.company}</span>
                         <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                         <span>{exp.location}</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded bg-slate-950 text-slate-400 border border-slate-800 whitespace-nowrap">
                      {exp.startDate} — {exp.current ? 'PRESENT' : exp.endDate}
                    </span>
                 </div>

                 <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                    {exp.description.split('\n').map((line, idx) => {
                       if (!line.trim()) return null;
                       const parts = line.split(/(\*\*.*?\*\*)/);
                       const hasHeader = parts.some(p => p.startsWith('**'));

                       return (
                        <div key={idx} className={`flex items-start gap-3 group/item ${hasHeader ? 'mt-4' : ''}`}>
                           {!hasHeader && <span className="mt-2 w-1.5 h-1.5 bg-slate-700 rounded-sm flex-shrink-0 group-hover/item:bg-blue-500 transition-colors"></span>}
                           <div className="w-full">
                            {parts.map((part, pIdx) => {
                                if (part.startsWith('**')) {
                                   return <div key={pIdx} className="text-white font-bold mb-1 text-base border-b border-slate-800 pb-1 inline-block">{part.slice(2, -2)}</div>
                                }
                                return <span key={pIdx} className="text-slate-400">{highlightTech(part)}</span>
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

      {/* Education Section (New) */}
      <section id="education" className="px-6 py-12 max-w-5xl mx-auto border-t border-slate-900">
         <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <GraduationCap className="text-slate-500" /> 
            <span>Academic Credentials</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
             {data.education.map((edu) => (
                <div key={edu.id} className="bg-slate-900/30 p-4 rounded border border-slate-800/50">
                   <div className="text-emerald-400 font-bold text-sm mb-1">{edu.degree}</div>
                   <div className="text-slate-300 text-sm">{edu.institution}</div>
                   <div className="text-slate-500 text-xs mt-2">{edu.year}</div>
                </div>
             ))}
          </div>
      </section>

      {/* Interactive Contact - The "Handshake" */}
      <section id="contact" className="px-6 py-32 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-600/10 text-blue-400 mb-8 border border-blue-500/30 shadow-[0_0_30px_rgba(37,99,235,0.15)]">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Secure Uplink Required</h2>
          <p className="text-slate-400 mb-12 max-w-xl mx-auto">
            Initiate a direct handshake protocol to reveal contact coordinates. Connection is encrypted and private.
          </p>
          
          {handshakeStatus === 'idle' && (
            <button 
              onClick={initiateHandshake}
              className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 bg-blue-600 text-white rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] z-20"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
              <Lock size={20} /> Initialize Handshake
            </button>
          )}

          {handshakeStatus === 'connecting' && (
             <div className="flex flex-col items-center gap-4">
                <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden relative">
                  <div className="absolute top-0 left-0 h-full bg-blue-500 animate-progress-indeterminate"></div>
                </div>
                <div className="font-mono text-blue-400 text-sm blink">DECRYPTING_CONTACT_PACKETS...</div>
             </div>
          )}

          {handshakeStatus === 'connected' && (
            <div id="handshake-result" className="bg-slate-900 border border-blue-500/50 rounded-2xl p-8 max-w-lg mx-auto animate-in fade-in zoom-in duration-500 shadow-[0_0_50px_rgba(37,99,235,0.15)]">
               <div className="flex items-center justify-center gap-2 text-emerald-400 font-mono text-sm font-bold mb-6 pb-4 border-b border-slate-800">
                  <CheckCircle size={16} /> CONNECTION ESTABLISHED
               </div>
               
               <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex items-center justify-between group hover:border-blue-500/50 transition-colors">
                     <div className="flex items-center gap-3">
                        <Mail className="text-slate-500" size={20} />
                        <span className="text-slate-200 font-medium">{data.personalInfo.email}</span>
                     </div>
                     <button 
                      onClick={() => navigator.clipboard.writeText(data.personalInfo.email)}
                      className="text-slate-500 hover:text-blue-400 transition-colors p-2" title="Copy Email"
                     >
                        <Copy size={16} />
                     </button>
                  </div>
                  
                  <div className="flex gap-4">
                    <a href={`https://${data.personalInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex-1 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 py-3 rounded-lg font-medium transition-colors border border-blue-600/20 flex justify-center items-center gap-2">
                       <Linkedin size={18} /> LinkedIn
                    </a>
                    <a href={`https://${data.personalInfo.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg font-medium transition-colors border border-slate-700 flex justify-center items-center gap-2">
                       <Github size={18} /> GitHub
                    </a>
                  </div>
               </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-700 text-sm font-mono border-t border-slate-900 mt-12">
        <p>SYSTEM STATUS: OPTIMAL // &copy; {new Date().getFullYear()} {data.personalInfo.fullName}</p>
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