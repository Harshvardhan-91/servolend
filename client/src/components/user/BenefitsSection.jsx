// src/components/sections/BenefitsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Building, Users, CheckCircle } from 'lucide-react';

const benefits = [
  {
    icon: Building,
    title: 'For Financial Institutions',
    features: [
      'Automated loan processing',
      'Reduced operational costs',
      'Enhanced risk management',
      'Regulatory compliance'
    ]
  },
  {
    icon: Users,
    title: 'For Borrowers',
    features: [
      'Quick loan approvals',
      'Transparent process',
      'Competitive rates',
      'Digital documentation'
    ]
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

const BenefitsSection = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Benefits for Everyone
          </h2>
          <p className="text-xl text-gray-600">
            Our platform delivers value to both lenders and borrowers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <benefit.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                {benefit.title}
              </h3>
              <ul className="space-y-4">
                {benefit.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default BenefitsSection;