import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';

// Import components
// import HeroSlider from '../components/home/HeroSlider';
// import StatCounter from '../components/home/StatCounter';
// import TestimonialSlider from '../components/home/TestimonialSlider';

const Home = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // For development, using placeholder data
        // In production, use real API endpoints
        
        // Simulating API call for news
        setTimeout(() => {
          setLatestNews([
            {
              _id: '1',
              title: 'Annual Science Exhibition Showcases Student Innovation',
              content: 'The annual science exhibition featured over 50 innovative projects from students across all grades...',
              image: 'https://source.unsplash.com/random/600x400/?science',
              date: '2023-10-15',
            },
            {
              _id: '2',
              title: 'Our Students Win National Debate Championship',
              content: 'Our debate team has brought home the trophy from the National Interschool Debate Championship...',
              image: 'https://source.unsplash.com/random/600x400/?debate',
              date: '2023-10-10',
            },
            {
              _id: '3',
              title: 'New Computer Lab Inauguration',
              content: 'State-of-the-art computer lab with 50 high-performance systems was inaugurated by the Education Minister...',
              image: 'https://source.unsplash.com/random/600x400/?computer',
              date: '2023-10-05',
            },
          ]);
        }, 500);

        // Simulating API call for events
        setTimeout(() => {
          setUpcomingEvents([
            {
              _id: '1',
              title: 'Annual Sports Day',
              description: 'Join us for our annual sports day featuring track and field events, team sports, and more...',
              date: '2023-11-15',
              time: '9:00 AM - 4:00 PM',
              location: 'School Sports Complex',
            },
            {
              _id: '2',
              title: 'Parent-Teacher Meeting',
              description: 'A chance to discuss your child\'s progress with our faculty members...',
              date: '2023-11-20',
              time: '2:00 PM - 6:00 PM',
              location: 'School Auditorium',
            },
            {
              _id: '3',
              title: 'Annual Cultural Fest',
              description: 'A celebration of art, music, dance, and cultural performances by our talented students...',
              date: '2023-12-05',
              time: '5:00 PM - 9:00 PM',
              location: 'School Amphitheater',
            },
          ]);
          setLoading(false);
        }, 700);

        // In production, use the following:
        /*
        const newsRes = await axios.get('/api/news?limit=3');
        const eventsRes = await axios.get('/api/events/upcoming?limit=3');
        
        setLatestNews(newsRes.data);
        setUpcomingEvents(eventsRes.data);
        setLoading(false);
        */
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
      
    };

    fetchData();
  }, []);

  // Stats for counter section
  const stats = [
    { label: 'Years of Excellence', value: 25 },
    { label: 'Qualified Faculty', value: 120 },
    { label: 'Students', value: 2500 },
    { label: 'Courses Offered', value: 45 },
  ];

  return (
    <div className="pt-16">
     

      {/* Welcome Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
                Welcome to <span className="text-primary-600">Education Institute</span>
              </h2>
              <div className="w-20 h-1 bg-primary-600 mb-6"></div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                For over 25 years, Education Institute has been at the forefront of educational excellence, nurturing young minds and helping them reach their full potential. Our institution is built on the pillars of academic excellence, character development, and holistic growth.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                We believe in providing an environment where curiosity is encouraged, innovation is fostered, and every student is given the tools they need to succeed in an ever-changing world. Our dedicated faculty, state-of-the-art facilities, and comprehensive curriculum ensure that our students are well-prepared for the challenges of the future.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Learn More
                <FiArrowRight className="ml-2" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden shadow-soft"
            >
              <img
                src="https://source.unsplash.com/random/800x600/?education"
                alt="Campus life"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
</div>
  );
}
     

export default Home;
