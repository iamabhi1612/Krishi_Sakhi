import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import AdvisorySection from './features/AdvisorySection';
import ProfileSection from './features/ProfileSection';
import QueriesSection from './features/QueriesSection';
import KnowledgeEngine from './features/KnowledgeEngine';

const FeaturesPage = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('advisory');

  const sidebarItems = [
    { id: 'advisory', label: t('features.advisory'), icon: '🌱' },
    { id: 'profile', label: t('features.profile'), icon: '👤' },
    { id: 'queries', label: t('features.queries'), icon: '💬' },
    { id: 'knowledge', label: t('features.knowledge'), icon: '📚' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'advisory':
        return <AdvisorySection />;
      case 'profile':
        return <ProfileSection />;
      case 'queries':
        return <QueriesSection />;
      case 'knowledge':
        return <KnowledgeEngine />;
      default:
        return <AdvisorySection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Features & Tools
          </h1>
          <p className="text-xl text-gray-600">
            Explore all the powerful features designed to support your farming journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Navigate Features
              </h3>
              <nav className="space-y-2">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                      activeSection === item.id
                        ? 'bg-green-100 text-green-700 shadow-md'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Right Content Area */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-3"
          >
            {renderContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;