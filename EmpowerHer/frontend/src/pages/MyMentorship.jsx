import React from 'react';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/CustomUI";
import { Calendar, Clock, Video } from 'lucide-react';

const MyMentorship = () => {
  const upcomingSessions = [
    { id: 1, mentor: 'Ayesha Khan', date: '2023-06-15', time: '14:00', topic: 'Digital Marketing Strategies' },
    { id: 2, mentor: 'Imran Ahmed', date: '2023-06-22', time: '10:00', topic: 'Financial Planning for Small Businesses' },
  ];

  const pastSessions = [
    { id: 3, mentor: 'Sadia Malik', date: '2023-05-30', time: '15:00', topic: 'Product Development and Innovation' },
    { id: 4, mentor: 'Tariq Hussain', date: '2023-05-23', time: '11:00', topic: 'Scaling Your E-commerce Business' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Mentorship</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Upcoming Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingSessions.map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <CardTitle>{session.topic}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Mentor: {session.mentor}</p>
                  <div className="flex items-center mt-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{session.time}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button><Video className="w-4 h-4 mr-2" /> Join Session</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Past Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastSessions.map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <CardTitle>{session.topic}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Mentor: {session.mentor}</p>
                  <div className="flex items-center mt-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{session.time}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">View Notes</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyMentorship;

