import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Users, Target, Heart, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About SkillSwap</h1>
            <p className="text-xl text-gray-300">
              Empowering people to learn and grow together through skill exchange
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl text-muted-foreground">
                We believe that everyone has something valuable to teach and something new to learn. SkillSwap is built on the idea that knowledge should be freely shared and accessible to all.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-2">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Community First</h3>
                  <p className="text-muted-foreground">
                    We're building a global community of learners and teachers who support each other's growth and development.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Equal Access</h3>
                  <p className="text-muted-foreground">
                    Everyone deserves access to learning opportunities, regardless of their financial situation. SkillSwap makes that possible.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Mutual Growth</h3>
                  <p className="text-muted-foreground">
                    Teaching is one of the best ways to learn. Our platform benefits both teachers and learners equally.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Innovation</h3>
                  <p className="text-muted-foreground">
                    We use cutting-edge technology and AI to match users and enhance the learning experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                SkillSwap was born from a simple observation: people have valuable skills they're willing to share, and they're always looking to learn something new. Why not create a platform that connects these two needs?
              </p>
              <p>
                Founded in 2024, we started with a small community of passionate learners and teachers. Today, we've grown to thousands of users worldwide, facilitating skill exchanges across hundreds of different disciplines.
              </p>
              <p>
                Our platform uses advanced AI technology to match users based on their skills and learning goals, making it easier than ever to find the perfect learning partner. Whether you want to learn web development in exchange for teaching Spanish, or trade photography lessons for cooking classes, SkillSwap makes it happen.
              </p>
              <p>
                We're committed to keeping education accessible, fostering genuine connections, and building a community where everyone can grow together.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
