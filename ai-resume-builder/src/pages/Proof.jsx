
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Copy } from 'lucide-react';

export default function Proof() {
    const [links, setLinks] = useState({
        lovable: '',
        github: '',
        deploy: ''
    });
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('ai-resume-proof');
        if (saved) setLinks(JSON.parse(saved));
    }, []);

    const handleChange = (field, value) => {
        const newLinks = { ...links, [field]: value };
        setLinks(newLinks);
        localStorage.setItem('ai-resume-proof', JSON.stringify(newLinks));
    };

    const isComplete = links.lovable && links.github && links.deploy;

    const handleCopy = () => {
        const text = `
------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deploy}

Features Implemented:
- Two-column Builder implementation
- Real-time Resume Context state
- Clean A4 Preview & Print
- Tailwind Premium Design System
------------------------------------------
    `;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 md:p-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/builder" className="text-gray-400 hover:text-gray-600 transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">Final Submission</h1>
                    <div className="w-6 h-6"></div>
                </div>

                <div className="space-y-6">
                    <button
                        onClick={() => setLinks({
                            lovable: 'https://lovable.dev/project/demo-resume',
                            github: 'https://github.com/username/demo-resume',
                            deploy: 'https://demo-resume.vercel.app'
                        })}
                        className="text-xs text-brand-600 hover:text-brand-800 hover:underline font-medium mb-2"
                    >
                        Fill with Demo Data
                    </button>
                    <Input
                        label="Lovable Project Link"
                        placeholder="https://lovable.dev/..."
                        value={links.lovable}
                        onChange={(e) => handleChange('lovable', e.target.value)}
                    />
                    <Input
                        label="GitHub Repository Link"
                        placeholder="https://github.com/..."
                        value={links.github}
                        onChange={(e) => handleChange('github', e.target.value)}
                    />
                    <Input
                        label="Deployed URL"
                        placeholder="https://vercel.app/..."
                        value={links.deploy}
                        onChange={(e) => handleChange('deploy', e.target.value)}
                    />
                </div>

                <div className="mt-10">
                    <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 transition-colors ${isComplete ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                        <CheckCircle size={20} className={isComplete ? 'text-green-600' : 'text-gray-300'} />
                        <span className="font-medium">
                            {isComplete ? "Ready for Submission" : "Complete all fields to submit"}
                        </span>
                    </div>

                    <button
                        onClick={handleCopy}
                        disabled={!isComplete}
                        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${isComplete
                            ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg hover:shadow-xl'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {copied ? <CheckCircle size={24} /> : <Copy size={24} />}
                        {copied ? "Copied to Clipboard!" : "Copy Final Submission"}
                    </button>
                </div>
            </div>
        </div>
    );
}

const Input = ({ label, placeholder, value, onChange }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
        <input
            type="url"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder-gray-400 text-gray-900"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </div>
);
