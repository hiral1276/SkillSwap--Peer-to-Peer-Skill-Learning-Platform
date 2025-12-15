import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/use-toast';
import { Edit, Star, Award, Sparkles, X } from 'lucide-react';
import { mockSkills } from '../mock';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [location, setLocation] = useState(user?.location || '');
  const [skillsToTeach, setSkillsToTeach] = useState(user?.skillsToTeach || []);
  const [skillsToLearn, setSkillsToLearn] = useState(user?.skillsToLearn || []);
  const [newSkillTeach, setNewSkillTeach] = useState('');
  const [newSkillLearn, setNewSkillLearn] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState(false);

  const handleSave = async () => {
    const result = await updateProfile({
      name,
      bio,
      location,
      skillsToTeach,
      skillsToLearn
    });
    
    if (result.success) {
      setIsEditing(false);
      toast({
        title: 'Profile Updated!',
        description: 'Your profile has been updated successfully.',
      });
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to update profile',
        variant: 'destructive',
      });
    }
  };

  const addSkillToTeach = () => {
    if (newSkillTeach && !skillsToTeach.includes(newSkillTeach)) {
      setSkillsToTeach([...skillsToTeach, newSkillTeach]);
      setNewSkillTeach('');
    }
  };

  const addSkillToLearn = () => {
    if (newSkillLearn && !skillsToLearn.includes(newSkillLearn)) {
      setSkillsToLearn([...skillsToLearn, newSkillLearn]);
      setNewSkillLearn('');
    }
  };

  const removeSkillToTeach = (skill) => {
    setSkillsToTeach(skillsToTeach.filter(s => s !== skill));
  };

  const removeSkillToLearn = (skill) => {
    setSkillsToLearn(skillsToLearn.filter(s => s !== skill));
  };

  const generateAISuggestions = () => {
    setAiSuggestions(true);
    toast({
      title: 'AI Suggestions Generated!',
      description: 'We\'ve analyzed your profile and added skill suggestions.',
    });
    
    // Simulate AI suggestions
    const suggestions = mockSkills.slice(0, 3);
    setBio(bio + ' I\'m passionate about continuous learning and sharing knowledge with others.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-4xl">{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
                      <p className="text-muted-foreground">{user?.email}</p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{user?.rating}</span>
                      <span className="text-sm text-muted-foreground">Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-blue-500" />
                      <span className="font-semibold">{user?.completedExchanges}</span>
                      <span className="text-sm text-muted-foreground">Exchanges</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Enhancement */}
          {isEditing && (
            <Card className="mb-8 border-2 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-6 w-6 text-purple-500 mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">AI Profile Enhancement</h3>
                      <p className="text-sm text-muted-foreground">
                        Let AI help improve your profile description and suggest relevant skills
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={generateAISuggestions}
                    className="bg-gradient-to-r from-purple-500 to-blue-600"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Enhance Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Profile Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City, State"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="font-semibold mb-2">Location</h3>
                    <p className="text-muted-foreground">{user?.location}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Bio</h3>
                    <p className="text-muted-foreground">{user?.bio}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Skills Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Skills to Teach */}
              <div>
                <h3 className="font-semibold mb-3">Skills I Can Teach</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {skillsToTeach.map((skill) => (
                    <Badge
                      key={skill}
                      className="text-sm bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 pr-1"
                    >
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => removeSkillToTeach(skill)}
                          className="ml-2 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <select
                      className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
                      value={newSkillTeach}
                      onChange={(e) => setNewSkillTeach(e.target.value)}
                    >
                      <option value="">Select a skill</option>
                      {mockSkills.map((skill) => (
                        <option key={skill} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </select>
                    <Button onClick={addSkillToTeach}>Add Skill</Button>
                  </div>
                )}
              </div>

              {/* Skills to Learn */}
              <div>
                <h3 className="font-semibold mb-3">Skills I Want to Learn</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {skillsToLearn.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="text-sm pr-1"
                    >
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => removeSkillToLearn(skill)}
                          className="ml-2 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <select
                      className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
                      value={newSkillLearn}
                      onChange={(e) => setNewSkillLearn(e.target.value)}
                    >
                      <option value="">Select a skill</option>
                      {mockSkills.map((skill) => (
                        <option key={skill} value={skill}>
                          {skill}
                        </option>
                      ))}
                    </select>
                    <Button onClick={addSkillToLearn}>Add Skill</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {isEditing && (
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-500 to-purple-600"
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
