import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { SiX } from "react-icons/si"; // X (Twitter) icon

export default function Footer() {
  return (
    <footer className="bg-[#1f2430] text-gray-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 py-12 border-b border-gray-700">
        {/* Company Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-white text-xl font-semibold">HomeNest</h2>
          </div>
          <p className="text-sm mb-4 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
            incidunt architecto soluta laboriosam aspernatur officiis esse.
          </p>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> 95 South Park Avenue, USA
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> +456 875 369 208
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> support@homenest.com
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 border-b-2 border-blue-500 inline-block pb-1">
            Navigation
          </h3>
          <ul className="text-sm space-y-2">
            
            <li>Home </li>
            <li>All Properties</li>
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Twitter (X) Feeds */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 border-b-2 border-blue-500 inline-block pb-1">
            X Feeds
          </h3>
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="mb-4 text-sm">
              <p className="flex items-start gap-2">
                <SiX className="text-blue-500 mt-1" />
                <span>
                  <strong>@Findhouses</strong> All share them with me baby said
                  inspet.
                </span>
              </p>
              <p className="text-gray-400 mt-1">about 5 days ago</p>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4 border-b-2 border-blue-500 inline-block pb-1">
            Newsletters
          </h3>
          <p className="text-sm mb-4">
            Sign up for our newsletter to get the latest updates and offers.
            Subscribe to receive news in your inbox.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full px-3 py-2 text-sm text-black rounded-l-md bg-gray-200"
            />
            <button className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-r-md text-sm font-semibold">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-4 text-gray-400 text-sm">
        <p>© 2025 Copyright - All Rights Reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0 text-gray-400">
          <a href="#" className="hover:text-white">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-white">
            <SiX />
          </a>
          <a href="#" className="hover:text-white">
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}
