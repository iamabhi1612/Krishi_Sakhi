import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, Bug, Calendar, Droplets, Star, Clock, Eye, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '../../contexts/LanguageContext';

const KnowledgeEngine = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const categories = [
    { id: 'all', label: 'All', icon: Book },
    { id: 'crops', label: 'Crop Calendar', icon: Calendar },
    { id: 'pests', label: 'Pest Management', icon: Bug },
    { id: 'irrigation', label: 'Water Management', icon: Droplets },
    { id: 'fertilizer', label: 'Fertilizers', icon: Star },
    { id: 'weather', label: 'Weather Guide', icon: Calendar },
  ];

  const knowledgeArticles = [
    {
      id: 1,
      title: 'Optimal Rice Planting Season in Kerala',
      titleMl: 'കേരളത്തിലെ അനുയോജ്യമായ നെല്ല് നടീൽ സീസൺ',
      category: 'crops',
      summary: 'Best practices for rice cultivation during monsoon season, including soil preparation and seed selection.',
      summaryMl: 'മൺസൂൺ കാലത്ത് നെല്ല് കൃഷിക്കുള്ള മികച്ച രീതികൾ, മണ്ണ് തയ്യാറാക്കൽ, വിത്ത് തിരഞ്ഞെടുപ്പ് എന്നിവ ഉൾപ്പെടെ.',
      readTime: '5 min read',
      tags: ['rice', 'kerala', 'monsoon'],
      rating: 4.8,
      views: 1250,
      publishedDate: '2024-01-15',
    },
    {
      id: 2,
      title: 'Brown Planthopper Control Methods',
      titleMl: 'തവിട്ട് ചാടി പ്രാണി നിയന്ത്രണ രീതികൾ',
      category: 'pests',
      summary: 'Effective organic and chemical methods to control brown planthopper in rice fields.',
      summaryMl: 'നെല്ല് വയലുകളിൽ തവിട്ട് ചാടി പ്രാണികളെ നിയന്ത്രിക്കാനുള്ള ഫലപ്രദമായ ജൈവ, രാസ രീതികൾ.',
      readTime: '7 min read',
      tags: ['pest control', 'rice', 'organic'],
      rating: 4.6,
      views: 980,
      publishedDate: '2024-01-10',
    },
    {
      id: 3,
      title: 'Drip Irrigation Setup for Vegetable Gardens',
      titleMl: 'പച്ചക്കറി തോട്ടങ്ങൾക്കുള്ള ഡ്രിപ്പ് ജലസേചന സജ്ജീകരണം',
      category: 'irrigation',
      summary: 'Complete guide to setting up efficient drip irrigation systems for better water conservation.',
      summaryMl: 'മികച്ച ജല സംരക്ഷണത്തിനായി കാര്യക്ഷമമായ ഡ്രിപ്പ് ജലസേചന സംവിധാനങ്ങൾ സ്ഥാപിക്കുന്നതിനുള്ള പൂർണ്ണ ഗൈഡ്.',
      readTime: '10 min read',
      tags: ['irrigation', 'vegetables', 'water conservation'],
      rating: 4.9,
      views: 1500,
      publishedDate: '2024-01-08',
    },
    {
      id: 4,
      title: 'Tomato Disease Prevention Guide',
      titleMl: 'തക്കാളി രോഗ പ്രതിരോധ ഗൈഡ്',
      category: 'pests',
      summary: 'Common tomato diseases, their symptoms, and preventive measures for healthy crop growth.',
      summaryMl: 'സാധാരണ തക്കാളി രോഗങ്ങൾ, അവയുടെ ലക്ഷണങ്ങൾ, ആരോഗ്യകരമായ വിള വളർച്ചയ്ക്കുള്ള പ്രതിരോധ നടപടികൾ.',
      readTime: '8 min read',
      tags: ['tomato', 'disease', 'prevention'],
      rating: 4.7,
      views: 1100,
      publishedDate: '2024-01-12',
    },
    {
      id: 5,
      title: 'Organic Fertilizer Preparation at Home',
      titleMl: 'വീട്ടിൽ ജൈവ വളം തയ്യാറാക്കൽ',
      category: 'fertilizer',
      summary: 'Step-by-step guide to prepare nutrient-rich organic fertilizers using kitchen waste and farm residues.',
      summaryMl: 'അടുക്കള മാലിന്യങ്ങളും കാർഷിക അവശിഷ്ടങ്ങളും ഉപയോഗിച്ച് പോഷകസമ്പുഷ്ടമായ ജൈവ വളങ്ങൾ തയ്യാറാക്കുന്നതിനുള്ള ഘട്ടം ഘട്ടമായുള്ള ഗൈഡ്.',
      readTime: '6 min read',
      tags: ['organic', 'fertilizer', 'composting'],
      rating: 4.5,
      views: 850,
      publishedDate: '2024-01-05',
    },
    {
      id: 6,
      title: 'Weather Pattern Analysis for Crop Planning',
      titleMl: 'വിള ആസൂത്രണത്തിനുള്ള കാലാവസ്ഥാ പാറ്റേൺ വിശകലനം',
      category: 'weather',
      summary: 'Understanding weather patterns and their impact on crop selection and farming schedules.',
      summaryMl: 'കാലാവസ്ഥാ പാറ്റേണുകളും വിള തിരഞ്ഞെടുപ്പിലും കൃഷി ഷെഡ്യൂളുകളിലും അവയുടെ സ്വാധീനവും മനസ്സിലാക്കുന്നു.',
      readTime: '12 min read',
      tags: ['weather', 'planning', 'analysis'],
      rating: 4.4,
      views: 720,
      publishedDate: '2024-01-03',
    },
  ];

  const filteredArticles = knowledgeArticles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (language === 'ml' && (
                           article.titleMl?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.summaryMl?.toLowerCase().includes(searchTerm.toLowerCase())
                         )) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'views':
        return b.views - a.views;
      case 'recent':
      default:
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    }
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{language === 'ml' ? 'വിജ്ഞാന കേന്ദ്രം' : 'Knowledge Engine'}</h2>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'ml' ? 'കൃഷി വിഷയങ്ങൾ, വിളകൾ, അല്ലെങ്കിൽ സാങ്കേതികതകൾ തിരയുക...' : 'Search for farming topics, crops, or techniques...'}
              className="pl-10 py-3 rounded-xl"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="w-4 h-4 text-gray-500" />
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`rounded-full ${
                  activeCategory === category.id
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'border-green-200 text-green-600 hover:bg-green-50'
                }`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            ))}
            
            <div className="ml-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <Book className="w-8 h-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">{knowledgeArticles.length}</p>
              <p className="text-green-100 text-sm">Total Articles</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <Eye className="w-8 h-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">{knowledgeArticles.reduce((sum, article) => sum + article.views, 0).toLocaleString()}</p>
              <p className="text-blue-100 text-sm">Total Views</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">{(knowledgeArticles.reduce((sum, article) => sum + article.rating, 0) / knowledgeArticles.length).toFixed(1)}</p>
              <p className="text-orange-100 text-sm">Avg Rating</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">{filteredArticles.length}</p>
              <p className="text-purple-100 text-sm">Filtered Results</p>
            </CardContent>
          </Card>
        </div>

        {/* Knowledge Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800 leading-tight">
                    {language === 'ml' && article.titleMl ? article.titleMl : article.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{article.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{article.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {language === 'ml' && article.summaryMl ? article.summaryMl : article.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-green-100 text-green-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      {new Date(article.publishedDate).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Download className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                    <Button 
                      size="sm" 
                      className="bg-green-500 hover:bg-green-600 rounded-lg"
                    >
                      {language === 'ml' ? 'കൂടുതൽ വായിക്കുക' : 'Read More'}
                    </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">{language === 'ml' ? 'ലേഖനങ്ങൾ കണ്ടെത്തിയില്ല' : 'No articles found'}</h3>
            <p className="text-gray-500">{language === 'ml' ? 'നിങ്ങളുടെ തിരയൽ പദങ്ങളോ വിഭാഗ ഫിൽട്ടറുകളോ ക്രമീകരിക്കാൻ ശ്രമിക്കുക.' : 'Try adjusting your search terms or category filters.'}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default KnowledgeEngine;