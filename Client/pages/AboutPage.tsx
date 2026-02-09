import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark dark:text-white mb-2">Why Choose Generic Hub?</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Your trusted source for affordable, high-quality generic medications.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img 
            src="assets/about.jpeg" 
            alt="Healthcare professional with a tablet" 
            className="rounded-lg shadow-md w-full h-auto object-cover"
          />
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-2">Significant Savings</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Generic medicines contain the same active ingredients as their brand-name counterparts but are available at a fraction of the cost. At Generic Hub, we pass these savings directly to you, making healthcare more accessible and affordable.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-2">Uncompromised Quality</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              All our medications are sourced from reputable manufacturers and are approved by regulatory authorities. We ensure that every product meets the highest standards of safety, quality, and efficacy.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-primary mb-2">Wide Selection & Convenience</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Browse our extensive catalog of generic medicines from the comfort of your home. With a user-friendly interface and detailed information, finding the right medication is simple and hassle-free.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
