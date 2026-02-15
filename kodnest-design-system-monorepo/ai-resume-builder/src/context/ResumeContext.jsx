
import React, { createContext, useContext, useState, useEffect } from 'react';

const ResumeContext = createContext();

export const initialResumeState = {
    personal: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        title: '',
        website: '',
        linkedin: '',
        github: ''
    },
    summary: '',
    experience: [],
    education: [],
    projects: [],
    skills: {
        technical: [],
        soft: [],
        tools: []
    }
};

export const sampleResume = {
    personal: {
        fullName: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        title: 'Senior Software Engineer',
        website: 'alexmorgan.dev',
        linkedin: 'linkedin.com/in/alexmorgan',
        github: 'github.com/alexmorgan'
    },
    summary: 'Results-driven software engineer with 6+ years of experience building scalable web applications. Expert in React, Node.js, and Cloud Architecture. Passionate about clean code and user experience.',
    experience: [
        {
            id: 1,
            company: 'TechCorp Inc.',
            role: 'Senior Frontend Developer',
            date: '2021 - Present',
            description: 'Led a team of 5 developers to rebuild the core dashboard.\nImproved performance by 40% using React Server Components.\nMentored junior developers and established code quality standards.'
        },
        {
            id: 2,
            company: 'StartupX',
            role: 'Full Stack Developer',
            date: '2019 - 2021',
            description: 'Built the MVP from scratch using MERN stack.\nScaled the application to 100k+ active users.\nIntegrated Stripe payments and Twilio notifications.'
        }
    ],
    education: [
        {
            id: 1,
            school: 'University of Technology',
            degree: 'B.S. Computer Science',
            date: '2015 - 2019',
            description: 'Graduated with Honors. President of the Coding Club.'
        }
    ],
    projects: [
        {
            id: 1,
            name: 'AI Resume Builder',
            description: 'A premium resume building tool using React and OpenAI. Features include real-time preview, PDF export, and ATS optimization.',
            techStack: ['React', 'OpenAI API', 'Tailwind'],
            liveUrl: 'resume-builder.demo.com',
            githubUrl: 'github.com/alexmorgan/resume-builder'
        },
        {
            id: 2,
            name: 'E-commerce Dashboard',
            description: 'Real-time analytics dashboard for online retailers. Visualized sales data using D3.js and providing actionable insights.',
            techStack: ['Vue.js', 'D3.js', 'Firebase'],
            liveUrl: 'dashboard-demo.com',
            githubUrl: 'github.com/alexmorgan/ecommerce-dash'
        }
    ],
    skills: {
        technical: ['React', 'TypeScript', 'Node.js', 'Next.js', 'GraphQL'],
        soft: ['Team Leadership', 'Mentoring', 'Agile/Scrum'],
        tools: ['Docker', 'AWS', 'Git', 'Figma']
    }
};

export function ResumeProvider({ children }) {
    const [resumeData, setResumeData] = useState(() => {
        const saved = localStorage.getItem('resumeBuilderData'); // Changed key
        const parsed = saved ? JSON.parse(saved) : initialResumeState;

        // Data Migration: Skills Array to Object
        if (Array.isArray(parsed.skills)) {
            parsed.skills = {
                technical: parsed.skills,
                soft: [],
                tools: []
            };
        }

        // Data Migration: Ensure Projects have techStack
        parsed.projects = parsed.projects.map(p => ({
            ...p,
            techStack: p.techStack || [],
            liveUrl: p.liveUrl || '',
            githubUrl: p.githubUrl || ''
        }));

        return parsed;
    });

    const [template, setTemplate] = useState(() => {
        return localStorage.getItem('resumeTemplate') || 'modern';
    });

    const [score, setScore] = useState(0);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData)); // Changed key
        calculateScore();
    }, [resumeData]);

    useEffect(() => {
        localStorage.setItem('resumeTemplate', template);
    }, [template]);

    const calculateScore = () => {
        let currentScore = 0;
        let newSuggestions = [];

        const { personal, summary, experience, education, projects, skills } = resumeData;

        // 1. Summary Length (40-120 words)
        const summaryWords = summary.trim().split(/\s+/).length;
        if (summaryWords >= 40 && summaryWords <= 120) {
            currentScore += 15;
        } else {
            newSuggestions.push("Expand summary to 40-120 words.");
        }

        // 2. Projects >= 2
        if (projects.length >= 2) {
            currentScore += 10;
        } else {
            newSuggestions.push("Add at least 2 projects.");
        }

        // 3. Experience >= 1
        if (experience.length >= 1) {
            currentScore += 10;
        } else {
            newSuggestions.push("Add at least 1 internship or work experience.");
        }

        // 4. Skills >= 8
        const totalSkills = Array.isArray(skills)
            ? skills.length
            : Object.values(skills).flat().length;

        if (totalSkills >= 8) {
            currentScore += 10;
        } else {
            newSuggestions.push("Add more skills (target 8+ across categories).");
        }

        // 5. Links
        if (personal.github || personal.linkedin) {
            currentScore += 10;
        }

        // 6. Impact (Numbers)
        const hasNumbers = [...experience, ...projects].some(item =>
            item.description && /\d+|%|k\b|X\b/i.test(item.description)
        );
        if (hasNumbers) {
            currentScore += 15;
        } else {
            newSuggestions.push("Add measurable impact (numbers, %, etc.) to bullets.");
        }

        // 7. Education
        const eduComplete = education.length > 0 && education.every(e => e.school && e.degree && e.date);
        if (eduComplete) {
            currentScore += 10;
        }

        // Base Score for Contact Info (to ensure 100 possible)
        // 15+10+10+10+10+15+10 = 80. Missing 20.
        // Adding +20 for Name + Email exists.
        if (personal.fullName && personal.email) {
            currentScore += 20;
        }

        setScore(Math.min(currentScore, 100));
        setSuggestions(newSuggestions.slice(0, 3)); // Max 3 suggestions
    };

    const updatePersonal = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            personal: { ...prev.personal, [field]: value }
        }));
    };

    const updateSection = (section, value) => {
        setResumeData(prev => ({ ...prev, [section]: value }));
    };

    const loadSample = () => setResumeData(sampleResume);

    return (
        <ResumeContext.Provider value={{ resumeData, updatePersonal, updateSection, loadSample, score, suggestions, template, setTemplate }}>
            {children}
        </ResumeContext.Provider>
    );
}

export const useResume = () => useContext(ResumeContext);
