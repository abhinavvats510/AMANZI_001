import React from 'react';
import { Target } from 'lucide-react';

export const AssessmentToolPage = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 bg-[#fbfbfb] flex items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 tracking-tight">Online Assessment Tool</h1>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            Streamline your examination process with our secure and intelligent Online Assessment Tool. Designed for schools, universities, coaching institutes, and enterprises, the platform enables seamless exam creation, scheduling, proctoring, and result evaluation — all in one place.
          </p>
          <img 
            src="/assets/images/online-assessment.png" 
            alt="Online Assessment Dashboard" 
            className="w-full aspect-video object-cover object-top rounded-2xl shadow-2xl mb-12"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 text-left">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Key Features</h3>
            <ul className="space-y-3">
              {[
                'Easy exam creation with multiple question formats',
                'Secure online proctoring and anti-cheating mechanisms',
                'Real-time performance tracking and analytics',
                'Automated evaluation and instant result generation',
                'Scalable platform for small to large-scale examinations',
                'User-friendly interface for administrators, teachers, and students'
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Why Choose Our Platform?</h3>
            <p className="text-gray-600 leading-relaxed mb-8">
              Our Online Assessment Tool ensures accuracy, transparency, and efficiency while reducing manual effort and operational costs. Whether conducting recruitment tests, academic exams, certification assessments, or skill evaluations, the platform delivers a reliable and seamless digital examination experience.
            </p>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Ideal For</h3>
            <div className="flex flex-wrap gap-2">
              {['Educational Institutions', 'Competitive Exam Providers', 'Corporate Training', 'Certification Bodies', 'Coaching & E-learning'].map((tag, idx) => (
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
