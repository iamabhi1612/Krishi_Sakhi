import { motion } from 'framer-motion';
import { ArrowLeft, Bell, CheckCircle, Clock, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProfile } from '../contexts/ProfileContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProfileDashboard = () => {
  const { selectedProfile } = useProfile();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([
    { id: 1, title: 'Apply organic fertilizer', crop: 'Tomato', status: 'pending', dueDate: '2025-01-15' },
    { id: 2, title: 'Check for pest damage', crop: 'Tomato', status: 'completed', dueDate: '2025-01-10' },
    { id: 3, title: 'Water irrigation check', crop: 'Rice', status: 'pending', dueDate: '2025-01-16' },
  ]);

  if (!selectedProfile) {
    navigate('/features');
    return null;
  }

  const toggleActivityStatus = (id: number) => {
    setActivities(prev => prev.map(activity => 
      activity.id === id 
        ? { ...activity, status: activity.status === 'pending' ? 'completed' : 'pending' }
        : activity
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center mb-8"
        >
          <Button
            onClick={() => navigate('/features')}
            variant="ghost"
            className="mr-4 p-2 hover:bg-green-50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{selectedProfile.name}'s Farm</h1>
            <p className="text-gray-600">{selectedProfile.location} • {selectedProfile.cropType}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="shadow-lg border-0 mb-6">
              <CardHeader>
                <CardTitle>Farm Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Land Size</p>
                  <p className="font-semibold">{selectedProfile.landSize}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Soil Type</p>
                  <p className="font-semibold">{selectedProfile.soilType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Irrigation</p>
                  <p className="font-semibold">{selectedProfile.irrigationMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-semibold">{selectedProfile.contact}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tasks Completed</span>
                    <Badge className="bg-green-100 text-green-700">8/10</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Alerts Received</span>
                    <Badge className="bg-orange-100 text-orange-700">3</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weather Updates</span>
                    <Badge className="bg-blue-100 text-blue-700">Daily</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Advisory Section */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-6 h-6 text-green-600" />
                  <span>Personalized Advisories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-red-100 text-red-700">Urgent</Badge>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <h4 className="font-semibold text-gray-800">Heavy Rain Alert</h4>
                    <p className="text-gray-600">Protect tomato plants from excessive water. Consider temporary covering.</p>
                  </div>

                  <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-blue-100 text-blue-700">Recommendation</Badge>
                      <span className="text-sm text-gray-500">1 day ago</span>
                    </div>
                    <h4 className="font-semibold text-gray-800">Fertilizer Application</h4>
                    <p className="text-gray-600">Apply nitrogen-rich fertilizer to boost vegetative growth in tomatoes.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Tracking */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Activity Tracking</span>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600 rounded-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Activity
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleActivityStatus(activity.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            activity.status === 'completed'
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-300 hover:border-green-500'
                          }`}
                        >
                          {activity.status === 'completed' && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </button>
                        <div>
                          <h4 className={`font-medium ${
                            activity.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-800'
                          }`}>
                            {activity.title}
                          </h4>
                          <p className="text-sm text-gray-500">{activity.crop} • Due: {activity.dueDate}</p>
                        </div>
                      </div>
                      <Badge 
                        className={activity.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                        }
                      >
                        {activity.status}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;