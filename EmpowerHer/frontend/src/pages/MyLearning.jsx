import React from 'react';
import { Progress ,Button , Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/CustomUI";
import { Book, PlayCircle } from 'lucide-react';

const MyLearning = () => {
  const courses = [
    { id: 1, title: 'Digital Marketing Basics', progress: 60, totalLessons: 10, completedLessons: 6 },
    { id: 2, title: 'Financial Management for Small Businesses', progress: 30, totalLessons: 8, completedLessons: 2 },
    { id: 3, title: 'Product Photography Techniques', progress: 100, totalLessons: 5, completedLessons: 5 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Learning</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={course.progress} className="mb-2" />
              <p className="text-sm text-gray-600">
                {course.completedLessons} of {course.totalLessons} lessons completed
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline"><Book className="w-4 h-4 mr-2" /> Course Content</Button>
              <Button><PlayCircle className="w-4 h-4 mr-2" /> Continue Learning</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recommended Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>E-commerce Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Learn how to build and grow your online store</p>
            </CardContent>
            <CardFooter>
              <Button>Enroll Now</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Social Media Marketing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Master the art of social media to grow your business</p>
            </CardContent>
            <CardFooter>
              <Button>Enroll Now</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Business Networking Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Build valuable connections to expand your business</p>
            </CardContent>
            <CardFooter>
              <Button>Enroll Now</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyLearning;

