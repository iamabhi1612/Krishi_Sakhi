import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock, TrendingUp, Bell, Calendar, Thermometer, Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useProfile } from '../../contexts/ProfileContext';

const AdvisorySection = () => {
  const { selectedProfile } = useProfile();
  
  const advisories = [
    {
      id: 1,
      type: 'urgent',
      title: 'Weather Alert: Heavy Rain Expected Today',
      description: 'Protect your crops from excessive moisture. Consider temporary covering and ensure proper drainage.',
      time: '2 hours ago',
      status: 'pending',
      crop: selectedProfile?.cropType || 'All Crops',
      priority: 'high',
    },
    {
      id: 2,
      type: 'recommendation',
      title: 'Fertilizer Application Recommended',
      description: 'Based on your crop growth stage and soil analysis, apply nitrogen-rich fertilizer for optimal growth.',
      time: '1 day ago',
      status: 'completed',
      crop: selectedProfile?.cropType || 'Rice',
      priority: 'medium',
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Irrigation Schedule Due',
      description: 'Soil moisture levels are below optimal. Schedule irrigation for better crop health.',
      time: '3 hours ago',
      status: 'pending',
      crop: selectedProfile?.cropType || 'Vegetables',
      priority: 'medium',
    },
    {
      id: 4,
      type: 'pest_alert',
      title: 'Pest Activity Detected',
      description: 'Brown planthopper activity reported in nearby areas. Monitor your crops closely.',
      time: '5 hours ago',
      status: 'pending',
      crop: selectedProfile?.cropType || 'Rice',
      priority: 'high',
    },
    {
      id: 5,
      type: 'market',
      title: 'Market Price Update',
      description: 'Current market prices are favorable. Consider harvesting mature crops.',
      time: '1 day ago',
      status: 'pending',
      crop: selectedProfile?.cropType || 'All Crops',
      priority: 'low',
    },
  ];

  const weatherData = {
    temperature: '28°C',
    humidity: '75%',
    rainfall: '15mm expected',
    windSpeed: '12 km/h',
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'recommendation':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'pest_alert':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'market':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-100 text-red-700';
      case 'recommendation':
        return 'bg-blue-100 text-blue-700';
      case 'reminder':
        return 'bg-orange-100 text-orange-700';
      case 'pest_alert':
        return 'bg-red-100 text-red-700';
      case 'market':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-green-100 text-green-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-orange-500 bg-orange-50';
      case 'low':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Advisory Dashboard</h2>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Active Advisories</p>
                  <p className="text-3xl font-bold">5</p>
                </div>
                <AlertCircle className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Completed Actions</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Pending Tasks</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
                <Clock className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Weather Alerts</p>
                  <p className="text-3xl font-bold">2</p>
                </div>
                <Thermometer className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weather Widget */}
        <Card className="mb-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Thermometer className="w-6 h-6 mr-2" />
              Today's Weather
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div><p className="text-blue-100">Temperature</p><p className="text-xl font-bold">{weatherData.temperature}</p></div>
              <div><p className="text-blue-100">Humidity</p><p className="text-xl font-bold">{weatherData.humidity}</p></div>
              <div><p className="text-blue-100">Rainfall</p><p className="text-xl font-bold">{weatherData.rainfall}</p></div>
              <div><p className="text-blue-100">Wind Speed</p><p className="text-xl font-bold">{weatherData.windSpeed}</p></div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Advisories */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Advisories</h3>
          {advisories.map((advisory, index) => (
            <motion.div
              key={advisory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-l-4 ${getPriorityColor(advisory.priority)}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {getIcon(advisory.type)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-800">{advisory.title}</h4>
                          <Badge className={getBadgeColor(advisory.type)}>
                            {advisory.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {advisory.crop}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${advisory.priority === 'high' ? 'border-red-300 text-red-600' : advisory.priority === 'medium' ? 'border-orange-300 text-orange-600' : 'border-green-300 text-green-600'}`}>
                            {advisory.priority} priority
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{advisory.description}</p>
                        <p className="text-sm text-gray-500">{advisory.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {advisory.status === 'completed' ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <Button className="bg-green-500 hover:bg-green-600 rounded-lg">
                          Mark Done
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdvisorySection;