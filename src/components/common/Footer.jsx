import React, { useState } from "react";
import { Link } from "react-router";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { SiX } from "react-icons/si"; // X (Twitter) icon
import { toast } from "react-toastify";
import { useTheme } from "../../hooks/useTheme";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      // Simulate API call; replace with real endpoint if available
      await new Promise((res) => setTimeout(res, 800));
      toast.success("Subscribed successfully — check your inbox!");
      setEmail("");
    } catch (err) {
      toast.error("Subscription failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      className={`${
        theme === "dark"
          ? "bg-gray-900 text-gray-300"
          : "bg-[#1f2430] text-gray-300"
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 py-12 border-b border-gray-700">
        {/* Company Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.png" alt="HomeNest" className="h-12" />
          </div>
          <p className="text-sm mb-4 leading-relaxed">
            HomeNest helps people find their dream homes with verified listings,
            expert agents, and transparent support through every step of the
            buying or renting process.
          </p>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt aria-hidden="true" />
              <span>95 South Park Avenue, USA</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt aria-hidden="true" />
              <a href="tel:+456875369208" className="hover:underline">
                +456 875 369 208
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope aria-hidden="true" />
              <a href="mailto:support@homenest.com" className="hover:underline">
                support@homenest.com
              </a>
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 border-b-2 border-blue-500 inline-block pb-1">
            Navigation
          </h3>
          <ul className="text-sm space-y-2">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-properties" className="hover:underline">
                All Properties
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <a href="/#contact-us" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* X Feeds (static placeholders) */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 border-b-2 border-blue-500 inline-block pb-1">
            X Feeds
          </h3>
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="mb-4 text-sm">
              <p className="flex items-start gap-2">
                <SiX className="text-blue-500 mt-1" aria-hidden="true" />
                <span>
                  <strong>@Findhouses</strong> New listing alerts. Check out the
                  latest properties in your area.
                </span>
              </p>
              <p className="text-gray-400 mt-1">about {i + 2} days ago</p>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 border-b-2 border-blue-500 inline-block pb-1">
            Newsletters
          </h3>
          <p className="text-sm mb-4">
            Sign up for our newsletter to get market updates, tips, and featured
            listings delivered to your inbox.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex"
            aria-label="Subscribe to newsletter"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              className="w-full px-3 py-2 text-sm rounded-l-md bg-gray-200 text-black"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-r-md text-sm font-semibold disabled:opacity-60"
            >
              {loading ? "..." : "SUBSCRIBE"}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-4 text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} HomeNest — All Rights Reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0 text-gray-400">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-white"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-white"
          >
            <SiX />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-white"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}
