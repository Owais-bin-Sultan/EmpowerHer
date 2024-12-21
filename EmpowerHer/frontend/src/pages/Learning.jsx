import React from 'react';
import { Link } from 'react-router-dom';

export default function Learning() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Learning Resources</h1>
      
      <div className="mb-12 text-center">
        <p className="text-xl mb-6">Enhance your skills and grow your business with our curated courses and workshops.</p>
        <Link to="/learning/my-courses">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors">
            My Courses
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CourseCard 
          title="Digital Marketing Basics"
          description="Learn how to promote your business online and reach more customers."
          image="/images/digital-marketing.jpg"
          duration="4 weeks"
          level="Beginner"
        />
        <CourseCard 
          title="Financial Management for Small Businesses"
          description="Understand the basics of managing finances for your growing business."
          image="/images/financial-management.jpg"
          duration="6 weeks"
          level="Intermediate"
        />
        <CourseCard 
          title="Product Photography"
          description="Learn how to take stunning photos of your products to boost sales."
          image="/images/product-photography.jpg"
          duration="3 weeks"
          level="Beginner"
        />
        <CourseCard 
          title="E-commerce Strategies"
          description="Discover effective strategies to sell your products online."
          image="/images/ecommerce.jpg"
          duration="5 weeks"
          level="Intermediate"
        />
        <CourseCard 
          title="Networking and Communication Skills"
          description="Improve your networking and communication skills to grow your business."
          image="/images/networking.jpg"
          duration="4 weeks"
          level="All Levels"
        />
        <CourseCard 
          title="Sustainable Business Practices"
          description="Learn how to implement sustainable practices in your business operations."
          image="/images/sustainable-business.jpg"
          duration="4 weeks"
          level="Intermediate"
        />
      </div>
    </div>
  );
}

function CourseCard({ title, description, image, duration, level }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{duration}</span>
          <span>{level}</span>
        </div>
        <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md font-semibold hover:bg-purple-700 transition-colors">
          Enroll Now
        </button>
      </div>
    </div>
  );
}
