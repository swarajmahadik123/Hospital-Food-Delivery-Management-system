"use client";

import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { hero } from "../assets/assets.js";
import {
  ArrowRight,
  ChevronRight,
  Utensils,
  Users,
  ClipboardList,
  Truck,
  LayoutDashboard,
  Bell,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const floatingAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};
const handleGetStarted = () => {
  window.location.href = "/dashboard";
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#868CFF] to-[#4318FF] flex items-center justify-center">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#868CFF] to-[#4318FF] bg-clip-text text-transparent">
              MediFood
            </span>
          </div>
          <button
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-[#868CFF] to-[#4318FF] text-white rounded-xl px-4 py-2 text-sm sm:text-base"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 inline" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        className="min-h-screen flex items-center pt-16 px-4 sm:px-6 lg:px-8"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div className="space-y-6 sm:space-y-8" variants={fadeInUp}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Next-Gen Hospital
                <span className="bg-gradient-to-r from-[#868CFF] to-[#4318FF] bg-clip-text text-transparent">
                  {" "}
                  Food Service{" "}
                </span>
                Management
              </h1>
              <p className="text-lg sm:text-xl text-gray-600">
                Transform your hospital's food service with our AI-powered
                management system. Streamlined operations, enhanced patient
                care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetStarted}
                  className="h-12 px-6 bg-gradient-to-r from-[#868CFF] to-[#4318FF] text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 inline" />
                </button>
                <button className="h-12 px-6 rounded-xl border-2">
                  Watch Demo
                </button>
              </div>
            </motion.div>
            <motion.div className="relative mt-8 lg:mt-0" variants={fadeInUp}>
              <div className="absolute inset-0 " />
              <motion.img
                src={hero}
                alt="Hospital Food Management"
                className="relative rounded-[2rem] "
                animate={floatingAnimation}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16 space-y-4"
            variants={fadeInUp}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Comprehensive
              <span className="bg-gradient-to-r from-[#868CFF] to-[#4318FF] bg-clip-text text-transparent">
                {" "}
                Solutions{" "}
              </span>
              for Modern Healthcare
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage hospital food service efficiently
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={staggerContainer}
          >
            {[
              {
                title: "Patient Management",
                description:
                  "Comprehensive patient information management including dietary restrictions and allergies",
                icon: Users,
              },
              {
                title: "Diet Charts",
                description:
                  "Create and manage personalized meal plans and dietary instructions",
                icon: ClipboardList,
              },
              {
                title: "Pantry Management",
                description:
                  "Efficiently assign and track meal preparation tasks",
                icon: Utensils,
              },
              {
                title: "Delivery Tracking",
                description:
                  "Real-time monitoring of meal preparation and delivery status",
                icon: Truck,
              },
              {
                title: "Smart Dashboard",
                description: "Comprehensive analytics and management dashboard",
                icon: LayoutDashboard,
              },
              {
                title: "Alert System",
                description:
                  "Instant notifications for delivery delays and issues",
                icon: Bell,
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }} // Start hidden and slightly below
                whileInView={{ opacity: 1, y: 0 }} // Slide up and fade in
                viewport={{ once: true, amount: 0.5 }} // Trigger animation only once and when 50% of the card is visible
                transition={{ duration: 0.5, delay: index * 0.1 }} // Add a delay based on the card index
              >
                <div className="group relative overflow-hidden hover:shadow-xl transition-shadow duration-500 border-0 bg-white/50 backdrop-blur-sm rounded-lg h-full">
                  <div className="p-6">
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#868CFF] to-[#4318FF] flex items-center justify-center">
                        {React.createElement(service.icon, {
                          className: "w-6 h-6 text-white",
                        })}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-[#4318FF] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center text-[#4318FF] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium">Learn more</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
