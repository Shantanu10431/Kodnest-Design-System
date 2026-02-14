
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import ResumePreview from '../components/ResumePreview';
import { ChevronDown, ChevronUp, Plus, Trash2, Wand2, Eye, Save } from 'lucide-react';

export default function Builder() {
    const { resumeData, updatePersonal, updateSection, loadSample } = useResume();
    const [activeSection, setActiveSection] = useState('personal');

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
                        <div className="flex justify-end">
                            <button onClick={loadSample} className="text-xs font-semibold text-brand-600 hover:text-brand-700 bg-brand-50 px-3 py-1 rounded-full">
                                Load Sample Data
                            </button>
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
                                    <textarea
                                        className="w-full h-24 p-3 border border-gray-200 rounded-lg text-sm resize-none"
                                        placeholder="Description..."
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
                                    <div className="grid grid-cols-2 gap-3 mb-3">
                                        <Input label="Project Name" value={proj.name} onChange={(e) => {
                                            const newProj = [...resumeData.projects];
                                            newProj[index].name = e.target.value;
                                            updateSection('projects', newProj);
                                        }} />
                                        <Input label="Link" value={proj.link} onChange={(e) => {
                                            const newProj = [...resumeData.projects];
                                            newProj[index].link = e.target.value;
                                            updateSection('projects', newProj);
                                        }} />
                                    </div>
                                    <textarea
                                        className="w-full h-24 p-3 border border-gray-200 rounded-lg text-sm resize-none"
                                        placeholder="Description..."
                                        value={proj.description}
                                        onChange={(e) => {
                                            const newProj = [...resumeData.projects];
                                            newProj[index].description = e.target.value;
                                            updateSection('projects', newProj);
                                        }}
                                    />
                                </div>
                            ))}
                            <button
                                onClick={() => updateSection('projects', [...resumeData.projects, { id: Date.now(), name: '', link: '', description: '' }])}
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
                            <p className="text-xs text-gray-500 mb-2">Comma separated skills</p>
                            <textarea
                                className="w-full h-24 p-3 border border-gray-200 rounded-lg text-sm resize-none"
                                placeholder="React, Node.js, Python..."
                                value={resumeData.skills.join(', ')}
                                onChange={(e) => updateSection('skills', e.target.value.split(',').map(s => s.trim()))}
                            />
                        </Section>

                    </div>
                </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="w-1/2 bg-gray-100 p-8 overflow-y-auto flex items-start justify-center">
                <div className="transform scale-[0.8] origin-top">
                    <ResumePreview />
                </div>
            </div>
        </div>
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
