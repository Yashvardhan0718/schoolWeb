import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiCalendar, FiClock, FiArrowRight, FiMapPin } from 'react-icons/fi';

// Import components
import HeroSlider from '../components/home/HeroSlider';
import StatCounter from '../components/home/StatCounter';
import TestimonialSlider from '../components/home/TestimonialSlider';

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
      {/* Hero Slider */}
      <HeroSlider />

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

      {/* Stats Counter */}
      <StatCounter stats={stats} />

      {/* Latest News Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Latest News
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest happenings and achievements at our institution.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestNews.map((news) => (
                <motion.div
                  key={news._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-md transition-shadow"
                >
                  <Link to={`/news/${news._id}`}>
                    <div className="h-48 overflow-hidden">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <FiCalendar className="mr-2" />
                        {new Date(news.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {news.content}
                      </p>
                      <div className="text-primary-600 font-medium inline-flex items-center">
                        Read More <FiArrowRight className="ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/news"
              className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 transition-colors"
            >
              View All News
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Upcoming Events
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mark your calendars for these exciting events and activities.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-md transition-shadow"
                >
                  <Link to={`/events/${event._id}`}>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center text-sm text-primary-600 font-medium">
                          <FiCalendar className="mr-2" />
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <FiClock className="mr-1" />
                          {event.time}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {event.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <FiMapPin className="mr-2" />
                        {event.location}
                      </div>
                      <div className="text-primary-600 font-medium inline-flex items-center">
                        Learn More <FiArrowRight className="ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/events"
              className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 transition-colors"
            >
              View All Events
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialSlider />

      {/* Call to Action Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Institution?
          </h2>
          <p className="text-lg text-primary-100 max-w-3xl mx-auto mb-8">
            Take the first step towards a bright future. Apply now for the upcoming academic year or get in touch with us to learn more.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/admissions"
              className="px-8 py-3 bg-white text-primary-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-primary-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;