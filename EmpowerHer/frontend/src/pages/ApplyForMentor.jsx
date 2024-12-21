import React, { useState } from 'react';
import { Button } from "../components/CustomUI";
import { Input } from "../components/CustomUI";
import { Label } from "../components/CustomUI";
import { Textarea } from "../components/CustomUI";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/CustomUI";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/CustomUI";

const ApplyForMentor = () => {
  const [formData, setFormData] = useState({
    businessArea: '',
    challengeDescription: '',
    desiredOutcome: '',
    preferredMentorExpertise: '',
    availabilityTime: '',
    availabilityDay: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., API call to submit mentorship application)
    console.log('Mentorship application submitted:', formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Apply for Mentorship</h1>
      <Card>
        <CardHeader>
          <CardTitle>Mentorship Application</CardTitle>
          <CardDescription>Connect with an experienced mentor to help grow your business</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="businessArea">Business Area</Label>
              <Input
                id="businessArea"
                name="businessArea"
                value={formData.businessArea}
                onChange={handleChange}
                placeholder="e.g., E-commerce, Handicrafts, Food Products"
                required
              />
            </div>
            <div>
              <Label htmlFor="challengeDescription">Describe your current business challenge</Label>
              <Textarea
                id="challengeDescription"
                name="challengeDescription"
                value={formData.challengeDescription}
                onChange={handleChange}
                placeholder="What specific challenges are you facing in your business?"
                required
              />
            </div>
            <div>
              <Label htmlFor="desiredOutcome">What outcome do you hope to achieve through mentorship?</Label>
              <Textarea
                id="desiredOutcome"
                name="desiredOutcome"
                value={formData.desiredOutcome}
                onChange={handleChange}
                placeholder="Describe your goals and expectations from the mentorship"
                required
              />
            </div>
            <div>
              <Label htmlFor="preferredMentorExpertise">Preferred Mentor Expertise</Label>
              <Select
                name="preferredMentorExpertise"
                value={formData.preferredMentorExpertise}
                onValueChange={(value) => handleSelectChange('preferredMentorExpertise', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select area of expertise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="leadership">Leadership</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="availabilityTime">Preferred Mentorship Time</Label>
              <Select
                name="availabilityTime"
                value={formData.availabilityTime}
                onValueChange={(value) => handleSelectChange('availabilityTime', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="availabilityDay">Preferred Mentorship Day</Label>
              <Select
                name="availabilityDay"
                value={formData.availabilityDay}
                onValueChange={(value) => handleSelectChange('availabilityDay', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekday">Weekday</SelectItem>
                  <SelectItem value="weekend">Weekend</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Submit Application</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplyForMentor;

