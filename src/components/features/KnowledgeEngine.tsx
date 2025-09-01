import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, Bug, Calendar, Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const KnowledgeEngine = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: Book },
    { id: 'crops', label: 'Crop Calendar', icon: Calendar },
    { id: 'pests', label: 'Pest Management', icon: Bug },
    { id: 'irrigation', label: 'Water Management', icon: Droplets },
  ];

  const knowledgeArticles = [
    {
      id: 1,
      title: 'Optimal Rice Planting Season in Kerala',
      category: 'crops',
      summary: 'Best practices for rice cultivation during monsoon season, including soil preparation and seed selection.',
      readTime: '5 min read',
      tags: ['rice', 'kerala', 'monsoon'],
    },
    {
      id: 2,
      title: 'Brown Planthopper Control Methods',
      category: 'pests',
      summary: 'Effective organic and chemical methods to control brown planthopper in rice fields.',
      readTime: '7 min read',
      tags: ['pest control', 'rice', 'organic'],
    },
    {
      id: 3,
      title: 'Drip Irrigation Setup for Vegetable Gardens',
      category: 'irrigation',
      summary: 'Complete guide to setting up efficient drip irrigation systems for better water conservation.',
      readTime: '10 min read',
      tags: ['irrigation', 'vegetables', 'water conservation'],
    },
    {
      id: 4,
      title: 'Tomato Disease Prevention Guide',
      category: 'pests',
      summary: 'Common tomato diseases, their symptoms, and preventive measures for healthy crop growth.',
      readTime: '8 min read',
      tags: ['tomato', 'disease', 'prevention'],
    },
  ];

  const filteredArticles = knowledgeArticles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Knowledge Engine</h2>

        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for farming topics, crops, or techniques..."
              className="pl-10 py-3 rounded-xl"
            />
          </div>

          <div className="flex flex-wrap gap-2">
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
          </div>
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
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {article.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-green-100 text-green-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{article.readTime}</span>
                    <Button 
                      size="sm" 
                      className="bg-green-500 hover:bg-green-600 rounded-lg"
                    >
                      Read More
                    </Button>
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
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search terms or category filters.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default KnowledgeEngine;