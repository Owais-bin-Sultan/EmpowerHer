import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EnrollCourse = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch courses from API in a real application
    const fetchedCourses = [
      { id: 1, title: 'Digital Marketing Basics', duration: '4 weeks' },
      { id: 2, title: 'Financial Management for Small Businesses', duration: '6 weeks' },
      { id: 3, title: 'Product Photography', duration: '3 weeks' },
      { id: 4, title: 'E-commerce Strategies', duration: '5 weeks' },
    ];
    setCourses(fetchedCourses);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the enrollment data to your backend
    console.log('Enrolling in course:', selectedCourse);
    // Redirect to the learning dashboard or course page
    navigate('/learning');
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Enroll in a Course</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700">Select a Course</label>
              <select
                id="course"
                name="course"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                required
              >
                <option value="">Choose a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title} - {course.duration}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Enroll Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnrollCourse;

