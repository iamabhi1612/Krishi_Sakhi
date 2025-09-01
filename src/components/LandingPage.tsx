import { motion } from 'framer-motion';
import { Sprout, Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/LanguageContext';

interface LandingPageProps {
  onContinue: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onContinue }) => {
  const { t, language, setLanguage } = useLanguage();

  const handleDemoClick = () => {
    window.open('https://example.com/krishi-sakhi-demo', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-green-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-green-200">
          {/* Language Toggle */}
          <div className="flex justify-end mb-4">
            <div className="flex bg-green-100 rounded-full p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  language === 'en' ? 'bg-green-500 text-white' : 'text-green-700'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ml')}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  language === 'ml' ? 'bg-green-500 text-white' : 'text-green-700'
                }`}
              >
                മല
              </button>
            </div>
          </div>

          {/* Logo and App Name */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sprout className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('app.name')}</h1>
            <p className="text-green-600 text-sm font-medium">{t('app.tagline')}</p>
          </motion.div>

          {/* Demo Question */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-center mb-8"
          >
            <p className="text-gray-700 mb-6 text-lg font-medium">
              {t('landing.demo.question')}
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleDemoClick}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                {t('landing.demo.yes')}
              </Button>

              <Button
                onClick={onContinue}
                variant="outline"
                className="w-full border-2 border-green-500 text-green-600 hover:bg-green-50 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                {t('landing.demo.skip')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-200 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;