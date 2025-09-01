import { motion } from 'framer-motion';
import { Sprout, Target, Users, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutPage = () => {
  const features = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To empower farmers with AI-driven insights and traditional farming wisdom, helping them achieve sustainable and profitable agriculture.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a supportive ecosystem where farmers can share knowledge, learn from experts, and grow together.',
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Helping farmers increase yield by 25% on average while reducing resource consumption and environmental impact.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Sprout className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About Krishi Sakhi
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Krishi Sakhi is more than just an app – it's your digital farming companion that combines 
            cutting-edge AI technology with time-tested agricultural wisdom to support farmers at every 
            step of their journey.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Born from the fields of Kerala, Krishi Sakhi was created by a team of agricultural 
                  experts and technology enthusiasts who witnessed firsthand the challenges faced by 
                  farmers in today's changing climate.
                </p>
                <p>
                  We saw the need for a platform that could bridge the gap between traditional farming 
                  knowledge and modern technology, providing farmers with personalized, actionable 
                  insights that respect both innovation and tradition.
                </p>
                <p>
                  Today, Krishi Sakhi serves thousands of farmers across India, helping them make 
                  informed decisions, increase productivity, and build sustainable farming practices 
                  for future generations.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Farmers working in field"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-green-50">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-3xl p-12"
        >
          <h2 className="text-3xl font-bold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p className="text-green-100">
                Promoting eco-friendly farming practices that protect our environment for future generations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-green-100">
                Leveraging cutting-edge AI and data science to solve real-world agricultural challenges.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
              <p className="text-green-100">
                Making advanced farming technology accessible to farmers of all backgrounds and regions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;