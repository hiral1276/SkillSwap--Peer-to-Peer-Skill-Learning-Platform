import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Search, MessageSquare, Star, Sparkles } from 'lucide-react';
import { mockUsers, mockSkills } from '../mock';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [matches, setMatches] = useState(mockUsers);

  const handleSearch = () => {
    let filtered = mockUsers;
    
    if (searchQuery) {
      filtered = filtered.filter(u => 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.skillsToTeach.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedSkill) {
      filtered = filtered.filter(u => 
        u.skillsToTeach.includes(selectedSkill)
      );
    }
    
    setMatches(filtered);
  };

  const getAIRecommendation = () => {
    return mockUsers.slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Find your next skill exchange partner</p>
        </div>

        {/* AI Recommendations */}
        <Card className="mb-8 border-2 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              AI-Powered Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Based on your skills and learning goals, here are your best matches:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {getAIRecommendation().map((match) => (
                <Card key={match.id} className="hover:shadow-lg transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={match.avatar} alt={match.name} />
                        <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold">{match.name}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{match.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-semibold">Can teach:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {match.skillsToTeach.slice(0, 2).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-3"
                      onClick={() => navigate('/messages')}
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Skill Exchange Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search by name or skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <select
                className="px-4 py-2 rounded-md border border-input bg-background"
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
              >
                <option value="">All Skills</option>
                {mockSkills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
              <Button onClick={handleSearch} className="bg-gradient-to-r from-blue-500 to-purple-600">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((match) => (
                <Card key={match.id} className="hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={match.avatar} alt={match.name} />
                        <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{match.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{match.location}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm ml-1">{match.rating}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {match.completedExchanges} exchanges
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{match.bio}</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold mb-2">Can teach:</p>
                        <div className="flex flex-wrap gap-1">
                          {match.skillsToTeach.map((skill) => (
                            <Badge key={skill} className="text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold mb-2">Wants to learn:</p>
                        <div className="flex flex-wrap gap-1">
                          {match.skillsToLearn.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600"
                      onClick={() => navigate('/messages')}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
