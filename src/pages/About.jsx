import React from "react";
import { useTheme } from "../hooks/useTheme";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const TeamMember = ({ member }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`p-6 rounded-lg shadow-md ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <img
        src={member.photo}
        alt={member.name}
        className="w-28 h-28 object-cover rounded-full mx-auto mb-4"
      />
      <h4 className="text-lg font-semibold text-center">{member.name}</h4>
      <p className="text-sm text-center text-pink-500 mb-3">{member.role}</p>
      <p className="text-sm text-center text-gray-500 mb-4">{member.bio}</p>
      <div className="flex justify-center gap-3 text-pink-600">
        {member.social?.facebook && (
          <a
            href={member.social.facebook}
            aria-label={`${member.name} Facebook`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
        )}
        {member.social?.instagram && (
          <a
            href={member.social.instagram}
            aria-label={`${member.name} Instagram`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        )}
        {member.social?.twitter && (
          <a
            href={member.social.twitter}
            aria-label={`${member.name} Twitter`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
        )}
        {member.social?.linkedin && (
          <a
            href={member.social.linkedin}
            aria-label={`${member.name} LinkedIn`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        )}
      </div>
    </div>
  );
};

export default function About() {
  const { theme } = useTheme();

  const team = [
    {
      name: "Aisha Khan",
      role: "Founder & CEO",
      photo: "https://i.pravatar.cc/150?img=32",
      bio: "Visionary founder focused on building delightful experiences for home seekers.",
      social: { linkedin: "#" },
    },
    {
      name: "Rohit Mehra",
      role: "Head of Product",
      photo: "https://i.pravatar.cc/150?img=12",
      bio: "Product lead driving listing quality and search relevance.",
      social: { twitter: "#" },
    },
    {
      name: "Sofia Perez",
      role: "Lead Designer",
      photo: "https://i.pravatar.cc/150?img=15",
      bio: "Designs intuitive experiences focused on accessibility and trust.",
      social: { instagram: "#" },
    },
    {
      name: "Miguel Santos",
      role: "Engineering Manager",
      photo: "https://i.pravatar.cc/150?img=18",
      bio: "Ensures reliable, performant systems and a great developer experience.",
      social: { facebook: "#" },
    },
  ];

  return (
    <main
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      } min-h-screen`}
    >
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold">
            About <span className="text-pink-500">HomeNest</span>
          </h1>
          <p className="text-gray-500 mt-4">
            HomeNest is a modern property marketplace built to help people find
            and manage properties with confidence. We combine curated listings,
            transparent pricing, and verified agents to make the property search
            fast and enjoyable.
          </p>
        </div>

        <div
          className={`rounded-lg p-6 mb-12 ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-50"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-500">
            Our mission is to make property discovery effortless. We focus on
            trust, speed, and great UX — so users can find homes they love.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <TeamMember key={m.name} member={m} />
            ))}
          </div>
        </div>

        <div
          className={`rounded-lg p-6 ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-50"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Why HomeNest</h2>
          <ul className="list-disc list-inside text-gray-500 space-y-2">
            <li>Verified listings and high-quality photos</li>
            <li>Integrated search and multi-field filters</li>
            <li>Role-based dashboard for property owners</li>
            <li>Mobile-first, accessible UI with dark mode</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
