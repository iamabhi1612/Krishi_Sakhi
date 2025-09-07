import { motion } from 'framer-motion';
import { ArrowLeft, Bell, CheckCircle, Clock, Plus, Calendar, TrendingUp, AlertTriangle, Droplets, Thermometer, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useProfile } from '../contexts/ProfileContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ProfileDashboard = () => {
  const { selectedProfile } = useProfile();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([
    { id: 1, title: 'Apply organic fertilizer', crop: selectedProfile?.cropType || 'Tomato', status: 'pending', dueDate: '2025-01-15', priority: 'high', progress: 0 },
    { id: 2, title: 'Check for pest damage', crop: selectedProfile?.cropType || 'Tomato', status: 'completed', dueDate: '2025-01-10', priority: 'medium', progress: 100 },
    { id: 3, title: 'Water irrigation check', crop: selectedProfile?.cropType || 'Rice', status: 'pending', dueDate: '2025-01-16', priority: 'high', progress: 25 },
    { id: 4, title: 'Soil pH testing', crop: selectedProfile?.cropType || 'Rice', status: 'pending', dueDate: '2025-01-18', priority: 'low', progress: 0 },
    { id: 5, title: 'Harvest preparation', crop: selectedProfile?.cropType || 'Rice', status: 'in-progress', dueDate: '2025-01-20', priority: 'medium', progress: 60 },
  ]);

  const weatherData = {
    temperature: '28°C',
    humidity: '75%',
    windSpeed: '12 km/h',
    rainfall: '15mm expected',
    uvIndex: 'High',
  };

  const farmStats = {
    totalTasks: activities.length,
    completedTasks: activities.filter(a => a.status === 'completed').length,
    pendingTasks: activities.filter(a => a.status === 'pending').length,
    overdueTasks: activities.filter(a => a.status === 'pending' && new Date(a.dueDate) < new Date()).length,
  };

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

  const getProgressColor = (progress: number) => {
    return progress === 100 ? 'bg-green-500' : progress > 50 ? 'bg-blue-500' : 'bg-orange-500';
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
            <h1 className="text-3xl font-bold text-gray-800">{selectedProfile.name}{language === 'ml' ? 'ന്റെ കൃഷിയിടം' : '\'s Farm'}</h1>
            <p className="text-gray-600">{selectedProfile.location} • {selectedProfile.cropType}</p>
          </div>
        </motion.div>

        {/* Farm Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{farmStats.completedTasks}</p>
              <p className="text-green-100">Completed Tasks</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{farmStats.pendingTasks}</p>
              <p className="text-blue-100">Pending Tasks</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{farmStats.overdueTasks}</p>
              <p className="text-orange-100">Overdue Tasks</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <p className="text-3xl font-bold">{Math.round((farmStats.completedTasks / farmStats.totalTasks) * 100)}%</p>
              <p className="text-purple-100">Completion Rate</p>
            </CardContent>
          </Card>
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
                <CardTitle>{language === 'ml' ? 'കൃഷിയിടം വിവരങ്ങൾ' : 'Farm Details'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">{language === 'ml' ? 'ഭൂമിയുടെ വലിപ്പം' : 'Land Size'}</p>
                  <p className="font-semibold">{selectedProfile.landSize}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{language === 'ml' ? 'മണ്ണിന്റെ തരം' : 'Soil Type'}</p>
                  <p className="font-semibold">{selectedProfile.soilType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{language === 'ml' ? 'ജലസേചനം' : 'Irrigation'}</p>
                  <p className="font-semibold">{selectedProfile.irrigationMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{language === 'ml' ? 'ബന്ധപ്പെടാൻ' : 'Contact'}</p>
                  <p className="font-semibold">{selectedProfile.contact}</p>
                </div>
              </CardContent>
            </Card>

            {/* Weather Widget */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Thermometer className="w-5 h-5 text-blue-500" />
                  <span>{language === 'ml' ? 'ഇന്നത്തെ കാലാവസ്ഥ' : 'Today\'s Weather'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-gray-600">Temperature</span>
                    </div>
                    <span className="font-semibold">{weatherData.temperature}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">Humidity</span>
                    </div>
                    <span className="font-semibold">{weatherData.humidity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Wind className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Wind Speed</span>
                    </div>
                    <span className="font-semibold">{weatherData.windSpeed}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Droplets className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Rainfall</span>
                    </div>
                    <span className="font-semibold text-blue-600">{weatherData.rainfall}</span>
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
                  <span>{language === 'ml' ? 'വ്യക്തിഗത ഉപദേശങ്ങൾ' : 'Personalized Advisories'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-red-100 text-red-700">Urgent</Badge>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <h4 className="font-semibold text-gray-800">{language === 'ml' ? 'കനത്ത മഴ മുന്നറിയിപ്പ്' : 'Heavy Rain Alert'}</h4>
                    <p className="text-gray-600">{language === 'ml' ? `${selectedProfile.cropType} ചെടികളെ അധിക വെള്ളത്തിൽ നിന്ന് സംരക്ഷിക്കുക. താൽക്കാലിക മൂടൽ പരിഗണിക്കുക.` : `Protect ${selectedProfile.cropType} plants from excessive water. Consider temporary covering.`}</p>
                  </div>

                  <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-blue-100 text-blue-700">Recommendation</Badge>
                      <span className="text-sm text-gray-500">1 day ago</span>
                    </div>
                    <h4 className="font-semibold text-gray-800">{language === 'ml' ? 'വള പ്രയോഗം' : 'Fertilizer Application'}</h4>
                    <p className="text-gray-600">{language === 'ml' ? `${selectedProfile.cropType} ചെടികളിൽ സസ്യ വളർച്ച വർദ്ധിപ്പിക്കാൻ നൈട്രജൻ സമ്പുഷ്ടമായ വളം പ്രയോഗിക്കുക.` : `Apply nitrogen-rich fertilizer to boost vegetative growth in ${selectedProfile.cropType}.`}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Tracking */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{language === 'ml' ? 'പ്രവർത്തന ട്രാക്കിംഗ്' : 'Activity Tracking'}</span>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600 rounded-lg">
                    <Plus className="w-4 h-4 mr-2" />
                    {language === 'ml' ? 'പ്രവർത്തനം ചേർക്കുക' : 'Add Activity'}
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
                      className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleActivityStatus(activity.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            activity.status === 'completed' || activity.progress === 100
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-300 hover:border-green-500'
                          }`}
                        >
                          {(activity.status === 'completed' || activity.progress === 100) && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </button>
                        <div>
                          <h4 className={`font-medium ${
                            activity.status === 'completed' || activity.progress === 100 ? 'text-gray-500 line-through' : 'text-gray-800'
                          }`}>
                            {activity.title}
                          </h4>
                          <p className="text-sm text-gray-500">{activity.crop} • {language === 'ml' ? 'അവസാന തീയതി' : 'Due'}: {activity.dueDate}</p>
                        </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge 
                            className={`${activity.priority === 'high' ? 'bg-red-100 text-red-700' : 
                                       activity.priority === 'medium' ? 'bg-orange-100 text-orange-700' : 
                                       'bg-green-100 text-green-700'}`}
                          >
                            {activity.priority}
                          </Badge>
                          <Badge 
                            className={activity.status === 'completed' 
                              ? 'bg-green-100 text-green-700' 
                              : activity.status === 'in-progress'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-orange-100 text-orange-700'
                            }
                          >
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{language === 'ml' ? 'പുരോഗതി' : 'Progress'}</span>
                          <span className="font-medium">{activity.progress}%</span>
                        </div>
                        <Progress 
                          value={activity.progress} 
                          className={`h-2 ${getProgressColor(activity.progress)}`}
                        />
                      </div>
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