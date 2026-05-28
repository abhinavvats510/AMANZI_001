import React from 'react';
import { Shield } from 'lucide-react';

export const CyberSecurityPage = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 bg-[#fbfbfb] flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-accent/10 text-accent rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-xl shadow-accent/10">
          <Shield className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 tracking-tight">Enterprise Cyber Security</h1>
        <p className="text-gray-500 text-lg mb-10 leading-relaxed">
          Next-generation protection for your digital assets. Our Cyber Security solutions ensure your infrastructure remains unbreachable and resilient.
        </p>
        <a href="#" className="bg-accent text-white px-8 py-3 rounded-full font-medium hover:bg-accent/90 hover:shadow-lg transition-all shadow-md">Back to Home</a>
      </div>
    </section>
  );
};
