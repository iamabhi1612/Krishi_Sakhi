import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AdvisorySection = () => {
  const advisories = [
    {
      id: 1,
      type: 'urgent',
      title: 'Weather Alert: Heavy Rain Expected',
      description: 'Protect your crops from excessive moisture. Consider drainage measures.',
      time: '2 hours ago',
      status: 'pending',
    },
    {
      id: 2,
      type: 'recommendation',
      title: 'Optimal Time for Fertilizer Application',
      description: 'Based on your crop growth stage, now is the ideal time for nitrogen application.',
      time: '1 day ago',
      status: 'completed',
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Irrigation Schedule',
      description: 'Your tomato plants need watering. Soil moisture levels are below optimal.',
      time: '3 hours ago',
      status: 'pending',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'recommendation':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-orange-500" />;
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
      default:
        return 'bg-green-100 text-green-700';
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
        </div>

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
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
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
                        </div>
                        <p className="text-gray-600 mb-2">{advisory.description}</p>
                        <p className="text-sm text-gray-500">{advisory.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {advisory.status === 'completed' ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Mark Done
                        </button>
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