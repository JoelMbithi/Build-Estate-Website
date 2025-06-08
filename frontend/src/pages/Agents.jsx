  import React, { useEffect, useState } from "react";
  import { faStar } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import newRequest from "../utils/newRequest";
  import ContactAgent from "../components/ContactAgent";
  import Testimonials from "../components/agent/Testimonials"
  import { useParams } from 'react-router-dom';

  const Agents = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleAgents, setVisibleAgents] = useState(3);
    const [popUp,setPopUp] = useState(false)
    const [selectedAgentId, setSelectedAgentId] = useState(null);
    const [isOpen,setIsOpen] = useState(false)
  const [reviews,setReviews] = useState([])
  const { id } = useParams();

    const handleOpen = () => {
      setIsOpen(true)
    }
    const toggleVisibleAgents = () => {
      setVisibleAgents((prev) => (prev === 3 ? agents.length : 3));
    };
    
    const handleClick = (id) => {
      console.log("Clicked agent ID:", id);
      setSelectedAgentId(id); // store clicked agent's ID
      setPopUp(true);         // show popup
    };

    /* console.log("Selected agent ID:", selectedAgentId);
    console.log("Agents array:", agents); */
    
    /* reviews */

    const fetchReviews = async () => {
      try {
        const res = await newRequest.get("/Testimonials/reviews");
        console.log("Response data:", res.data); // Log the data
        setReviews(res.data.data);
      } catch (error) {
        console.log("Error fetching user reviews:", error);
      }
    };
    
    useEffect(() => {
      fetchReviews();
    }, []);
    
    useEffect(() => {
      console.log("Reviews state:", reviews); // Log after state has been updated
    }, [reviews]);
    
   
    
    
    

    const fetchAgents = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await newRequest.get("/agent/allAgents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data.data);
        setAgents(res.data.data);
      } catch (error) {
        console.error("Error fetching agents:", error);
        setError("Failed to load agents. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchAgents();
      
    }, []);

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center h-screen text-red-500">
          {error}
        </div>
      );
    }

  return (
    <div className="bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-20 px-4 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80')] bg-cover bg-center bg-blend-overlay">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 items-center">
            Meet Our Expert Real Estate Agents
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Dedicated professionals helping you find your dream home in Your
            City/Region.
          </p>
          <a
            href="#agents"
            className="bg-white text-blue-800 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition duration-300 inline-block"
          >
            Find Your Perfect Agent
          </a>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {" "}
            <span className="text-5xl font-bold">|</span> Why Choose Our Agents?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-50">
              <div className="text-blue-600 text-3xl mb-4">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <h3 className="font-bold text-xl mb-2">Local Market Experts</h3>
              <p>
                In-depth knowledge of Your City neighborhoods and pricing
                trends.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50">
              <div className="text-blue-600 text-3xl mb-4">
                <i className="fas fa-star"></i>
              </div>
              <h3 className="font-bold text-xl mb-2">100+ 5-Star Reviews</h3>
              <p>Consistently rated excellent by our satisfied clients.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50">
              <div className="text-blue-600 text-3xl mb-4">
                <i className="fas fa-bolt"></i>
              </div>
              <h3 className="font-bold text-xl mb-2">Fast Transactions</h3>
              <p>Average sale time 20% faster than market average.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50">
              <div className="text-blue-600 text-3xl mb-4">
                <i className="fas fa-home"></i>
              </div>
              <h3 className="font-bold text-xl mb-2">Specialized Expertise</h3>
              <p>Luxury homes, first-time buyers, investment properties.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search/Filter Bar */}
      <section className="py-8 px-4 bg-gray-100" id="agents">
        <div className="container mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-xl mb-4">Find Your Ideal Agent</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <select className="w-full p-2 border rounded">
                  <option>All Areas</option>
                  <option>Downtown</option>
                  <option>Suburbs</option>
                  <option>Waterfront</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Property Type
                </label>
                <select className="w-full p-2 border rounded">
                  <option>All Types</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Luxury</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Experience
                </label>
                <select className="w-full p-2 border rounded">
                  <option>Any Experience</option>
                  <option>5+ Years</option>
                  <option>10+ Years</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800 transition">
                  Search Agents
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Profiles */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Trusted Agents
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.length > 0 ? (
             agents.slice(0, visibleAgents).map((agent) => (
                <div
                  key={agent._id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                >
                  <div className="relative">
                    <div className="w-full h-64 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                      <img
                        src={
                          agent.image ||
                          "https://randomuser.me/api/portraits/men/41.jpg"
                        }
                        alt={agent.name}
                        className="object-scale-down h-full hover:scale-110 transition-transform"
                      />
                    </div>

                    <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
                      Top {agent.position || "Agent"}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{agent.name}</h3>
                    <p className="text-blue-600 font-medium">
                      {" "}
                      Real Estate {agent.position || "Consultant"}
                    </p>
                    <div className="flex items-center my-2">
                      <span className="text-sm text-gray-600 ml-2">
                        {agent.rating || 4.7} ({agent.reviews || 28} reviews)
                      </span>
                    </div>
                    <div className="flex text-yellow-400">
  {[...Array(5)].map((_, i) => (
    <FontAwesomeIcon
      key={`${agent._id}-star-${i}`}
      icon={faStar}
      className={`mr-1 ${i < Math.floor(agent.rating || 4) ? "" : "opacity-30"}`}
    />
  ))}
</div>
                    <p className="text-gray-600 my-3  line-clamp-3">
                      {agent.description ||
                        "Specializing in luxury waterfront properties with 12+ years of experience."}
                    </p>
                    <div className="flex flex-wrap gap-2 my-4">
                      {Array.isArray(agent.specialties) ? (
                        agent.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 px-2 py-1 rounded text-sm"
                          >
                            {specialty.trim()}
                          </span>
                        ))
                      ) : typeof agent.specialties === "string" ? (
                        agent.specialties.split(",").map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 px-2 py-1 rounded text-sm"
                          >
                            {specialty.trim()}
                          </span>
                        ))
                      ) : (
                        <>
                          <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                            Luxury Homes
                          </span>
                          <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                            Condos
                          </span>
                          <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                            First-Time Buyers
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex space-x-3 mt-4">
                      <button
                        onClick={() => handleClick(agent.id)} 
                        className="bg-blue-700 text-white px-4 py-2 rounded flex-1 text-center hover:bg-blue-800 transition"
                      >
                        Contact {agent.name.split(" ")[0]}
                      </button>

                      {/* show popup to rcontact agents */}
          
                      {popUp && selectedAgentId === agent.id && (
    <ContactAgent 
      agent={agent}
      onClose={() => {
        setPopUp(false);
        setSelectedAgentId(null); // Clear the selected agent
      }}
    />
  )}

                      <a
                        href="#"
                        className="border border-blue-700 text-blue-700 px-4 py-2 rounded flex-1 text-center hover:bg-blue-50 transition"
                      >
                        View Listings
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">
                  No agents found. Please check back later.
                </p>
              </div>
            )}
          </div>
          {/* Display more agents */}
          {agents.length > 3 && (
  <div className="text-center mt-12">
    <button
      onClick={toggleVisibleAgents}
      className="border-2 border-blue-700 text-blue-700 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition inline-block"
    >
      {visibleAgents === 3 ? "Show More" : "Show Less"}
    </button>
  </div>
)}
        </div>
      </section>

 {/* Testimonials */}

 <section className="py-16 px-4 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews && reviews.length > 0 ? (
            reviews.slice(0, visibleAgents).map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow mb-4">
                <div className="flex items-center mb-4">
                  <img
                    src={review.image || "https://randomuser.me/api/portraits/men/41.jpg"}
                    alt="Client"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{review.name || "Anonymous"}</h4>
                    <div className="flex text-yellow-400 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "{review.review || 'Great experience!'}"
                </p>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}

          
        </div>
        {reviews.length > 3 && (
            <div className="text-center mt-12">
              <button
                onClick={toggleVisibleAgents}
                className="border-2 border-blue-700 text-blue-700 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition inline-block"
              >
                {visibleAgents === 3 ? "Show More" : "Show Less"}
              </button>
            </div>
          )}
      </div>
    </section>
      
      {/* Stats */}
      <section className="py-16 px-4 bg-blue-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Agents Deliver Results</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p>Homes Sold in 2023</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <p>Client Satisfaction Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$1.2B</div>
              <p>Total Sales Volume</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15</div>
              <p>Years Average Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8">Let's connect you with the perfect agent for your needs.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#" className="bg-blue-700 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-800 transition">Match Me with an Agent</a>
            <button className="border-2 border-blue-700 text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition"
            onClick={handleOpen}
            >Tell Us What You Think</button>
          </div>

    {/* Popup Modal */}
    {isOpen && (
     < Testimonials 
     onClose={() => setIsOpen(false)}
     />
    )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12"><span className="text-4xl font-bold">F</span>requently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2">How do I choose the right agent?</h3>
              <p className="text-gray-600">Our agents specialize in different property types and neighborhoods. Use our filters or contact us for a personalized recommendation based on your needs.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2">What areas do your agents cover?</h3>
              <p className="text-gray-600">We serve all of <span className="text- font-bold text-slate-700 ">Your City</span> and surrounding regions. Each agent profile lists their specific service areas.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2">Do your agents handle rentals?</h3>
              <p className="text-gray-600">Yes! Several agents specialize in rental properties. Filter by "Rentals" or ask our team for assistance.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Agents;
