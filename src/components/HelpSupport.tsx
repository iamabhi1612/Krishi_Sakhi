import { motion } from 'framer-motion';
import { Play, Book, MessageCircle, Phone, HelpCircle, Video } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const HelpSupport = () => {
  const faqs = [
    {
      question: 'How do I create my first farm profile?',
      answer: 'Navigate to the Features section and click on Profile Section. Then click "Create New Profile" and fill in your farmer and farm details step by step.',
    },
    {
      question: 'How accurate are the AI recommendations?',
      answer: 'Our AI recommendations are based on local weather data, soil conditions, and crop-specific best practices. They achieve 85-90% accuracy when combined with local knowledge.',
    },
    {
      question: 'Can I use the app in Malayalam?',
      answer: 'Yes! Krishi Sakhi supports both English and Malayalam. You can switch languages using the toggle in the top navigation bar.',
    },
    {
      question: 'How often should I check for advisories?',
      answer: 'We recommend checking advisories daily, especially during critical farming seasons. You can enable notifications for urgent alerts.',
    },
    {
      question: 'Is my farm data secure?',
      answer: 'Absolutely. We use enterprise-grade security measures to protect your data. Your farm information is encrypted and never shared with third parties.',
    },
  ];

  const handleDemoClick = () => {
    window.open('https://example.com/krishi-sakhi-demo', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Help & Support
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the most out of Krishi Sakhi with our comprehensive help resources and support options.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1"
          >
            <Card className="shadow-lg border-0 mb-6">
              <CardHeader>
                <CardTitle>Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleDemoClick}
                  className="w-full justify-start bg-green-500 hover:bg-green-600 text-white rounded-xl p-4"
                >
                  <Play className="w-5 h-5 mr-3" />
                  Watch Demo Video
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start border-green-200 text-green-600 hover:bg-green-50 rounded-xl p-4"
                >
                  <Book className="w-5 h-5 mr-3" />
                  User Guide
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl p-4"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  Live Chat
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start border-orange-200 text-orange-600 hover:bg-orange-50 rounded-xl p-4"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Call Support
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6 text-center">
                <Video className="w-12 h-12 mx-auto mb-4 text-green-100" />
                <h3 className="text-xl font-semibold mb-2">Need Personal Help?</h3>
                <p className="text-green-100 mb-4">
                  Schedule a one-on-one session with our agricultural experts.
                </p>
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-green-600"
                >
                  Book Session
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="w-6 h-6 text-green-600" />
                  <span>Frequently Asked Questions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border border-gray-200 rounded-lg px-6 py-2"
                    >
                      <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-green-600">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pt-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Support Channels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Still Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Live Chat</h3>
                <p className="text-gray-600 mb-6">
                  Get instant help from our support team through live chat.
                </p>
                <Button className="bg-green-500 hover:bg-green-600 rounded-xl">
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Email Support</h3>
                <p className="text-gray-600 mb-6">
                  Send us detailed questions and we'll respond within 24 hours.
                </p>
                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Phone Support</h3>
                <p className="text-gray-600 mb-6">
                  Speak directly with our agricultural experts for immediate assistance.
                </p>
                <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50 rounded-xl">
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpSupport;