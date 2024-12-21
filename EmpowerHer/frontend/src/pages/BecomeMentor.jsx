import React, { useState } from 'react';
import { Button, Input, Label, Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/CustomUI";

const BecomeMentor = () => {
  const [formData, setFormData] = useState({
    expertise: '',
    experience: '',
    motivation: '',
    availability: '',
    linkedinProfile: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Mentor application submitted:', formData);
    // You can integrate an API call here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Become a Mentor</h1>
      <Card>
        <CardHeader>
          <CardTitle>Mentor Application</CardTitle>
          <CardDescription>Share your expertise and help other entrepreneurs grow</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="expertise">Area of Expertise</Label>
              <Input
                id="expertise"
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                placeholder="e.g., Digital Marketing, Financial Planning"
                required
              />
            </div>
            <div>
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div>
              <Label htmlFor="motivation">Why do you want to be a mentor?</Label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleChange}
                placeholder="Share your motivation for becoming a mentor"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <Label htmlFor="availability">Availability (hours per week)</Label>
              <Input
                id="availability"
                name="availability"
                type="number"
                value={formData.availability}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div>
              <Label htmlFor="linkedinProfile">LinkedIn Profile URL</Label>
              <Input
                id="linkedinProfile"
                name="linkedinProfile"
                type="url"
                value={formData.linkedinProfile}
                onChange={handleChange}
                placeholder="https://www.linkedin.com/in/yourprofile"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Submit Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BecomeMentor;
