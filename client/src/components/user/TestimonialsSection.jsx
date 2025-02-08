// src/components/sections/TestimonialsSection.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "ServoLend has revolutionized our loan processing. We've cut processing time by 60% and improved customer satisfaction significantly.",
    author: "Sarah Johnson",
    position: "Head of Digital Lending",
    company: "FirstTech Bank",
    image: "/api/placeholder/64/64",
    rating: 5,
    companyLogo: "/api/placeholder/120/40"
  },
  {
    id: 2,
    content: "The automated assessment system is a game-changer. Our risk analysis is more accurate, and we can serve customers faster than ever.",
    author: "Michael Chen",
    position: "CTO",
    company: "Future Finance",
    image: "/api/placeholder/64/64",
    rating: 5,
    companyLogo: "/api/placeholder/120/40"
  },
  {
    id: 3,
    content: "Integration was seamless, and the customer support has been exceptional. ServoLend has transformed our lending operations completely.",
    author: "Priya Patel",
    position: "Operations Director",
    company: "Global Credit",
    image: "/api/placeholder/64/64",
    rating: 5,
    companyLogo: "/api/placeholder/120/40"
  }
];

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentTestimonial((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Leading Financial Institutions
          </h2>
          <p className="text-xl text-gray-600">
            See what our clients have to say about their experience
          </p>
        </motion.div>

        <div className="relative h-[500px] overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentTestimonial}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto">
                <div className="relative">
                  <Quote className="absolute -top-4 -left-4 h-16 w-16 text-blue-100 rotate-180" />
                  
                  <div className="relative z-10">
                    <div className="flex justify-center mb-8">
                      <img
                        src={testimonials[currentTestimonial].companyLogo}
                        alt={testimonials[currentTestimonial].company}
                        className="h-10 object-contain"
                      />
                    </div>

                    <p className="text-xl md:text-2xl text-gray-700 mb-8 text-center italic">
                      "{testimonials[currentTestimonial].content}"
                    </p>

                    <div className="flex items-center justify-center mb-6">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    <div className="flex items-center justify-center">
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].author}
                        className="w-16 h-16 rounded-full border-4 border-blue-100"
                      />
                      <div className="ml-4 text-left">
                        <div className="font-semibold text-lg text-gray-900">
                          {testimonials[currentTestimonial].author}
                        </div>
                        <div className="text-gray-600">
                          {testimonials[currentTestimonial].position}
                        </div>
                        <div className="text-blue-600">
                          {testimonials[currentTestimonial].company}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              onClick={() => paginate(-1)}
              className="bg-white/80 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg hover:bg-white transition-colors -ml-4"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              onClick={() => paginate(1)}
              className="bg-white/80 backdrop-blur-sm text-gray-800 p-3 rounded-full shadow-lg hover:bg-white transition-colors -mr-4"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentTestimonial ? 1 : -1);
                  setCurrentTestimonial(index);
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Partner Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <p className="text-center text-gray-600 mb-8">Trusted by leading financial institutions</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {[1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="grayscale hover:grayscale-0 transition-all"
              >
                <img
                  src={`/api/placeholder/160/80`}
                  alt={`Partner ${index}`}
                  className="max-h-12 w-auto"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;