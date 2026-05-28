import React from 'react';
import { Users } from 'lucide-react';

export const ATSPage = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 bg-[#fbfbfb] flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 tracking-tight">Amanzi ATS</h1>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            Transform your hiring process with Amanzi ATS — a smart and efficient Applicant Tracking System designed to simplify recruitment from sourcing to onboarding. Built for modern businesses, Amanzi ATS helps HR teams streamline candidate management, improve hiring decisions, and accelerate recruitment cycles.
          </p>
          <img 
            src="/assets/images/amanzi-ats.png" 
            alt="Amanzi ATS Dashboard" 
            className="w-full aspect-video object-cover object-top rounded-2xl shadow-2xl mb-12"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 text-left">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Key Features</h3>
            <ul className="space-y-3">
              {[
                'Centralized candidate and resume management',
                'AI-powered resume screening and shortlisting',
                'Job posting across multiple platforms',
                'Interview scheduling and workflow automation',
                'Real-time recruitment analytics and reporting',
                'Seamless collaboration between recruiters and hiring managers',
                'Secure and scalable cloud-based platform'
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Why Amanzi ATS?</h3>
            <p className="text-gray-600 leading-relaxed mb-8">
              Amanzi ATS enables organizations to hire faster, reduce manual effort, and deliver a better candidate experience. With intelligent automation and a user-friendly interface, businesses can efficiently manage high-volume hiring while ensuring transparency and compliance throughout the recruitment process.
            </p>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Ideal For</h3>
            <div className="flex flex-wrap gap-2">
              {['Enterprises & Corporates', 'Staffing Firms', 'Startups', 'IT Companies', 'Educational Institutions'].map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
