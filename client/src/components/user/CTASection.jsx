// src/components/sections/CTASection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16"
    >
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Lending Process?
        </h2>
        <p className="text-xl mb-8 text-blue-100">
          Join thousands of satisfied customers who have modernized their lending operations
        </p>
        {!isAuthenticated && (
          <Link
            to="/login"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        )}
      </div>
    </motion.section>
  );
};

export default CTASection;