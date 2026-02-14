
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import ResumePreview from '../components/ResumePreview';
import { ChevronDown, ChevronUp, Plus, Trash2, Wand2, Eye, Save } from 'lucide-react';
import GuidanceTextarea from '../components/GuidanceTextarea';

export default function Builder() {
    const { resumeData, updatePersonal, updateSection, loadSample, score, suggestions, template, setTemplate } = useResume();
    const [activeSection, setActiveSection] = useState('personal');
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get('demo') === 'true') {
            loadSample();
        }
    }, [searchParams, loadSample]);

    const sections = [
        { id: 'personal', label: 'Personal Info' },
        { id: 'summary', label: 'Professional Summary' },
        { id: 'experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
        { id: 'projects', label: 'Projects' },
        { id: 'skills', label: 'Skills' },
    ];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Left Panel - Editor */}
            <div className="w-1/2 flex flex-col border-r border-gray-200 bg-white">
                {/* Nav Header */}
                <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white shrink-0 z-10">
                    <Link to="/" className="text-xl font-bold tracking-tight text-gray-900">
                        AI Resume<span className="text-brand-600">Builder</span>
                    </Link>
                    <div className="flex gap-4">
                        <Link to="/preview" className="text-sm font-medium text-gray-600 hover:text-brand-600 flex items-center gap-2">
                            <Eye size={16} /> Preview
                        </Link>
                        <Link to="/proof" className="text-sm font-medium text-gray-600 hover:text-brand-600 flex items-center gap-2">
                            <Save size={16} /> Proof
                        </Link>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="p-6 space-y-6">
                        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
                            <h2 className="font-bold text-gray-800">Editor</h2>
                            <div className="flex gap-2">
                                <select
                                    className="text-xs font-semibold text-gray-700 bg-white border border-gray-300 px-3 py-1.5 rounded-md outline-none focus:ring-2 focus:ring-brand-500"
                                    value={template}
                                    onChange={(e) => setTemplate(e.target.value)}
                                >
                                    <option value="modern">Modern</option>
                                    <option value="classic">Classic</option>
                                    <option value="minimal">Minimal</option>
                                </select>
                                <button onClick={loadSample} className="text-xs font-semibold text-brand-600 hover:text-brand-700 bg-white border border-brand-200 px-3 py-1.5 rounded-md transition-colors shadow-sm">
                                    <Wand2 size={12} className="inline mr-1" />
                                    Sample
                                </button>
                            </div>
                        </div>

                        {/* ATS Score & Improvements Panel */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4 mb-8">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                        ATS Readiness Score
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">Optimize for recruitment algorithms.</p>
                                </div>
                                <div className={`text-2xl font-black ${score >= 80 ? 'text-green-600' : score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                                    {score}/100
                                </div>
                            </div>

                            {/* Score Meter */}
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-1000 ease-out ${score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-amber-400' : 'bg-red-400'}`}
                                    style={{ width: `${score}%` }}
                                />
                            </div>

                            {/* Top 3 Improvements */}
                            {suggestions.length > 0 && (
                                <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                                    <p className="text-xs font-bold text-amber-800 mb-2 uppercase tracking-wide">Top 3 Improvements</p>
                                    <ul className="space-y-2">
                                        {suggestions.map((s, i) => (
                                            <li key={i} className="text-xs text-amber-900 flex items-start gap-2">
                                                <span className="mt-1 min-w-[6px] h-[6px] rounded-full bg-amber-500" />
                                                <span className="leading-snug">{s}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {suggestions.length === 0 && score === 100 && (
                                <div className="bg-green-50 rounded-lg p-3 border border-green-100 text-center">
                                    <p className="text-xs font-bold text-green-700">🎉 Perfect Score! Your resume is ready.</p>
                                </div>
                            )}
                        </div>

                        {/* Personal Info */}
                        <Section title="Personal Info" isOpen={activeSection === 'personal'} onClick={() => setActiveSection('personal')}>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Full Name" value={resumeData.personal.fullName} onChange={(e) => updatePersonal('fullName', e.target.value)} />
                                <Input label="Job Title" value={resumeData.personal.title} onChange={(e) => updatePersonal('title', e.target.value)} />
                                <Input label="Email" value={resumeData.personal.email} onChange={(e) => updatePersonal('email', e.target.value)} />
                                <Input label="Phone" value={resumeData.personal.phone} onChange={(e) => updatePersonal('phone', e.target.value)} />
                                <Input label="Location" value={resumeData.personal.location} onChange={(e) => updatePersonal('location', e.target.value)} />
                                <Input label="Website" value={resumeData.personal.website} onChange={(e) => updatePersonal('website', e.target.value)} />
                                <Input label="LinkedIn" value={resumeData.personal.linkedin} onChange={(e) => updatePersonal('linkedin', e.target.value)} />
                                <Input label="GitHub" value={resumeData.personal.github} onChange={(e) => updatePersonal('github', e.target.value)} />
                            </div>
                        </Section>

                        {/* Summary */}
                        <Section title="Professional Summary" isOpen={activeSection === 'summary'} onClick={() => setActiveSection('summary')}>
                            <textarea
                                className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-sm resize-none"
                                placeholder="Write a compelling summary..."
                                value={resumeData.summary}
                                onChange={(e) => updateSection('summary', e.target.value)}
                            />
                        </Section>

                        {/* Experience */}
                        <Section title="Experience" isOpen={activeSection === 'experience'} onClick={() => setActiveSection('experience')}>
                            {resumeData.experience.map((exp, index) => (
                                <div key={exp.id} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100 relative group">
                                    <button
                                        onClick={() => {
                                            const newExp = resumeData.experience.filter(e => e.id !== exp.id);
                                            updateSection('experience', newExp);
                                        }}
                                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <Input label="Company" value={exp.company} onChange={(e) => {
                                            const newExp = [...resumeData.experience];
                                            newExp[index].company = e.target.value;
                                            updateSection('experience', newExp);
                                        }} />
                                        <Input label="Role" value={exp.role} onChange={(e) => {
                                            const newExp = [...resumeData.experience];
                                            newExp[index].role = e.target.value;
                                            updateSection('experience', newExp);
                                        }} />
                                        <Input label="Date Range" value={exp.date} onChange={(e) => {
                                            const newExp = [...resumeData.experience];
                                            newExp[index].date = e.target.value;
                                            updateSection('experience', newExp);
                                        }} />
                                    </div>
                                    <GuidanceTextarea
                                        className="w-full h-32 p-3 border border-gray-200 rounded-lg text-sm resize-none custom-scrollbar"
                                        placeholder="• Led development of... (Start with action verbs, use numbers)"
                                        value={exp.description}
                                        onChange={(e) => {
                                            const newExp = [...resumeData.experience];
                                            newExp[index].description = e.target.value;
                                            updateSection('experience', newExp);
                                        }}
                                    />
                                </div>
                            ))}
                            <button
                                onClick={() => updateSection('experience', [...resumeData.experience, { id: Date.now(), company: '', role: '', date: '', description: '' }])}
                                className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
                            >
                                <Plus size={16} /> Add Experience
                            </button>
                        </Section>

                        {/* Projects */}
                        <Section title="Projects" isOpen={activeSection === 'projects'} onClick={() => setActiveSection('projects')}>
                            {resumeData.projects.map((proj, index) => (
                                <div key={proj.id} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100 relative group">
                                    <button
                                        onClick={() => {
                                            const newProj = resumeData.projects.filter(p => p.id !== proj.id);
                                            updateSection('projects', newProj);
                                        }}
                                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="grid grid-cols-1 gap-3 mb-3">
                                        <Input label="Project Title" value={proj.name} onChange={(e) => {
                                            const newProj = [...resumeData.projects];
                                            newProj[index].name = e.target.value;
                                            updateSection('projects', newProj);
                                        }} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <Input label="Live URL" value={proj.liveUrl || ''} onChange={(e) => {
                                            const newProj = [...resumeData.projects];
                                            newProj[index].liveUrl = e.target.value;
                                            updateSection('projects', newProj);
                                        }} />
                                        <Input label="GitHub URL" value={proj.githubUrl || ''} onChange={(e) => {
                                            const newProj = [...resumeData.projects];
                                            newProj[index].githubUrl = e.target.value;
                                            updateSection('projects', newProj);
                                        }} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Tech Stack</label>
                                        <div className="p-3 bg-white rounded-lg border border-gray-200 min-h-[60px] flex flex-wrap gap-2 items-start shadow-sm">
                                            {(proj.techStack || []).map((tech, tIndex) => (
                                                <span key={tIndex} className="bg-gray-100 border border-gray-200 px-2 py-1 rounded-md text-xs flex items-center gap-1">
                                                    {tech}
                                                    <button onClick={() => {
                                                        const newProj = [...resumeData.projects];
                                                        newProj[index].techStack = newProj[index].techStack.filter((_, i) => i !== tIndex);
                                                        updateSection('projects', newProj);
                                                    }} className="text-gray-400 hover:text-red-500">×</button>
                                                </span>
                                            ))}
                                            <input
                                                type="text"
                                                className="text-xs bg-transparent outline-none min-w-[60px] flex-grow"
                                                placeholder="Add tech..."
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && e.target.value.trim()) {
                                                        const newProj = [...resumeData.projects];
                                                        const currentStack = newProj[index].techStack || [];
                                                        if (!currentStack.includes(e.target.value.trim())) {
                                                            newProj[index].techStack = [...currentStack, e.target.value.trim()];
                                                            updateSection('projects', newProj);
                                                        }
                                                        e.target.value = '';
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <GuidanceTextarea
                                        className="w-full h-32 p-3 border border-gray-200 rounded-lg text-sm resize-none custom-scrollbar"
                                        placeholder="• Built a full-stack app using... (Mention tech stack & impact)"
                                        value={proj.description}
                                        onChange={(e) => {
                                            const val = e.target.value.slice(0, 200);
                                            const newProj = [...resumeData.projects];
                                            newProj[index].description = val;
                                            updateSection('projects', newProj);
                                        }}
                                    />
                                    <p className="text-right text-xs text-gray-400 mt-1">{proj.description.length}/200 chars</p>
                                </div>
                            ))}
                            <button
                                onClick={() => updateSection('projects', [...resumeData.projects, { id: Date.now(), name: '', description: '', techStack: [], liveUrl: '', githubUrl: '' }])}
                                className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
                            >
                                <Plus size={16} /> Add Project
                            </button>
                        </Section>

                        {/* Education */}
                        <Section title="Education" isOpen={activeSection === 'education'} onClick={() => setActiveSection('education')}>
                            {resumeData.education.map((edu, index) => (
                                <div key={edu.id} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100 relative group">
                                    <button
                                        onClick={() => {
                                            const newEdu = resumeData.education.filter(e => e.id !== edu.id);
                                            updateSection('education', newEdu);
                                        }}
                                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <Input label="School" value={edu.school} onChange={(e) => {
                                            const newEdu = [...resumeData.education];
                                            newEdu[index].school = e.target.value;
                                            updateSection('education', newEdu);
                                        }} />
                                        <Input label="Degree" value={edu.degree} onChange={(e) => {
                                            const newEdu = [...resumeData.education];
                                            newEdu[index].degree = e.target.value;
                                            updateSection('education', newEdu);
                                        }} />
                                        <Input label="Date" value={edu.date} onChange={(e) => {
                                            const newEdu = [...resumeData.education];
                                            newEdu[index].date = e.target.value;
                                            updateSection('education', newEdu);
                                        }} />
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={() => updateSection('education', [...resumeData.education, { id: Date.now(), school: '', degree: '', date: '' }])}
                                className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
                            >
                                <Plus size={16} /> Add Education
                            </button>
                        </Section>

                        {/* Skills */}
                        <Section title="Skills" isOpen={activeSection === 'skills'} onClick={() => setActiveSection('skills')}>
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-xs text-gray-500">Categorize your skills for better ATS parsing.</p>
                                <button
                                    onClick={() => {
                                        const btn = document.getElementById('suggest-btn');
                                        if (btn) {
                                            btn.textContent = '✨ Suggesting...';
                                            btn.disabled = true;
                                        }
                                        setTimeout(() => {
                                            updateSection('skills', {
                                                technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'],
                                                soft: ['Team Leadership', 'Problem Solving'],
                                                tools: ['Git', 'Docker', 'AWS']
                                            });
                                            if (btn) {
                                                btn.textContent = '✨ Suggest Skills';
                                                btn.disabled = false;
                                            }
                                        }, 1000);
                                    }}
                                    id="suggest-btn"
                                    className="text-xs font-semibold text-brand-600 hover:bg-brand-50 px-2 py-1 rounded transition-colors"
                                >
                                    ✨ Suggest Skills
                                </button>
                            </div>

                            {['technical', 'soft', 'tools'].map((category) => (
                                <div key={category} className="mb-4">
                                    <h4 className="text-xs font-bold uppercase text-gray-400 mb-2 flex justify-between">
                                        {category === 'tools' ? 'Tools & Technologies' : `${category} Skills`}
                                        <span className="text-gray-300">({(resumeData.skills[category] || []).length})</span>
                                    </h4>
                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 min-h-[60px] flex flex-wrap gap-2 items-start">
                                        {(resumeData.skills[category] || []).map((skill, index) => (
                                            <span key={index} className="bg-white border border-gray-200 px-2 py-1 rounded-md text-sm flex items-center gap-1 shadow-sm">
                                                {skill}
                                                <button onClick={() => {
                                                    const newSkills = { ...resumeData.skills };
                                                    newSkills[category] = newSkills[category].filter((_, i) => i !== index);
                                                    updateSection('skills', newSkills);
                                                }} className="text-gray-400 hover:text-red-500 ml-1">×</button>
                                            </span>
                                        ))}
                                        <input
                                            type="text"
                                            className="bg-transparent outline-none text-sm min-w-[100px] mt-1"
                                            placeholder="Type & Enter..."
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && e.target.value.trim()) {
                                                    const newSkills = { ...resumeData.skills };
                                                    const current = newSkills[category] || [];
                                                    if (!current.includes(e.target.value.trim())) {
                                                        newSkills[category] = [...current, e.target.value.trim()];
                                                        updateSection('skills', newSkills);
                                                    }
                                                    e.target.value = '';
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </Section>

                    </div>
                </div>
            </div >

            {/* Right Panel - Preview */}
            < div className="w-1/2 bg-gray-100 p-8 overflow-y-auto flex items-start justify-center" >
                <div className="transform scale-[0.8] origin-top">
                    <ResumePreview />
                </div>
            </div >
        </div >
    );
}

const Section = ({ title, isOpen, onClick, children }) => (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300">
        <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors" onClick={onClick}>
            <h2 className="font-semibold text-gray-800">{title}</h2>
            {isOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
        </button>
        {isOpen && <div className="p-4 border-t border-gray-100 animate-slideDown">{children}</div>}
    </div>
);

const Input = ({ label, value, onChange }) => (
    <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
        <input
            type="text"
            className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
            value={value}
            onChange={onChange}
        />
    </div>
);
