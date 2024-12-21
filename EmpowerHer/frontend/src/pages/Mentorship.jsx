import React from 'react';
import { Link } from 'react-router-dom';

export default function Mentorship() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Mentorship Program</h1>
      
      <div className="mb-12 text-center">
        <p className="text-xl mb-6">Connect with experienced mentors who can guide you on your entrepreneurial journey.</p>
        <Link to="/mentorship/apply">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors">
            Apply for Mentorship
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <MentorCard 
          name="Ayesha Khan"
          expertise="Digital Marketing"
          image="/images/mentor-ayesha.jpg"
          bio="With over 10 years of experience in digital marketing, Ayesha has helped numerous small businesses establish their online presence."
        />
        <MentorCard 
          name="Imran Ahmed"
          expertise="Financial Planning"
          image="/images/mentor-imran.jpg"
          bio="Imran is a certified financial planner with expertise in helping small businesses manage their finances and plan for growth."
        />
        <MentorCard 
          name="Sadia Malik"
          expertise="E-commerce"
          image="/images/mentor-sadia.jpg"
          bio="Sadia has successfully launched and scaled multiple e-commerce businesses and loves sharing her knowledge with aspiring entrepreneurs."
        />
        <MentorCard 
          name="Tariq Hussain"
          expertise="Product Development"
          image="/images/mentor-tariq.jpg"
          bio="With a background in engineering and design, Tariq helps entrepreneurs refine their product ideas and bring them to market."
        />
        <MentorCard 
          name="Nadia Chaudhry"
          expertise="Business Strategy"
          image="/images/mentor-nadia.jpg"
          bio="Nadia is a business consultant who specializes in helping small businesses develop effective growth strategies."
        />
        <MentorCard 
          name="Rashid Ali"
          expertise="Legal & Compliance"
          image="/images/mentor-rashid.jpg"
          bio="As a business lawyer, Rashid guides entrepreneurs through the legal aspects of starting and running a business in Pakistan."
        />
      </div>

      <div className="mt-12 text-center">
        <Link to="/mentorship/become-mentor">
          <button className="text-purple-600 font-semibold hover:underline">
            Interested in becoming a mentor? Learn more
          </button>
        </Link>
      </div>
    </div>
  );
}

function MentorCard({ name, expertise, image, bio }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={name} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-purple-600 mb-2">{expertise}</p>
        <p className="text-gray-600 text-sm mb-4">{bio}</p>
        <button className="w-full bg-purple-600 text-white py-2 rounded-md font-semibold hover:bg-purple-700 transition-colors">
          Request Mentorship
        </button>
      </div>
    </div>
  );
}
