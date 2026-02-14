
import React from 'react';
import { Link } from 'react-router-dom';
import ResumePreview from '../components/ResumePreview';
import { ArrowLeft, Printer } from 'lucide-react';

export default function Preview() {
    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
            {/* Controls - Hidden on Print */}
            <div className="w-[210mm] flex justify-between items-center mb-8 print:hidden">
                <Link to="/builder" className="flex items-center gap-2 text-gray-600 hover:text-brand-600 font-medium">
                    <ArrowLeft size={20} /> Back to Builder
                </Link>
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors shadow-lg"
                >
                    <Printer size={20} /> Print / Save PDF
                </button>
            </div>

            {/* A4 Resume Container */}
            <div className="print:shadow-none print:w-full print:m-0">
                <ResumePreview isPreviewMode={true} />
            </div>
        </div>
    );
}
