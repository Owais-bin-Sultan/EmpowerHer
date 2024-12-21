import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ScheduleMentorship = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch mentors from API in a real application
    const fetchedMentors = [
      { id: 1, name: 'Ayesha Khan', expertise: 'Digital Marketing' },
      { id: 2, name: 'Imran Ahmed', expertise: 'Financial Planning' },
      { id: 3, name: 'Sadia Malik', expertise: 'E-commerce' },
      { id: 4, name: 'Tariq Hussain', expertise: 'Product Development' },
    ];
    setMentors(fetchedMentors);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the scheduling data to your backend
    console.log('Scheduling mentorship:', { selectedMentor, date, time });
    // Redirect to the mentorship dashboard or confirmation page
    navigate('/mentorship');
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Schedule a Mentorship Session</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="mentor" className="block text-sm font-medium text-gray-700">Select a Mentor</label>
              <select
                id="mentor"
                name="mentor"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                value={selectedMentor}
                onChange={(e) => setSelectedMentor(e.target.value)}
                required
              >
                <option value="">Choose a mentor</option>
                {mentors.map((mentor) => (
                  <option key={mentor.id} value={mentor.id}>
                    {mentor.name} - {mentor.expertise}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Schedule Session
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleMentorship;

