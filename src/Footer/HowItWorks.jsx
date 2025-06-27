import React, { useEffect, useState } from 'react';
import { Search, CreditCard, Download, PlayCircle } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Browse & Select',
    description: 'Explore our premium collection of Valorant and BGMI accounts with detailed stats and previews',
    color: 'from-red-500 to-orange-500'
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    description: 'Complete your purchase using our encrypted payment system with multiple secure options',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Download,
    title: 'Instant Delivery',
    description: 'Receive your account credentials immediately via email with full login instructions',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: PlayCircle,
    title: 'Start Gaming',
    description: 'Log in and start dominating with your new premium account loaded with exclusive content',
    color: 'from-green-500 to-emerald-500'
  }
];

const HowItWorks = () => {
  const [visibleSteps, setVisibleSteps] = useState([false, false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-step') || '0');
            setTimeout(() => {
              setVisibleSteps(prev => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }, index * 300);
          }
        });
      },
      { threshold: 0.3 }
    );

    const stepElements = document.querySelectorAll('[data-step]');
    stepElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0z' fill='none'/%3E%3Cpath d='M0 0h100M0 25h100M0 50h100M0 75h100M0 100h100M0 0v100M25 0v100M50 0v100M75 0v100M100 0v100' stroke='%23ffffff' stroke-width='0.5' stroke-opacity='0.1'/%3E%3C/svg%3E')] opacity-30"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            HOW IT WORKS
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get your premium gaming account in 4 simple steps. No complicated processes, just pure gaming excellence.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent transform -translate-x-1/2"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={index}
                data-step={index}
                className={`relative flex items-center mb-20 ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } ${visibleSteps[index] ? 'animate-fade-in-up' : 'opacity-0'}`}
              >
                {/* Content */}
                <div className={`lg:w-5/12 ${isEven ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:text-left'}`}>
                  <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 group hover:scale-105">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors duration-300 text-white">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-gray-900 z-10">
                  <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping"></div>
                </div>

                {/* Step Number */}
                <div className={`lg:w-5/12 flex ${isEven ? 'lg:justify-start lg:pl-12' : 'lg:justify-end lg:pr-12'}`}>
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center font-black text-2xl text-white shadow-lg hover:scale-110 transition-transform duration-300`}>
                    {index + 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;