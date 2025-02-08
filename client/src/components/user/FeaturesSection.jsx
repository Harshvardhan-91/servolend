// src/components/sections/FeaturesSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Shield, Clock, LineChart } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Quick Decisions',
    description: 'Get loan decisions faster with our automated assessment system'
  },
  {
    icon: Shield,
    title: 'Secure & Compliant',
    description: 'Bank-grade security with full regulatory compliance'
  },
  {
    icon: LineChart,
    title: 'Smart Analytics',
    description: 'AI-powered risk assessment and fraud detection'
  },
  {
    icon: Rocket,
    title: 'Digital First',
    description: 'Fully digital application and document verification process'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const FeaturesSection = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Streamlined Loan Processing
          </h2>
          <p className="text-xl text-gray-600">
            Experience the future of lending with our comprehensive digital platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;