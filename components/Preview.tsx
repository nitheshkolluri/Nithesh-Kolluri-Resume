
import React from 'react';
import { ResumeData } from '../types';
import { MapPin, Mail, Phone, Linkedin, Github, ExternalLink, Award, Globe } from 'lucide-react';

interface PreviewProps {
  data: ResumeData;
  font: 'sans' | 'serif' | 'mono';
  onViewPortfolio?: () => void;
}

const Preview: React.FC<PreviewProps> = ({ data, font, onViewPortfolio }) => {
  // Times New Roman is the gold standard for ATS if serif is selected
  const fontStyles = {
    serif: { fontFamily: '"Times New Roman", Times, serif' },
    sans: { fontFamily: 'Inter, system-ui, sans-serif' },
    mono: { fontFamily: '"Roboto Mono", monospace' }
  };

  // Helper to parse bold markdown (e.g. **Text**)
  const renderTextWithBold = (text: string) => {
    // Clean bullet points first
    const cleanText = text.replace(/^[\u2022\u00b7\u2013\u2014-]\s*/, '');
    
    // Split by bold syntax
    const parts = cleanText.split(/(\*\*.*?\*\*)/g);
    
    return (
      <>
        {parts.map((part, index) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index} className="font-bold text-black">{part.slice(2, -2)}</strong>;
          }
          return <span key={index}>{part}</span>;
        })}
      </>
    );
  };

  // Helper to clean URL for display
  const cleanUrl = (url: string) => {
    if (!url) return '';
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '');
  };

  return (
    <div 
      id="resume-preview" 
      className="bg-white mx-auto shadow-lg p-[40px] md:p-[50px] w-full max-w-[210mm] min-h-[297mm]"
      style={{ 
        ...fontStyles[font],
        lineHeight: '1.4', // Slightly increased for better readability
        color: '#000000' // Strict Black for ATS
      }}
    >
      {/* Header - ATS Clean */}
      <header className="border-b border-black pb-5 mb-5 text-center">
        <h1 className="text-[32px] font-bold uppercase mb-1 text-black tracking-wide">
          {data.personalInfo.fullName}
        </h1>
        <p className="text-[16px] text-black mb-3 font-medium uppercase tracking-wider">Cloud & DevOps Engineer</p>
        
        {/* Contact Info - Line 1 */}
        <div className="flex flex-wrap justify-center gap-y-1 gap-x-1 text-[14px] text-black mt-2 leading-none">
           {data.personalInfo.location && (
             <span>{data.personalInfo.location}</span>
           )}
           <span className="text-black mx-1">|</span>
           {data.personalInfo.phone && (
             <span>{data.personalInfo.phone}</span>
           )}
           <span className="text-black mx-1">|</span>
           {data.personalInfo.email && (
             <a href={`mailto:${data.personalInfo.email}`} className="text-black hover:underline">
               {data.personalInfo.email}
             </a>
           )}
        </div>
        
        {/* Contact Info - Line 2 */}
        <div className="flex flex-wrap justify-center gap-y-1 gap-x-1 text-[14px] text-black mt-2 leading-none">
           {data.personalInfo.linkedin && (
            <>
             <span className="font-bold">LinkedIn:</span>
             <a href={`https://${cleanUrl(data.personalInfo.linkedin)}`} target="_blank" rel="noreferrer" className="text-black hover:underline">
               {cleanUrl(data.personalInfo.linkedin)}
             </a>
            </>
           )}
           
           {(data.personalInfo.linkedin && data.personalInfo.github) && <span className="text-black mx-1">|</span>}
           
           {data.personalInfo.github && (
            <>
             <span className="font-bold">GitHub:</span>
             <a href={`https://${cleanUrl(data.personalInfo.github)}`} target="_blank" rel="noreferrer" className="text-black hover:underline">
               {cleanUrl(data.personalInfo.github)}
             </a>
            </>
           )}
        </div>

        {/* Contact Info - Line 3 (Portfolio) */}
        {data.personalInfo.portfolioUrl && (
          <div className="flex flex-wrap justify-center gap-y-1 gap-x-1 text-[14px] text-black mt-2 leading-none">
             <span className="font-bold">Portfolio:</span>
             <a href={`https://${cleanUrl(data.personalInfo.portfolioUrl)}`} target="_blank" rel="noreferrer" className="text-black hover:underline">
               {cleanUrl(data.personalInfo.portfolioUrl)}
             </a>
          </div>
        )}
      </header>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="mb-5">
          <h2 className="text-[14px] font-bold uppercase border-b border-black mb-3 tracking-wider text-black">Professional Summary</h2>
          <p className="text-[14px] text-justify text-black leading-relaxed">
            {data.personalInfo.summary}
          </p>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[14px] font-bold uppercase border-b border-black mb-3 tracking-wider text-black">Technical Skills</h2>
          <div className="text-[14px] text-black leading-relaxed">
            {data.skills.map((skill, i) => {
              const [category, items] = skill.includes(':') ? skill.split(':') : ['', skill];
              return (
                <div key={i} className="mb-1 last:mb-0">
                  {category && <span className="font-bold">{category}:</span>}
                  <span>{items || category}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Experience */}
      <section className="mb-5">
        <h2 className="text-[14px] font-bold uppercase border-b border-black mb-4 tracking-wider text-black">Professional Experience</h2>
        <div className="space-y-5">
          {data.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-[15px] text-black">{exp.role}</h3>
                <span className="text-[14px] text-black whitespace-nowrap">
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[14px] font-bold italic text-black">{exp.company}</span>
                <span className="text-[14px] text-black">{exp.location}</span>
              </div>
              <ul className="list-disc list-outside ml-5 text-[14px] text-black space-y-1">
                {exp.description.split('\n').map((line, i) => (
                  line.trim() && <li key={i} className="pl-1 text-justify leading-normal">{renderTextWithBold(line)}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects (Only if distinct from experience) */}
      {data.projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[14px] font-bold uppercase border-b border-black mb-3 tracking-wider text-black">Key Projects</h2>
          <div className="space-y-4">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[14px] text-black">{proj.name}</h3>
                  </div>
                  <span className="text-[14px] text-black whitespace-nowrap">
                    {proj.startDate} – {proj.endDate || 'Present'}
                  </span>
                </div>
                <div className="text-[12px] font-bold text-black mb-1.5 uppercase">
                  {proj.techStack}
                </div>
                <ul className="list-disc list-outside ml-5 text-[14px] text-black space-y-1">
                  {proj.description.split('\n').map((line, i) => (
                    line.trim() && <li key={i} className="pl-1 text-justify">{renderTextWithBold(line)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      <section className="mb-5">
        <h2 className="text-[14px] font-bold uppercase border-b border-black mb-3 tracking-wider text-black">Education</h2>
        <div className="space-y-2">
          {data.education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-[14px] text-black">{edu.institution}</h3>
                <div className="text-[14px] text-black">{edu.degree}</div>
              </div>
              <span className="text-[14px] text-black font-medium text-right">{edu.year}</span>
            </div>
          ))}
        </div>
      </section>

       {/* Certifications */}
       {data.certifications && data.certifications.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[14px] font-bold uppercase border-b border-black mb-3 tracking-wider text-black">Certifications & Awards</h2>
          <ul className="list-disc list-outside ml-5 space-y-1 text-[14px] text-black">
             {data.certifications.map((cert, i) => (
               <li key={i}>
                 <span>{cert}</span>
               </li>
             ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Preview;
