import React from "react";
import {
  FaHome,
  FaHandshake,
  FaWallet,
  FaUsers,
  FaTrophy,
} from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { useTheme } from "./../../hooks/useTheme";

export default function WhyChooseUs() {
  const { theme } = useTheme();
  const features = [
    {
      icon: <FaHome className="text-5xl text-pink-500 mb-4" />,
      title: "Wide Range Of Properties",
      desc: "Discover a diverse selection of properties tailored to your needs, offering exceptional value and quality in every listing.",
    },
    {
      icon: <FaHandshake className="text-5xl text-pink-500 mb-4" />,
      title: "Trusted by thousands",
      desc: "Thousands of satisfied clients rely on us for our commitment to quality, transparency, and exceptional service.",
    },
    {
      icon: <FaWallet className="text-5xl text-pink-500 mb-4" />,
      title: "Financing made easy",
      desc: "We simplify the financing process with flexible options and expert guidance, helping you secure the best deal with confidence.",
    },
  ];

  const stats = [
    {
      icon: <FaHome className="text-3xl text-pink-500" />,
      number: 300,
      label: "Sold Houses",
    },
    {
      icon: <MdLibraryBooks className="text-3xl text-pink-500" />,
      number: 400,
      label: "Daily Listings",
    },
    {
      icon: <FaUsers className="text-3xl text-pink-500" />,
      number: 250,
      label: "Expert Agents",
    },
    {
      icon: <FaTrophy className="text-3xl text-pink-500" />,
      number: 200,
      label: "Won Awards",
    },
  ];

  return (
    <section
      id="why-choose-us"
      className={` ${
        theme === "dark" ? "bg-gray-600 text-white" : "bg-gray-50"
      } py-16 px-6 md:px-20`}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h2
          className={`text-3xl font-bold  ${
            theme === "dark" ? " text-white" : "text-gray-900"
          }`}
        >
          WHY <span className="text-pink-500">CHOOSE US</span>
        </h2>
        <p
          className={`${
            theme === "dark" ? "text-white" : "text-gray-500"
          } mt-2`}
        >
          We provide full service at every step.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
        {features.map((item, idx) => (
          <div
            key={idx}
            className={`${
              theme === "dark" ? "bg-gray-400" : "bg-white"
            } p-8 rounded-lg shadow-sm hover:shadow-lg transition duration-300 flex flex-col items-center justify-center `}
          >
            <div className="">{item.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p
              className={`${
                theme == "dark" ? "text-white" : "text-gray-500"
              } text-sm leading-relaxed`}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div
        className="relative bg-cover bg-center rounded-lg py-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560185008-5a0b0b4eaa4d?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-white/80 rounded-lg"></div>

        <div className="relative grid grid-cols-2 md:grid-cols-4 text-center gap-6 z-10">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="flex flex-col items-center">
                {s.icon}
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {s.number}
                </p>
                <p className="text-gray-600 text-sm">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
