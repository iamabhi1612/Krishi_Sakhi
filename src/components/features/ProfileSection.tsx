import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, User, MapPin, Crop } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProfile } from '../../contexts/ProfileContext';
import { useLanguage } from '../../contexts/LanguageContext';
import CreateProfileForm from './CreateProfileForm';
import { useNavigate } from 'react-router-dom';

const ProfileSection = () => {
  const { profiles, setSelectedProfile } = useProfile();
  const { t } = useLanguage();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();

  const handleProfileSelect = (profile: any) => {
    setSelectedProfile(profile);
    navigate(`/profile/${profile.id}`);
  };

  if (showCreateForm) {
    return <CreateProfileForm onBack={() => setShowCreateForm(false)} />;
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Farm Profiles</h2>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-6 py-3"
          >
            <Plus className="w-5 h-5 mr-2" />
            {t('profile.create')}
          </Button>
        </div>

        {profiles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <User className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              No Profiles Created Yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Create your first farm profile to get personalized recommendations and track your agricultural activities.
            </p>
            <Button
              onClick={() => setShowCreateForm(true)}
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-8 py-4"
            >
              <Plus className="w-5 h-5 mr-2" />
              {t('profile.create')}
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-green-50 border-0 shadow-lg"
                  onClick={() => handleProfileSelect(profile)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{profile.name}</h3>
                        <p className="text-sm text-gray-500">Age: {profile.age}</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{profile.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Crop className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{profile.cropType}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Land Size: {profile.landSize}
                      </div>
                      <div className="text-sm text-gray-500">
                        Soil: {profile.soilType}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProfileSection;