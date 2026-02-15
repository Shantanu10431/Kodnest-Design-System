
import React from 'react';
import { useResume } from '../context/ResumeContext';
import { MapPin, Mail, Phone, Globe, Linkedin, Github, ExternalLink } from 'lucide-react';

export default function ResumePreview({ isPreviewMode = false }) {
    const { resumeData, template } = useResume();
    const { personal, summary, experience, education, projects, skills } = resumeData;

    // Template Styles Configuration
    const styles = {
        modern: {
            container: "font-sans text-gray-800",
            header: "border-b-2 border-gray-900 pb-6 mb-6",
            name: "text-4xl font-bold uppercase tracking-wider mb-2",
            title: "text-xl text-brand-600 mb-4",
            sectionTitle: "text-sm font-bold uppercase tracking-widest text-gray-400 mb-4",
            meta: "text-brand-600 font-medium mb-2"
        },
        classic: {
            container: "font-serif text-slate-900",
            header: "text-center border-b border-slate-300 pb-8 mb-8",
            name: "text-3xl font-bold mb-2",
            title: "text-lg italic text-slate-600 mb-4",
            sectionTitle: "text-lg font-bold border-b border-slate-300 pb-1 mb-4 text-slate-800",
            meta: "text-slate-700 font-bold mb-1"
        },
        minimal: {
            container: "font-sans text-slate-800 max-w-4xl mx-auto",
            header: "pb-6 mb-6", // No border
            name: "text-3xl font-light tracking-tight mb-1",
            title: "text-lg text-slate-500 mb-4",
            sectionTitle: "text-xs font-bold uppercase tracking-wider text-slate-400 mb-3",
            meta: "text-slate-900 font-semibold mb-1"
        }
    };

    const s = styles[template] || styles.modern;

    return (
        <div className={`bg-white shadow-2xl ${isPreviewMode ? 'w-[210mm] min-h-[297mm] mx-auto' : 'w-full min-h-[1000px]'} p-8 md:p-12 ${s.container}`}>
            {/* Header */}
            <header className={s.header}>
                <h1 className={s.name}>{personal.fullName || 'Your Name'}</h1>
                <p className={s.title}>{personal.title || 'Professional Title'}</p>

                <div className={`flex flex-wrap gap-4 text-sm text-gray-600 ${template === 'classic' ? 'justify-center' : ''}`}>
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
                <section className="mb-8 break-inside-avoid">
                    <h2 className={s.sectionTitle}>Professional Summary</h2>
                    <p className="leading-relaxed whitespace-pre-line">{summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section className="mb-8">
                    <h2 className={s.sectionTitle}>Experience</h2>
                    <div className="space-y-6">
                        {experience.map((exp) => (
                            <div key={exp.id} className="break-inside-avoid">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-lg">{exp.role}</h3>
                                    <span className="text-sm text-gray-500">{exp.date}</span>
                                </div>
                                <div className={s.meta}>{exp.company}</div>
                                <p className="text-sm leading-relaxed whitespace-pre-line">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section className="mb-8">
                    <h2 className={s.sectionTitle}>Projects</h2>
                    <div className="space-y-6">
                        {projects.map((proj) => (
                            <div key={proj.id} className="break-inside-avoid">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold">{proj.name}</h3>
                                    <div className="flex gap-3 text-xs">
                                        {proj.liveUrl && (
                                            <a href={`https://${proj.liveUrl}`} target="_blank" rel="noreferrer" className="text-brand-600 flex items-center gap-1 hover:underline">
                                                Live Demo <ExternalLink size={10} />
                                            </a>
                                        )}
                                        {proj.githubUrl && (
                                            <a href={`https://${proj.githubUrl}`} target="_blank" rel="noreferrer" className="text-gray-600 flex items-center gap-1 hover:underline">
                                                GitHub <Github size={10} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {(proj.techStack || []).map((tech, i) => (
                                        <span key={i} className="text-[10px] font-semibold bg-gray-100 px-2 py-0.5 rounded text-gray-700 uppercase tracking-wide">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-sm leading-relaxed">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="mb-8 break-inside-avoid">
                    <h2 className={s.sectionTitle}>Education</h2>
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
            {skills && (Object.keys(skills).length > 0 || Array.isArray(skills)) && (
                <section className="break-inside-avoid">
                    <h2 className={s.sectionTitle}>Skills</h2>

                    {Array.isArray(skills) ? (
                        /* Fallback for old data format */
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded border border-gray-200">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    ) : (
                        /* New Categorized Format */
                        <div className="grid grid-cols-1 gap-4">
                            {Object.entries(skills).map(([category, categorySkills]) => (
                                categorySkills.length > 0 && (
                                    <div key={category} className="flex flex-col sm:flex-row sm:gap-4">
                                        <span className="text-xs font-bold uppercase text-gray-500 w-32 shrink-0 py-1">
                                            {category === 'tools' ? 'Tools' : category}
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            {categorySkills.map((skill, index) => (
                                                <span key={index} className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded border border-gray-200">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    )}
                </section>
            )}
        </div>
    );
}
