
import React, { useState } from 'react';
import { ResumeData, ExperienceItem, ProjectItem, EducationItem } from '../types';
import { Plus, Trash2, Wand2, Sparkles, Briefcase, ChevronDown, ChevronUp, Award, Globe } from 'lucide-react';
import { optimizeText, bridgeGapWithProjects } from '../services/geminiService';

interface EditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const Editor: React.FC<EditorProps> = ({ data, onChange }) => {
  const [activeSection, setActiveSection] = useState<string | null>('personal');
  const [loading, setLoading] = useState(false);

  const updateField = (section: keyof ResumeData, field: string, value: any) => {
    onChange({
      ...data,
      [section]: {
        ...data[section],
        [field]: value
      }
    });
  };

  const handleOptimize = async (text: string, type: 'summary' | 'bullet', callback: (val: string) => void) => {
    setLoading(true);
    const result = await optimizeText(text, type);
    callback(result);
    setLoading(false);
  };

  const handleGapBridge = async () => {
    setLoading(true);
    // Collect recent projects
    const projectSummaries = data.projects.map(p => `${p.name} (${p.techStack}): ${p.description}`).join('\n');
    
    if (!projectSummaries) {
      alert("Add some projects first to bridge the gap!");
      setLoading(false);
      return;
    }

    const bridgeBullets = await bridgeGapWithProjects(projectSummaries);
    
    const newExperience: ExperienceItem = {
      id: Date.now().toString(),
      company: "Independent Engineering Initiative",
      role: "Freelance Full Stack Engineer",
      location: "Remote",
      startDate: "2024-06",
      endDate: "Present",
      current: true,
      description: bridgeBullets
    };

    onChange({
      ...data,
      experience: [newExperience, ...data.experience]
    });
    setLoading(false);
  };

  const SectionHeader = ({ title, id, icon: Icon }: { title: string, id: string, icon: any }) => (
    <button 
      onClick={() => setActiveSection(activeSection === id ? null : id)}
      className="w-full flex items-center justify-between p-4 bg-white border-b border-slate-200 hover:bg-slate-50 transition-colors text-left"
    >
      <div className="flex items-center gap-2 font-semibold text-slate-800">
        <Icon size={18} className="text-blue-600" />
        {title}
      </div>
      {activeSection === id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>
  );

  return (
    <div className="h-full flex flex-col bg-slate-50 border-r border-slate-200 overflow-y-auto">
      <div className="p-4 bg-white border-b border-slate-200 sticky top-0 z-10">
        <h2 className="text-xl font-bold text-slate-800">Editor</h2>
        <p className="text-xs text-slate-500">Edit details to update the preview</p>
      </div>

      {/* Personal Info */}
      <SectionHeader title="Personal Info" id="personal" icon={Briefcase} />
      {activeSection === 'personal' && (
        <div className="p-4 space-y-4 bg-slate-50/50">
          <input 
            type="text" placeholder="Full Name" 
            className="w-full p-2 border rounded text-sm"
            value={data.personalInfo.fullName}
            onChange={(e) => updateField('personalInfo', 'fullName', e.target.value)}
          />
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="Email" className="p-2 border rounded text-sm" value={data.personalInfo.email} onChange={(e) => updateField('personalInfo', 'email', e.target.value)} />
            <input type="text" placeholder="Phone" className="p-2 border rounded text-sm" value={data.personalInfo.phone} onChange={(e) => updateField('personalInfo', 'phone', e.target.value)} />
          </div>
          <input type="text" placeholder="Location (City, State)" className="w-full p-2 border rounded text-sm" value={data.personalInfo.location} onChange={(e) => updateField('personalInfo', 'location', e.target.value)} />
          <div className="grid grid-cols-2 gap-2">
            <input type="text" placeholder="LinkedIn URL" className="p-2 border rounded text-sm" value={data.personalInfo.linkedin} onChange={(e) => updateField('personalInfo', 'linkedin', e.target.value)} />
            <input type="text" placeholder="GitHub URL" className="p-2 border rounded text-sm" value={data.personalInfo.github} onChange={(e) => updateField('personalInfo', 'github', e.target.value)} />
          </div>
           {/* Portfolio URL Input */}
           <div className="relative">
            <input 
              type="text" 
              placeholder="Portfolio Website URL" 
              className="w-full p-2 pl-8 border rounded text-sm border-blue-200 bg-blue-50" 
              value={data.personalInfo.portfolioUrl || ''} 
              onChange={(e) => updateField('personalInfo', 'portfolioUrl', e.target.value)} 
            />
            <Globe className="absolute left-2.5 top-2.5 text-blue-400" size={14} />
          </div>
          
          <div className="relative">
            <textarea 
              placeholder="Professional Summary" 
              className="w-full p-2 border rounded text-sm min-h-[100px]"
              value={data.personalInfo.summary} 
              onChange={(e) => updateField('personalInfo', 'summary', e.target.value)}
            />
            <button 
              onClick={() => handleOptimize(data.personalInfo.summary, 'summary', (val) => updateField('personalInfo', 'summary', val))}
              disabled={loading}
              className="absolute bottom-2 right-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1 hover:bg-blue-200"
            >
              <Wand2 size={12} /> {loading ? 'Thinking...' : 'AI Optimize'}
            </button>
          </div>
        </div>
      )}

      {/* Experience */}
      <SectionHeader title="Experience" id="experience" icon={Briefcase} />
      {activeSection === 'experience' && (
        <div className="p-4 space-y-6 bg-slate-50/50">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <Sparkles className="text-blue-600 mt-1 flex-shrink-0" size={16} />
              <div>
                <h4 className="text-sm font-bold text-blue-900">Career Gap Assistant</h4>
                <p className="text-xs text-blue-700 mt-1">
                  Use this to convert your projects into a professional freelance entry if you have a gap.
                </p>
              </div>
            </div>
            <button 
              onClick={handleGapBridge}
              disabled={loading}
              className="text-xs bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition-colors w-full text-center font-medium"
            >
              {loading ? 'Generating...' : 'Merge Projects into "Freelance" Role'}
            </button>
          </div>

          {data.experience.map((exp, index) => (
            <div key={exp.id} className="bg-white p-3 border rounded shadow-sm relative group">
               <button 
                  onClick={() => {
                    const newExp = [...data.experience];
                    newExp.splice(index, 1);
                    onChange({...data, experience: newExp});
                  }}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <input type="text" placeholder="Company" className="p-2 border rounded text-sm font-medium" value={exp.company} onChange={(e) => {
                   const newExp = [...data.experience]; newExp[index].company = e.target.value; onChange({...data, experience: newExp});
                }} />
                <input type="text" placeholder="Role" className="p-2 border rounded text-sm" value={exp.role} onChange={(e) => {
                   const newExp = [...data.experience]; newExp[index].role = e.target.value; onChange({...data, experience: newExp});
                }} />
              </div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <input type="text" placeholder="Start (YYYY-MM)" className="p-2 border rounded text-sm" value={exp.startDate} onChange={(e) => {
                   const newExp = [...data.experience]; newExp[index].startDate = e.target.value; onChange({...data, experience: newExp});
                }} />
                <input type="text" placeholder="End (YYYY-MM)" className="p-2 border rounded text-sm" value={exp.endDate} disabled={exp.current} onChange={(e) => {
                   const newExp = [...data.experience]; newExp[index].endDate = e.target.value; onChange({...data, experience: newExp});
                }} />
                 <label className="flex items-center gap-1 text-xs text-slate-600 cursor-pointer">
                    <input type="checkbox" checked={exp.current} onChange={(e) => {
                      const newExp = [...data.experience]; newExp[index].current = e.target.checked; onChange({...data, experience: newExp});
                    }} /> Current
                 </label>
              </div>
              <div className="relative">
                <textarea 
                  placeholder="Description (Bullet points)" 
                  className="w-full p-2 border rounded text-sm min-h-[100px]"
                  value={exp.description}
                  onChange={(e) => {
                    const newExp = [...data.experience]; newExp[index].description = e.target.value; onChange({...data, experience: newExp});
                  }}
                />
                 <button 
                  onClick={() => handleOptimize(exp.description, 'bullet', (val) => {
                     const newExp = [...data.experience]; newExp[index].description = val; onChange({...data, experience: newExp});
                  })}
                  disabled={loading}
                  className="absolute bottom-2 right-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded flex items-center gap-1 hover:bg-emerald-200"
                >
                  <Wand2 size={12} /> Improve
                </button>
              </div>
            </div>
          ))}
          <button 
            onClick={() => onChange({...data, experience: [...data.experience, { id: Date.now().toString(), company: '', role: '', location: '', startDate: '', endDate: '', current: false, description: '' }]})}
            className="w-full py-2 border-2 border-dashed border-slate-300 text-slate-500 rounded hover:border-blue-400 hover:text-blue-500 flex items-center justify-center gap-2 text-sm"
          >
            <Plus size={16} /> Add Experience
          </button>
        </div>
      )}

      {/* Projects */}
      <SectionHeader title="Projects" id="projects" icon={Briefcase} />
      {activeSection === 'projects' && (
        <div className="p-4 space-y-4 bg-slate-50/50">
           {data.projects.map((proj, index) => (
            <div key={proj.id} className="bg-white p-3 border rounded shadow-sm relative group">
               <button 
                  onClick={() => {
                    const newProj = [...data.projects];
                    newProj.splice(index, 1);
                    onChange({...data, projects: newProj});
                  }}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              <input type="text" placeholder="Project Name" className="w-full p-2 border rounded text-sm font-medium mb-2" value={proj.name} onChange={(e) => {
                   const newProj = [...data.projects]; newProj[index].name = e.target.value; onChange({...data, projects: newProj});
              }} />
              <input type="text" placeholder="Tech Stack (e.g. React, Node)" className="w-full p-2 border rounded text-sm mb-2" value={proj.techStack} onChange={(e) => {
                   const newProj = [...data.projects]; newProj[index].techStack = e.target.value; onChange({...data, projects: newProj});
              }} />
               <div className="grid grid-cols-2 gap-2 mb-2">
                <input type="text" placeholder="Start Date" className="p-2 border rounded text-sm" value={proj.startDate} onChange={(e) => {
                   const newProj = [...data.projects]; newProj[index].startDate = e.target.value; onChange({...data, projects: newProj});
                }} />
                <input type="text" placeholder="End Date / Present" className="p-2 border rounded text-sm" value={proj.endDate} onChange={(e) => {
                   const newProj = [...data.projects]; newProj[index].endDate = e.target.value; onChange({...data, projects: newProj});
                }} />
              </div>
              <input type="text" placeholder="Link URL" className="w-full p-2 border rounded text-sm mb-2" value={proj.link} onChange={(e) => {
                   const newProj = [...data.projects]; newProj[index].link = e.target.value; onChange({...data, projects: newProj});
              }} />
              <textarea 
                placeholder="Project Description" 
                className="w-full p-2 border rounded text-sm min-h-[80px]"
                value={proj.description}
                onChange={(e) => {
                   const newProj = [...data.projects]; newProj[index].description = e.target.value; onChange({...data, projects: newProj});
                }}
              />
            </div>
          ))}
           <button 
            onClick={() => onChange({...data, projects: [...data.projects, { id: Date.now().toString(), name: '', techStack: '', link: '', startDate: '', endDate: '', description: '' }]})}
            className="w-full py-2 border-2 border-dashed border-slate-300 text-slate-500 rounded hover:border-blue-400 hover:text-blue-500 flex items-center justify-center gap-2 text-sm"
          >
            <Plus size={16} /> Add Project
          </button>
        </div>
      )}

      {/* Skills */}
      <SectionHeader title="Skills" id="skills" icon={Briefcase} />
      {activeSection === 'skills' && (
        <div className="p-4 bg-slate-50/50">
           <p className="text-xs text-slate-500 mb-2">Use "Category: Skill, Skill" format for columns.</p>
          <textarea 
            placeholder="Skills (e.g. Languages: Python, JS)" 
            className="w-full p-2 border rounded text-sm min-h-[100px]"
            value={data.skills.join('\n')} 
            onChange={(e) => onChange({...data, skills: e.target.value.split('\n')})}
          />
        </div>
      )}

      {/* Education */}
      <SectionHeader title="Education" id="education" icon={Briefcase} />
      {activeSection === 'education' && (
        <div className="p-4 space-y-4 bg-slate-50/50">
          {data.education.map((edu, index) => (
            <div key={edu.id} className="bg-white p-3 border rounded shadow-sm relative group">
               <button 
                  onClick={() => {
                    const newEdu = [...data.education];
                    newEdu.splice(index, 1);
                    onChange({...data, education: newEdu});
                  }}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              <input type="text" placeholder="Institution" className="w-full p-2 border rounded text-sm font-medium mb-2" value={edu.institution} onChange={(e) => {
                   const newEdu = [...data.education]; newEdu[index].institution = e.target.value; onChange({...data, education: newEdu});
              }} />
              <input type="text" placeholder="Degree" className="w-full p-2 border rounded text-sm mb-2" value={edu.degree} onChange={(e) => {
                   const newEdu = [...data.education]; newEdu[index].degree = e.target.value; onChange({...data, education: newEdu});
              }} />
              <input type="text" placeholder="Year" className="w-full p-2 border rounded text-sm" value={edu.year} onChange={(e) => {
                   const newEdu = [...data.education]; newEdu[index].year = e.target.value; onChange({...data, education: newEdu});
              }} />
            </div>
          ))}
          <button 
            onClick={() => onChange({...data, education: [...data.education, { id: Date.now().toString(), institution: '', degree: '', year: '' }]})}
            className="w-full py-2 border-2 border-dashed border-slate-300 text-slate-500 rounded hover:border-blue-400 hover:text-blue-500 flex items-center justify-center gap-2 text-sm"
          >
            <Plus size={16} /> Add Education
          </button>
        </div>
      )}

      {/* Certifications */}
      <SectionHeader title="Certifications" id="certifications" icon={Award} />
      {activeSection === 'certifications' && (
        <div className="p-4 bg-slate-50/50">
          <textarea 
            placeholder="One certification per line" 
            className="w-full p-2 border rounded text-sm min-h-[100px]"
            value={(data.certifications || []).join('\n')} 
            onChange={(e) => onChange({...data, certifications: e.target.value.split('\n')})}
          />
        </div>
      )}
    </div>
  );
};

export default Editor;
