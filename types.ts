
export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    portfolioUrl: string;
    location: string;
    summary: string;
  };
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  skills: string[];
  certifications: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  techStack: string;
  link: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

export const INITIAL_DATA: ResumeData = {
  personalInfo: {
    fullName: "Nithesh Kolluri",
    email: "Nitheshkolluri@gmail.com",
    phone: "+61 434 712 612",
    linkedin: "linkedin.com/in/nitheshkolluri",
    github: "github.com/nitheshkolluri",
    portfolioUrl: "https://ats-resume-architect-3112339576.us-west1.run.app",
    location: "Melbourne, VIC, Australia",
    summary: "Cloud & DevOps Engineer with a strong foundation in Azure infrastructure, Kubernetes orchestration, and AI-driven automation. Proven track record of designing secure, scalable CI/CD pipelines and integrating Large Language Models (LLMs) into operational workflows. Passionate about bridging the gap between infrastructure-as-code and intelligent application logic, leveraging expertise in Terraform, Python, and Generative AI to drive operational excellence."
  },
  experience: [
    {
      id: 'exp1',
      company: "Independent Cloud & AI Consultant",
      role: "Cloud & DevOps Engineer",
      location: "Remote",
      startDate: "Jun 2024",
      endDate: "Present",
      current: true,
      description: "**Kube-Guardian (AIOps):** Engineered an AI-driven incident resolution agent that detects Kubernetes pod failures, analyzes logs for root causes, and generates YAML patches.\n**Workflow Automation:** Designed a 'Human-in-the-Loop' workflow where AI-suggested fixes require explicit approval before application, ensuring operational safety.\n**SafeDrive (IoT Telemetry):** Developed a telemetry processing engine to ingest high-frequency accelerometer data, implementing signal smoothing algorithms to eliminate GPS drift.\n**Cloud Architecture:** Deployed scalable solutions using Docker on Google Cloud Run and implemented secure BYOK architectures for LLM integration to prevent vendor lock-in."
    },
    {
      id: 'exp3',
      company: "CVGT Employment",
      role: "Insights Intern",
      location: "Melbourne, VIC",
      startDate: "Mar 2024",
      endDate: "Jun 2024",
      current: false,
      description: "• Optimized the deployment of an internal LLM (Gemma 7B) on local infrastructure, achieving a 50% reduction in response latency.\n• Integrated Prometheus and Grafana for real-time monitoring of model performance and system resources.\n• Configured network isolation policies to secure the deployment environment against unauthorized access.\n• Conducted cost analysis of deployment models, implementing optimizations that reduced operational expenses by 15%."
    },
    {
      id: 'exp4',
      company: "SmartDocs Inc",
      role: "DevOps Engineer",
      location: "Hyderabad, India",
      startDate: "May 2021",
      endDate: "Jun 2022",
      current: false,
      description: "• Provisioned Azure AKS clusters, SQL databases, and Virtual Machines using Terraform for reproducible infrastructure.\n• Built and maintained automated CI/CD pipelines in Azure DevOps, reducing manual deployment efforts by 60%.\n• Managed identity and access policies via Azure Entra ID to enforce least-privilege security principles.\n• Centralized application logging and metrics using Azure Monitor to improve system observability."
    },
    {
      id: 'exp5',
      company: "Nokia",
      role: "Software Engineer (Cloud)",
      location: "Chennai, India",
      startDate: "Sep 2019",
      endDate: "Oct 2020",
      current: false,
      description: "• Automating cloud resource provisioning with Terraform scripts to streamline environment setup.\n• Containerized development and testing workflows using Docker, reducing environment configuration time.\n• Managed Kubernetes resources including namespaces, ConfigMaps, and Secrets for microservices architecture."
    }
  ],
  projects: [
    {
      id: 'proj1',
      name: "Kube-Guardian (AIOps)",
      techStack: "Kubernetes, Gemini AI, Go, Python",
      link: "https://kube-guardian-3112339576.us-west1.run.app",
      startDate: "2024",
      endDate: "Active",
      description: "AI-driven incident resolution agent for Kubernetes. Detects pod failures, analyzes logs using LLMs to identify root causes, and automatically generates YAML patches for remediation."
    },
    {
      id: 'proj2',
      name: "SafeDrive Telemetry",
      techStack: "IoT, Cloud Run, TypeScript, Google Maps API",
      link: "https://safedrive-643111877560.us-west1.run.app",
      startDate: "2024",
      endDate: "Active",
      description: "High-frequency telemetry processing engine. Ingests real-time accelerometer data to analyze driving behavior and eliminates GPS drift using advanced signal smoothing algorithms."
    }
  ], 
  education: [
    {
      id: 'edu1',
      institution: "ECA | Professional Year Program (ACS)",
      degree: "Professional Year",
      year: "Aug 2025 – Sep 2026 (Expected)"
    },
    {
      id: 'edu2',
      institution: "La Trobe University",
      degree: "Master of Information Technology (Cloud Analytics)",
      year: "Jul 2023 – Jul 2024"
    },
    {
      id: 'edu3',
      institution: "Vellore Institute of Technology",
      degree: "M.Tech Integrated Software Engineering",
      year: "Jun 2015 – Jun 2020"
    }
  ],
  skills: [
    "Cloud & DevOps: Azure (AKS, DevOps), AWS, Google Cloud Run, Terraform, Docker, Kubernetes, Helm",
    "AI & LLM Engineering: Generative AI Integration, Prompt Engineering, RAG Architectures, AI Agents",
    "Development: Python, TypeScript, React, Node.js, Bash, PowerShell, REST APIs",
    "Observability: Prometheus, Grafana, Azure Monitor, Datadog",
    "Tools & Platforms: Git, Jenkins, Ansible, Linux Administration"
  ],
  certifications: [
    "LinkedIn Certified: Azure Fundamentals (AZ-900)",
    "LinkedIn Certified: Azure Developer Associate (AZ-204)",
    "Skillsoft Certified: Kubernetes Administrator",
    "Skillsoft Certified: Terraform Modules",
    "Skillsoft Certified: Docker Orchestration",
    "Golden Key International Honour Society: Top 15% in Cloud Analytics (2023)"
  ]
};
