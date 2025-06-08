import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white text-white mt-30 py-10 px-6 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h1 className="text-xl font-bold text-purple-600 mb-2">Build<span className="text-black">Estate</span></h1>
          <p className="text-sm text-slate-600">Turning dreams into homes.</p>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-lg text-purple-600 font-semibold mb-2">Services</h2>
          <ul className="space-y-1 text-slate-600 text-sm">
            <li>Email Services</li>
            <li>Campaigns</li>
            <li>Consulting</li>
            <li>Support</li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h2 className="text-lg font-semibold text-purple-600 mb-2">About</h2>
          <ul className="space-y-1 text-slate-600 text-sm">
            <li>Company</li>
            <li>Team</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h2 className="text-lg font-semibold text-purple-600 mb-2">Follow Us</h2>
          <ul className="space-y-1 text-slate-600 text-sm">
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
