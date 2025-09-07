import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, MapPin, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProfile } from '../../contexts/ProfileContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface CreateProfileFormProps {
  onBack: () => void;
  editProfile?: any;
}

const CreateProfileForm: React.FC<CreateProfileFormProps> = ({ onBack, editProfile }) => {
  const { addProfile, updateProfile } = useProfile();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: editProfile?.name || '',
    age: editProfile?.age?.toString() || '',
    contact: editProfile?.contact || '',
    location: editProfile?.location || '',
    landSize: editProfile?.landSize || '',
    cropType: editProfile?.cropType || '',
    soilType: editProfile?.soilType || '',
    irrigationMethod: editProfile?.irrigationMethod || '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (editProfile) {
      updateProfile(editProfile.id, {
        ...formData,
        age: parseInt(formData.age),
      });
    } else {
      addProfile({
        ...formData,
        age: parseInt(formData.age),
      });
    }
    onBack();
  };

  const isStep1Valid = formData.name && formData.age && formData.contact;
  const isStep2Valid = formData.location && formData.landSize && formData.cropType && formData.soilType && formData.irrigationMethod;

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mr-4 p-2 hover:bg-green-50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-bold text-gray-800">Create Farm Profile</h2>
          <h2 className="text-2xl font-bold text-gray-800">
            {editProfile ? 'Edit Farm Profile' : 'Create Farm Profile'}
          </h2>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            1
          </div>
          <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
            2
          </div>
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-6 h-6 text-green-600" />
                  <span>{t('profile.farmer.details')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="name">Farmer Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    placeholder="Enter your age"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                    placeholder="Enter your phone number"
                    className="mt-2"
                  />
                </div>

                <Button
                  onClick={() => setStep(2)}
                  disabled={!isStep1Valid}
                  className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-xl"
                >
                  Continue to Farm Details
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-6 h-6 text-green-600" />
                  <span>{t('profile.farm.details')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="location">Farm Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Enter your farm location"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="landSize">Land Size</Label>
                  <Input
                    id="landSize"
                    value={formData.landSize}
                    onChange={(e) => handleInputChange('landSize', e.target.value)}
                    placeholder="e.g., 2.5 acres"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="cropType">Primary Crop Type</Label>
                  <Select onValueChange={(value) => handleInputChange('cropType', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="tomato">Tomato</SelectItem>
                      <SelectItem value="onion">Onion</SelectItem>
                      <SelectItem value="coconut">Coconut</SelectItem>
                      <SelectItem value="pepper">Pepper</SelectItem>
                      <SelectItem value="cardamom">Cardamom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Select onValueChange={(value) => handleInputChange('soilType', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clay">Clay</SelectItem>
                      <SelectItem value="sandy">Sandy</SelectItem>
                      <SelectItem value="loamy">Loamy</SelectItem>
                      <SelectItem value="rocky">Rocky</SelectItem>
                      <SelectItem value="laterite">Laterite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="irrigationMethod">Irrigation Method</Label>
                  <Select onValueChange={(value) => handleInputChange('irrigationMethod', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select irrigation method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drip">Drip Irrigation</SelectItem>
                      <SelectItem value="sprinkler">Sprinkler</SelectItem>
                      <SelectItem value="flood">Flood Irrigation</SelectItem>
                      <SelectItem value="rainwater">Rainwater</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1 py-3 rounded-xl"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!isStep2Valid}
                    className="flex-1 bg-green-500 hover:bg-green-600 py-3 rounded-xl"
                  >
                    {editProfile ? 'Update Profile' : 'Create Profile'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CreateProfileForm;