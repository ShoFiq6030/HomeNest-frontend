import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

/**
 * Helper component for individual contact info items
 */
const ContactInfoItem = ({ Icon, text }) => (
  <li className="flex items-center gap-4">
    <Icon className="w-5 h-5 text-white flex-shrink-0" />
    <span className="text-white text-sm">{text}</span>
  </li>
);

/**
 * Helper component for form inputs
 */
const FormInput = ({ type = "text", placeholder, isTextArea = false }) => {
  const commonClasses =
    "w-full p-4 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all";

  if (isTextArea) {
    return (
      <textarea
        placeholder={placeholder}
        rows="5"
        className={commonClasses}
      ></textarea>
    );
  }

  return (
    <input type={type} placeholder={placeholder} className={commonClasses} />
  );
};

/**
 * Main Contact Section Component
 */
export default function ContactSection() {
  // Replace with your actual image URLs
  const sectionBgUrl =
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=70&w=1080"; 
  const cardBgUrl =
    "https://images.unsplash.com/photo-1580489944761-15a1906941b2?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Support agent

  return (
    <section
      className="relative py-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${sectionBgUrl})` }}
    >
      {/* Overlay for the whole section (darken and blur) */}
      <div className="absolute inset-0 bg-black/40 "></div>

      <div className="relative container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* === Left Column: Form === */}
        <div className="text-white">
          <h2 className="text-3xl font-bold uppercase mb-2">
            Ready to get started?
          </h2>
          <div className="w-20 h-1 bg-white mb-8"></div> 
          <form className="flex flex-col gap-5">
            <FormInput placeholder="Your Name" />
            <FormInput type="tel" placeholder="Phone Number" />
            <FormInput type="email" placeholder="Your Email" />
            <FormInput placeholder="Your Message" isTextArea={true} />

            <button
              type="submit"
              className="bg-pink-600 text-white font-semibold py-3 px-8 rounded-md hover:bg-pink-700 transition-colors w-fit"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* === Right Column: Contact Card === */}
        <div
          className="relative bg-cover bg-center rounded-lg shadow-lg overflow-hidden"
          
        >
          {/* Card Overlay (darker than the main section) */}
          <div className="absolute inset-0 bg-gray-900/60 "></div>

          {/* Card Content */}
          <div className="relative z-10 p-8 text-white">
            <h3 className="text-2xl font-bold uppercase mb-2">
              Contact Details
            </h3>
            <div className="w-16 h-0.5 bg-white mb-6"></div> {/* Underline */}
            <p className="mb-8 text-gray-200 text-sm">
              Please find below contact details and contact us today!
            </p>
            <ul className="flex flex-col gap-5">
              <ContactInfoItem
                Icon={FaMapMarkerAlt}
                text="95 South Park Ave, USA"
              />
              <ContactInfoItem Icon={FaPhoneAlt} text="+456 875 369 208" />
              <ContactInfoItem
                Icon={FaEnvelope}
                text="support@homenest.com"
              />
              <ContactInfoItem Icon={FaClock} text="8:00 a.m - 9:00 p.m" />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
