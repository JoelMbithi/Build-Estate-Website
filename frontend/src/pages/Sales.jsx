import React from 'react';
import { FaHome, FaChartLine, FaUsers, FaShieldAlt, FaSearch, FaHandshake, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sales = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Kenya's Premier Real Estate Platform</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Buy, sell, or rent properties with confidence using our trusted platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold  hover:border-white hover: border-2 hover:bg-transparent hover:text-white transition text-lg"
            >
              Get Started Free
            </Link>
            <Link 
              to="/demo" 
              className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition text-lg"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl font-bold text-blue-900">10,000+</h3>
              <p className="text-gray-600">Properties Listed</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-900">5,000+</h3>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-900">200+</h3>
              <p className="text-gray-600">Verified Agents</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-blue-900">98%</h3>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Build Estate?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-700 text-4xl mb-4">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Transactions</h3>
              <p className="text-gray-600">
                Our escrow service ensures safe money handling until all conditions are met.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-700 text-4xl mb-4">
                <FaSearch />
              </div>
              <h3 className="text-xl font-semibold mb-3">Advanced Search</h3>
              <p className="text-gray-600">
                Powerful filters help you find exactly what you're looking for.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-700 text-4xl mb-4">
                <FaHandshake />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Listings</h3>
              <p className="text-gray-600">
                Every property is vetted by our team to ensure accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing (for agents/brokers) */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing for Agents</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Basic</h3>
              <p className="text-4xl font-bold mb-6">KSh 2,500<span className="text-lg text-gray-500">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><FaHome className="mr-2 text-blue-700" /> 5 property listings</li>
                <li className="flex items-center"><FaChartLine className="mr-2 text-blue-700" /> Basic analytics</li>
                <li className="flex items-center"><FaUsers className="mr-2 text-blue-700" /> Client management</li>
              </ul>
              <Link 
                to="/register" 
                className="block text-center bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Get Started
              </Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-700 transform scale-105 z-10">
              <div className="bg-blue-700 text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4">Professional</h3>
              <p className="text-4xl font-bold mb-6">KSh 5,000<span className="text-lg text-gray-500">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><FaHome className="mr-2 text-blue-700" /> 20 property listings</li>
                <li className="flex items-center"><FaChartLine className="mr-2 text-blue-700" /> Advanced analytics</li>
                <li className="flex items-center"><FaUsers className="mr-2 text-blue-700" /> Premium client management</li>
                <li className="flex items-center"><FaShieldAlt className="mr-2 text-blue-700" /> Featured listings</li>
              </ul>
              <Link 
                to="/register" 
                className="block text-center bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Get Started
              </Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
              <p className="text-4xl font-bold mb-6">KSh 10,000<span className="text-lg text-gray-500">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><FaHome className="mr-2 text-blue-700" /> Unlimited listings</li>
                <li className="flex items-center"><FaChartLine className="mr-2 text-blue-700" /> Premium analytics</li>
                <li className="flex items-center"><FaUsers className="mr-2 text-blue-700" /> Team accounts</li>
                <li className="flex items-center"><FaShieldAlt className="mr-2 text-blue-700" /> Priority support</li>
              </ul>
              <Link 
                to="/register" 
                className="block text-center bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800  transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Real Estate Experience?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join thousands of satisfied clients and agents in Kenya's fastest growing real estate platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
            >
              Start Free Trial
            </Link>
            <div className="flex items-center justify-center">
              <FaPhoneAlt className="mr-2" />
              <span>Or call us: +254 700 123 456</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sales;