
import React from 'react';
import { useResume } from '../context/ResumeContext';
import { MapPin, Mail, Phone, Globe, Linkedin, Github, ExternalLink } from 'lucide-react';

export default function ResumePreview({ isPreviewMode = false }) {
    const { resumeData } = useResume();
    const { personal, summary, experience, education, projects, skills } = resumeData;

    return (
        <div className={`bg-white shadow-2xl ${isPreviewMode ? 'w-[210mm] min-h-[297mm] mx-auto' : 'w-full min-h-[1000px]'} p-8 md:p-12 text-gray-800 font-sans`}>
            {/* Header */}
            <header className="border-b-2 border-gray-900 pb-6 mb-6">
                <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">{personal.fullName || 'Your Name'}</h1>
                <p className="text-xl text-gray-600 mb-4">{personal.title || 'Professional Title'}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {personal.location && <div className="flex items-center gap-1"><MapPin size={14} /> {personal.location}</div>}
                    {personal.email && <div className="flex items-center gap-1"><Mail size={14} /> {personal.email}</div>}
                    {personal.phone && <div className="flex items-center gap-1"><Phone size={14} /> {personal.phone}</div>}
                    {personal.website && <div className="flex items-center gap-1"><Globe size={14} /> {personal.website}</div>}
                    {personal.linkedin && <div className="flex items-center gap-1"><Linkedin size={14} /> {personal.linkedin}</div>}
                    {personal.github && <div className="flex items-center gap-1"><Github size={14} /> {personal.github}</div>}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">Professional Summary</h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Experience</h2>
                    <div className="space-y-6">
                        {experience.map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-lg">{exp.role}</h3>
                                    <span className="text-sm text-gray-500">{exp.date}</span>
                                </div>
                                <div className="text-brand-600 font-medium mb-2">{exp.company}</div>
                                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Projects</h2>
                    <div className="space-y-4">
                        {projects.map((proj) => (
                            <div key={proj.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold">{proj.name}</h3>
                                    {proj.link && (
                                        <a href={`https://${proj.link}`} target="_blank" rel="noreferrer" className="text-xs text-brand-600 flex items-center gap-1 hover:underline">
                                            {proj.link} <ExternalLink size={10} />
                                        </a>
                                    )}
                                </div>
                                <p className="text-gray-700 text-sm">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Education</h2>
                    <div className="space-y-4">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold">{edu.school}</h3>
                                    <span className="text-sm text-gray-500">{edu.date}</span>
                                </div>
                                <div className="text-gray-600">{edu.degree}</div>
                                {edu.description && <p className="text-gray-500 text-sm mt-1">{edu.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-md">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
